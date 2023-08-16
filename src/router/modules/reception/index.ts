import { RouteRecordRaw } from 'vue-router';

import { RECEPTION_NAME, RECEPTION_PATH, RECEPTION_LAYOUT } from '@router/constant';

import { dos } from './asyncModule';

export { staticReceptionModule } from './staticModule';

export const asyncReceptionModule: RouteRecordRaw = {
  name: RECEPTION_NAME + 'ASYNC',
  path: RECEPTION_PATH,
  component: RECEPTION_LAYOUT,
  children: [
    dos
  ]
}

