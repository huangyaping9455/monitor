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
      <span
        :class="['cehicleCard_b', { isChange: ischanged === 3 }]"
        @click="cardChange(3)"
        >设备信息</span
      >
      <span
        :class="['cehicleCard_b', { isChange: ischanged === 4 }]"
        @click="cardChange(4)"
        >保险信息</span
      >
    </div>
    <div class="cehicleCard_form">
      <el-form
        ref="form"
        :model="vehicleDetailList"
        label-width="170px"
        style="overflow: auto"
        v-if="ischanged !== 4"
      >
        <div
          v-show="ischanged === indexs"
          v-for="(el, indexs) in [
            checkList1,
            checkList2,
            checkList3,
            checkList4,
          ]"
          :key="indexs"
          style="display: flex; flex-wrap: wrap"
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
              <!-- :disabled="item.editDisabled ? item.editDisabled : false" -->
              <el-input
                v-if="item.type === 'input'"
                v-model="vehicleDetailList[item.prop]"
                disabled
              />
              <el-select
                v-model="vehicleDetailList[item.prop]"
                style="width: 100%"
                v-if="item.type === 'select'"
                disabled
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
                v-model="vehicleDetailList[item.prop]"
                style="width: 100%"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                disabled
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
                  !vehicleDetailList[item.prop] ||
                  vehicleDetailList[item.prop] === ''
                    ? []
                    : typeof vehicleDetailList[item.prop] !== typeof item.prop
                    ? vehicleDetailList[item.prop]
                    : JSON.parse(vehicleDetailList[item.prop])
                "
                disabled
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-input-number
                v-if="item.type === 'number'"
                v-model="vehicleDetailList[item.prop]"
                controls-position="right"
                :min="0"
                style="width: 100%"
                disabled
              ></el-input-number>
            </el-form-item>
          </el-col>
        </div>
      </el-form>
      <el-form
        ref="form"
        :model="insuranceDetailList"
        label-width="170px"
        style="overflow: auto"
        v-else
      >
        <el-col :span="12">
          <el-form-item label="交强险到期日期" prop="jiaoqiangxianshijian">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="insuranceDetailList.jiaoqiangxianshijian"
              style="width: 100%"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              disabled
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商业险到期日期" prop="shangyexianshijian">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="insuranceDetailList.shangyexianshijian"
              style="width: 100%"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              disabled
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="超赔险到期日期" prop="">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="insuranceDetailList.chaopeixianshijian"
              style="width: 100%"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              disabled
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="雇主险到期日期" prop="guzhuxianshijian">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="insuranceDetailList.guzhuxianshijian"
              style="width: 100%"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              disabled
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="交强险附件" prop="">
            <el-upload
              action=""
              :on-preview="handlePictureCardPreview"
              :file-list="
                insuranceDetailList.jiaoqiangxianfujian != '' &&
                typeof insuranceDetailList.jiaoqiangxianfujian == typeof [1]
                  ? insuranceDetailList.jiaoqiangxianfujian
                  : []
              "
              disabled
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商业险附件" prop="">
            <el-upload
              action=""
              :on-preview="handlePictureCardPreview"
              :file-list="
                insuranceDetailList.shangyexianfujian != '' &&
                typeof insuranceDetailList.shangyexianfujian == typeof [1]
                  ? insuranceDetailList.shangyexianfujian
                  : []
              "
              disabled
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="超赔险附件" prop="">
            <el-upload
              action=""
              :on-preview="handlePictureCardPreview"
              :file-list="
                insuranceDetailList.chaopeixianfujian != '' &&
                typeof insuranceDetailList.chaopeixianfujian == typeof [1]
                  ? insuranceDetailList.chaopeixianfujian
                  : []
              "
              disabled
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="雇主险附件" prop="">
            <el-upload
              action=""
              :on-preview="handlePictureCardPreview"
              :file-list="
                insuranceDetailList.guzhuxianfujian != '' &&
                typeof insuranceDetailList.guzhuxianfujian == typeof [1]
                  ? insuranceDetailList.guzhuxianfujian
                  : []
              "
              disabled
            >
              <el-button size="small" type="primary">点击上传</el-button>
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
import { vehicleList } from "@/config/vehicleList";
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
      checkList4: "",
      vehicleDetailList: {},
      insuranceDetailList: {
        jiaoqiangxianfujian: "",
        jiaoqiangxianshijian: "",
        shangyexianfujian: "",
        shangyexianshijian: "",
        chaopeixianfujian: "",
        chaopeixianshijian: "",
        guzhuxianfujian: "",
        guzhuxianshijian: "",
      },
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
          this.vehicleDetailList = {};
          this.getModules("editDisplay");
          this.vehicleDetail();
        }
      },
    },
  },
  methods: {
    //地区报警处理率
    async vehicleDetail() {
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getVehicleDetail({
          id: this.vehiclemsgList.id,
        })
      );
      this.msgloading = false;
      if (data) {
        this.vehicleDetailList = data;
        if (this.vehicleDetailList.yunyingshang === "null") {
          this.vehicleDetailList.yunyingshang = "";
        }
        if (this.vehicleDetailList.changpai === "null") {
          this.vehicleDetailList.changpai = "";
        }
        if (this.vehicleDetailList.chejiahao === "null") {
          this.vehicleDetailList.chejiahao = "";
        }
        if (this.vehicleDetailList.chezhudianhua === "null") {
          this.vehicleDetailList.chezhudianhua = "";
        }
        if (this.vehicleDetailList.jiashiyuandianhua === "null") {
          this.vehicleDetailList.jiashiyuandianhua = "";
        }
        if (this.vehicleDetailList.yayunyuandianhua === "null") {
          this.vehicleDetailList.yayunyuandianhua = "";
        }
        if (this.vehicleDetailList.yunyingshangmingcheng === "null") {
          this.vehicleDetailList.yunyingshangmingcheng = "";
        }
        if (this.vehicleDetailList.zhongduanleixing == "-1") {
          this.vehicleDetailList.zhongduanleixing = "";
        }

        // 交强险
        this.insuranceDetailList.jiaoqiangxianfujian =
          this.vehicleDetailList.jiaoqiangxianfujian.indexOf("[") != -1
            ? JSON.parse(this.vehicleDetailList.jiaoqiangxianfujian)
            : "";
        this.insuranceDetailList.jiaoqiangxianid =
          this.vehicleDetailList.jiaoqiangxianid;
        this.insuranceDetailList.jiaoqiangxianshijian =
          this.vehicleDetailList.jiaoqiangxianshijian;
        // 商业险
        this.insuranceDetailList.shangyexianfujian =
          this.vehicleDetailList.shangyexianfujian.indexOf("[") != -1
            ? JSON.parse(this.vehicleDetailList.shangyexianfujian)
            : "";
        this.insuranceDetailList.shangyexianid =
          this.vehicleDetailList.shangyexianid;
        this.insuranceDetailList.shangyexianshijian =
          this.vehicleDetailList.shangyexianshijian;
        // 超赔险
        this.insuranceDetailList.chaopeixianfujian =
          this.vehicleDetailList.chaopeixianfujian.indexOf("[") != -1
            ? JSON.parse(this.vehicleDetailList.chaopeixianfujian)
            : "";
        this.insuranceDetailList.chaopeixianid =
          this.vehicleDetailList.chaopeixianid;
        this.insuranceDetailList.chaopeixianshijian =
          this.vehicleDetailList.chaopeixianshijian;
        // 雇主险
        this.insuranceDetailList.guzhuxianfujian =
          this.vehicleDetailList.guzhuxianfujian.indexOf("[") != -1
            ? JSON.parse(this.vehicleDetailList.guzhuxianfujian)
            : "";
        this.insuranceDetailList.guzhuxianid =
          this.vehicleDetailList.guzhuxianid;
        this.insuranceDetailList.guzhuxianshijian =
          this.vehicleDetailList.guzhuxianshijian;
      } else {
        this.$message.error(err);
      }
    },
    // modules
    getModules(displayNow) {
      let module1 = [];
      let module2 = [];
      let module3 = [];
      let module4 = [];
      vehicleList().map((el) => {
        if (el[displayNow] == undefined || el[displayNow] == true) {
          if (el.vehicleModules === "基本信息" && el.label !== "企业名称") {
            module1.push(el);
          } else if (el.vehicleModules === "其他信息") {
            module2.push(el);
          } else if (el.vehicleModules === "证件信息") {
            module3.push(el);
          } else if (el.vehicleModules === "设备信息") {
            module4.push(el);
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
      this.checkList4 = this.getSort(module4);
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
    // 预览
    handlePictureCardPreview(file) {
      window.open(file.url, "_blank");
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
