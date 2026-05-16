<template>
  <div class="selector-container">

    <!-- Header -->
    <div class="header">
      <h1 class="titulo">⚽ Tarjeta Roja</h1>
      <p class="subtitulo">Adivina el futbolista antes de ser expulsado</p>
    </div>

    <!-- Ligas -->
    <div class="ligas-grid">
      <button
        v-for="liga in ligas"
        :key="liga.id"
        class="liga-card"
        @click="$emit('seleccionar-liga', liga.id)">
        <span class="liga-bandera">{{ liga.bandera }}</span>
        <span class="liga-nombre">{{ liga.nombre }}</span>
        <span class="liga-jugadores">{{ liga.jugadores }} jugadores</span>
      </button>
    </div>

    <!-- Instrucciones -->
    <div class="instrucciones">
      <h3>¿Cómo se juega?</h3>
      <ul>
        <li>🟢 Elige tu liga favorita</li>
        <li>🔤 Adivina el futbolista letra a letra</li>
        <li>💡 Usa la pista si te atascas</li>
        <li>🟥 5 fallos y eres expulsado</li>
      </ul>
    </div>

  </div>
</template>

<script setup>
import jugadoresData from '../data/jugadores.json'

defineEmits(['seleccionar-liga'])

const todasLasLigas = [
  { id: 'laliga',     nombre: 'LaLiga',          bandera: '🇪🇸' },
  { id: 'premier',    nombre: 'Premier League',   bandera: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'seriea',     nombre: 'Serie A',          bandera: '🇮🇹' },
  { id: 'bundesliga', nombre: 'Bundesliga',       bandera: '🇩🇪' },
  { id: 'ligue1',     nombre: 'Ligue 1',          bandera: '🇫🇷' },
]

const ligas = todasLasLigas.map(liga => ({
  ...liga,
  jugadores: jugadoresData.palabras.filter(j => j.liga === liga.id).length
}))
</script>

<style scoped>
.selector-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  min-height: 100vh;
}

/* Header */
.header {
  text-align: center;
}

.titulo {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 48px;
  letter-spacing: 4px;
  color: #f9f871;
}

.subtitulo {
  font-size: 15px;
  color: #a8f0a8;
  margin-top: 6px;
}

/* Ligas */
.ligas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  width: 100%;
  max-width: 700px;
}

.liga-card {
  background: #062106;
  border: 1px solid #1a6b1a;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.liga-card:hover {
  background: #1a6b1a;
  border-color: #4caf50;
  transform: translateY(-2px);
}

.liga-bandera {
  font-size: 36px;
}

.liga-nombre {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 18px;
  letter-spacing: 1px;
  color: white;
}

.liga-jugadores {
  font-size: 11px;
  color: #a8f0a8;
}

/* Instrucciones */
.instrucciones {
  background: #062106;
  border: 1px solid #1a6b1a;
  border-radius: 10px;
  padding: 20px 28px;
  max-width: 400px;
  width: 100%;
}

.instrucciones h3 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 18px;
  letter-spacing: 1px;
  color: #f9f871;
  margin-bottom: 12px;
}

.instrucciones ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.instrucciones li {
  font-size: 13px;
  color: #a8f0a8;
  line-height: 1.5;
}
</style>