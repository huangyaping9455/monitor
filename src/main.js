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

// scorll
Vue.prototype.$echarts = echarts;
// Vue.prototype.$echartsGL = echartsGL;
// import * as maps from '@/assets/map/index'

// console.log(maps)
// Vue.use(vueSeamlessScroll)
Vue.use(VueAnimateNumber);

Vue.use(BaiduMap, {
  ak: "yM7IUbMIzcPoqRXUsi3h6m9kreZR794W",
  // ak: "ciO4Q8GUu9JdjoSDf3LzOihdzZzXNwpj",
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

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
