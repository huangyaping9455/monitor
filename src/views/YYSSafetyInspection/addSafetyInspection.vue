<style lang="scss" scoped>
.vehicledetails {
  ::v-deep .el-dialog {
    .el-dialog__header .el-dialog__title {
      color: #fff;
      font-weight: 600;
    }
    .el-form-item__label {
      color: #fff;
    }
  }
  .organform {
    width: 100%;
    height: 35vmin;
    overflow: auto;
  }
  .topbtn {
    border: solid 1px #0a3774;
    background-image: linear-gradient(0deg, #0080de 0%, #00c8f5 100%);
    color: #ffffff;
    font-weight: bold;
    width: 130px;
    cursor: default;
    font-size: 16px;
    &:last-of-type {
      margin-right: 30px;
    }
    &.nom {
      margin: 0;
      cursor: pointer;
      margin-right: 30px;
    }
  }
}
</style>

<template>
  <el-dialog
    width="55%"
    class="vehicledetails"
    center
    title="运营商查岗信息"
    :show-close="false"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    :destroy-on-close="true"
  >
    <el-form
      class="organform"
      ref="dataForm"
      :model="dataForm"
      :disabled="logType != '新增'"
      :rules="rules"
    >
      <el-col :span="8">
        <el-form-item label="发起单位：">
          <span style="color: #fff">{{ userinfo.deptName }}</span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="送达企业：" prop="songdadanwei">
          <el-select
            filterable
            multiple
            value-key="opCode"
            collapse-tags
            placeholder="请选择送达企业"
            v-model="dataForm.songdadanwei"
          >
            <el-option
              v-for="item in enterpriseList"
              :key="item.id"
              :label="item.opName"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="查岗时间：" prop="ckDate">
          <el-date-picker
            class="time"
            v-model="dataForm.ckDate"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="查岗问题：" prop="ckMessage">
          <el-input
            size="mini"
            type="textarea"
            :rows="6"
            v-model="dataForm.ckMessage"
            style="width: 100%"
          >
          </el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <span slot="footer">
      <el-button class="topbtn nom" size="mini" @click="dialogVisible = false">
        取 消
      </el-button>
      <el-button
        class="topbtn nom"
        size="mini"
        @click="submitChange"
        v-if="logType == '新增'"
      >
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { format } from "@/config/date";
import dataAnalysisApi from "@/api/modules/report";
import governmentApi from "@/api/modules/government";
import { mapGetters, mapMutations } from "vuex";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      dataForm: {},
      eye: false, //查看模式
      enterpriseList: [],
      rules: {
        songdadanwei: [
          { required: true, message: "请选择送达企业", trigger: "blur" },
        ],
        ckDate: [{ required: true, message: "选择日期时间", trigger: "blur" }],
        ckMessage: [
          { required: true, message: "请输入查岗问题", trigger: "blur" },
        ],
      },
      logType: "新增",
    };
  },
  computed: {
    dialogVisible: {
      get: function () {
        return this.visible;
      },
      set: function (newValue) {
        this.$emit("close");
      },
    },
    ...mapGetters({
      userinfo: "userinfo",
      depts: "government/depts",
      zhuzzhiId: "government/fasongdanwei",
    }),
  },
  watch: {
    visible(newvisible) {
      if (newvisible) {
        this.getYYSZFVehiclePage();
      }
    },
  },
  methods: {
    // 初始化
    init() {
      this.logType = "新增";
      this.dataForm = {};
    },
    // 关闭 刷新列表
    closeChange() {
      this.dialogVisible = false;
      this.$emit("changeclose");
    },
    // 获取详情
    async getDetail(type, row) {
      this.logType = type;
      let [err, data] = await governmentApi.awaitWrap(
        governmentApi.checkPostDetail({
          Id: row.ckId,
        })
      );
      if (data) {
        this.dataForm = data;
        this.dataForm.songdadanwei = [data];
      } else {
        this.$message.error(err);
      }
    },
    //地区报警处理率
    async getYYSZFVehiclePage() {
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getYYSZFVehiclePage({
          deptId: this.userinfo.deptId,
          current: 0,
          size: 0,
        })
      );
      if (data) {
        this.enterpriseList = data.records;
      } else {
        this.$message.error(err);
      }
    },
    // 提交
    submitChange() {
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          // 处理送达单位
          let songdadanwei = [],
            songdadanweicode = [];
          this.dataForm.songdadanwei.forEach((el) => {
            songdadanwei.push(el.opName);
            songdadanweicode.push(el.opCode);
          });
          let [err, data] = await governmentApi.awaitWrap(
            governmentApi.createanbiaolist({
              ckCreateId: this.userinfo.userId,
              ckCreateName: this.userinfo.userName,
              ckPersonId: this.userinfo.userId,
              ckPersonName: this.userinfo.userName,
              ckDate: this.dataForm.ckDate,
              ckMessage: this.dataForm.ckMessage,
              ckYunguanId: this.zhuzzhiId,
              opCode: songdadanweicode.join(","),
              opName: songdadanwei.join(","),
            })
          );
          if (data) {
            this.$message.success("新增成功");
            this.visible = false;
            this.closeChange();
          }
        } else {
          this.$message.error("请完善信息");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss">
.vehicledetails {
  .el-dialog {
    background-image: url("~@/assets/img/bg_14.png");
    background-size: 100% 100%;
    background-color: transparent;
  }
}
</style>