<template>
  <div class="tarjetas-container">
    <h3 class="titulo">Tarjetas</h3>

    <div class="tarjetas-fila">
      <div
        v-for="i in 5"
        :key="i"
        class="tarjeta"
        :class="getTarjetaClase(i)">
      </div>
    </div>

    <div class="estado-texto">{{ mensajeTarjeta }}</div>

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

function getTarjetaClase(i) {
  if (i > props.fallos) return 'vacia'
  if (i <= 2) return 'verde'
  if (i <= 4) return 'amarilla'
  return 'roja'
}

const mensajeTarjeta = computed(() => {
  if (props.fallos === 0) return 'Sin tarjetas aún'
  if (props.fallos === 1) return 'Primer aviso verde'
  if (props.fallos === 2) return 'Segundo aviso verde'
  if (props.fallos === 3) return 'Primera amarilla'
  if (props.fallos === 4) return 'Doble amarilla → roja'
  return '¡EXPULSADO DEL CAMPO!'
})
</script>

<style scoped>
.tarjetas-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.titulo {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 16px;
  letter-spacing: 1px;
  color: #a8f0a8;
}

.tarjetas-fila {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.tarjeta {
  width: 20px;
  height: 28px;
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.tarjeta.vacia {
  background: rgba(255, 255, 255, 0.06);
  border: 1px dashed rgba(255, 255, 255, 0.2);
}

.tarjeta.verde {
  background: #4caf50;
  animation: aparecer 0.3s ease;
}

.tarjeta.amarilla {
  background: #ffeb3b;
  animation: aparecer 0.3s ease;
}

.tarjeta.roja {
  background: #e53935;
  animation: aparecer 0.3s ease;
}

.estado-texto {
  font-size: 11px;
  text-align: center;
  line-height: 1.5;
  color: #a8f0a8;
  min-height: 28px;
}

@keyframes aparecer {
  from {
    transform: scale(0) rotate(-15deg);
    opacity: 0;
  }
  to {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}
</style>