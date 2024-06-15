import * as echarts from "echarts";
import "echarts-gl";
import ElementUI from "element-ui";
import Vue from "vue";
import VueAnimateNumber from "vue-animate-number";
import BaiduMap from "vue-baidu-map";
import vuescroll from "vuescroll";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/index";
// import vueSeamlessScroll from 'vue-seamless-scroll'

import "@/assets/css/theme/index.scss"; //element
import "./assets/icons"; // icon
import "./router/index";

// 高德地图配置
import VueAMap from "vue-amap";

// scorll
Vue.prototype.$echarts = echarts;
// Vue.prototype.$echartsGL = echartsGL;
// import * as maps from '@/assets/map/index'

// console.log(maps)
// Vue.use(vueSeamlessScroll)
Vue.use(VueAnimateNumber);

Vue.use(BaiduMap, {
  ak: "yM7IUbMIzcPoqRXUsi3h6m9kreZR794W",
});
// scorll
Vue.use(vuescroll, {
  ops: {
    bar: {
      background: "#3080fb",
      opacity: 0.6,
    },
  },
  name: "scroll",
});

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  // 初始化插件
  key: "f6a1378fb443b15cf74b3bf77eebbba5", // 高德key
  plugin: [
    "AMap.Geocoder",
    "AMap.PlaceSearch",
    "AMap.Geolocation",
    "AMap.CitySearch",
    "AMap.MarkerClusterer",
  ], // 插件集合，根据自己的需求添加
  uiVersion: "1.0.11", // 不加会报错，加上吧
  v: "1.4.15", // 默认高德 sdk 版本为 1.4.4
});
// 申请的Web端（JS API）的需要写上下面这段话
window._AMapSecurityConfig = {
  securityJsCode: "a4edfd173cf9cc2d2afe151b3a25b5a2 ", // 高德Web端安全密钥
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
