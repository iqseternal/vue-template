import { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router';
import { ElMessage } from 'element-plus';
import { DASHBOARD_LOGIN_PATH, DASHBOARD_NAME, DASHBOARD_PATH, PAGE_REFUSE_PATH } from '@router/constant';

import { useUserStoreHook } from "@/store/modules/user";

import { splitRoutePath, asyncGetInfoAndDynamicRoutes } from '../utils';
import { getToken } from '@utils/storage';
import { whiteList } from "@/config/white-list";

import { isString } from '@suey/packages';

import { seGet, seSet, seRemove } from '@utils/storage';

/** 制作页面恢复, 当用户在后台模块的时候, 保持刷新页面时能够正确重定向到之前打开过的页面 */
const keepLivePathKey = 'dashboard-keep-live-path';

/**
 * 返回当前路径是否是 Dashboard 的
 * @param path
 * @returns
 */
export function isDashboardPath(path: string): boolean {
  /** 进入的模块 */
  const modulePath = splitRoutePath(path);

  if (path === DASHBOARD_LOGIN_PATH || modulePath === DASHBOARD_PATH) return true;

  return false;
}


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
  const prePath = seGet(keepLivePathKey) as (string | undefined);

  const hasToken = isString(getToken());
  const hasRoles = userStore.roles.length !== 0;

  // 刷新或者重新登录
  if (path === DASHBOARD_LOGIN_PATH) {
    if (hasToken) {
      asyncGetInfoAndDynamicRoutes(router).then(() => {
        next({ path: prePath ? prePath : DASHBOARD_PATH, replace: true });
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

    // 重新登录一次, 不知名原因 router 掉了，虽然这个语句不写好像也没有问题，但写上是保险的，自动重新登录
    asyncGetInfoAndDynamicRoutes(router).then(() => {
      next(DASHBOARD_PATH);
    }).catch(() => next({ path: PAGE_REFUSE_PATH, replace: true }));
    return;
  }

  next({ path: PAGE_REFUSE_PATH, replace: false });

  return;
}

export function dashboardAfterGuard(to: RouteLocationNormalized, from:RouteLocationNormalized) {
  const modulePath = splitRoutePath(to.fullPath);

  if (modulePath === DASHBOARD_PATH) {
    seSet(keepLivePathKey, to.fullPath);
  }
}
