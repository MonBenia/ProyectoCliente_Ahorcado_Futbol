# ⚽ Tarjeta Roja — Ahorcado Fútbol

Juego del ahorcado temático de fútbol desarrollado con Vue 3.
En lugar del muñeco clásico, el árbitro va sacando tarjetas
hasta llegar a la tarjeta roja y ser expulsado.

## 🎮 ¿Cómo se juega?

1. Elige tu liga favorita
2. Adivina el nombre del futbolista letra a letra
3. Tienes 5 intentos antes de ser expulsado
4. Puedes usar una pista opcional si te atascas
5. Verde (1-2 fallos) → Amarilla (3-4 fallos) → Roja (5 fallos)

## ⚽ Ligas disponibles

| Liga | Jugadores |
|------|-----------|
| 🇪🇸 LaLiga | 20 |
| 🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League | 15 |
| 🇮🇹 Serie A | 15 |
| 🇩🇪 Bundesliga | 10 |
| 🇫🇷 Ligue 1 | 10 |
| **Total** | **70** |

## 🚀 Funcionalidades

- ✅ Selector de liga — elige entre 5 ligas distintas
- ✅ Pista opcional — el jugador decide si usarla o no
- ✅ Sistema de tarjetas — verde → amarilla → roja
- ✅ Teclado con colores — según tipo de fallo
- ✅ Aleatorio sin repetición — no repite jugador hasta agotar todos
- ✅ Pantalla resultado — victoria o expulsión con animación

## 🛠️ Tecnologías

- **Vue 3** — Composition API
- **Vite** — Bundler
- **Vitest** — Tests unitarios
- **ESLint + Prettier** — Calidad de código
- **Firebase Hosting** — Despliegue
- **Jenkins** — CI/CD pipeline

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/MonBenia/ProyectoCliente_Ahorcado_Futbol.git

# Entrar en la carpeta
cd ProyectoCliente_Ahorcado_Futbol/vue-project

# Instalar dependencias
npm install

# Arrancar en desarrollo
npm run dev
```

## 🧪 Tests

```bash
npm run test
```

## 🏗️ Build

```bash
npm run build
```

## 🚀 Deploy

```bash
firebase deploy
```

## 📋 Organización del proyecto

El proyecto sigue un flujo profesional con:
- **Jira** — Gestión de tareas en 2 sprints
- **GitHub** — Control de versiones con ramas por tarea
- **Jenkins** — Pipeline CI/CD automático en push a main

### Flujo de trabajo