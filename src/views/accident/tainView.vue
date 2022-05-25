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
          <el-form-item label="车牌号：">
            <el-input
              v-model="driverDetailList.chepaihao"
              placeholder="请输入车牌号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="驾驶人员：">
            <el-input
              v-model="driverDetailList.jiashiyuan"
              placeholder="请输入驾驶人员"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="事故日期：">
            <el-date-picker
              type="datetime"
              placeholder="选择日期"
              v-model="driverDetailList.shigufashengshijian"
              style="width: 100%;"
              value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="事故等级：">
            <el-select
              v-model="driverDetailList.shigufenlei"
              placeholder="请选择事故等级"
              style="width:100%;"
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item, index) in sgdjList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="事故性质：">
            <el-select
              v-model="driverDetailList.shiguxingtai"
              placeholder="请选择事故性质"
              style="width:100%;"
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item, index) in sgxzList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="事故责任划分：">
            <el-select
              v-model="driverDetailList.zerenfenxi"
              placeholder="请选择事故责任划分"
              style="width:100%;"
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item, index) in sgzrhfList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="事故地点：">
            <div style="width:100%;display:flex;">
              <el-input v-model="province" placeholder="省" />
              <el-input v-model="country" placeholder="市" />
              <el-input v-model="city" placeholder="市" />
              <el-input v-model="address" placeholder="详细地址" />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="运行路线：">
            <el-input
              v-model="driverDetailList.yunxingxianlu"
              placeholder="请输入运行路线"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="事故经济损失(元)：">
            <el-input-number
              controls-position="right"
              :min="0"
              v-model="driverDetailList.caichansunshi"
              placeholder="请输入事故经济损失"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="公路线性状况：">
            <el-select
              v-model="driverDetailList.xianxingzhuangkuang"
              placeholder="请选择公路线性状况"
              style="width:100%;"
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item, index) in glxxList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="公路技术等级：">
            <el-select
              v-model="driverDetailList.gonglujishudengji"
              placeholder="请选择公路技术等级"
              style="width:100%;"
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item, index) in gljsdjList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="事故直接原因：">
            <el-select
              v-model="driverDetailList.shiguzhijieyuanyin"
              placeholder="请选择事故直接原因"
              style="width:100%;"
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item, index) in sgzjyyList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="线路类型：">
            <el-select
              v-model="driverDetailList.xianluleibie"
              placeholder="请选择线路类型"
              style="width:100%;"
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item, index) in xllxList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="始发站：">
            <el-input
              v-model="driverDetailList.shifazhan"
              placeholder="请输入始发站"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="危险化学品品名：">
            <el-input
              v-model="driverDetailList.weihuapinming"
              placeholder="请输入危险化学品品名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="失踪人数(人)：">
            <el-input-number
              controls-position="right"
              :min="0"
              v-model="driverDetailList.shizong"
              placeholder="请输入失踪人数"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="受伤人数(人)：">
            <el-input-number
              controls-position="right"
              :min="0"
              v-model="driverDetailList.shoushang"
              placeholder="请输入受伤人数"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="死亡人数(人)：">
            <el-input-number
              controls-position="right"
              :min="0"
              v-model="driverDetailList.siwang"
              placeholder="请输入死亡人数"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="外籍人员失踪数(人)：">
            <el-input-number
              controls-position="right"
              :min="0"
              v-model="driverDetailList.waijishizong"
              placeholder="请输入外籍人员失踪数"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="外籍人员受伤人数(人)：">
            <el-input-number
              controls-position="right"
              :min="0"
              v-model="driverDetailList.waijishoushang"
              placeholder="请输入外籍人员受伤人数"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="外籍人员死亡人数(人)：">
            <el-input-number
              controls-position="right"
              :min="0"
              v-model="driverDetailList.waijisiwang"
              placeholder="请输入外籍人员死亡人数"
              style="width:100%;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="天气情况：">
            <el-select
              v-model="driverDetailList.tianqiqingkuang"
              placeholder="请选择天气情况"
              style="width:100%;"
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item, index) in tianqiList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="事故经过：">
            <el-input
              type="textarea"
              v-model="driverDetailList.shigugaikuang"
              placeholder="请输入事故经过"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="事故照片：">
            <el-upload
              action="/api/blade-upload/upload/upload?fileId=shiguzhaopian&table=anbiao_vehicle"
              list-type="picture-card"
              :file-list="fileList1"
              multiple
            >
              <i class="el-icon-plus"></i>
            </el-upload>
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
      fileList1: [],
      glxxList: [],
      gljsdjList: [],
      sgzjyyList: [],
      xllxList: [],
      sgdjList: [],
      sgzrhfList: [],
      sgxzList: [],
      tianqiList: [],
      province: "",
      country: "",
      city: "",
      address: "",
    };
  },
  computed: {},
  watch: {
    vehicleVisible: {
      handler(val) {
        if (val === true) {
          this.getDicData("xianxingzhuangkuang").then((res) => {
            this.glxxList = res;
          });
          this.getDicData("gonglujishudengji").then((res) => {
            this.gljsdjList = res;
          });
          this.getDicData("shiguzhijieyuanyin").then((res) => {
            this.sgzjyyList = res;
          });
          this.getDicData("xianluleibie").then((res) => {
            this.xllxList = res;
          });
          this.getDicData("shigufenlei").then((res) => {
            this.sgdjList = res;
          });
          this.getDicData("zerenfenxi").then((res) => {
            this.sgzrhfList = res;
          });
          this.getDicData("shiguxingtai").then((res) => {
            this.sgxzList = res;
          });
          this.getDicData("weatherSituation").then((res) => {
            this.tianqiList = res;
          });
          this.getvehicleSGDetail();
        }
      },
    },
  },
  methods: {
    //地区报警处理率
    async getvehicleSGDetail() {
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getvehicleSGDetail({
          id: this.vehiclemsgList.id,
        })
      );
      this.msgloading = false;
      if (data) {
        this.driverDetailList = data;
        this.province = this.driverDetailList.shigufashengdidian.split(",")[0];
        this.country = this.driverDetailList.shigufashengdidian.split(",")[1];
        this.city = this.driverDetailList.shigufashengdidian.split(",")[2];
        this.address = this.driverDetailList.shigufashengdidian.split(",")[3];

        if (this.driverDetailList.shiguzhaopian) {
          if (this.driverDetailList.shiguzhaopian.indexOf(",") != -1) {
            let zhaop = this.driverDetailList.shiguzhaopian.split(",");
            zhaop.pop();
            this.fileList1 = zhaop.map((el) => {
              return { url: el };
            });
            this.driverDetailList.shiguzhaopian = zhaop;
          }
        }
      } else {
        this.$message.error(err);
      }
    },
    // 获取字典
    async getDicData(val) {
      let [err, data] = await dataApi.awaitWrap(
        dataApi.getByCode({ code: val })
      );
      if (data) {
        return data;
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
