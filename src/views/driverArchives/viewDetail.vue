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
        :class="['cehicleCard_b', { isChange: ischanged === 0 }]"
        @click="cardChange(0)"
        >基本信息</span
      >
      <span
        :class="['cehicleCard_b', { isChange: ischanged === 1 }]"
        @click="cardChange(1)"
        >其他信息</span
      >
      <span
        :class="['cehicleCard_b', { isChange: ischanged === 2 }]"
        @click="cardChange(2)"
        >证件信息</span
      >
    </div>
    <div class="cehicleCard_form">
      <el-form
        ref="form"
        :model="driverDetailList"
        label-width="170px"
        style="overflow:auto;"
      >
        <div
          v-show="ischanged === indexs"
          v-for="(el, indexs) in [checkList1, checkList2, checkList3]"
          :key="indexs"
          style="display:flex;flex-wrap:wrap;"
        >
          <el-col
            :span="item.span ? item.span : 8"
            v-for="(item, index) in el"
            :key="index"
          >
            <el-form-item
              :label="item.label"
              :prop="item.required == true ? item.prop : ''"
            >
              <el-input
                v-if="item.type === 'input'"
                v-model="driverDetailList[item.prop]"
                :disabled="item.editDisabled ? item.editDisabled : false"
              />
              <el-select
                v-model="driverDetailList[item.prop]"
                style="width:100%;"
                v-if="item.type === 'select'"
                :disabled="item.editDisabled ? item.editDisabled : false"
              >
                <el-option
                  :label="vall.label"
                  :value="vall.value"
                  v-for="(vall, indexcc) in item.dicData"
                  :key="indexcc"
                ></el-option>
              </el-select>
              <el-date-picker
                v-if="item.type === 'date'"
                type="date"
                placeholder="选择日期"
                v-model="driverDetailList[item.prop]"
                style="width: 100%;"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                :disabled="item.editDisabled ? item.editDisabled : false"
              ></el-date-picker>
              <el-upload
                v-if="item.type === 'upload'"
                :action="
                  '/api/blade-upload/upload/upload?fileId=' +
                    item.prop +
                    '&table=' +
                    item.table
                "
                list-type="picture-card"
                :on-success="
                  (res) => {
                    return handlesuccess(res, item);
                  }
                "
                :on-remove="
                  (file, fileList, fileIndex) => {
                    return handleremove(file, fileList, fileIndex, item);
                  }
                "
                :file-list="
                  !driverDetailList[item.prop] ||
                  driverDetailList[item.prop] === ''
                    ? []
                    : typeof driverDetailList[item.prop] !== typeof item.prop
                    ? driverDetailList[item.prop]
                    : driverDetailList[item.prop].indexOf('[') != -1
                    ? JSON.parse(driverDetailList[item.prop])
                    : driverDetailList[item.prop]
                "
                :disabled="item.editDisabled ? item.editDisabled : false"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-input-number
                v-if="item.type === 'number'"
                v-model="driverDetailList[item.prop]"
                controls-position="right"
                :min="0"
                style="width: 100%;"
                :disabled="item.editDisabled ? item.editDisabled : false"
              ></el-input-number>
              <el-input
                v-if="item.type === 'textarea'"
                v-model="driverDetailList[item.prop]"
                style="width: 100%;"
                type="textarea"
                :disabled="item.editDisabled ? item.editDisabled : false"
              ></el-input>
            </el-form-item>
          </el-col>
        </div>
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
import { driverList } from "@/config/vehicleList";
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
      ischanged: 0,
      checkList1: "",
      checkList2: "",
      checkList3: "",
      driverDetailList: {},
    };
  },
  computed: {},
  watch: {
    vehicleVisible: {
      handler(val) {
        if (val === true) {
          this.updatedisable = false;
          this.updateLoading = false;
          this.ischanged = 0;
          this.fileList = [];
          this.driverDetailList = {};
          this.getModules("editDisplay");
          this.getDriverDetail();
        }
      },
    },
  },
  methods: {
    //地区报警处理率
    async getDriverDetail() {
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getDriverDetail({
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
    // modules
    getModules(displayNow) {
      let module1 = [];
      let module2 = [];
      let module3 = [];
      driverList().map((el) => {
        if (el[displayNow] == undefined || el[displayNow] == true) {
          if (el.driverModules === "基本信息" && el.label !== "企业名称") {
            module1.push(el);
          } else if (el.driverModules === "其他信息") {
            module2.push(el);
          } else if (el.driverModules === "证件信息") {
            module3.push(el);
          }
        }
        if (el.type === "select" && el.mockKey === "dic") {
          this.getDicData(el.dicKey).then((res) => {
            el.dicData = res;
          });
        }
      });
      this.checkList1 = this.getSort(module1);
      this.checkList2 = this.getSort(module2);
      this.checkList3 = this.getSort(module3);
    },
    // 排序
    getSort(arr) {
      let b = 0; //设置用来调换位置的值
      let a = arr; //冒泡排序
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i; j++) {
          if (a[j + 1] != undefined) {
            if (a[j].sort > a[j + 1].sort) {
              b = a[j];
              a[j] = a[j + 1];
              a[j + 1] = b;
            }
          }
        }
      }
      return a;
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
    // 标签卡切换
    cardChange(index) {
      this.ischanged = index;
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
        margin-left: 5px;
        .cehicleCard_b {
          padding: 10px 30px;
          margin-right: 2px;
          // color: #409eff;
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
