import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/data-record-page',
        component: () => import('pages/DataRecordPage.vue'),
      },
      {
        path: '/maintain-page',
        component: () => import('pages/MaintainPage.vue'),
      },
      {
        path: '/energy-page',
        component: () => import('pages/EnergyPage.vue'),
      },
      {
        path: '/routine-check-page',
        component: () => import('pages/RoutineCheckPage.vue'),
      },
      {
        path: '/notify',
        component: () => import('pages/NotifyPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
