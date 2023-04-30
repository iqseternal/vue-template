
import { type RouteRecordRaw } from 'vue-router';

import { RECEPTION_NAME, RECEPTION_PATH, RECEPTION_LAYOUT } from '@router/constant';

export const staticReceptionModule: RouteRecordRaw[] = [{
  name: RECEPTION_NAME,
  path: RECEPTION_PATH,
  component: RECEPTION_LAYOUT,
  children: [
    {
      name: 'receptionHome',
      path: 'home',
      component: () => import('@views/reception/home/index.vue')
    }
  ],
  redirect: RECEPTION_PATH + '/home'
}];
