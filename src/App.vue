<template>
  <div class="app-wrapper">
    <router-view />
    
    <!-- Bottom Navigation -->
    <nav class="bottom-nav" v-if="showNav">
      <router-link to="/" class="nav-item" :class="{ active: route.path === '/' }">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span class="nav-label">Home</span>
      </router-link>
      
      <router-link :to="userPath" class="nav-item" :class="{ active: isOnDashboard }">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
        </svg>
        <span class="nav-label">Lessons</span>
      </router-link>
      
      <router-link :to="gamesPath" class="nav-item" :class="{ active: isOnGames }">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="6" y="11" width="12" height="8" rx="2"/>
          <circle cx="9" cy="15" r="1"/>
          <path d="M14 14h2"/>
          <path d="M15 13v2"/>
          <path d="M6 11V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"/>
        </svg>
        <span class="nav-label">Games</span>
      </router-link>
      
      <a href="#" class="nav-item" @click.prevent="showHelp = true">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <path d="M12 17h.01"/>
        </svg>
        <span class="nav-label">Help</span>
      </a>
    </nav>
    
    <!-- Help Modal -->
    <div class="modal-overlay" v-if="showHelp" @click="showHelp = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">Help</h2>
          <button class="modal-close" @click="showHelp = false">×</button>
        </div>
        <div class="modal-body">
          <p>Welcome to Learn! This app helps kids practice their lessons.</p>
          <p style="margin-top: 12px;"><strong>How to use:</strong></p>
          <ul style="margin-top: 8px; margin-left: 20px; color: var(--text-mid);">
            <li>Select your profile from the home screen</li>
            <li>Choose a lesson to start learning</li>
            <li>Complete the activities in each lesson</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showHelp = ref(false)

const currentUser = computed(() => {
  const params = route.params
  if (params.user) return params.user as string
  return null
})

const currentGrade = computed(() => {
  const params = route.params
  if (params.grade) return params.grade as string
  return null
})

const userPath = computed(() => {
  if (currentUser.value && currentGrade.value) {
    return `/${currentUser.value}/${currentGrade.value}`
  }
  return currentUser.value ? `/${currentUser.value}` : '/'
})

const gamesPath = computed(() => {
  return currentUser.value ? `/${currentUser.value}/games` : '/'
})

const showNav = computed(() => {
  // Show nav on dashboard and lesson pages, not on user select
  return route.path !== '/'
})

const isOnDashboard = computed(() => {
  return currentUser.value && !route.params.lessonId && !route.path.includes('/game')
})

const isOnGames = computed(() => {
  return route.path.includes('/games') || route.params.gameId
})
</script>

<style>
:root {
  --bg: #08090c;
  --bg-card: #0f1117;
  --bg-card-hover: #161922;
  --border: #1a1d28;
  --border-hover: #2a2f3e;
  --text: #e8eaf0;
  --text-mid: #6b7084;
  --text-dim: #3d4155;
  --accent-blue: #3fc1f0;
  --accent-purple: #a48bdb;
  --accent-green: #22c55e;
  --accent-red: #ef4444;
  --accent-amber: #e5a00d;
  --accent-pink: #ec4899;
  --accent-orange: #fb923c;
  --accent-cyan: #14b8a6;
  --radius: 12px;
  --radius-sm: 8px;
  --shadow: 0 8px 30px rgba(0,0,0,0.3);
  --safe-bottom: env(safe-area-inset-bottom, 0px);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Outfit', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  min-height: 100dvh;
  overflow-x: hidden;
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: 100%;
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    radial-gradient(circle at 15% 20%, rgba(164,139,219,0.07) 0%, transparent 50%),
    radial-gradient(circle at 85% 80%, rgba(63,193,240,0.07) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: radial-gradient(circle, #2a2f3e 0.5px, transparent 0.5px);
  background-size: 28px 28px;
  opacity: 0.12;
  pointer-events: none;
  z-index: 0;
}

#app {
  position: relative;
  z-index: 1;
  padding-top: env(safe-area-inset-top);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

.app-wrapper {
  min-height: 100vh;
  min-height: 100dvh;
  padding-bottom: calc(70px + var(--safe-bottom));
}

/* Bottom Navigation */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-card);
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 16px;
  padding-bottom: calc(8px + var(--safe-bottom));
  z-index: 100;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 20px;
  border-radius: 12px;
  text-decoration: none;
  color: var(--text-dim);
  transition: all 0.2s;
  cursor: pointer;
  background: none;
  border: none;
  font-family: inherit;
}

.nav-item:hover {
  color: var(--text-mid);
  background: var(--bg-card-hover);
}

.nav-item.active {
  color: var(--accent-blue);
}

.nav-item.active .nav-icon {
  stroke: var(--accent-blue);
}

.nav-icon {
  width: 22px;
  height: 22px;
  stroke: currentColor;
}

.nav-label {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.modal-content {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-width: 500px;
  padding: 24px;
  padding-bottom: calc(24px + var(--safe-bottom));
  animation: slideUp 0.2s ease-out;
}

@keyframes slideUp {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.modal-title {
  font-size: 1.2rem;
  font-weight: 700;
}

.modal-close {
  background: none;
  border: none;
  color: var(--text-dim);
  font-size: 1.8rem;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
}

.modal-close:hover {
  color: var(--text);
}

.modal-body {
  font-size: 0.95rem;
  color: var(--text-mid);
  line-height: 1.6;
}

/* Desktop */
@media (min-width: 768px) {
  .modal-overlay {
    align-items: center;
  }
  .modal-content {
    border-radius: 20px;
    max-width: 450px;
  }
}
</style>
