<template>
  <el-form class="organform" ref="rowDetail" :model="dataForm" :disabled="state">
    <div class="form_detail">
      <el-col :span="12">
        <el-form-item label="驾驶证号" prop="ajjFileNo">
          <el-input v-model="dataForm.ajjFileNo" placeholder="请输入驾驶证号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="有效日期" prop="ajjValidPeriodStart">
          <div class="datem">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="dataForm.ajjValidPeriodStart"
              placeholder="选择日期"
            >
            </el-date-picker>
            <span class="zhi">至</span>
            <div class="changqi">
              <el-radio-group v-model="dateLong" style="display: flex">
                <el-radio label="长期">长期</el-radio>
                <el-radio label="非长期">非长期</el-radio>
              </el-radio-group>
              <el-date-picker
                v-if="dateLong == '非长期'"
                v-model="dataForm.ajjValidPeriodEnd"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择日期"
                style="width: 100%"
              >
              </el-date-picker>
            </div>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="档案编号" prop="ajjNo">
          <el-input v-model="dataForm.ajjNo" placeholder="请输入档案编号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="证件照片(只能上传jpg/png格式)">
          <div class="datem1">
            <el-upload
              style="display: flex; width: 274px"
              action="api/blade-upload/upload/upload?fileId=driver&table=anbiao_driver"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :file-list="fileList1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-upload
              style="display: flex; width: 274px"
              action="api/blade-upload/upload/upload?fileId=driver&table=anbiao_driver"
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
      dateLong: "长期",
      dataForm: {},
    };
  },
  watch: {
    rowDetail: {
      handler(item) {
        this.dataForm = JSON.parse(JSON.stringify(item));
        this.fileList1 = [];
        this.fileList2 = [];
        // 附件
        if (item.ajjFrontPhotoAddress && item.ajjFrontPhotoAddress.indexOf("[") != -1) {
          this.fileList1 = [JSON.parse(item.ajjFrontPhotoAddress)[0]];
        } else if (item.ajjFrontPhotoAddress && item.ajjFrontPhotoAddress.indexOf("http") != -1) {
          if (item.ajjFrontPhotoAddress.indexOf(",") != -1) {
            this.fileList1 = [
              {
                url: item.ajjFrontPhotoAddress.split(",")[0],
              },
            ];
          } else {
            this.fileList1 = [
              {
                url: item.ajjFrontPhotoAddress,
              },
            ];
          }
        }
        // 反面
        if (item.ajjAttachedPhotos && item.ajjAttachedPhotos.indexOf("[") != -1) {
          this.fileList2 = [JSON.parse(item.ajjAttachedPhotos)[0]];
        } else if (item.ajjAttachedPhotos && item.ajjAttachedPhotos.indexOf("http") != -1) {
          if (item.ajjAttachedPhotos.indexOf(",") != -1) {
            this.fileList2 = [
              {
                url: item.ajjAttachedPhotos.split(",")[0],
              },
            ];
          } else {
            this.fileList2 = [{ url: item.ajjAttachedPhotos }];
          }
        }
        // 有效期
        if (item.ajjValidPeriodEnd !== "长期") {
          this.dateLong = "非长期";
        } else {
          this.dateLong = "长期";
          item.ajjValidPeriodEnd = "";
        }
      },
    },
    // 长期 触发
    dateLong: {
      handler(val) {
        if (val == "长期") {
          this.dataForm.ajjValidPeriodEnd = "";
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
            align-items: center;
            .zhi {
              color: #121212;
              margin: 0 5px;
            }
            .changqi {
              display: flex;
              align-items: center;
              flex-direction: column;
            }
          }
        }
      }
    }
  }
}
</style>
