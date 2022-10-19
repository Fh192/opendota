import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/teams',
    name: 'teams-page',
    component: () => import('@/views/TeamsPage.vue'),
  },
  {
    path: '/teams/:teamId/matches',
    name: 'team-matches-page',
    component: () => import('@/views/MatchesPage.vue'),
  },
  {
    path: '/matches',
    name: 'matches-page',
    component: () => import('@/views/MatchesPage.vue'),
  },
  {
    path: '/matches/:id',
    name: 'match-details',
    component: () => import('@/views/MatchDetailsPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/teams',
  },
];

const router = createRouter({
  history: createWebHistory('/opendota/'),
  routes,
});

export default router;
