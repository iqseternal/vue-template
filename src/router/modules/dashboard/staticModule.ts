import { RouteRecordRaw } from 'vue-router';

import {
  DASHBOARD_NAME, DASHBOARD_PATH, DASHBOARD_LAYOUT,
  DASHBOARD_LOGIN_PATH, DASHBOARD_LOGIN_NAME
} from '@router/constant';

export const dashboardRegister: RouteRecordRaw = {
  name: DASHBOARD_NAME,
  path: DASHBOARD_PATH,
  component: DASHBOARD_LAYOUT
};

export const loginModule: RouteRecordRaw = {
  name: DASHBOARD_LOGIN_NAME,
  path: DASHBOARD_LOGIN_PATH,
  component: () => import("@/views/dosLogin/index.vue")
};

