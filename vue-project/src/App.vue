<template>
  <div id="app">

    <!-- Pantalla inicio — Selector de liga -->
    <SelectorLiga
      v-if="!juegoIniciado"
      @seleccionar-liga="seleccionarLiga"/>

    <!-- Pantalla juego -->
    <div class="juego-container" v-else>

      <!-- Top bar -->
      <div class="top-bar">
        <h1 class="titulo">⚽ Tarjeta Roja</h1>
        <div class="liga-badge">{{ ligaActual }}</div>
        <button class="btn-top" @click="volverSelector">← Ligas</button>
      </div>

      <!-- Main -->
      <div class="main-grid">

        <!-- Panel árbitro -->
        <div class="panel-arbitro">
          <ArbitroSVG :fallos="fallos"/>
          <TarjetasAcumuladas :fallos="fallos"/>
        </div>

        <!-- Panel juego -->
        <div class="panel-juego">
          <PalabraOculta
            :palabraRevelada="palabraRevelada"
            :pista="jugadorActual ? jugadorActual.pista : ''"
            :pistaVisible="pistaVisible"
            :pistaUsada="pistaUsada"
            :terminado="terminado"
            @mostrar-pista="mostrarPista"
            @ocultar-pista="ocultarPista"/>

          <div class="letras-falladas">
            Letras falladas:
            <span>{{ [...falladas].join('  ') }}</span>
          </div>

          <TecladoLetras
            :adivinadas="adivinadas"
            :falladas="falladas"
            :terminado="terminado"
            @pulsar-letra="pulsarLetra"/>
        </div>

      </div>

      <!-- Overlay resultado -->
      <ResultadoFinal
        :visible="terminado"
        :victoria="victoria"
        :palabra="jugadorActual ? jugadorActual.palabra : ''"
        :pistaUsada="pistaUsada"
        @nueva-partida="nuevaPartida"
        @cambiar-liga="volverSelector"/>

    </div>
  </div>
</template>

<script setup>
import SelectorLiga       from './components/SelectorLiga.vue'
import ArbitroSVG         from './components/ArbitroSVG.vue'
import TarjetasAcumuladas from './components/TarjetasAcumuladas.vue'
import PalabraOculta      from './components/PalabraOculta.vue'
import TecladoLetras      from './components/TecladoLetras.vue'
import ResultadoFinal     from './components/ResultadoFinal.vue'
import { useJuego }       from './composables/useJuego'

const {
  jugadorActual,
  adivinadas,
  falladas,
  ligaActual,
  terminado,
  victoria,
  pistaVisible,
  pistaUsada,
  juegoIniciado,
  fallos,
  palabraRevelada,
  seleccionarLiga,
  nuevaPartida,
  pulsarLetra,
  mostrarPista,
  ocultarPista
} = useJuego()

function volverSelector() {
  juegoIniciado.value = false
}
</script>

<style scoped>
#app {
  min-height: 100vh;
  background: #0a3d0a;
}

/* Top bar */
.top-bar {
  background: #062106;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 2px solid #1a6b1a;
}

.titulo {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 24px;
  letter-spacing: 2px;
  color: #f9f871;
}

.liga-badge {
  background: #1a6b1a;
  border: 1px solid #2d9e2d;
  border-radius: 4px;
  padding: 3px 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #a8f0a8;
}

.btn-top {
  background: transparent;
  border: 1px solid #2d9e2d;
  border-radius: 4px;
  color: white;
  font-size: 13px;
  padding: 5px 12px;
  cursor: pointer;
}

.btn-top:hover { background: #1a6b1a; }

/* Main grid */
.main-grid {
  display: grid;
  grid-template-columns: 220px 1fr;
  min-height: calc(100vh - 52px);
}

/* Panel árbitro */
.panel-arbitro {
  background: #062106;
  border-right: 2px solid #1a6b1a;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* Panel juego */
.panel-juego {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Letras falladas */
.letras-falladas {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  min-height: 16px;
}

.letras-falladas span {
  color: #ff8a80;
  letter-spacing: 2px;
}
</style>