<template>
  <el-form class="organform" ref="rowDetail" :model="dataForm" :disabled="state" :rules="rules">
    <div class="form_detail">
      <el-col :span="12">
        <el-form-item label="车辆牌照" prop="avxFileNo">
          <el-input
            v-model="dataForm.avxFileNo"
            placeholder="请输入车辆牌照"
            @input="$forceUpdate()"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="有效日期" prop="avxInspectionDate">
          <div style="display: flex">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="dataForm.avxInspectionDate"
              placeholder="选择日期"
              @change="$forceUpdate()"
            >
            </el-date-picker>
            <span style="margin: 0 5px" class="zhi">至</span>
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="dataForm.avxLastDate"
              placeholder="选择日期"
              @change="$forceUpdate()"
            >
            </el-date-picker>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="上传附件(只能上传jpg/png)">
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
    state: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    rows: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      fileList1: [],
      rules: {
        // avxInspectionDate: [
        //   { required: true, message: "请选择开始时间", trigger: "blur" },
        // ],
        // avxLastDate: [
        //   { required: true, message: "请选择结束时间", trigger: "blur" },
        // ],
        // avxFileNo: [
        //   { required: true, message: "请输入车牌号", trigger: "blur" },
        // ],
      },
      baseUrl: "api/blade-upload/upload/upload?fileId=driver&table=anbiao_driver",
      dataForm: {},
    };
  },
  watch: {
    rowDetail: {
      handler(item) {
        this.dataForm = JSON.parse(JSON.stringify(item));
        this.fileList1 = [];
        if (item.avxEnclosure && item.avxEnclosure.indexOf("[") != -1) {
          this.fileList1 = JSON.parse(item.avxEnclosure);
        } else if (item.avxEnclosure.indexOf("http") != -1) {
          if (item.avxEnclosure.indexOf(",") != -1) {
            item.avxEnclosure.split(",").map((el) => {
              this.fileList1.push({ url: el });
            });
          } else {
            this.fileList1 = [{ url: item.avxEnclosure }];
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
              margin-bottom: 10px;
              line-height: 105px;
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
