<template>
  <el-form class="organform" ref="rowDetail" :model="dataForm" :disabled="state">
    <div class="form_detail">
      <el-col :span="8">
        <el-form-item label="业户名称" prop="avdBusinessOwner">
          <el-input v-model="dataForm.avdBusinessOwner" placeholder="请输入业户名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="地址" prop="avdAddress">
          <el-input v-model="dataForm.avdAddress" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车辆号牌" prop="avdPlateNo">
          <el-input
            v-model="dataForm.avdPlateNo"
            placeholder="请输入车辆号牌"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="经营许可证号" prop="avdBusinessLicenseNo">
          <el-input
            v-model="dataForm.avdBusinessLicenseNo"
            placeholder="请输入经营许可证号"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="经济类型" prop="avdEconomicType">
          <el-input v-model="dataForm.avdEconomicType" placeholder="请输入经济类型"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车辆类型" prop="avdVehicleType">
          <el-input v-model="dataForm.avdVehicleType" placeholder="请输入车辆类型"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="吨（座）位" prop="avdTonnage">
          <el-input
            type="number"
            v-model="dataForm.avdTonnage"
            placeholder="请输入吨（座）位"
          ></el-input>
        </el-form-item>
      </el-col>
      <div class="v_type">
        <div class="line"></div>
        <span>车辆尺寸</span>
      </div>
      <el-col :span="8">
        <el-form-item label="长" prop="avdVehicleLong">
          <el-input type="number" v-model="dataForm.avdVehicleLong" placeholder="请输入长">
            <template slot="append">mm</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="宽" prop="avdVehicleWide">
          <el-input type="number" v-model="dataForm.avdVehicleWide" placeholder="请输入宽">
            <template slot="append">mm</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="高" prop="avdVehicleHigh">
          <el-input type="number" v-model="dataForm.avdVehicleHigh" placeholder="请输入高">
            <template slot="append">mm</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="经营范围" prop="avdNatureBusiness">
          <el-input v-model="dataForm.avdNatureBusiness" placeholder="请输入经营范围"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="发证日期" prop="avdIssueDate">
          <el-date-picker
            type="date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            v-model="dataForm.avdIssueDate"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="审验有效期" prop="avdSyBegDate">
          <div class="datem">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="dataForm.avdSyBegDate"
              placeholder="选择日期"
            >
            </el-date-picker>
            <span class="zhi">至</span>
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="dataForm.avdSyEndDate"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="技术等级有效期" prop="avdJsdjBegDate">
          <div class="datem">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="dataForm.avdJsdjBegDate"
              placeholder="选择日期"
            >
            </el-date-picker>
            <span class="zhi">至</span>
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="dataForm.avdJsdjEndDate"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="备注" prop="avdRemarks">
          <el-input
            type="textarea"
            v-model="dataForm.avdRemarks"
            placeholder="请输入备注"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="证件照片(只能上传jpg/png格式)">
          <div class="datem">
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
      baseUrl: "api/blade-upload/upload/upload?fileId=driver&table=anbiao_driver",
      dataForm: {},
    };
  },
  watch: {
    rowDetail: {
      handler(item) {
        this.dataForm = JSON.parse(JSON.stringify(item));
        this.fileList1 = [];
        if (item.avdEnclosure && item.avdEnclosure.indexOf("[") != -1) {
          this.fileList1 = JSON.parse(item.avdEnclosure);
        } else if (item.avdEnclosure && item.avdEnclosure.indexOf("http") != -1) {
          if (item.avdEnclosure.indexOf(",") != -1) {
            item.avdEnclosure.split(",").map((el) => {
              this.fileList1.push({ url: el });
            });
          } else {
            this.fileList1 = [{ url: item.avdEnclosure }];
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
          .datem {
            display: flex;
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
            .zhi {
              color: #121212;
              margin: 0 5px;
            }
          }
        }
      }
    }
  }
}
</style>
