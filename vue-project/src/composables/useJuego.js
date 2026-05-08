import { ref, computed } from 'vue'
import jugadoresData from '../data/jugadores.json'

export function useJuego() {

  // Base de datos de jugadores
  const jugadores = jugadoresData.palabras

  // Estado reactivo
  const jugadorActual  = ref(null)
  const adivinadas     = ref(new Set())
  const falladas       = ref(new Set())
  const ligaActual     = ref(null)
  const usadas         = ref([])
  const terminado      = ref(false)
  const victoria       = ref(false)
  const pistaVisible   = ref(false)
  const pistaUsada     = ref(false)
  const juegoIniciado  = ref(false)

  // Calculamos los fallos y la victoria
  const fallos = computed(() => falladas.value.size)

  const hayVictoria = computed(() => {
    if (!jugadorActual.value) return false
    const letras = [...new Set(jugadorActual.value.palabra.split('').filter(c => c !== ' '))]
    return letras.every(l => adivinadas.value.has(l))
  })

  const palabraRevelada = computed(() => {
    if (!jugadorActual.value) return []
    return jugadorActual.value.palabra.split('').map(letra => ({
      letra,
      visible: letra === ' ' || adivinadas.value.has(letra)
    }))
  })

  // Funciones para manejar el juego

  function seleccionarLiga(liga) {
    ligaActual.value = liga
    usadas.value = []
    nuevaPartida()
    juegoIniciado.value = true
  }

  function palabraAleatoria() {
    const deEstaLiga = jugadores.filter(j => j.liga === ligaActual.value)

    let disponibles = deEstaLiga.filter(j => !usadas.value.includes(j.id))

    // Si se agotan las palabras, reiniciamos las usadas para esa liga
    if (disponibles.length === 0) {
      usadas.value = usadas.value.filter(id =>
        !deEstaLiga.map(j => j.id).includes(id)
      )
      disponibles = deEstaLiga
    }

    const elegido = disponibles[Math.floor(Math.random() * disponibles.length)]
    usadas.value.push(elegido.id)
    return elegido
  }

  function nuevaPartida() {
    jugadorActual.value = palabraAleatoria()
    adivinadas.value    = new Set()
    falladas.value      = new Set()
    terminado.value     = false
    victoria.value      = false
    pistaVisible.value  = false
    pistaUsada.value    = false
  }

  function pulsarLetra(letra) {
    if (terminado.value) return
    if (adivinadas.value.has(letra) || falladas.value.has(letra)) return

    if (jugadorActual.value.palabra.includes(letra)) {
      adivinadas.value = new Set([...adivinadas.value, letra])

      if (hayVictoria.value) {
        victoria.value  = true
        terminado.value = true
      }
    } else {
      falladas.value = new Set([...falladas.value, letra])

      if (falladas.value.size >= 5) {

        // En caso de derrota, revelamos la palabra completa
        adivinadas.value = new Set(jugadorActual.value.palabra.split(''))
        victoria.value  = false
        terminado.value = true
      }
    }
  }

  function mostrarPista() {
    pistaVisible.value = true
    pistaUsada.value   = true
  }

  function ocultarPista() {
    pistaVisible.value = false
  }

  // Resumimos todo lo que queremos exponer 
  return {
    // Estado
    jugadorActual,
    adivinadas,
    falladas,
    ligaActual,
    terminado,
    victoria,
    pistaVisible,
    pistaUsada,
    juegoIniciado,
    // Calculos
    fallos,
    hayVictoria,
    palabraRevelada,
    // Funciones
    seleccionarLiga,
    nuevaPartida,
    pulsarLetra,
    mostrarPista,
    ocultarPista
  }
}