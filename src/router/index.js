import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChessPage from '../views/ChessPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
		name: 'chess',
      component: ChessPage
    },
    {
      path: '/chess',
      name: 'home',
      component: HomeView
    },
  ]
})

export default router
