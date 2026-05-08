import { describe, it, expect, beforeEach } from 'vitest'
import { useJuego } from './useJuego'

describe('useJuego', () => {

  let juego

  beforeEach(() => {
    juego = useJuego()
    // Iniciamos siempre con LaLiga para los tests
    juego.seleccionarLiga('laliga')
  })

  // ─── Test 1 — Estado inicial ───────────────────────────
  describe('Estado inicial', () => {

    it('debe tener 0 fallos al iniciar', () => {
      expect(juego.fallos.value).toBe(0)
    })

    it('debe tener el juego no terminado al iniciar', () => {
      expect(juego.terminado.value).toBe(false)
    })

    it('debe tener la pista oculta al iniciar', () => {
      expect(juego.pistaVisible.value).toBe(false)
    })

    it('debe tener la pista no usada al iniciar', () => {
      expect(juego.pistaUsada.value).toBe(false)
    })

    it('debe cargar un jugador al seleccionar liga', () => {
      expect(juego.jugadorActual.value).not.toBeNull()
    })

    it('debe tener el jugador de la liga correcta', () => {
      expect(juego.jugadorActual.value.liga).toBe('laliga')
    })

  })

  // ─── Test 2 — Fallos ───────────────────────────────────
  describe('Sistema de fallos', () => {

    it('debe incrementar fallos al pulsar letra incorrecta', () => {
      // Buscamos una letra que no esté en la palabra
      const letraFallo = buscarLetraFallo(juego)
      juego.pulsarLetra(letraFallo)
      expect(juego.fallos.value).toBe(1)
    })

    it('no debe incrementar fallos al pulsar letra correcta', () => {
      const letraAcierto = buscarLetraAcierto(juego)
      juego.pulsarLetra(letraAcierto)
      expect(juego.fallos.value).toBe(0)
    })

    it('debe terminar el juego al llegar a 5 fallos', () => {
      forzarDerrota(juego)
      expect(juego.terminado.value).toBe(true)
      expect(juego.victoria.value).toBe(false)
    })

    it('no debe permitir pulsar letras cuando el juego termina', () => {
      forzarDerrota(juego)
      const fallosAntes = juego.fallos.value
      juego.pulsarLetra('A')
      expect(juego.fallos.value).toBe(fallosAntes)
    })

  })

  // ─── Test 3 — Victoria ────────────────────────────────
  describe('Sistema de victoria', () => {

    it('debe detectar victoria al adivinar todas las letras', () => {
      forzarVictoria(juego)
      expect(juego.victoria.value).toBe(true)
      expect(juego.terminado.value).toBe(true)
    })

  })

  // ─── Test 4 — Pista ───────────────────────────────────
  describe('Sistema de pista', () => {

    it('debe mostrar la pista al llamar mostrarPista', () => {
      juego.mostrarPista()
      expect(juego.pistaVisible.value).toBe(true)
    })

    it('debe marcar la pista como usada al mostrarla', () => {
      juego.mostrarPista()
      expect(juego.pistaUsada.value).toBe(true)
    })

    it('debe ocultar la pista al llamar ocultarPista', () => {
      juego.mostrarPista()
      juego.ocultarPista()
      expect(juego.pistaVisible.value).toBe(false)
    })

    it('debe resetear la pista en nueva partida', () => {
      juego.mostrarPista()
      juego.nuevaPartida()
      expect(juego.pistaVisible.value).toBe(false)
      expect(juego.pistaUsada.value).toBe(false)
    })

  })

  // ─── Test 5 — Aleatoria sin repetición ────────────────
  describe('Palabra aleatoria sin repeticion', () => {

    it('no debe repetir jugador hasta agotar todos los de la liga', () => {
      const usados = new Set()
      // Jugamos 20 partidas seguidas (todos los de LaLiga)
      for (let i = 0; i < 20; i++) {
        const id = juego.jugadorActual.value.id
        expect(usados.has(id)).toBe(false)
        usados.add(id)
        juego.nuevaPartida()
      }
    })

    it('debe cambiar de jugador al iniciar nueva partida', () => {
      // Con 20 jugadores en LaLiga es practicamente imposible repetir
      const idAntes = juego.jugadorActual.value.id
      juego.nuevaPartida()
      // Al menos en alguna de 5 partidas debe cambiar
      let cambia = false
      for (let i = 0; i < 5; i++) {
        if (juego.jugadorActual.value.id !== idAntes) {
          cambia = true
          break
        }
        juego.nuevaPartida()
      }
      expect(cambia).toBe(true)
    })

  })

  // ─── Test 6 — Cambio de liga ──────────────────────────
  describe('Cambio de liga', () => {

    it('debe cargar jugador de la nueva liga', () => {
      juego.seleccionarLiga('premier')
      expect(juego.jugadorActual.value.liga).toBe('premier')
    })

    it('debe resetear fallos al cambiar de liga', () => {
      const letraFallo = buscarLetraFallo(juego)
      juego.pulsarLetra(letraFallo)
      juego.seleccionarLiga('seriea')
      expect(juego.fallos.value).toBe(0)
    })

    it('debe resetear la pista al cambiar de liga', () => {
      juego.mostrarPista()
      juego.seleccionarLiga('bundesliga')
      expect(juego.pistaVisible.value).toBe(false)
      expect(juego.pistaUsada.value).toBe(false)
    })

  })

})

// ─── Helpers ──────────────────────────────────────────────

function buscarLetraAcierto(juego) {
  const palabra = juego.jugadorActual.value.palabra
  return palabra[0]
}

function buscarLetraFallo(juego) {
  const palabra = juego.jugadorActual.value.palabra
  const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  return abecedario.find(l => !palabra.includes(l))
}

function forzarVictoria(juego) {
  const letras = [...new Set(juego.jugadorActual.value.palabra.split('').filter(c => c !== ' '))]
  letras.forEach(l => juego.pulsarLetra(l))
}

function forzarDerrota(juego) {
  const palabra = juego.jugadorActual.value.palabra
  const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const letrasErroneas = abecedario.filter(l => !palabra.includes(l))
  for (let i = 0; i < 5; i++) {
    juego.pulsarLetra(letrasErroneas[i])
  }
}