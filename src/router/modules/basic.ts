import { RouteRecordRaw } from 'vue-router';
import {
  ROOT_NAME, ROOT_PATH, RECEPTION_PATH,

  DASHBOARD_PATH, DASHBOARD_LOGIN_PATH, DASHBOARD_NOT_FOUND_NAME,

  PAGE_NOT_FOUND_NAME, PAGE_NOT_FOUND_PATH, PAGE_NOT_FOUND_CPT,

  PAGE_REFUSE_NAME, PAGE_REFUSE_PATH, PAGE_REFUSE_CPT, RECEPTION_NOT_FOUND_NAME, RECEPTION_NOT_FOUND_PATH
} from '@router/constant';

/** 根路由 */
export const rootRoute: RouteRecordRaw = {
  name: ROOT_NAME,
  path: ROOT_PATH,
  redirect: RECEPTION_PATH
}

/** reception 未找到的路由 */
export const receptionFailedRoute: RouteRecordRaw = {
  name: RECEPTION_NOT_FOUND_NAME,
  path: `${RECEPTION_PATH}/:productName*`,
  redirect: PAGE_NOT_FOUND_PATH
}

/** board 未找到的路由 */
export const boardFailedRoute: RouteRecordRaw = {
  name: DASHBOARD_NOT_FOUND_NAME,
  path: `${DASHBOARD_PATH}/:productName*`,
  redirect: DASHBOARD_LOGIN_PATH
}

/** 404页面 */
export const notFoundRoute: RouteRecordRaw = {
  name: PAGE_NOT_FOUND_NAME,
  path: PAGE_NOT_FOUND_PATH,
  component: PAGE_NOT_FOUND_CPT
}

/** 403页面 */
export const refuseRoute: RouteRecordRaw = {
  name: PAGE_REFUSE_NAME,
  path: PAGE_REFUSE_PATH,
  component: PAGE_REFUSE_CPT
}

export const errorRoute: RouteRecordRaw = {
  path: '/:catchAll(.*)',
  name: 'error-all-redirect-to-root',
  redirect: ROOT_PATH,
}
