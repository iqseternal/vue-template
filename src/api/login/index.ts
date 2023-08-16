import { request, apiGet, apiPost } from "@utils/request";

export type LoginApiData = { username: string, password: string, code: string }
export function loginApi(data) {
  return apiPost('/user/login', { data })
}

/** 获取登录验证码 */
export function getLoginCodeApi(): any {
  return new Promise(resolve => {
    resolve({
      data: 'http://localhost:8900/src/assets/layout/logo-text-2.png'
    });
  })
}

/** 获取用户详情 */
export function getUserInfoApi() {
  return apiPost('/user/getUserinfo', {
    hConfig: {
      needAuth: true
    }
  })
}
