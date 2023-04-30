import { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router';
import { ElMessage } from 'element-plus';
import { DASHBOARD_LOGIN_PATH, DASHBOARD_NAME, DASHBOARD_PATH } from '@router/constant';

import { useUserStoreHook } from "@/store/modules/user";

import { splitRoutePath, asyncGetInfoAndDynamicRoutes } from '../utils';
import { getToken } from '@utils/storage';
import { whiteList } from "@/config/white-list";

import { isString } from '@suey/packages';

import { seGet, seSet } from '@utils/storage';
import { seRemove } from '@/utils/storageBase';

// const keepLivePathKey = 'dashboard-keep-live-path';

/**
 * dashboard 全局路由守卫
 * @param router 守卫路由对象
 * @param to
 * @param from
 * @param next
 * @return void
 */
export function dashboardGuard(router: Router, to: RouteLocationNormalized, from:RouteLocationNormalized, next: NavigationGuardNext) {
  const userStore = useUserStoreHook();

  const path = to.fullPath;
  // const prePath = seGet(keepLivePathKey) as (string | undefined);

  const hasToken = isString(getToken());
  const hasRoles = userStore.roles.length !== 0;

  // 刷新或者重新登录
  if (path === DASHBOARD_LOGIN_PATH) {
    if (hasToken) {
      asyncGetInfoAndDynamicRoutes(router).then(() => {
        next({ path: DASHBOARD_PATH, replace: true });
      }).catch(() => next());
      return;
    }

    next();
    return;
  }

  if (hasToken) {
    if (hasRoles && router.hasRoute(DASHBOARD_NAME)) { // 权限完整
      ElMessage.info('访问成功');
      next();
      return;
    }

    // 重新登录一次, 不知名原因 router 掉了
    asyncGetInfoAndDynamicRoutes(router).then(() => {
      next(DASHBOARD_PATH);
    }).catch(() => next({ path: DASHBOARD_LOGIN_PATH, replace: true }));
    return;
  }

  next({ path: DASHBOARD_LOGIN_PATH, replace: true });
  return;
}

export function dashboardAfterGuard(to: RouteLocationNormalized, from:RouteLocationNormalized) {
  const modulePath = splitRoutePath(to.fullPath);

  if (modulePath === DASHBOARD_PATH) {
    // seSet(keepLivePathKey, to.fullPath);
  }
}
