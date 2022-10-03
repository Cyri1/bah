import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import PreferencesPage from '../views/PreferencesPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    beforeEnter: () => {
      window.screen.orientation.lock("landscape");
      return true
    },
  },
  {
    path: '/preferences',
    redirect: '/preferences/tab1',
    beforeEnter: () => {
      window.screen.orientation.lock("portrait");
      return true
    },
  },
  {
    path: '/preferences/',
    component: PreferencesPage,
    children: [
      {
        path: '',
        redirect: 'tab1',
      },
      {
        path: 'tab1',
        component: () => import('../views/PrefTab1.vue'),
      },
      {
        path: 'tab2',
        component: () => import('../views/PrefTab2.vue'),
      },
      {
        path: 'tab3',
        component: () => import('../views/PrefTab3.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router