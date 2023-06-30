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
    redirect: '/preferences/download',
  },
  {
    path: '/preferences/',
    component: PreferencesPage,
    beforeEnter: () => {
      window.screen.orientation.lock("portrait");
      return true
    },
    children: [
      {
        path: '',
        redirect: 'download',
      },
      {
        path: 'download',
        component: () => import('../views/PrefDownload.vue'),
      },
      {
        path: 'mystories',
        component: () => import('../views/PrefMyStories.vue'),
      },
      {
        path: 'sleepmode',
        component: () => import('../views/PrefSleepMode.vue'),
      },
      {
        path: 'settings',
        component: () => import('../views/PrefSettings.vue'),
      },
      {
        path: 'help',
        component: () => import('../views/PrefHelp.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router