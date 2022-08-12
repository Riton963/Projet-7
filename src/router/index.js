import { createRouter, createWebHistory } from 'vue-router';

import Login from '@/views/Login';
import Feed from '@/views/Feed';

const routes = [
  {
    name: 'login',
    path: '/',
    component: Login,
  },
  {
    name: 'feed',
    path: '/feed',
    component: Feed,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
