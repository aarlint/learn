<template>
  <div class="games-page" v-if="profile">
    <header class="header">
      <router-link to="/" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
      </router-link>
      <div class="header-info">
        <span class="header-emoji">🎮</span>
        <div>
          <h1 class="header-name">{{ profile.name }}'s Games</h1>
          <span class="header-subtitle">Learn while having fun!</span>
        </div>
      </div>
    </header>

    <div class="games-grid">
      <router-link
        v-for="game in userGames"
        :key="game.id"
        :to="`/${user}/game/${game.id}`"
        class="game-card"
        :style="{ '--accent': game.accent }"
      >
        <div class="game-icon">{{ game.icon }}</div>
        <div class="game-body">
          <h2 class="game-title">{{ game.title }}</h2>
          <p class="game-desc">{{ game.description }}</p>
          <div class="game-tags">
            <span v-for="tag in game.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        <div class="play-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </router-link>
    </div>

    <div v-if="userGames.length === 0" class="empty-state">
      <p>No games available yet. Check back soon!</p>
    </div>
  </div>
  <div v-else class="not-found">
    <p>User not found.</p>
    <router-link to="/">Go back</router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { users } from '../lessons'
import { getGamesForUser } from '../games'

const props = defineProps<{ user: string }>()

const profile = computed(() => users[props.user as keyof typeof users])
const userGames = computed(() => getGamesForUser(props.user))
</script>

<style scoped>
.games-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 20px 24px 20px;
}

.header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 0 28px;
}

.back-link {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-mid);
  text-decoration: none;
  transition: all 0.2s;
  flex-shrink: 0;
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

.header-info {
  display: flex;
  align-items: center;
  gap: 14px;
}

.header-emoji {
  font-size: 2.2rem;
}

.header-name {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.header-subtitle {
  font-size: 0.85rem;
  color: var(--text-mid);
}

.games-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

.game-card {
  display: flex;
  align-items: center;
  gap: 18px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 22px 26px;
  text-decoration: none;
  color: var(--text);
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.game-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--accent);
  opacity: 0;
  transition: opacity 0.25s;
}

.game-card:hover::before,
.game-card:active::before {
  opacity: 1;
}

.game-card:active {
  transform: scale(0.98);
  background: var(--bg-card-hover);
}

.game-card:hover {
  background: var(--bg-card-hover);
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.3);
}

.game-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  flex-shrink: 0;
}

.game-body {
  flex: 1;
  min-width: 0;
}

.game-title {
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.2;
}

.game-desc {
  font-size: 0.85rem;
  color: var(--text-mid);
  margin-top: 4px;
  line-height: 1.4;
}

.game-tags {
  display: flex;
  gap: 6px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 4px 10px;
  border-radius: 6px;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  color: var(--accent);
}

.play-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  transition: transform 0.2s, box-shadow 0.2s;
}

.game-card:hover .play-btn {
  transform: scale(1.1);
  box-shadow: 0 4px 15px color-mix(in srgb, var(--accent) 50%, transparent);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-mid);
  font-size: 0.95rem;
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
  .games-page {
    padding: 24px 40px 20px;
  }
  .games-grid {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .game-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    min-height: 180px;
    gap: 14px;
  }
  .game-icon {
    width: 64px;
    height: 64px;
    font-size: 2rem;
  }
  .play-btn {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
</style>
