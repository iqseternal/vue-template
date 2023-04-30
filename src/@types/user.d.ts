interface __PermissionAndDescription {
  ['admin']: '';
  ['topAdmin']: '';
  ['king']: '';
  ['member']: '';
  ['public']: '';
}

declare type PublicRoute = 'public';

declare type PermissionType = keyof __PermissionAndDescription;

type BasicInfo = {
  /** 用户昵称 */
  nickname: string
  /** 用户id */
  userId: number
  /** 用户性别 */
  sex: '男' | '女'
  /** 年龄 */
  age: number
  /** 用户简介 */
  descriptor: string
  /** 用户所在地区 */
  address: string
  /** 用户账号名称 */
  username: string
  /** 头像地址 */
  headImg: string
}

type AuthenticationInfo = {
  /** 密保手机 */
  securityPhone: number | string
  /** 邮箱账号 */
  email: string
  /** 第三方账号 */
  thirdPartyAccount: any
  /** 真实姓名 */
  name: string
  /** 身份证号 */
  idCard: number | string
}

declare interface UserInfo {
  basicInfo: BasicInfo
  authenticationInfo: AuthenticationInfo
}
