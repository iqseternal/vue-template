import { ref, watchEffect } from "vue"


const DEFAULT_THEME_NAME = "normal"
type DefaultThemeNameType = typeof DEFAULT_THEME_NAME

/** 注册的主题名称, 其中 DefaultThemeNameType 是必填的 */
export type ThemeName = DefaultThemeNameType | "dark" | "dark-blue"

interface IThemeList {
  title: string
  name: ThemeName
}

const SYSTEM_NAME = `scoped`;

const SIDEBAR_STATUS = `${SYSTEM_NAME}-sidebar-status-key`;

const ACTIVE_THEME_NAME = `${SYSTEM_NAME}-active-theme-name-key`;

export const getSidebarStatus = () => localStorage.getItem(SIDEBAR_STATUS);

export const setSidebarStatus = (sidebarStatus: "opened" | "closed") => localStorage.setItem(SIDEBAR_STATUS, sidebarStatus);

export const getActiveThemeName = () => localStorage.getItem(ACTIVE_THEME_NAME) as ThemeName;

export const setActiveThemeName = (themeName: ThemeName) => localStorage.setItem(ACTIVE_THEME_NAME, themeName);

/** 主题列表 */
const themeList: IThemeList[] = [
  {
    title: "默认",
    name: DEFAULT_THEME_NAME
  },
  {
    title: "黑暗",
    name: "dark"
  },
  {
    title: "深蓝",
    name: "dark-blue"
  }
]

/** 正在应用的主题名称 */
const activeThemeName = ref<ThemeName>(getActiveThemeName() || DEFAULT_THEME_NAME)

const setTheme = (value: ThemeName) => {
  activeThemeName.value = value
}

/** 在 html 根元素上挂载 class */
const setHtmlClassName = (value: ThemeName) => {
  document.documentElement.className = value
}

const initTheme = () => {
  watchEffect(() => {
    const value = activeThemeName.value
    setHtmlClassName(value)
    setActiveThemeName(value)
  })
}

/** 主题 hook */
export function useTheme() {
  return { themeList, activeThemeName, initTheme, setTheme }
}
