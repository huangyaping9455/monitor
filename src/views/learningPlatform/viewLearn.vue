<template>
  <el-dialog
    :title="title"
    class="learns"
    center
    top="10vh"
    :show-close="false"
    :close-on-click-modal="false"
    :visible.sync="learnVisible"
    append-to-body
    width="70%"
  >
    <div style="width: 100%; height: 100%" v-loading="iLoading">
      <iframe
        ref="iframe"
        name="iframe"
        class="w100"
        style="height: 100%; width: 100%"
        :src="studyUrl"
        frameborder=""
        scrolling="auto"
        @load="endLoad"
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
import dataAnalysisApi from "@/api/modules/report";
export default {
  data() {
    return {
      learnVisible: false,
      iLoading: true,
      rows: {},
      month: "",
      studyUrl: "",
      title: "学习证明",
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
  updated() {},
  methods: {
    open(row, month, type) {
      this.studyUrl = "";
      this.rows = row;
      this.month = month;
      this.iLoading = true;
      if (row.luser == "替比") {
        if (type == "学习证明") {
          this.studyUrl = row.recordurl;
        } else if (type == "结业证书") {
          this.studyUrl = row.certificateurl;
        } else if (type == "考试记录") {
          this.studyUrl = row.examurl;
        }
      } else {
        this.getLearnRecordUrl();
      }
      this.learnVisible = true;
    },
    // iframe 加载完成
    endLoad() {
      // 加载成功
      this.iLoading = false;
    },
    //驾运宝 地址前缀
    async getLearnRecordUrl() {
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getLearnRecordUrl()
      );
      if (data) {
        // this.studyUrl = data;
        this.studyUrl = `${data}/userTcClassHour/fgnGrad?sign=${this.sign}&channel=440000001&timestamp=${this.timestamp}&statYm=${this.month}&bcNo=${this.rows.bcNo}&idcNo=${this.rows.usercard}`;
      } else {
        this.$message.error(err);
      }
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
      height: calc(100% - 54px);
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
