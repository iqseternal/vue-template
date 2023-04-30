import { createRouter, createWebHistory } from 'vue-router';

import asyncGuard from './guard';
import routes from './modules';

const router = asyncGuard(createRouter({
  history: createWebHistory(),
  routes,
  strict: true
}));

export function resetRouter() { /** 重置路由 */
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route;
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name);
      }
    })
  } catch (error) { window.location.reload();  }
}

export default router;


