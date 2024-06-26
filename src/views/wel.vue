<template>
  <div class="wel-body">
    <span>加载中，请稍后···</span>
    <img src="@/assets/img/loading2.gif" alt="" />
  </div>
</template>

<script>
import Cookies from "js-cookie";
import loginApi from "@/api/modules/login";
import { mapMutations } from "vuex";
import { SET_USERINFO } from "@/store/mutation-types";
import { config } from "@/config/config.js";
export default {
  data() {
    return {
      redirect: "", //跳转页面
    };
  },
  mounted() {
    this.redirect = this.$route.query.redirect;
    let _this = this;
    let tk = this.GetParameter("token");
    if (!tk) {
      this.$message.warning("缺少自动登录参数，即将跳转至登录页手动登录");
      setTimeout(() => {
        window.location.href = "/";
      }, 5000);
    } else {
      // setTimeout(_this.login(), 5000);
    }
    console.log(JSON.parse(decodeURIComponent(escape(window.atob(this.GetParameter("token"))))));
  },
  methods: {
    async login() {
      let token = JSON.parse(decodeURIComponent(escape(window.atob(this.GetParameter("token")))));
      let formData = {
        // name: this.GetParameter("username"),
        // pass: this.GetParameter("password"),
        name: token.Username,
        pass: token.Password,
        code: "",
        type: 1,
      };
      let [err, data] = await loginApi.awaitWrap(
        loginApi.ZFtoken({
          name: formData.name,
          password: formData.pass,
          clientVerifyCode: config.aesEncrypt(formData.code),
          type: config.aesEncrypt(formData.type),
        })
      );
      if (data) {
        this.SET_USERINFO(data);
        this.SET_FASONGDANWEI(data.deptId);
        Cookies.set("accessToken", data.accessToken);
        Cookies.set("userId", data.userId);
        sessionStorage.setItem("userinfo", JSON.stringify(data));
        // this.$router.push({
        // path: this.redirect ? this.redirect : "/",
        // });
        window.location.href = "/";
      } else {
        this.$message.error("自动登录失败，正在跳转至登录页手动登录");
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }
    },
    urlDelParams(name, value, type) {
      var loca = window.location;
      var baseUrl = type == undefined ? loca.origin + loca.pathname + "?" : "";
      var query = loca.search.substr(1);
      // 如果没有传参,就返回 search 值 不包含问号
      if (name == undefined) {
        return query;
      }
      // 如果没有传值,就返回要查询的参数的值
      if (value == undefined) {
        var val = query.match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
        return val != null ? decodeURI(val[2]) : null;
      }
      var url;
      if (query == "") {
        // 如果没有 search 值,则返回追加了参数的 url
        url = baseUrl + name + "=" + value;
      } else {
        // 如果没有 search 值,则在其中修改对应的值,并且去重,最后返回 url
        var obj = {};
        var arr = query.split("&");
        for (var i = 0; i < arr.length; i++) {
          arr[i] = arr[i].split("=");
          obj[arr[i][0]] = arr[i][1];
        }
        obj[name] = value;
        url =
          baseUrl +
          JSON.stringify(obj)
            .replace(/[\"\{\}]/g, "")
            .replace(/\:/g, "=")
            .replace(/\,/g, "&");
      }
      return url;
    },
    // 解析url地址
    GetParameter(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    ...mapMutations({
      SET_USERINFO,
      SET_FASONGDANWEI: "government/SET_FASONGDANWEI",
    }),
  },
};
</script>

<style lang="scss" scoped>
.wel-body {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/img/wel.png");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    font-size: 5vmin;
    color: white;
  }
  img {
    width: 20%;
    height: 17vmin;
  }
}
</style>
