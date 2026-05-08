<template>
  <div class="palabra-container">

    <!-- Slots de letras -->
    <div class="palabra-wrap">
      <div
        v-for="(slot, i) in palabraRevelada"
        :key="i"
        class="letra-slot"
        :class="{ espacio: slot.letra === ' ' }">
        <span class="char">{{ slot.visible ? slot.letra : '' }}</span>
        <div class="linea" v-if="slot.letra !== ' '"></div>
      </div>
    </div>

    <!-- Zona de pista -->
    <div class="pista-area">

      <!-- Botón ver pista -->
      <button
        v-if="!pistaVisible && !pistaUsada"
        class="btn-pista"
        @click="$emit('mostrar-pista')">
        💡 Ver pista
      </button>

      <!-- Botón ocultar pista -->
      <button
        v-if="pistaVisible && !terminado"
        class="btn-pista ocultar"
        @click="$emit('ocultar-pista')">
        🙈 Ocultar pista
      </button>

      <!-- Caja de pista con animación -->
      <Transition name="slide">
        <div class="pista-box" v-if="pistaVisible">
          <span class="pista-label">💡 Pista</span>
          <span class="pista-texto">{{ pista }}</span>
        </div>
      </Transition>

    </div>

  </div>
</template>

<script setup>
defineProps({
  palabraRevelada: {
    type: Array,
    required: true
  },
  pista: {
    type: String,
    required: true
  },
  pistaVisible: {
    type: Boolean,
    default: false
  },
  pistaUsada: {
    type: Boolean,
    default: false
  },
  terminado: {
    type: Boolean,
    default: false
  }
})

defineEmits(['mostrar-pista', 'ocultar-pista'])
</script>

<style scoped>
.palabra-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.palabra-wrap {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 6px 0;
}

.letra-slot {
  width: 28px;
  text-align: center;
}

.letra-slot.espacio {
  width: 14px;
}

.char {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 26px;
  color: white;
  line-height: 1;
  display: block;
  min-height: 26px;
}

.linea {
  height: 3px;
  background: #2d9e2d;
  border-radius: 2px;
  margin-top: 4px;
}

/* ── Pista ── */
.pista-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.btn-pista {
  background: transparent;
  border: 1px solid #2d9e2d;
  color: #a8f0a8;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-pista:hover {
  background: #1a6b1a;
}

.btn-pista.ocultar {
  border-color: #888;
  color: #888;
}

.btn-pista.ocultar:hover {
  background: rgba(255, 255, 255, 0.05);
}

.pista-box {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #1a6b1a;
  border-radius: 6px;
  padding: 10px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.pista-label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #4caf50;
}

.pista-texto {
  font-size: 13px;
  color: #a8f0a8;
  font-style: italic;
  line-height: 1.5;
}

/* ── Animación slide ── */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>