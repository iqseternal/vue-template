/**
 * ***********************
 * 此文件为仅供 router 使用的公共函数
 * ***********************
 */

import type { RouteRecordRaw, Router } from 'vue-router';

import { useUserStoreHook } from '@/store/modules/user';

import { filterAsyncRoutes } from './permission';
import { asyncDashboardModule } from '@router/modules';

/**
 * /dashboard/index
 * 得到这个路由的根级路由，会在 constant 中存在找到
 * @param path {string} 目标的完整路由
 * @return {string} 这个路由的顶层路由
 */
export const splitRoutePath = (path: string): string => {
  const end = path.indexOf('/', 1);
  return path.substring(0, end === -1 ? path.length : end);
}

/**
 * 服务对象: dashboardGuard
 * 为路由的动态路做好准备, 为请求用户信息, 以及动态添加路由
 * @param {Router} router
 * @return {Promise<void>} 一个Promise对象
 */
export const asyncGetInfoAndDynamicRoutes = (router: Router): Promise<void> => {
  return new Promise((resolve, reject) => {
    const userStore = useUserStoreHook();

    userStore.getInfo().then(() => {
      const roles = userStore.roles;

      const dynamicRoutes = filterAsyncRoutes([asyncDashboardModule], roles);
      const routes: RouteRecordRaw[] = [];

      dynamicRoutes.forEach(route => {
        router.addRoute(route);

        if (route.children) {
          route.children.forEach(r => {
            r.path = route.path + '/' + r.path;
            routes.push(r);
          });
          return;
        }

        routes.push(route);
      });

      userStore.setRoutes(routes);

      resolve();
    }).catch(() => {
      userStore.resetToken();
      reject();
    });
  });
}
