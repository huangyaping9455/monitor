<template>
  <el-form class="organform" ref="rowDetail" :model="rowDetail" :disabled="state">
    <div class="form_detail">
      <el-col :span="8">
        <el-form-item label="上传日期">
          <el-date-picker
            v-model="dataForm.ajwDate"
            type="date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="上传附件(只能上传jpg/png格式)">
          <div class="datem">
            <el-upload
              style="display: flex; width: 274px"
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
  },
  data() {
    return {
      fileList1: [],
      dataForm: {},
      baseUrl: "api/blade-upload/upload/upload?fileId=driver&table=anbiao_driver",
    };
  },
  watch: {
    rowDetail: {
      handler(item) {
        this.dataForm = JSON.parse(JSON.stringify(item));
        this.fileList1 = [];
        // 附件
        if (item.ajwEnclosure && item.ajwEnclosure.indexOf("[") != -1) {
          this.fileList1 = JSON.parse(item.ajwEnclosure);
        } else if (item.ajwEnclosure && item.ajwEnclosure.indexOf("http") != -1) {
          if (item.ajwEnclosure.indexOf(",") != -1) {
            item.ajwEnclosure.split(",").map((el) => {
              this.fileList1.push({ url: el });
            });
          } else {
            this.fileList1 = [
              {
                url: item.ajwEnclosure,
              },
            ];
          }
        }
      },
    },
  },
  methods: {
    handlePictureCardPreview(file) {
      window.open(file.url, "blank");
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
