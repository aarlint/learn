<template>
  <div class="dashboard" v-if="profile">
    <header class="header">
      <router-link to="/" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
      </router-link>
      <div class="header-info">
        <span class="header-emoji">{{ profile.emoji }}</span>
        <div>
          <h1 class="header-name">{{ profile.name }}'s Lessons</h1>
          <span class="header-grade">{{ currentGradeLabel }}</span>
        </div>
      </div>
    </header>

    <!-- Grade Selector (only show if user has multiple grades) -->
    <div class="grade-selector" v-if="profile.grades.length > 1">
      <button
        v-for="grade in profile.grades"
        :key="grade.id"
        class="grade-btn"
        :class="{ active: selectedGrade === grade.id }"
        @click="selectGrade(grade.id)"
      >
        {{ grade.shortLabel }}
      </button>
    </div>

    <div class="lessons-grid">
      <router-link
        v-for="lesson in userLessons"
        :key="lesson.id"
        :to="`/${user}/${selectedGrade}/lesson/${lesson.id}`"
        class="lesson-card"
        :style="{ '--accent': lesson.accent }"
      >
        <div class="lesson-icon">{{ lesson.icon }}</div>
        <div class="lesson-body">
          <h2 class="lesson-title">{{ lesson.title }}</h2>
          <p class="lesson-desc">{{ lesson.description }}</p>
          <div class="lesson-tags">
            <span v-for="tag in lesson.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        <svg class="lesson-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </router-link>
    </div>

    <div v-if="userLessons.length === 0" class="empty-state">
      <p>No lessons available for this grade yet.</p>
    </div>
  </div>
  <div v-else class="not-found">
    <p>User not found.</p>
    <router-link to="/">Go back</router-link>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { users, getLessonsForGrade, getGradeLabel } from '../lessons'

const props = defineProps<{ user: string; grade?: string }>()

const profile = computed(() => users[props.user as keyof typeof users])

// Selected grade - default to prop or user's default
const selectedGrade = ref(props.grade || profile.value?.defaultGrade || '')

// Watch for route changes
watch(() => props.grade, (newGrade) => {
  if (newGrade) selectedGrade.value = newGrade
})

const currentGradeLabel = computed(() => {
  if (!profile.value) return ''
  return getGradeLabel(props.user, selectedGrade.value)
})

const userLessons = computed(() => {
  return getLessonsForGrade(props.user, selectedGrade.value)
})

function selectGrade(gradeId: string) {
  selectedGrade.value = gradeId
  // Update URL without full navigation
  history.replaceState(null, '', `/${props.user}/${gradeId}`)
}
</script>

<style scoped>
.dashboard {
  max-width: 720px;
  margin: 0 auto;
  padding: 20px 24px 20px;
}

.header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 0 20px;
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

.header-grade {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-mid);
}

/* Grade Selector */
.grade-selector {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  padding: 4px;
  background: var(--bg-card);
  border-radius: 14px;
  border: 1px solid var(--border);
}

.grade-btn {
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  background: transparent;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-mid);
  cursor: pointer;
  transition: all 0.2s;
}

.grade-btn:hover {
  background: var(--bg-card-hover);
  color: var(--text);
}

.grade-btn.active {
  background: var(--accent-purple);
  color: white;
  box-shadow: 0 4px 12px rgba(164, 139, 219, 0.35);
}

.lessons-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.lesson-card {
  display: flex;
  align-items: center;
  gap: 18px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 22px 26px;
  text-decoration: none;
  color: var(--text);
  transition: all 0.25s ease;
  min-height: 88px;
}

.lesson-card:active {
  transform: scale(0.98);
  background: var(--bg-card-hover);
  border-color: var(--accent);
}

.lesson-card:hover {
  background: var(--bg-card-hover);
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.25);
}

.lesson-icon {
  width: 54px;
  height: 54px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--accent) 15%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.lesson-body {
  flex: 1;
  min-width: 0;
}

.lesson-title {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.2;
}

.lesson-desc {
  font-size: 0.85rem;
  color: var(--text-mid);
  margin-top: 3px;
  line-height: 1.4;
}

.lesson-tags {
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

.lesson-arrow {
  color: var(--text-dim);
  flex-shrink: 0;
  transition: color 0.2s, transform 0.2s;
  width: 20px;
  height: 20px;
}

.lesson-card:hover .lesson-arrow,
.lesson-card:active .lesson-arrow {
  color: var(--accent);
  transform: translateX(3px);
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
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
  .dashboard {
    padding: 24px 40px 20px;
  }
  .header {
    padding: 28px 0 24px;
  }
  .grade-selector {
    max-width: 300px;
  }
  .lessons-grid {
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  .lesson-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    min-height: 160px;
    gap: 14px;
  }
  .lesson-icon {
    width: 56px;
    height: 56px;
    font-size: 1.6rem;
  }
  .lesson-title {
    font-size: 1.15rem;
  }
  .lesson-arrow {
    position: absolute;
    top: 24px;
    right: 24px;
  }
  .lesson-card {
    position: relative;
  }
}

@media (max-width: 480px) {
  .lesson-card {
    padding: 18px 20px;
    min-height: unset;
  }
  .lesson-icon {
    width: 44px;
    height: 44px;
    font-size: 1.3rem;
  }
}
</style>
