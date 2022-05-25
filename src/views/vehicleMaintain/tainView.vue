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
    <div class="cehicleCard_form">
      <el-form
        ref="form"
        :model="driverDetailList"
        label-width="170px"
        style="overflow:auto;"
      >
        <el-col :span="8">
          <el-form-item label="车辆牌照">
            <el-input
              v-model="driverDetailList.cheliangpaizhao"
              :disabled="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="车牌颜色">
            <el-input v-model="driverDetailList.chepaiyanse" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="车辆维护单位：" prop="cheliangweihudanwei">
            <el-input v-model="driverDetailList.cheliangweihudanwei" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="维护类别：">
            <el-select
              v-model="driverDetailList.weihuleibie"
              style="width:100%;"
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item, index) in weihuleibieList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="进厂日期：" prop="jinchangriqi">
            <el-date-picker
              type="date"
              v-model="driverDetailList.jinchangriqi"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="进厂里程：">
            <el-input v-model="driverDetailList.jinchanglichengdushu" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出厂日期：" prop="chuchangriqi">
            <el-date-picker
              type="date"
              v-model="driverDetailList.chuchangriqi"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="维护/维修金额：">
            <el-input v-model="driverDetailList.weihujine" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="下次维护日期：">
            <el-date-picker
              type="date"
              v-model="driverDetailList.xiaciweihuriqi"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="下次进厂里程：">
            <el-input v-model="driverDetailList.xiacijinchanglicheng" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否合格：">
            <el-select
              v-model="driverDetailList.shifouhege"
              style="width:100%;"
            >
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="认定维修点：" prop="rendingweixiudian">
            <el-input v-model="driverDetailList.rendingweixiudian" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="维护合同编号：" prop="weihuhetongbianhao">
            <el-input v-model="driverDetailList.weihuhetongbianhao" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="录入时间：">
            <el-date-picker
              type="date"
              v-model="driverDetailList.lurushijian"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="维护类容：">
            <el-input type="textarea" v-model="driverDetailList.weihuneirong" />
          </el-form-item>
        </el-col>
      </el-form>
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
import { format } from "@/config/date";
export default {
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
      driverDetailList: {},
      weihuleibieList: [],
    };
  },
  computed: {},
  watch: {
    vehicleVisible: {
      handler(val) {
        if (val === true) {
          this.getDicData();
          this.getvehicleWHrDetail();
        }
      },
    },
  },
  methods: {
    //地区报警处理率
    async getvehicleWHrDetail() {
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getvehicleWHrDetail({
          id: this.vehiclemsgList.id,
        })
      );
      this.msgloading = false;
      if (data) {
        this.driverDetailList = data;
      } else {
        this.$message.error(err);
      }
    },

    // 获取字典
    async getDicData() {
      let [err, data] = await dataApi.awaitWrap(
        dataApi.getByCode({ code: "VehicleMaintenanceCategory" })
      );
      if (data) {
        this.weihuleibieList = data;
      }
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
      .cehicleCard_form {
        height: 500px;
        background-color: #0a3774;
        padding: 5px;
        color: #fff;
        .el-form {
          background-color: #0f1f40;
          padding: 10px;
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
