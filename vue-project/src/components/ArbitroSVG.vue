<template>
  <div class="arbitro-container">
    <svg viewBox="0 0 130 175" xmlns="http://www.w3.org/2000/svg">

      <!-- Cara -->
      <circle cx="65" cy="22" r="13" :fill="faceColor" stroke="#ccc" stroke-width="1.5"/>
      <text x="65" y="27" text-anchor="middle" font-size="13">{{ faceEmoji }}</text>

      <!-- Cuerpo con camiseta árbitro -->
      <rect x="45" y="35" width="40" height="30" rx="4" fill="#1a237e"/>
      <text x="65" y="55" text-anchor="middle" font-size="9" fill="white" font-weight="bold">REF</text>

      <!-- Brazo izquierdo — sube con la tarjeta -->
      <line
        x1="45" y1="42"
        :x2="brazoX" :y2="brazoY"
        stroke="#f5c542" stroke-width="4" stroke-linecap="round"/>

      <!-- Tarjeta en la mano -->
      <g v-if="fallos > 0">
        <rect
          :x="brazoX - 8" :y="brazoY - 14"
          width="16" height="22" rx="2"
          :fill="colorTarjeta" stroke="white" stroke-width="1.2"/>
      </g>

      <!-- Brazo derecho -->
      <line x1="85" y1="42" x2="95" y2="60" stroke="#f5c542" stroke-width="4" stroke-linecap="round"/>

      <!-- Piernas -->
      <line x1="55" y1="65" x2="50" y2="92" stroke="#f5c542" stroke-width="3" stroke-linecap="round"/>
      <line x1="75" y1="65" x2="80" y2="92" stroke="#f5c542" stroke-width="3" stroke-linecap="round"/>

      <!-- Botas -->
      <rect x="39" y="92" width="14" height="5" rx="2" fill="#222"/>
      <rect x="77" y="92" width="14" height="5" rx="2" fill="#222"/>

      <!-- Estado texto -->
      <text x="65" y="118" text-anchor="middle" font-size="10" fill="#a8f0a8" font-weight="600">
        {{ estadoTexto }}
      </text>
      <text x="65" y="132" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.4)">
        Intentos: {{ fallos }}/5
      </text>

    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  fallos: {
    type: Number,
    required: true
  }
})

const colorTarjeta = computed(() => {
  if (props.fallos <= 2) return '#4caf50'
  if (props.fallos <= 4) return '#ffeb3b'
  return '#e53935'
})

const brazoX = computed(() => props.fallos > 0 ? 28 : 45)
const brazoY = computed(() => props.fallos > 0 ? 30 : 58)

const faceColor = computed(() => {
  if (props.fallos === 0) return '#f5c542'
  if (props.fallos <= 2) return '#f5c542'
  if (props.fallos <= 4) return '#f59542'
  return '#e57373'
})

const faceEmoji = computed(() => {
  if (props.fallos === 0) return '😐'
  if (props.fallos <= 2) return '😠'
  if (props.fallos <= 4) return '😤'
  return '🤬'
})

const estadoTexto = computed(() => {
  if (props.fallos === 0) return 'En espera'
  if (props.fallos === 1) return '¡Aviso!'
  if (props.fallos === 2) return '¡Segundo aviso!'
  if (props.fallos === 3) return '¡Amarilla!'
  if (props.fallos === 4) return '¡Doble amarilla!'
  return '¡TARJETA ROJA!'
})
</script>

<style scoped>
.arbitro-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

svg {
  width: 130px;
  height: 175px;
}
</style>