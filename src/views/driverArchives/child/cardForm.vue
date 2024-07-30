<template>
  <el-form class="organform" ref="rowDetail" :model="rowDetail" :disabled="state">
    <div class="form_detail">
      <el-col :span="12">
        <el-form-item label="人员姓名" prop="jiashiyuanxingming">
          <el-input v-model="rowDetail.jiashiyuanxingming" placeholder="请输入姓名"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="身份证号" prop="shenfenzhenghao">
          <el-input v-model="rowDetail.shenfenzhenghao" placeholder="请输入身份证号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="有效日期" prop="shenfenzhengchulingriqi">
          <div class="datem">
            <el-date-picker
              v-model="rowDetail.shenfenzhengchulingriqi"
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width: 100%"
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
                v-model="rowDetail.shenfenzhengyouxiaoqi"
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
        <el-form-item label="驾驶员类型" prop="jiashiyuanleixing">
          <el-select
            v-model="rowDetail.jiashiyuanleixing"
            style="width: 100%"
            placeholder="请选择驾驶员类型"
            filterable
          >
            <el-option
              v-for="item in congyerenList"
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
// import { getByCode } from "@/api/system/dept";
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
      baseUrl: "api/blade-upload/upload/upload?fileId=driver&table=anbiao_driver",
      congyerenList: [],
      dateLong: "长期",
    };
  },
  watch: {
    rowDetail: {
      handler(item) {
        // this.getCongyerenyuan();
        this.fileList1 = [];
        this.fileList2 = [];
        if (item.shenfenzhengyouxiaoqi !== "3000-01-01") {
          this.dateLong = "非长期";
        } else {
          this.dateLong = "长期";
          // item.shenfenzhengyouxiaoqi = "";
        }
        // 身份证 附件处理
        if (item.shenfenzhengfujian && item.shenfenzhengfujian.indexOf("[") != -1) {
          this.fileList1 = [JSON.parse(item.shenfenzhengfujian)[0]];
        } else if (item.shenfenzhengfujian && item.shenfenzhengfujian.indexOf("http") != -1) {
          if (item.shenfenzhengfujian.indexOf(",") != -1) {
            this.fileList1 = [
              {
                url: item.shenfenzhengfujian.split(",")[0],
              },
            ];
          } else {
            this.fileList1 = [
              {
                url: item.shenfenzhengfujian,
              },
            ];
          }
        }
        // 反面
        if (item.shenfenzhengfanmianfujian && item.shenfenzhengfanmianfujian.indexOf("[") != -1) {
          this.fileList2 = [JSON.parse(item.shenfenzhengfanmianfujian)[0]];
        } else if (
          item.shenfenzhengfanmianfujian &&
          item.shenfenzhengfanmianfujian.indexOf("http") != -1
        ) {
          if (item.shenfenzhengfanmianfujian.indexOf(",") != -1) {
            this.fileList2 = [
              {
                url: item.shenfenzhengfanmianfujian.split(",")[0],
              },
            ];
          } else {
            this.fileList2 = [
              {
                url: item.shenfenzhengfanmianfujian,
              },
            ];
          }
        }
      },
    },
    // 长期 触发
    dateLong: {
      handler(val) {
        if (val == "长期") {
          this.rowDetail.shenfenzhengyouxiaoqi = "";
        }
      },
    },
  },
  methods: {
    handlePictureCardPreview(file) {
      window.open(file.url, "_blank");
    },
    // 驾驶员类型
    getCongyerenyuan() {
      getByCode({
        code: "congyerenyuanleixing",
        deptId: this.$store.getters.deptId,
      }).then((ok) => {
        this.congyerenList = ok.data.data;
      });
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
              height: 106px;
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
            .changqi {
              display: flex;
              flex-direction: column;
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
