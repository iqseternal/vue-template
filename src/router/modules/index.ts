import { RouteRecordRaw } from 'vue-router';

import {
  rootRoute, errorRoute,
  receptionFailedRoute, boardFailedRoute,
  notFoundRoute, refuseRoute
} from '@router/modules/basic';

import { staticReceptionModule } from './reception';
export { asyncReceptionModule } from './reception';

import { staticBashboardModule } from './dashboard';
export { asyncDashboardModule } from './dashboard';

export const routes: Array<RouteRecordRaw> = [
  /** 404路由和403路由 */
  rootRoute, notFoundRoute, refuseRoute,

  /** 前台和后台的分别路由设置 */
  /** 前台或者后台路由加载出错进入的路由 */
  ...staticBashboardModule,
  ...staticReceptionModule,

  receptionFailedRoute, boardFailedRoute,
  /** 根路由和404重定向到根路由 */
  errorRoute,
];

export default routes;
