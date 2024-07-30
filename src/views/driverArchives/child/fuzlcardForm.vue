<template>
  <el-form class="organform" ref="rowDetail" :model="rowDetail">
    <div
      class="form_detail"
      style="color:#fff"
      v-loading="txtLoading"
      element-loading-background="rgba(0, 0, 0, 0.4)"
    >
      <div v-html="vContent"></div>
      <div class="text_foot">
        <span>日期: {{ rowDetail.ajwAutographTime }}</span>
        <div style="display: flex; justify-content: right">
          <span>驾驶员签名：</span>
          <div v-viewer v-if="rowDetail.ajwAutographEnclosure">
            <img
              style="width: 85px; height: 35px; margin-top: -10px"
              :src="rowDetail.ajwAutographEnclosure"
              alt=""
            />
          </div>

          <span v-else>未签名</span>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script>
import dataAnalysisApi from "@/api/modules/report";
export default {
  props: {
    rowDetail: {
      type: Object,
      default: () => {
        return {};
      },
    },
    rows: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      vContent: "",
      txtLoading: false,
    };
  },

  watch: {
    rowDetail: {
      handler() {
        this.getLiabilityStatementList();
      },
    },
  },
  methods: {
    async getLiabilityStatementList() {
      this.txtLoading = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.liabilityStatementList({
          deptId: 1,
          current: 1,
          size: 10,
          lsiType: 5,
        })
      );
      this.txtLoading = false;
      if (data) {
        if (data.records.length > 0) {
          let datas = data.records[0];
          let zhengwen = "";
          if (datas.lsiContent.indexOf("<") !== -1) {
            zhengwen = datas.lsiContent;
          } else if (datas.lsiContent.indexOf("&lt;") !== -1) {
            zhengwen = datas.lsiContent
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/nbsp;/g, "")
              .replace(/&/g, "")
              .replace(/amp;/g, "");
          } else {
            zhengwen = "<p>" + datas.lsiContent + "</p>";
          }
          this.vContent = zhengwen;
          if (this.vContent.indexOf("<table") != -1) {
            this.vContent = this.vContent.replace(
              /<table/g,
              "<table border='1' style='border-collapse: collapse'"
            );
          }
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.organform {
  width: 100%;
  height: calc(100% - 120px);
  margin-top: 10px;
  .form_detail {
    width: 100%;
    height: calc(100%);
    overflow: auto;
    ::v-deep p {
      word-break: break-word;
      text-indent: 32px;
      font-size: 15px;
      span {
        color: #fff !important;
      }
    }
    .text_foot {
      display: flex;
      flex-direction: column;
      padding: 0 52px;
      margin-top: 40px;
      line-height: 30px;
      span {
        text-align: end;
        font-size: 15px;
      }
    }
  }
}
</style>
