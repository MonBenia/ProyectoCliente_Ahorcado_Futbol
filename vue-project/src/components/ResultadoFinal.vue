<template>
  <Transition name="fade">
    <div class="overlay" v-if="visible">
      <div class="resultado-card" :class="victoria ? 'victoria' : 'derrota'">

        <!-- Victoria -->
        <template v-if="victoria">
          <div class="emoji">🏆</div>
          <h2>¡Victoria!</h2>
          <p>Adivinaste al futbolista antes de ver la tarjeta roja.</p>
          <div class="palabra-reveal">{{ palabra }}</div>
        </template>

        <!-- Derrota -->
        <template v-else>
          <div class="emoji">🟥</div>
          <h2>¡Expulsado!</h2>
          <p>El árbitro te ha mostrado la tarjeta roja. El futbolista era:</p>
          <div class="palabra-reveal">{{ palabra }}</div>

          <!-- Bocadillo gracioso -->
          <div class="bocadillo">
            <div class="bocadillo-texto">
              ⚽ ¡Penalti para el Real Madrid!
            </div>
            <div class="bocadillo-cola"></div>
            <div class="arbitro-mini">🧑‍⚖️</div>
          </div>

        </template>

        <!-- Pista usada -->
        <div class="pista-usada" v-if="pistaUsada">
          💡 Usaste la pista
        </div>

        <!-- Botones -->
        <div class="botones">
          <button class="btn-nueva" @click="$emit('nueva-partida')">
            Nuevo partido ↺
          </button>
          <button class="btn-liga" @click="$emit('cambiar-liga')">
            Cambiar liga 🌍
          </button>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  victoria: {
    type: Boolean,
    default: false
  },
  palabra: {
    type: String,
    default: ''
  },
  pistaUsada: {
    type: Boolean,
    default: false
  }
})

defineEmits(['nueva-partida', 'cambiar-liga'])
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.resultado-card {
  background: #062106;
  border-radius: 16px;
  padding: 32px 28px;
  text-align: center;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.resultado-card.victoria {
  border: 2px solid #4caf50;
}

.resultado-card.derrota {
  border: 2px solid #e53935;
}

.emoji {
  font-size: 48px;
}

h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 36px;
  letter-spacing: 2px;
}

.victoria h2 { color: #f9f871; }
.derrota h2  { color: #e53935; }

p {
  font-size: 13px;
  color: #a8f0a8;
  line-height: 1.5;
}

.palabra-reveal {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 28px;
  letter-spacing: 3px;
  color: white;
  background: rgba(255, 255, 255, 0.08);
  padding: 8px 20px;
  border-radius: 6px;
}

/* Bocadillo gracioso */
.bocadillo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
}

.bocadillo-texto {
  background: white;
  color: #333;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 16px;
  position: relative;
  animation: balanceo 1s ease-in-out infinite alternate;
}

.bocadillo-cola {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 10px solid white;
}

.arbitro-mini {
  font-size: 28px;
}

/* Pista usada */
.pista-usada {
  font-size: 11px;
  color: #888;
  font-style: italic;
}

/* Botones */
.botones {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 4px;
}

.btn-nueva {
  background: #2d9e2d;
  border: none;
  color: white;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 18px;
  letter-spacing: 1px;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-nueva:hover { background: #4caf50; }

.btn-liga {
  background: transparent;
  border: 1px solid #1a6b1a;
  color: #a8f0a8;
  font-size: 13px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-liga:hover { background: #1a6b1a; }

/* Animaciones */
@keyframes balanceo {
  from { transform: rotate(-2deg); }
  to   { transform: rotate(2deg);  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>