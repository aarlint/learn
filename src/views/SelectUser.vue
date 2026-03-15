<template>
  <div class="select-page">
    <div class="hero">
      <h1 class="title">Learn</h1>
      <p class="subtitle">Pick your profile to get started</p>
    </div>

    <div class="user-cards">
      <router-link
        v-for="(user, key) in users"
        :key="key"
        :to="`/${key}`"
        class="user-card"
        :style="{ '--accent': user.color }"
      >
        <div class="avatar">{{ user.emoji }}</div>
        <div class="user-info">
          <span class="user-name">{{ user.name }}</span>
          <span class="user-grade">{{ user.grade }}</span>
        </div>
        <svg class="arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { users } from '../lessons'
</script>

<style scoped>
.select-page {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  gap: 56px;
}

.hero {
  text-align: center;
}

.title {
  font-size: clamp(2.8rem, 6vw, 4rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #a48bdb 0%, #3fc1f0 50%, #22c55e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
}

.subtitle {
  font-size: 1.15rem;
  color: var(--text-mid);
  margin-top: 10px;
  font-weight: 400;
}

.user-cards {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 680px;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 24px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 28px 36px;
  min-width: 300px;
  flex: 1;
  text-decoration: none;
  color: var(--text);
  transition: all 0.25s ease;
  cursor: pointer;
  min-height: 100px;
}

.user-card:active {
  transform: scale(0.98);
  background: var(--bg-card-hover);
  border-color: var(--accent);
}

.user-card:hover {
  background: var(--bg-card-hover);
  border-color: var(--accent);
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.3);
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 18px;
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
  flex-shrink: 0;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.user-name {
  font-size: 1.5rem;
  font-weight: 700;
}

.user-grade {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-mid);
}

.arrow {
  margin-left: auto;
  color: var(--text-dim);
  transition: color 0.2s, transform 0.2s;
  width: 24px;
  height: 24px;
}

.user-card:hover .arrow,
.user-card:active .arrow {
  color: var(--accent);
  transform: translateX(4px);
}

/* iPad Mini portrait (744px) and similar tablets */
@media (min-width: 700px) and (max-width: 1024px) {
  .select-page {
    gap: 64px;
  }
  .user-cards {
    flex-direction: column;
    max-width: 480px;
  }
  .user-card {
    min-width: unset;
    padding: 32px 40px;
    min-height: 110px;
  }
  .avatar {
    width: 80px;
    height: 80px;
    font-size: 2.6rem;
  }
  .user-name {
    font-size: 1.6rem;
  }
}

@media (max-width: 640px) {
  .user-cards {
    flex-direction: column;
    width: 100%;
    max-width: 360px;
  }
  .user-card {
    min-width: unset;
    padding: 22px 26px;
  }
}
</style>
