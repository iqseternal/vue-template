import { RouteRecordRaw } from 'vue-router';

export const userModule: RouteRecordRaw[] = [
  {
    name: 'dashboardHomePage',
    path: 'home',
    component: () => import('@views/dashboard/home/index.vue'),
    meta: {
      title: '首页',
      svgIcon: 'dashboard',
      affix: false,
      breadcrumb: true
    }
  },
  {
    name: 'dashboardAboutPage',
    path: 'about',
    component: () => import(`@views/dashboard/about/index.vue`),
    meta: {
      title: '关于',
      svgIcon: 'dashboard',
      affix: false,
      breadcrumb: true
    }
  }
];


