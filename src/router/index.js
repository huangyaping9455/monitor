import Vue from "vue";
import router from "./router";

import vueWechatTitle from "vue-wechat-title";
Vue.use(vueWechatTitle);

router.beforeEach((to, from, next) => {
  // 标题设置
  if (to.meta.title) {
    // document.title = to.meta.title
    // document.title = "综合治理数字监管平台";
    document.title = "福清市道路运输车辆监测监管平台";
    // document.title = "宁东基地物流公共信息管理平台";
    // document.title = "宁东道路运输安全管理监测平台";
    // document.title = "贵州省道路货物运输车辆安全管理平台";//鹰驾
    // document.title = "柳州市交通运输卫星定位政府监管平台"; //柳州
  }
  // 登录拦截
  let userinfo = sessionStorage.getItem("userinfo");
  if (to.meta.requiresAuth) {
    if (!userinfo) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      if (!JSON.parse(userinfo).accessToken) {
        next({
          path: "/login",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    }
  } else {
    next();
  }
});
