<template>
  <el-form class="organform" ref="rowDetail" :model="rowDetail" :disabled="state">
    <div class="form_detail">
      <el-col :span="12">
        <el-form-item label="从业资格证号" prop="ajcCertificateNo">
          <el-input
            v-model="rowDetail.ajcCertificateNo"
            placeholder="请输入从业资格证号"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="有效日期" prop="ajcInitialIssuing">
          <div class="datem">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="rowDetail.ajcInitialIssuing"
              placeholder="选择日期"
            >
            </el-date-picker>
            <span class="zhi">至</span>
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="rowDetail.ajcValidUntil"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="继续教育信息时间" prop="ajcJxjyxxTime">
          <div class="datem">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="rowDetail.ajcJxjyxxTime"
              placeholder="选择日期"
            >
            </el-date-picker>
            <span class="zhi">至</span>
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="rowDetail.ajcJxjyxxEndTime"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="继续教育信息内容" prop="ajcJxjyxxContent">
          <el-input
            type="textarea"
            style="width: 100%"
            v-model="rowDetail.ajcJxjyxxContent"
            placeholder="请输入继续教育信息内容"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="诚信考核信息时间" prop="ajcCxkhxxTime">
          <div class="datem">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="rowDetail.ajcCxkhxxTime"
              placeholder="选择日期"
            >
            </el-date-picker>
            <span class="zhi">至</span>
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="rowDetail.ajcCxkhxxEndTime"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="诚信考核信息内容" prop="ajcCxkhxxContent">
          <el-input
            type="textarea"
            style="width: 100%"
            v-model="rowDetail.ajcCxkhxxContent"
            placeholder="请输入诚信考核信息内容"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="从业人员类型" prop="ajcCategory">
          <el-select
            v-model="rowDetail.ajcCategory"
            style="width: 100%"
            placeholder="请选择从业人员类型"
            filterable
          >
            <el-option
              v-for="item in congyezhengList"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="证件照片(只能上传jpg/png格式)">
          <div class="datem">
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
          </div>
        </el-form-item>
      </el-col>
    </div>
  </el-form>
</template>

<script>
import governmentApi from "@/api/modules/government";
export default {
  props: {
    rowDetail: {
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
      congyezhengList: [],
    };
  },
  watch: {
    rowDetail: {
      handler(item) {
        this.fileList1 = [];
        // 附件
        if (item.ajcLicence && item.ajcLicence.indexOf("[") != -1) {
          this.fileList1 = JSON.parse(item.ajcLicence);
        } else if (item.ajcLicence && item.ajcLicence.indexOf("http") != -1) {
          if (item.ajcLicence.indexOf(",") != -1) {
            item.ajcLicence.split(",").map((el) => {
              this.fileList1.push({ url: el });
            });
          } else {
            this.fileList1 = [{ url: item.ajcLicence }];
          }
        }
        this.getDicData("congyezigezhengleibie").then((res) => {
          this.congyezhengList = res;
        });
      },
    },
  },
  methods: {
    handlePictureCardPreview(file) {
      window.open(file.url, "_blank");
    },
    // 获取字典
    async getDicData(val) {
      let [err, data] = await governmentApi.awaitWrap(governmentApi.getByCode({ code: val }));
      if (data) {
        return data;
      }
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
  .el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    background: #f7f6ff;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    line-height: 146px;
    vertical-align: top;
  }
}
</style>
