<template>
  <el-form class="organform" ref="rowDetail" :model="dataForm" :disabled="state" :rules="rules">
    <div class="form_detail">
      <el-col :span="8">
        <el-form-item label="号牌号码" prop="avxPlateNo">
          <el-input
            v-model="dataForm.avxPlateNo"
            placeholder="请输入号牌号码"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车辆类型" prop="avxVehicleType">
          <el-input v-model="dataForm.avxVehicleType" placeholder="请输入车辆类型"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="所有人" prop="avxOwner">
          <el-input v-model="dataForm.avxOwner" placeholder="请输入所有人"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="住址" prop="avxAddress">
          <el-input v-model="dataForm.avxAddress" placeholder="请输入住址"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="使用性质" prop="avxUseCharter">
          <el-input v-model="dataForm.avxUseCharter" placeholder="请输入使用性质"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="品牌型号" prop="avxModel">
          <el-input v-model="dataForm.avxModel" placeholder="请输入品牌型号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车辆识别代码" prop="avxVin">
          <el-input v-model="dataForm.avxVin" placeholder="请输入车辆识别代码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="发动机号码" prop="avxEngineNo">
          <el-input v-model="dataForm.avxEngineNo" placeholder="请输入发动机号码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="注册日期" prop="avxRegisterDate">
          <el-date-picker
            type="date"
            style="width: 100%"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            v-model="dataForm.avxRegisterDate"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="发证日期" prop="avxIssueDate">
          <el-date-picker
            type="date"
            style="width: 100%"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            v-model="dataForm.avxIssueDate"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="检验有效期" prop="avxIssueDate">
          <el-date-picker
            type="month"
            value-format="yyyy-MM"
            format="yyyy-MM"
            style="width: 100%"
            v-model="dataForm.avxValidUntil"
            placeholder="选择日期"
          >
          </el-date-picker>
          <!-- </div> -->
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="强制报废日期" prop="avxBaofeiTime">
          <el-date-picker
            type="date"
            style="width: 100%"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            v-model="dataForm.avxBaofeiTime"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="档案编号" prop="avxFileNo">
          <el-input
            style="width: 100%"
            v-model="dataForm.avxFileNo"
            placeholder="请输入档案编号"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="核定载人数" prop="avxAuthorizedSeatingCapacity">
          <el-input
            style="width: 100%"
            type="number"
            v-model="dataForm.avxAuthorizedSeatingCapacity"
            placeholder="请输入核定载人数"
          >
            <template slot="append">人</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="总质量" prop="avxTotalMass">
          <el-input
            style="width: 100%"
            type="number"
            v-model="dataForm.avxTotalMass"
            placeholder="请输入总质量"
          >
            <template slot="append">kg</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="整备质量" prop="avxCurbWeight">
          <el-input
            style="width: 100%"
            type="number"
            v-model="dataForm.avxCurbWeight"
            placeholder="请输入整备质量"
          >
            <template slot="append">kg</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="核定载质量" prop="avxApprovedLoadCapacity">
          <el-input
            style="width: 100%"
            type="number"
            v-model="dataForm.avxApprovedLoadCapacity"
            placeholder="请输入核定载质量"
          >
            <template slot="append">kg</template></el-input
          >
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="外廓尺寸" prop="avxOverallDimensions">
          <el-input
            style="width: 100%"
            v-model="dataForm.avxOverallDimensions"
            placeholder="请输入外廓尺寸"
          >
            <template slot="append">mm</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="准牵引总质量" prop="avxQuasiTractiveMass">
          <el-input
            style="width: 100%"
            type="number"
            v-model="dataForm.avxQuasiTractiveMass"
            placeholder="请输入准牵引总质量"
          >
            <template slot="append">kg</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="备注" prop="avxRemarks">
          <el-input
            style="width: 100%"
            type="textarea"
            v-model="dataForm.avxRemarks"
            placeholder="请输入备注"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="检验记录" prop="avxInspectionRecord">
          <el-input
            type="textarea"
            v-model="dataForm.avxInspectionRecord"
            placeholder="请输入检验记录"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="证件照片(只能上传jpg/png格式,正面)">
          <div class="datem1">
            <el-upload
              action="api/blade-upload/upload/upload?fileId=driver&table=anbiao_driver"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :file-list="fileList1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="证件照片(只能上传jpg/png格式,反面)">
          <div class="datem1">
            <el-upload
              action="api/blade-upload/upload/upload?fileId=vehicle&table=anbiao_vehicle"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :file-list="fileList2"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </el-form-item>
      </el-col>
    </div>
  </el-form>
