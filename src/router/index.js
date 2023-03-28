import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../pages/dashboard.vue';
import Consotructor from '../pages/constructor.vue';
const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/constructor/:id?',
    name: 'constructor',
    component: Consotructor
  },
]
const router = createRouter({
  history: createWebHistory('/'),
  routes
})
export default router