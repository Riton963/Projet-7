import { createRouter, createWebHistory } from 'vue-router';

import Login from '@/views/Login';
import Feed from '@/views/Feed';
import Profile from '@/views/Profile';
import UserProfile from '@/views/UserProfile';

import authGuard from '@/services/authGuard';

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
    beforeEnter: authGuard,
  },
  {
    name: 'profile',
    path: '/profile',
    component: Profile,
    beforeEnter: authGuard,
  },
  {
    name: 'userProfile',
    path: '/userProfile/:userId',
    component: UserProfile,
    beforeEnter: authGuard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
