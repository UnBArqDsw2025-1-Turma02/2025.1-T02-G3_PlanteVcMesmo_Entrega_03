import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import HomeView from '../views/HomeView.vue';

const appLayoutRoutes: RouteRecordRaw[] = [
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/shopping',
    name: 'shopping',
    component: () => import('../views/ShoppingView.vue'),
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/NewsView.vue'),
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('../views/ProductView.vue'),
  }
];

appLayoutRoutes.forEach(route => {
  route.meta = { ...(route.meta || {}), layout: 'app' };
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        layout: 'empty',
      }
    },
    ...appLayoutRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: {
        layout: 'empty',
      }
    }
  ],
});

export default router;
