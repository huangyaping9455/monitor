<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 100vh;
  background-image: url("~@/assets/img/bag.png");
  // background-image: url("~@/assets/img/bg.jpg");
  background-size: cover;
}
.logo {
  align-self: flex-end;
  margin-top: 5.5rem;
  // width: 50.1429rem; //福清市
  // width: 58.1429rem;
  // height: 7.7857rem;
  // margin-left: 38.0714rem; //徐州
  margin-right: 20.0714rem; //默认\
  margin-top: 10rem;
  height: 6.7857rem; //默认
  width: 40.1429rem; //默认
  // width: 45.1429rem; //优必飞
  img {
    width: 100%;
    height: 100%;
  }
  .yjlogo {
    width: 46%;
  }
}
.yamei {
  color: white;
  font-size: 4vh;
  margin-right: 26vh;
  // margin-right: 30vh;
  margin-top: 3vh;
}
.loginbox {
  width: 27.1429rem;
  height: 30.8571rem;
  // background-image: url("~@/assets/img/loginbox.png");
  // background-size: 100% 100%;
  // margin-top: 7.8571vh;
  background-color: white;
  border-radius: 10px;
  margin-top: 6.8571vh;
  margin-right: 19vw;
  display: flex;
  flex-direction: column;
  padding: 1.4286rem 2.8571rem;
  box-sizing: border-box;
  .title {
    font-size: 1.5rem;
    // color: #ffffff;
    color: #19489f;
    text-align: center;
    margin: 1.0714rem 0 1.4286rem;
  }
  .inputbox {
    height: 2.8571rem;
    line-height: 2.8571rem;
    background-color: #ffffff;
    .icon {
      margin-top: 9px;
      // fill: currentColor;
      color: #19489f !important;
    }
  }
  .verification {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .inputbox {
      width: 10rem;
      margin-bottom: 0rem;
    }
    .img {
      height: 2.8571rem;
    }
  }
  .loginbtn {
    margin-top: 0.7143rem;
    width: 21.9286rem;
    height: 3.2143rem;
    border-radius: 20px;
    // background-image: linear-gradient(0deg, #0080de 0%, #00c8f5 100%);
    background: linear-gradient(to right, #123f97, #0a90f9);
    outline: none;
    border: 0.0714rem solid #199fcd;
    font-size: 1.2857rem;
    color: #ffffff;
    cursor: pointer;
  }
}
</style>
<style lang="scss">
.login {
  .el-form-item {
    margin-bottom: 2.5rem;
  }
  // .el-input.is-disabled ::v-deep .el-input__inner {
  //   color: #606266;
  //   background-color: white;
  // }
  .inputbox {
    .el-input__inner {
      // background-color: white !important;
      background-color: rgba(255, 255, 255, 0.247);
      border: none;
      border-bottom: 2px solid #bad6fc;
      border-radius: 0px;
      height: 2.8571rem;
      font-size: 1rem;
      caret-color:#bad6fc;
      &:focus {
        border-color: #bad6fc;
      }
    }
  }
}
</style>

<template>
  <div class="login">
    <div class="logo">
      <!-- <img src="@/assets/img/zkgt.png" /> -->
      <!-- <img src="@/assets/img/logo-22.png" /> -->
      <img src="@/assets/img/newLogo.png" />
      <!-- <img src="@/assets/img/youbifei.png" /> -->
      <!-- <img src="@/assets/img/fuqing.png" /> -->
      <!-- <img src="@/assets/img/fuqing2.png" /> -->
      <!-- <img src="@/assets/img/guizhoulogo.png" /> -->
      <!-- <img class="yjlogo" src="@/assets/img/yj-logo.png" /> -->
      <!-- <img src="@/assets/img/logo_changzhou.png" /> -->
      <!-- <img src="@/assets/img/xvzhoulogo.png" /> -->
      <!-- <img src="@/assets/img/liuzhou.png" /> -->
      <!-- <img src="@/assets/img/cd_zflogo.png" /> -->
      <!-- <img src="@/assets/img/logo_yulin.png" /> -->
      <!-- <img src="@/assets/img/logo_ybf.png" /> -->
      <!-- <img src="@/assets/img/logo3.png" /> -->
      <!-- <img src="@/assets/img/logo66.png" /> -->
    </div>
    <!-- <div class="yamei">
      <span>广州亚美信息科技有限公司</span>
      <span>云南中流科技有限公司</span>
    </div> -->
    <div class="loginbox">
      <p class="title">用户登录</p>
      <el-form ref="ruleForm" :rules="rules" :model="form">
        <el-form-item prop="name">
          <el-input
            class="inputbox"
            type="text"
            v-model="form.name"
            placeholder="用户名"
            prefix-icon="el-icon-user"
          >
            <!-- <svg-icon slot="prefix" class="icon" icon-class="name" /> -->
          </el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            class="inputbox"
            type="password"
            v-model="form.pass"
            placeholder="密码"
            prefix-icon="el-icon-goods"
          >
            <!-- <svg-icon slot="prefix" class="icon" icon-class="pass" /> -->
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <div class="verification">
            <el-input
              class="inputbox"
              type="text"
              v-model="form.code"
              placeholder="验证码"
            ></el-input>
            <img @click="getCode" class="img" :src="codeImage" />
          </div>
        </el-form-item>
      </el-form>
      <el-button class="loginbtn" :loading="loading" @click="login"
        >登 录</el-button
      >
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import loginApi from "@/api/modules/login";
import { mapMutations } from "vuex";
import { SET_USERINFO, SET_FASONGDANWEI } from "@/store/mutation-types";
import { config } from "@/config/config.js";
export default {
  data() {
    return {
      form: {
        // name:'ts',
        // pass:'ts123123',
        name: "",
        pass: "",
        code: "",
      },
      codeImage: "", //验证码
      loading: false,
      redirect: "", //跳转页面
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.redirect = this.$route.query.redirect;
    console.log(this.redirect);
    this.getCode();
  },
  methods: {
    // 获取验证码
    async getCode() {
      let [err, data] = await loginApi.awaitWrap(loginApi.getcode());
      if (data) {
        this.codeImage = data.account;
      }
    },
    // 登录
    async login() {
      // 验证
      let thevalid;
      this.$refs.ruleForm.validate((valid) => {
        thevalid = valid;
      });
      if (!thevalid) return false;
      // 登录
      this.loading = true;
      let [err, data] = await loginApi.awaitWrap(
        loginApi.ZFtoken({
          name: config.aesEncrypt(this.form.name),
          password: config.aesEncrypt(this.form.pass),
          // verificationCode: config.aesEncrypt(this.form.code),
          clientVerifyCode: config.aesEncrypt(this.form.code),
          type: config.aesEncrypt(0),
        })
      );
      this.loading = false;

      if (data) {
        this.SET_USERINFO(data);
        this.SET_FASONGDANWEI(data.deptId);
        Cookies.set("accessToken", data.accessToken);
        Cookies.set("userId", data.userId);
        sessionStorage.setItem("userinfo", JSON.stringify(data));
        this.$message.success("登录成功");
        this.$router.push({
          path: this.redirect ? this.redirect : "/",
        });
      } else {
        this.$message.error(err);
        this.getCode();
      }
    },
    ...mapMutations({
      SET_USERINFO,
      SET_FASONGDANWEI: "government/SET_FASONGDANWEI",
    }),
  },
};
</script>
