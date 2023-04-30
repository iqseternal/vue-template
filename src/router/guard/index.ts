import store from '@/store';

import { Router } from 'vue-router';
import { ElMessage } from 'element-plus';

import {
  RECEPTION_PATH,
  DASHBOARD_PATH, DASHBOARD_LOGIN_PATH
} from '@router/constant';

import { splitRoutePath } from '../utils';

import { dashboardGuard, dashboardAfterGuard } from './dashboardGuard';
import { receptionGuard } from './receptionGuard';

export default function asyncGuard(router: Router): Router {
  router.beforeEach((to, from, next) => {
    /** 进入的模块 */
    const modulePath = splitRoutePath(to.path);

    if (to.path === DASHBOARD_LOGIN_PATH || modulePath === DASHBOARD_PATH) {
      dashboardGuard(router, to, from, next);
      return;
    }

    if (modulePath === RECEPTION_PATH) {
      receptionGuard(router, to, from, next);
      return;
    }

    // 跳转到了其他的路由, 在此可以设置代理网站的重定向
    // 暂定所有都通过
    next()
    return
  });

  /** 做页面恢复 */
  router.afterEach((to, from) => {
    dashboardAfterGuard(to, from);
  });

  return router;
}



