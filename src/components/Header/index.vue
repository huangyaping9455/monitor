<style lang="scss" scoped>
.home-header {
  height: 5rem;
  padding: 0 1.4286rem 0.7143rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("~@/assets/img/bg_6.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
  position: relative;
  .title {
    font-size: 2rem;
    flex: 1;
    margin: 0;
    color: #01f8ff;
    text-align: center;
    font-weight: normal;
  }
  .time,
  .user {
    flex: 0 0 16%;
    color: #ffffff;
  }
  .user {
    justify-content: flex-end;
    display: flex;
    align-items: center;
    .icon:first-of-type {
      font-size: 22px;
    }
    .icon:last-of-type {
      cursor: pointer;
    }
    p {
      margin: 0 20px 0 10px;
    }
  }
}
</style>

<template>
  <div class="home-header">
    <p class="time">{{ newtime }}</p>
    <h1 class="title">{{ userinfo.mingcheng }}</h1>
    <!-- <h1 class="title" style="font-size: 27px">
      柳州市交通运输卫星定位政府监管平台
    </h1> -->
    <!-- <h1 class="title" style="font-size: 27px">宁东基地物流公共信息管理平台</h1> -->
    <!-- <h1 class="title" style="font-size: 27px">宁东道路运输安全管理监测平台</h1> -->
    <div class="user">
      <svg-icon slot="prefix" class="icon" icon-class="user" />
      <p>{{ userinfo.deptName }}</p>
      <svg-icon slot="prefix" @click="loginout" class="icon" icon-class="out" />
    </div>
  </div>
</template>

<script>
import { format } from "@/config/date";
import Cookies from "js-cookie";
import { mapGetters, mapMutations } from "vuex";
import loginApi from "@/api/modules/login";
import { SET_USERINFO, SET_FASONGDANWEI } from "@/store/mutation-types";
export default {
  computed: {
    ...mapGetters({
      userinfo: "userinfo",
    }),
  },
  data() {
    return {
      newtime: "",
    };
  },
  mounted() {
    const timer = setInterval(() => {
      // 某些定时器操作
      this.setNewTime();
    }, 1000);
    // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
  methods: {
    setNewTime() {
      this.newtime = format(new Date(), "YYYY-MM-DD HH:mm:ss dddd");
    },
    // 退出
    async loginout() {
      let [err, data] = await loginApi.awaitWrap(loginApi.logout());
      if (data) {
        this.SET_USERINFO("");
        this.SET_FASONGDANWEI("");
        Cookies.set("accessToken", "");
        Cookies.set("userId", "");
        sessionStorage.setItem("userinfo", "");
        this.$message.success("退出成功");
        this.$router.push({
          path: "/login",
        });
      } else {
        this.$message.error(err);
      }
    },
    ...mapMutations({
      SET_USERINFO,
      SET_FASONGDANWEI: "government/SET_FASONGDANWEI",
    }),
  },
};
</script>
