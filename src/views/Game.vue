<template>
  <div class="game-page" v-if="game">
    <header class="game-header">
      <router-link :to="`/${user}/games`" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        <span>Games</span>
      </router-link>
      <div class="game-meta">
        <span class="game-icon" :style="{ background: `color-mix(in srgb, ${game.accent} 15%, transparent)` }">{{ game.icon }}</span>
        <span class="game-name">{{ game.title }}</span>
      </div>
    </header>
    <div class="game-frame">
      <iframe
        :src="gamePath"
        frameborder="0"
        class="game-iframe"
        allow="autoplay"
      ></iframe>
    </div>
  </div>
  <div v-else class="not-found">
    <p>Game not found.</p>
    <router-link :to="`/${user}/games`">Go back</router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getGamesForUser } from '../games'

const props = defineProps<{ user: string; gameId: string }>()

const game = computed(() =>
  getGamesForUser(props.user).find(g => g.id === props.gameId)
)

// Game files are stored in /games/{gameId}.html (shared across users)
// Or /games/{user}/{gameId}.html for user-specific versions
const gamePath = computed(() => `/games/${props.gameId}.html`)
</script>

<style scoped>
.game-page {
  height: calc(100vh - 70px - env(safe-area-inset-bottom, 0px));
  height: calc(100dvh - 70px - env(safe-area-inset-bottom, 0px));
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.game-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 20px;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  min-height: 52px;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-mid);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s;
  min-height: 40px;
}

.back-link:active {
  background: var(--bg-card-hover);
  transform: scale(0.95);
}

.back-link:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-hover);
  color: var(--text);
}

.game-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.game-icon {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.game-name {
  font-size: 1rem;
  font-weight: 700;
}

.game-frame {
  flex: 1;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
}

.game-iframe {
  width: 100%;
  height: 100%;
  border: none;
  background: #1a1a2e;
}

.not-found {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-mid);
}

.not-found a {
  color: var(--accent-blue);
}

/* iPad Mini / tablets */
@media (min-width: 700px) and (max-width: 1024px) {
  .game-header {
    padding: 12px 28px;
    min-height: 56px;
  }
  .back-link {
    padding: 10px 18px;
    min-height: 44px;
    font-size: 0.9rem;
  }
  .game-icon {
    width: 38px;
    height: 38px;
    font-size: 1.2rem;
  }
  .game-name {
    font-size: 1.05rem;
  }
}
</style>
