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
        :class="['cehicleCard_b', { isChange: ischanged == index + 1 }]"
        @click="cardChange(index)"
      >
        {{ item.label }}
      </span>
    </div>
    <div
      class="cehicleCard_form"
      v-loading="msgloading"
      element-loading-background="rgba(0, 0, 0, 0.4)"
    >
      <xingshi-form
        v-if="ischanged === 1"
        :rowDetail="vehicleDetailList"
        :rows="vehiclemsgList"
        :state="true"
      ></xingshi-form>
      <daoluzheng-form
        v-if="ischanged === 2"
        :rowDetail="vehicleDetailList"
        :rows="vehiclemsgList"
        :state="true"
      ></daoluzheng-form>
      <zonghe-form
        v-if="ischanged === 3"
        :rowDetail="vehicleDetailList"
        :rows="vehiclemsgList"
        :state="true"
      ></zonghe-form>
      <edit-vehicle
        v-if="ischanged === 4"
        :rowDetail="vehicleDetailList"
        :rows="vehiclemsgList"
        :state="true"
      ></edit-vehicle>
      <dengjizheng-form
        v-if="ischanged === 5"
        :rowDetail="vehicleDetailList"
        :rows="vehiclemsgList"
        :state="true"
      ></dengjizheng-form>
      <zhognduan-vehicle
        v-if="ischanged === 6"
        :rowDetail="vehicleDetailList"
        :rows="vehiclemsgList"
        :state="true"
      ></zhognduan-vehicle>
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
import xingshiForm from "./child/xingshiForm.vue";
import DaoluzhengForm from "./child/daoluzhengForm.vue";
import ZongheForm from "./child/zongheForm.vue";
import EditVehicle from "./child/editVehicle.vue";
import DengjizhengForm from "./child/dengjizhengForm.vue";
import ZhognduanVehicle from "./child/zhognduanVehicle.vue";
export default {
  components: {
    xingshiForm,
    DaoluzhengForm,
    ZongheForm,
    EditVehicle,
    DengjizhengForm,
    ZhognduanVehicle,
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
      vehicleDetailList: {},
    };
  },
  computed: {
    btnList() {
      return [
        { label: "车辆行驶证" },
        { label: "道路运输证" },
        { label: "车辆综合性能检测报告" },
        { label: "车辆技术档案/技术等级评定信息" },
        { label: "车辆登记证书" },
        { label: "终端信息" },
      ];
    },
  },
  watch: {
    vehicleVisible: {
      handler(val) {
        if (val === true) {
          this.updatedisable = false;
          this.updateLoading = false;
          this.ischanged = 1;
          this.fileList = [];
          this.vehicleDetailList = {};
          this.vehicleDetail(this.ischanged);
        }
      },
    },
    ischanged: {
      handler(val) {
        this.vehicleDetail(val);
      },
    },
  },
  methods: {
    //地区报警处理率
    async vehicleDetail(index) {
      this.msgloading = true;
      let detailUrl;
      if (index == 1) {
        detailUrl = "vehiclexingshizhengDetail";
      } else if (index == 2) {
        detailUrl = "vehicledaoluyunshuzhengDetail";
      } else if (index == 3) {
        detailUrl = "vehiclexingnengbaogaoDetail";
      } else if (index == 4) {
        detailUrl = "getVehicleDetail";
      } else if (index == 5) {
        detailUrl = "vehicledengjizhengshuDetail";
      } else if (index == 6) {
        detailUrl = "getVehicleDetail";
      }
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi[detailUrl]({
          vehicleId: this.vehiclemsgList.id,
          id: this.vehiclemsgList.id,
        })
      );
      this.msgloading = false;
      if (data) {
        this.vehicleDetailList = data;
      } else {
        this.$message.error(err);
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
          input {
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
