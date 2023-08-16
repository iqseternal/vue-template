import {
  DASHBOARD_NAME, DASHBOARD_PATH, DASHBOARD_LAYOUT,
  DASHBOARD_LOGIN_NAME, DASHBOARD_LOGIN_PATH
} from '@router/constant';
import { RouteRecordRaw } from 'vue-router';


import { loginModule, dashboardRegister } from './staticModule';

import { userModule } from './asyncModule';

export const staticBashboardModule: RouteRecordRaw[] = [
  dashboardRegister,

  loginModule
];

export const asyncDashboardModule: RouteRecordRaw = {
  path: DASHBOARD_PATH,
  name: DASHBOARD_NAME + 'ASYNC',
  component: DASHBOARD_LAYOUT,
  redirect: DASHBOARD_PATH + '/home',
  meta: {
    title: '控制板',
    svgIcon: 'dashboard',
    affix: true
  },
  children: [
    ...userModule
  ]
};


