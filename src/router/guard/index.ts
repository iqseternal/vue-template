import { Router } from 'vue-router';

import { isDashboardPath, dashboardGuard, dashboardAfterGuard } from './dashboardGuard';
import { isReceptionPath, receptionGuard } from './receptionGuard';

export default function asyncGuard(router: Router): Router {
  router.beforeEach((to, from, next) => {
    if (isDashboardPath(to.path)) {
      dashboardGuard(router, to, from, next);
      return;
    }

    if (isReceptionPath(to.path)) {
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

    if (isDashboardPath(to.path)) {
      dashboardAfterGuard(to, from);
    }

  });

  return router;
}



