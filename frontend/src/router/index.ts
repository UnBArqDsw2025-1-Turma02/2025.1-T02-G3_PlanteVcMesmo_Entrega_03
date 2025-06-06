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
    path: '/product',
    name: 'product',
    component: () => import('../views/ProductView.vue'),
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('../views/CalendarView.vue'),
  },
  {
    path: '/post/:postId',
    name: 'post',
    component: () => import('../views/PostView.vue'),
  }

];

const protectedLayoutRoutes: RouteRecordRaw[] = [
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
  },
  {
    path: '/newpost',
    name: 'newpost',
    component: () => import('../views/NewPostView.vue'),
  }
];

const routes: {
  layoutRoutes: RouteRecordRaw[];
  layoutName: string;
}[] = [{
  layoutRoutes: appLayoutRoutes,
  layoutName: 'app'
},
{
  layoutRoutes: protectedLayoutRoutes,
  layoutName: 'protected'
}];

routes.forEach(({ layoutRoutes, layoutName }) =>
  layoutRoutes.forEach(route => {
    route.meta = { ...(route.meta || {}), layout: layoutName };
  }
));

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
    ...protectedLayoutRoutes,
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
