import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { getToken, removeToken, setToken } from "@utils/storage"
import router, { resetRouter } from "@/router"
import { loginApi, getUserInfoApi } from "@/api/login"
import { type RouteRecordRaw } from "vue-router"

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "");
  const roles = ref<string[]>([]);
  const username = ref<string>("");
  const routes = ref<RouteRecordRaw[]>([]);

  /** 设置用户路由 */
  const setRoutes = (value: RouteRecordRaw[]) => { routes.value = value; };

  /** 设置角色数组 */
  const setRoles = (value: string[]) => { roles.value = value };

  /** 获取用户详情 */
  const getInfo = () => {
    return new Promise((resolve, reject) => {
      getUserInfoApi()
        .then((res) => {
          const data = res.data
          username.value = data.username
          roles.value = data.roles
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /** 登录 */
  const login = (loginData) => {
    return new Promise((resolve, reject) => {
      loginApi({
        username: loginData.username,
        password: loginData.password,
        code: loginData.code
      }).then((res) => {
        setToken(res.data.userinfo.token)
        token.value = res.data.token
        resolve(true)
      }).catch((error) => reject(error))
    })
  }

  /** 登出 */
  const logout = () => {
    removeToken()
    token.value = ""
    roles.value = []
    resetRouter()
  }

  /** 重置 Token */
  const resetToken = () => {
    removeToken()
    token.value = ""
    roles.value = []
  }

  return { routes, setRoutes, token, roles, username, setRoles, login, getInfo, logout, resetToken };
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
