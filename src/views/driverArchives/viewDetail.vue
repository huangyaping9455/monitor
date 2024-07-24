<template>
  <el-dialog
    title="详情"
    class="learns"
    center
    top="10vh"
    :show-close="false"
    :close-on-click-modal="false"
    :visible.sync="vehicleVisible"
    width="70%"
  >
    <div class="cehicleCard">
      <span
        v-for="(item, index) in btnList"
        :key="index"
        :class="['cehicleCard_b', { isChange: ischanged === index + 1 }]"
        @click="cardChange(index)"
      >
        {{ item.label }}
      </span>
    </div>
    <div class="cehicleCard_form">
      <ruzhi-form v-if="ischanged == 1" :rowDetail="driverDetailList" :state="true"></ruzhi-form>
      <card-form v-if="ischanged == 2" :rowDetail="driverDetailList" :state="true"></card-form>
      <jscard-form v-if="ischanged == 3" :rowDetail="driverDetailList" :state="true"></jscard-form>
      <cycard-form v-if="ischanged == 4" :rowDetail="driverDetailList" :state="true"></cycard-form>
      <tjcard-form v-if="ischanged == 5" :rowDetail="driverDetailList" :state="true"></tjcard-form>
      <pxcard-form v-if="ischanged == 6" :rowDetail="driverDetailList" :state="true"></pxcard-form>
      <wzcard-form v-if="ischanged == 7" :rowDetail="driverDetailList" :state="true"></wzcard-form>
      <zrscard-form
        v-if="ischanged == 8"
        :rowDetail="driverDetailList"
        :rows="vehiclemsgList"
      ></zrscard-form>
      <gzscard-form
        v-if="ischanged == 9"
        :rowDetail="driverDetailList"
        :rows="vehiclemsgList"
      ></gzscard-form>
      <htcard-form
        v-if="ischanged == 10"
        :rowDetail="driverDetailList"
        :rows="vehiclemsgList"
      ></htcard-form>
      <qtcard-form v-if="ischanged == 11" :rowDetail="driverDetailList" :state="true"></qtcard-form>
    </div>
    <div slot="footer">
      <el-button class="topbtn" size="mini" @click="vehicleVisible = false">
        取 消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import dataAnalysisApi from "@/api/modules/report";
import dataApi from "@/api/modules/government";
import cardForm from "./child/cardForm.vue";
import RuzhiForm from "./child/ruzhiForm.vue";
import JscardForm from "./child/jscardForm.vue";
import CycardForm from "./child/cycardForm.vue";
import TjcardForm from "./child/tjcardForm.vue";
import PxcardForm from "./child/pxcardForm.vue";
import WzcardForm from "./child/wzcardForm.vue";
import ZrscardForm from "./child/zrscardForm.vue";
import HtcardForm from "./child/htcardForm.vue";
import QtcardForm from "./child/qtcardForm.vue";
import GzscardForm from "./child/gzscardForm.vue";
export default {
  components: {
    cardForm,
    RuzhiForm,
    JscardForm,
    CycardForm,
    TjcardForm,
    PxcardForm,
    WzcardForm,
    ZrscardForm,
    HtcardForm,
    QtcardForm,
    GzscardForm,
  },
  props: {
    vehiclemsgList: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      vehicleVisible: false,
      msgloading: false,
      ischanged: 1,
      driverDetailList: {},
    };
  },
  computed: {
    btnList() {
      return [
        { label: "入职登记表" },
        { label: "身份证" },
        { label: "驾驶证" },
        { label: "从业资格证" },
        { label: "体检表" },
        { label: "岗前培训三级教育卡" },
        { label: "三年无重大责任证明" },
        { label: "驾驶员安全责任书" },
        { label: "驾驶员职业危害告知书" },
        { label: "劳动合同" },
        { label: "其他" },
      ];
    },
  },
  watch: {
    vehicleVisible: {
      handler(val) {
        if (val === true) {
          this.ischanged = 1;
          this.driverDetailList = {};
          this.getDriverDetail(this.ischanged);
        }
      },
    },
    ischanged: {
      handler(val) {
        this.getDriverDetail(val);
      },
    },
  },
  methods: {
    //地区报警处理率
    async getDriverDetail(index) {
      this.msgloading = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getDriverDetail({
          id: this.vehiclemsgList.id,
          type: index,
        })
      );
      this.msgloading = false;
      if (data) {
        if (data.shenfenzhenghao) {
          data.shenfenzhenghao = data.shenfenzhenghao.replace(
            /^(.{6})(?:\d+)(.{4})$/,
            "\$1****\$2"
          );
        }
        this.driverDetailList = data;
      } else {
        this.$message.error(err);
      }
    }, // 获取字典
    async getDicData(val) {
      let [err, data] = await dataApi.awaitWrap(dataApi.getByCode({ code: val }));
      if (data) {
        return data;
      }
    },
    // 标签卡切换
    cardChange(index) {
      this.ischanged = index + 1;
    },
  },
};
</script>

<style lang="scss">
.learns {
  .el-dialog {
    background-image: url("~@/assets/img/bg_14.png");
    background-size: 100% 100%;
    background-color: transparent;
    .el-dialog__title {
      color: #ffffff;
      font-weight: bold;
    }
    .el-dialog__body {
      padding: 10px 20px;
      .cehicleCard {
        display: flex;
        .cehicleCard_b {
          padding: 7px 12px;
          margin-right: 2px;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
        }
        .isChange {
          background-color: #0a3774;
          border-radius: 10px 10px 0 0;
        }
      }
      .cehicleCard_form {
        height: 500px;
        background-color: #0a3774;
        padding: 5px;
        color: #fff;
        .el-form {
          background-color: #0f1f40;
          padding: 10px;
          width: calc(100% - 20px);
          height: calc(100% - 20px);
          overflow: auto;
          .el-form-item__label {
            color: #fff;
          }
          .el-input-number__increase,
          .el-input-number__decrease,
          input,
          textarea {
            background: #112e4d;
            border-color: #004b77;
            color: #ffffff;
          }
        }
      }
    }
    .learn_head {
      display: flex;
      padding: 10px 0;
      span {
        font-size: 14px;
        font-weight: 600;
        display: flex;
        align-items: center;
        margin-right: 5px;
        color: #fff;
      }
      .el-input,
      .el-select,
      .el-date-picker {
        width: 15.2vmin !important;
      }
      .el-button {
        margin-left: 10px;
      }
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
