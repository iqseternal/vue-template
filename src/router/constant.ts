import { Component } from 'vue';

/** 根路由 */
export const ROOT_NAME = 'root';
export const ROOT_PATH = '/';

/** 控制板的路由 */
export const DASHBOARD_NAME = 'dashboard';
export const DASHBOARD_PATH = '/dashboard';
export const DASHBOARD_LAYOUT = (): Component => import('@layout/cloudSpaceDashboard/index.vue');

export const DASHBOARD_LOGIN_NAME = 'dashboardLogin';
export const DASHBOARD_LOGIN_PATH = `/dosLogin`;

export const DASHBOARD_NOT_FOUND_NAME = 'dashboardNotFoundPage';
export const DASHBOARD_NOT_FOUND_PATH = DASHBOARD_LOGIN_PATH;

/** 前台路由根 */
export const RECEPTION_NAME = 'receptionRoute';
export const RECEPTION_PATH = '/reception';
export const RECEPTION_LAYOUT = (): Component => import('@layout/cloudSpaceReception/index.vue');

export const RECEPTION_NOT_FOUND_NAME = 'receptionNotFoundPage';
export const RECEPTION_NOT_FOUND_PATH = RECEPTION_PATH;

/** 被导航检测为 error 的路由 */
export const PAGE_NOT_FOUND_NAME = 'pageNotFound';
export const PAGE_NOT_FOUND_PATH = '/404';
export const PAGE_NOT_FOUND_CPT = (): Component => import('@views/error-page/404.vue');

export const PAGE_REFUSE_NAME = 'pageRefuse';
export const PAGE_REFUSE_PATH = '/403';
export const PAGE_REFUSE_CPT = (): Component => import('@views/error-page/403.vue');
