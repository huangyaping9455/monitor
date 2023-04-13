<template>
  <el-dialog
    title="企业月报"
    class="learns"
    center
    top="10vh"
    :show-close="false"
    :close-on-click-modal="false"
    :visible.sync="learnVisible"
    width="70%"
  >
    <div style="width: 100%; height: 100%" v-loading="iLoading">
      <iframe
        ref="iframe"
        name="iframe"
        class="w100"
        style="height: 100%; width: 100%"
        :src="`http://jxjy.jiayunbao.cn/orgMstatT/fgnMonth?sign=${sign}&channel=440000001&timestamp=${timestamp}&statYm=${month}&bcNo=${rows.bcNo}`"
        frameborder=""
        scrolling="auto"
      ></iframe>
    </div>
    <div slot="footer">
      <el-button class="topbtn" size="mini" @click="learnVisible = false">
        取 消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import md5 from "js-md5";
import dayjs from "dayjs";
export default {
  data() {
    return {
      learnVisible: false,
      iLoading: true,
      rows: {},
      month: "",
    };
  },

  computed: {
    sign() {
      return md5(
        "440000001" + "JxN8PN5pbTzMLCjRjYif3ketKe4gmC3n" + dayjs().unix()
      ).toLowerCase();
    },
    timestamp() {
      return dayjs().unix();
    },
  },

  // vue生命周期钩子函数 -- 更新之后
  updated() {
    if (this.$refs.iframe) {
      // IE
      if (this.$refs.iframe.attachEvent) {
        this.$refs.iframe.attachEvent("onload", () => {
          // 加载成功
          this.iLoading = false;
        });
      } else {
        this.$refs.iframe.onload = () => {
          // 加载成功
          this.iLoading = false;
        };
      }
    }
  },
  methods: {
    open(row, month) {
      this.rows = row;
      this.month = month;
      this.iLoading = true;
      this.learnVisible = true;
    },
  },
};
</script>

<style lang="scss">
.learns {
  .el-dialog {
    width: 100%;
    height: 80%;
    background-image: url("~@/assets/img/bg_14.png");
    background-size: 100% 100%;
    background-color: transparent;
    .el-dialog__title {
      color: #ffffff;
      font-weight: bold;
    }
    .el-dialog__body {
      padding: 10px 20px;
      height: calc(100% - 140px);
    }
    .topbtn {
      border: solid 1px #0a3774;
      background-image: linear-gradient(0deg, #0080de 0%, #00c8f5 100%);
      color: #ffffff;
      font-weight: bold;
      width: 130px;
      cursor: default;
      font-size: 16px;
      cursor: pointer;
    }
  }
}
</style>
