import { defaultHttp } from './index'
import { router } from '../router'
import { PageEnum } from '../enums/pageEnum'
import { useStore } from 'vuex'
enum Api {
  Login = '/userlogin',
  phoneLogin = '/sys/phoneLogin',
  Logout = '/sys/logout',
  GetUserInfo = '/getUserInfo',
  // 获取系统权限
  // 1、查询用户拥有的按钮/表单访问权限
  // 2、所有权限
  // 3、系统安全模式
  GetPermCode = '/sys/permission/getPermCode',
  // 新加的获取图形验证码的接口
  getInputCode = '/sys/randomImage',
  // 获取短信验证码的接口
  getCaptcha = '/sys/sms',
  // 注册接口
  registerApi = '/sys/user/register',
  // 校验用户接口
  checkOnlyUser = '/sys/user/checkOnlyUser',
  // SSO登录校验
  validateCasLogin = '/sys/cas/client/validateLogin',
  // 校验手机号
  phoneVerify = '/sys/user/phoneVerification',
  // 修改密码
  passwordChange = '/sys/user/passwordChange',
  // 第三方登录
  thirdLogin = '/sys/thirdLogin/getLoginUser',
  // 第三方登录
  getThirdCaptcha = '/sys/thirdSms',
  // 获取二维码信息
  getLoginQrcode = '/sys/getLoginQrcode',
  // 监控二维码扫描状态
  getQrcodeToken = '/sys/getQrcodeToken'
}
export function loginApi(params) {
  return defaultHttp(Api.Login, params)
}
export function getUserInfo() {
  return defaultHttp(Api.GetUserInfo, null, 'get').catch((e) => {
    const store = useStore()
    console.log(store)
    if (e && (e.message.includes('timeout') || e.message.includes('401'))) {
      const store = useStore()
      console.log(store)

      // store.setToken('')
      // setAuthCache(TOKEN_KEY, null)
      router.push(PageEnum.BASE_LOGIN)
    }
  })
}
