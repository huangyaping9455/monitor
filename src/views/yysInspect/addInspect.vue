<template>
  <el-dialog
    :title="titleType"
    class="learns"
    center
    top="10vh"
    :show-close="false"
    :close-on-click-modal="false"
    :visible.sync="vehicleVisible"
    width="50%"
  >
    <div class="cehicleCard_form">
      <el-form
        ref="form"
        :model="dataForm"
        :rules="rules"
        label-width="100px"
        style="overflow: auto"
      >
        <el-col :span="12">
          <el-form-item label="运营商：" prop="gnsscenter_id">
            <el-select
              v-model="dataForm.gnsscenter_id"
              class="search-input"
              filterable
              clearable
              style="width: 100%"
              placeholder="请选择运营商"
            >
              <el-option
                v-for="(item, index) in yunyingshangList"
                :key="index"
                :label="item.opName"
                :value="item.opCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业：" prop="object_id">
            <el-select
              filterable
              multiple
              clearable
              value-key="deptId"
              collapse-tags
              placeholder="请选择企业"
              v-model="dataForm.object_id"
              style="width: 100%"
            >
              <el-option
                v-for="item in enterpriseList"
                :key="item.deptId"
                :label="item.deptName"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="对象类型：" prop="object_type">
            <el-select
              clearable
              v-model="dataForm.object_type"
              placeholder="请选择事故等级"
              style="width: 100%"
            >
              <el-option label="当前连接的下级平台" :value="1"></el-option>
              <el-option label="下级平台所属单一业户" :value="2"></el-option>
              <el-option label="下级平台所属所有业户" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="内容：" prop="info_content">
            <el-input
              clearable
              type="textarea"
              v-model="dataForm.info_content"
              placeholder="请输入内容"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div slot="footer">
      <el-button
        v-if="titleType == '新增查岗'"
        class="topbtn"
        :loading="subLoading"
        size="mini"
        @click="insert"
      >
        确 定
      </el-button>
      <el-button class="topbtn" size="mini" @click="vehicleVisible = false">
        取 消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import dataAnalysisApi from "@/api/modules/report";
import { mapGetters } from "vuex";
import governmentApi from "@/api/modules/government";
import dayjs from "dayjs";
export default {
  data() {
    return {
      vehicleVisible: false,
      yunyingshangList: [],
      enterpriseList: [],
      driverDetailList: {},
      dataForm: {},
      subLoading: false,
      rules: {
        gnsscenter_id: [
          { required: true, message: "请选择运营商", trigger: "blur" },
        ],
        object_id: [{ required: true, message: "请选择企业", trigger: "blur" }],
        object_type: [
          { required: true, message: "请选择对象类型", trigger: "blur" },
        ],
        info_content: [
          { required: true, message: "请输入内容", trigger: "blur" },
        ],
      },
      titleType: "新增查岗",
      rows: {},
    };
  },
  computed: {
    ...mapGetters({
      userinfo: "userinfo",
    }),
  },
  methods: {
    open(row, type) {
      this.yunyingshangList = [];
      this.enterpriseList = [];
      this.driverDetailList = {};
      this.dataForm = {};
      this.rows = {};
      this.getVehicleYunYingShang();
      this.getYYSZFVehiclePage();
      this.rows = row;
      this.titleType = type;
      console.log(type);
      if (type != "新增查岗") {
        // this.getDetail(row);
        if (row.dept_id) {
          row.object_id = [{ deptId: row.dept_id }];
        }
        this.dataForm = row;
      }
      this.vehicleVisible = true;
    },
    //地区报警处理率
    async getDetail(row) {
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.platformQueryDetail({
          ...row,
          Id: row.id,
        })
      );
      if (data) {
        this.dataForm = data;
      } else {
        this.$message.error(err);
      }
    },
    // 运营商
    async getVehicleYunYingShang() {
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getOperatorInfo({
          deptId: 1,
        })
      );
      if (data) {
        this.yunyingshangList = data;
      } else {
        this.$message.error(err);
      }
    },
    // 企业
    async getYYSZFVehiclePage() {
      let [err, data] = await governmentApi.awaitWrap(
        governmentApi.getQiYe({
          deptId: this.userinfo.deptId,
          deptName: this.userinfo.deptName,
        })
      );
      if (data) {
        this.enterpriseList = data;
      } else {
        this.$message.error(err);
      }
    },
    // 新增
    insert() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.subLoading = true;
          let dept = [];
          if (this.dataForm.object_id.length > 0) {
            dept = this.dataForm.object_id.map((el) => {
              return el.deptId;
            });
          }
          let [err, data] = await dataAnalysisApi.awaitWrap(
            dataAnalysisApi.platformQueryInsert({
              ...this.dataForm,
              fsDeptId: this.userinfo.deptId,
              send_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
              object_id: dept.toString(),
            })
          );
          this.subLoading = false;
          if (data) {
            this.$message.success("新增成功");
            this.$parent.getPlatformQuery();
            this.vehicleVisible = false;
          } else {
            this.$message.error(err);
          }
        }
      });
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
