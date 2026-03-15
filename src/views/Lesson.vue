<template>
  <div class="lesson-page" v-if="lesson">
    <header class="lesson-header">
      <router-link :to="`/${user}/${grade}`" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        <span>Back</span>
      </router-link>
      <div class="lesson-meta">
        <span class="lesson-icon" :style="{ background: `color-mix(in srgb, ${lesson.accent} 15%, transparent)` }">{{ lesson.icon }}</span>
        <span class="lesson-name">{{ lesson.title }}</span>
      </div>
    </header>
    <div class="lesson-frame">
      <iframe
        :src="lessonPath"
        frameborder="0"
        class="lesson-iframe"
        allow="autoplay"
      ></iframe>
    </div>
  </div>
  <div v-else class="not-found">
    <p>Lesson not found.</p>
    <router-link :to="`/${user}/${grade}`">Go back</router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getLessonsForGrade } from '../lessons'

const props = defineProps<{ user: string; grade: string; lessonId: string }>()

const lesson = computed(() =>
  getLessonsForGrade(props.user, props.grade).find(l => l.id === props.lessonId)
)

// Lesson files are stored in /lessons/{user}/{lessonId}.html
// 4th grade lessons are in /lessons/{user}/grade4/{lessonId}.html
const lessonPath = computed(() => {
  if (props.grade === '4') {
    return `/lessons/${props.user}/grade4/${props.lessonId}.html`
  }
  return `/lessons/${props.user}/${props.lessonId}.html`
})
</script>

<style scoped>
.lesson-page {
  height: calc(100vh - 70px - env(safe-area-inset-bottom, 0px));
  height: calc(100dvh - 70px - env(safe-area-inset-bottom, 0px));
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.lesson-header {
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

.lesson-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lesson-icon {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.lesson-name {
  font-size: 1rem;
  font-weight: 700;
}

.lesson-frame {
  flex: 1;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
}

.lesson-iframe {
  width: 100%;
  height: 100%;
  border: none;
  background: #FEFCF9;
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
  .lesson-header {
    padding: 12px 28px;
    min-height: 56px;
  }
  .back-link {
    padding: 10px 18px;
    min-height: 44px;
    font-size: 0.9rem;
  }
  .lesson-icon {
    width: 38px;
    height: 38px;
    font-size: 1.2rem;
  }
  .lesson-name {
    font-size: 1.05rem;
  }
}
</style>