</template>

<script>
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
    state: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      fileList1: [],
      fileList2: [],
      dialogImageUrl: "",
      dialogVisible: false,
      rules: {
        // avxFileNo: [
        //   { required: true, message: "请输入行驶证号", trigger: "blur" },
        // ],
        // avxIssueDate: [{ required: true, validator: date1, trigger: "blur" }],
        // avxIssueDate: [
        //   { required: true, message: "有效时间", trigger: "blur" },
        // ],
      },
      baseUrl: "api/blade-upload/upload/upload?fileId=driver&table=anbiao_driver",

      dataForm: {},
      fileList3: [],
    };
  },
  watch: {
    rowDetail: {
      handler(item) {
        this.dataForm = JSON.parse(JSON.stringify(item));
        this.fileList1 = [];
        this.fileList2 = [];
        this.fileList3 = [];
        // 附件 赋值
        if (item.avxOriginalEnclosure && item.avxOriginalEnclosure.indexOf("[") != -1) {
          this.fileList1 = [JSON.parse(item.avxOriginalEnclosure)[0]];
        } else if (item.avxOriginalEnclosure && item.avxOriginalEnclosure.indexOf("http") != -1) {
          if (item.avxOriginalEnclosure.indexOf(",") != -1) {
            this.fileList1 = [
              {
                url: item.avxOriginalEnclosure.split(",")[0],
              },
            ];
          } else {
            this.fileList1 = [
              {
                url: item.avxOriginalEnclosure,
              },
            ];
          }
        }
        if (item.avxCopyEnclosure && item.avxCopyEnclosure.indexOf("[") != -1) {
          this.fileList2 = [JSON.parse(item.avxCopyEnclosure)[0]];
        } else if (item.avxCopyEnclosure.indexOf("http") != -1) {
          if (item.avxCopyEnclosure.indexOf(",") != -1) {
            this.fileList2 = [
              {
                url: item.avxCopyEnclosure.split(",")[0],
              },
            ];
          } else {
            this.fileList2 = [
              {
                url: item.avxCopyEnclosure,
              },
            ];
          }
        }
      },
    },
  },
  methods: {
    handlePictureCardPreview(file) {
      window.open(file.url, "_blank");
    },
  },
};
</script>
<style lang="scss" scoped>
.organform {
  width: 100%;
  height: calc(100% - 120px);
  .form_detail {
    width: 100%;
    height: calc(100%);
    overflow: auto;
    .v_type {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 10px;
      .line {
        width: 5px;
        height: 15px;
        margin-right: 5px;
        background-color: #4ab3f8;
        border-radius: 3px;
      }
      span {
        color: #a6a6a6;
      }
    }
    .el-col {
      padding-right: 40px;
      ::v-deep .el-form-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .el-form-item__content {
          width: 100%;
          .datem1 {
            .el-upload--picture-card {
              background-color: #f7f6ff;
              width: 117px;
              height: 105px;
              line-height: 105px;
              margin-bottom: 10px;
            }
            .el-upload-list--picture-card .el-upload-list__item {
              width: 117px;
              height: 105px;
            }
          }
          .datem {
            display: flex;
            .zhi {
              color: #121212;
              margin: 0 5px;
            }
          }
          .avatar-uploader {
            margin-right: 10px;
            img {
              width: 130px;
              height: 100px;
            }
          }
        }
      }
    }
  }
}
</style>
