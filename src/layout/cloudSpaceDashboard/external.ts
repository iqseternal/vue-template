/**
 * **********************************************
 * board-layout 所需要提供引入项目的额外依赖。引入后即可正常工作。
 * **********************************************
*/

/** 控制板的登录路径, 用户退出之后就会自动跳转到这个路由, /dosLogin */
export { DASHBOARD_LOGIN_PATH } from '@router/constant';

/**
 * 依赖名称 -- 依赖解释 -- 使用此依赖的位置
 * 
 * element-plus
 * @element-plus/icons-vue
 * path-browserify
 * path-to-regexp
 *
 * @/utils/validate, 其中包含 isExternal, /component/SideBar/SideBarItemLink.vue
 *                                       /component/SideBar/SideBarItem.vue
 *
 *
 * @components/Notify/index.vue, 页面上展示效果为通知, 总共有三栏。组件位置在 /components/NavigationBar/index.vue
 * @components/Screenfull/index.vue, 全屏展示功能。组件位置在 /component/TagsView/ScrollPane.vue
 *
 * @store/modules/user 需要配置别名路径, 访问 store, pinia::: { useUserStore },
 *    使用到的属性与方法:   username: string  访问用户名称
 *                        logout: () => void 注销登录
 *                        routes: RouteRecordRaw[] 当前用户过滤之后的动态路由
 */

export enum DEFINE_DASHBOARD_PROVIDER {
  APP_STORE = '__define_dashboard_provider__:app_store',

  SETTING_STORE = '__define_dashboard_provider__:setting_store',

  TAGS_VIEW = '__define_dashboard_provider__:tags_view'
};

/** Layout 布局响应式 */
/** 参考 Bootstrap 的响应式设计 WIDTH = 992 */
export const WIDTH = 992;
