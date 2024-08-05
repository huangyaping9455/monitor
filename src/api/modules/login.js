import { $axios, awaitWrap } from "../api";
/** 登录模块 */
export default {
  // 获取验证码
  getcode() {
    return $axios.get("/blade-auth/auth/getVerificationCode");
  },
  // 登录授权
  ZFtoken(data) {
    return $axios.post("/blade-auth/auth/ZFSignIn", data);
  },
  // 退出登录
  logout() {
    return $axios.get("/blade-auth/auth/signOut");
  },
  awaitWrap,
};
