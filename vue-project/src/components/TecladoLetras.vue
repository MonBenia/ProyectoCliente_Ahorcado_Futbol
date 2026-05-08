<template>
  <div class="teclado-container">
    <button
      v-for="letra in abecedario"
      :key="letra"
      class="tecla"
      :class="getTeclaClase(letra)"
      :disabled="adivinadas.has(letra) || falladas.has(letra) || terminado"
      @click="$emit('pulsar-letra', letra)">
      {{ letra }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  adivinadas: {
    type: Set,
    required: true
  },
  falladas: {
    type: Set,
    required: true
  },
  terminado: {
    type: Boolean,
    default: false
  }
})

defineEmits(['pulsar-letra'])

const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

// Orden en que se fueron fallando las letras
const falladasOrdenadas = computed(() => [...props.falladas])

function getTeclaClase(letra) {
  if (props.adivinadas.has(letra)) return 'acierto'

  if (props.falladas.has(letra)) {
    const idx = falladasOrdenadas.value.indexOf(letra) + 1
    if (idx <= 2) return 'fallo-verde'
    if (idx <= 4) return 'fallo-amarilla'
    return 'fallo-roja'
  }

  return ''
}
</script>

<style scoped>
.teclado-container {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 4px;
}

.tecla {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  padding: 6px 2px;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 15px;
  cursor: pointer;
  color: white;
  transition: all 0.1s;
  letter-spacing: 0.5px;
}

.tecla:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.18);
}

.tecla:disabled {
  cursor: default;
  opacity: 0.3;
}

/* Acierto */
.tecla.acierto {
  background: #1a6b1a;
  border-color: #4caf50;
  color: #a8f0a8;
  opacity: 1;
}

/* Fallos según tarjeta */
.tecla.fallo-verde {
  background: #1b5e20;
  border-color: #4caf50;
  color: #a8f0a8;
  opacity: 1;
}

.tecla.fallo-amarilla {
  background: #665500;
  border-color: #ffeb3b;
  color: #ffeb3b;
  opacity: 1;
}

.tecla.fallo-roja {
  background: #7f0000;
  border-color: #e53935;
  color: #ff8a80;
  opacity: 1;
}
</style>