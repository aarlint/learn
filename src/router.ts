import { createRouter, createWebHistory } from 'vue-router'
import SelectUser from './views/SelectUser.vue'
import Dashboard from './views/Dashboard.vue'
import Lesson from './views/Lesson.vue'
import Games from './views/Games.vue'
import Game from './views/Game.vue'

const routes = [
  { path: '/', component: SelectUser },
  { path: '/:user', component: Dashboard, props: true },
  { path: '/:user/:grade', component: Dashboard, props: true },
  { path: '/:user/:grade/lesson/:lessonId', component: Lesson, props: true },
  // Legacy route support (without grade in URL)
  { path: '/:user/lesson/:lessonId', redirect: to => `/${to.params.user}/3/lesson/${to.params.lessonId}` },
  // Games
  { path: '/:user/games', component: Games, props: true },
  { path: '/:user/game/:gameId', component: Game, props: true },
]

export default createRouter({ history: createWebHistory(), routes })
