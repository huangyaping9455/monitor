<template>
  <el-form class="organform" ref="rowDetail" :model="dataForm" :disabled="state">
    <div class="form_detail">
      <div class="v_type">
        <div class="line"></div>
        <span>基本信息</span>
      </div>
      <el-col :span="8">
        <el-form-item label="人员姓名" prop="ajrName">
          <el-input
            v-model="dataForm.ajrName"
            placeholder="请输入人员姓名"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="人员姓别" prop="ajrSex">
          <el-radio-group v-model="dataForm.ajrSex">
            <el-radio :label="'1'">男</el-radio>
            <el-radio :label="'0'">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="民族" prop="ajrNation">
          <el-input v-model="dataForm.ajrNation" placeholder="请输入民族" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="籍贯" prop="ajrNativePlace">
          <el-input v-model="dataForm.ajrNativePlace" placeholder="请输入籍贯" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="入职日期" prop="ajrEntryTime">
          <div class="datem">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              v-model="dataForm.ajrEntryTime"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="出生年月" prop="ajrBirth">
          <el-date-picker
            v-model="dataForm.ajrBirth"
            type="date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="当前年龄" prop="ajrAge">
          <el-input-number
            v-model="dataForm.ajrAge"
            placeholder="请输入当前年龄"
            controls-position="right"
            style="width: 100%"
          ></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="政治面貌" prop="ajrPoliticalOutlook">
          <el-select
            placeholder="请选择政治面貌"
            v-model="dataForm.ajrPoliticalOutlook"
            style="width: 100%"
          >
            <el-option label="群众" value="群众"> </el-option>
            <el-option label="党员" value="党员"> </el-option>
            <el-option label="团员" value="团员"> </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="学历" prop="ajrEducation">
          <el-select placeholder="请选择学历" v-model="dataForm.ajrEducation" style="width: 100%">
            <el-option label="初中" value="初中"> </el-option>
            <el-option label="高中" value="高中"> </el-option>
            <el-option label="大专" value="大专"> </el-option>
            <el-option label="本科" value="本科"> </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="毕业院校" prop="ajrGraduationSchool">
          <el-input
            v-model="dataForm.ajrGraduationSchool"
            placeholder="请输入毕业院校"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="毕业时间" prop="ajrGraduationDate">
          <el-date-picker
            v-model="dataForm.ajrGraduationDate"
            type="date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="身份证号码" prop="ajrIdNumber">
          <el-input v-model="dataForm.ajrIdNumber" placeholder="请输入身份证号码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="家庭住址" prop="ajrAddress">
          <el-input v-model="dataForm.ajrAddress" placeholder="请输入家庭住址" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="领取驾照时间" prop="ajrReceiveDrivingLicense">
          <el-date-picker
            v-model="dataForm.ajrReceiveDrivingLicense"
            type="date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="驾照等级" prop="ajrClass">
          <el-select placeholder="请选择驾照等级" v-model="dataForm.ajrClass" style="width: 100%">
            <el-option
              v-for="(item, index) in jiazhaoList"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="从事驾驶年龄" prop="ajrDrivingExperience">
          <el-input
            type="number"
            v-model="dataForm.ajrDrivingExperience"
            placeholder="请输入从事驾驶年龄"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="健康状况" prop="ajrHealthStatus">
          <el-input
            v-model="dataForm.ajrHealthStatus"
            placeholder="请输入健康状况"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <div class="v_type">
        <div class="line"></div>
        <span><i style="color: red">*</i> 本人照片(只能上传jpg/png格式)</span>
      </div>
      <el-col :span="24">
        <el-form-item label="" prop="ajrHeadPortrait">
          <div class="datem">
            <el-upload
              style="display: flex; width: 274px"
              action="api/blade-upload/upload/upload?fileId=driver&table=anbiao_driver"
              list-type="picture-card"
              ref="uploadComp"
              :on-preview="handlePictureCardPreview"
              :file-list="fileList1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </el-form-item>
      </el-col>
      <div class="v_type">
        <div class="line"></div>
        <span>工作经历</span>
      </div>
      <el-col :span="24">
        <el-form-item label="" prop="ajrWorkExperience">
          <el-input
            type="textarea"
            v-model="dataForm.ajrWorkExperience"
            placeholder="请输入工作经历"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <div class="v_type">
        <div class="line"></div>
        <span>安全驾驶记录</span>
      </div>
      <div class="jiashijilu">
        <div class="jilu_list">
          <span>前三年内是否未发生道路交通事故致人死亡且同等以上责任</span>
          <el-radio-group v-model="dataForm.ajrSafeDrivingRecord1">
            <el-radio :label="'1'">是</el-radio>
            <el-radio :label="'0'">否</el-radio>
          </el-radio-group>
        </div>
        <div class="jilu_list">
          <span>是否无交通违法记录满分记录</span>
          <el-radio-group v-model="dataForm.ajrSafeDrivingRecord2">
            <el-radio :label="'1'">是</el-radio>
            <el-radio :label="'0'">否</el-radio>
          </el-radio-group>
        </div>
        <div class="jilu_list">
          <span>是否无酒后驾驶记录、超员20%、三次以上超速记录</span>
          <el-radio-group v-model="dataForm.ajrSafeDrivingRecord3">
            <el-radio :label="'1'">是</el-radio>
            <el-radio :label="'0'">否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="v_type">
        <div class="line"></div>
        <span>体检结果</span>
      </div>
      <el-col :span="24">
        <el-form-item label="" prop="ajrPhysicalExaminationResults">
          <el-input
            type="textarea"
            v-model="dataForm.ajrPhysicalExaminationResults"
            placeholder="请输入体检结果"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <div class="v_type">
        <div class="line"></div>
        <span>诚信考核结果</span>
      </div>
      <div class="text_t">本人承诺以上内容均属实</div>
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
      jiazhaoList: [],
      dataForm: {},
    };
  },
  watch: {
    rowDetail: {
      handler(item) {
        console.log(item);
        this.dataForm = JSON.parse(JSON.stringify(item));
        this.fileList1 = [];
        if (item.ajrHeadPortrait && item.ajrHeadPortrait.indexOf("[") != -1) {
          this.fileList1 = [
            JSON.parse(item.ajrHeadPortrait)[0] ? JSON.parse(item.ajrHeadPortrait)[0] : "",
          ];
        } else if (item.ajrHeadPortrait && item.ajrHeadPortrait.indexOf("http") != -1) {
          if (item.ajrHeadPortrait.indexOf(",") != -1) {
            this.fileList1 = [
              {
                url: item.ajrHeadPortrait.split(",")[0] ? item.ajrHeadPortrait.split(",")[0] : "",
              },
            ];
          } else {
            this.fileList1 = [{ url: item.ajrHeadPortrait == "" ? "" : item.ajrHeadPortrait }];
          }
        }
        this.getDicData("zhunjiachexing").then((res) => {
          this.jiazhaoList = res;
        });
      },
      immediate: false,
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
    .text_t {
      margin-left: 10px;
      margin-bottom: 10px;
    }
    .photo_m {
      width: 100px;
      height: 130px;
      margin-bottom: 10px;
    }
    .shenpi {
      background-color: #f5f5f5;
      width: 100%;
      padding: 15px;
      border-radius: 5px;
      .sign {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding-right: 40px;
        margin-top: 20px;

        span {
          text-align: end;
        }
        .sign_t {
          width: 100px;
          height: 40px;
        }
      }
    }
    .jiashijilu {
      width: calc(100% - 40px);
      display: flex;
      flex-direction: column;
      line-height: 40px;
      padding: 0px 20px 10px 20px;
      .jilu_list {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
            .avatar-uploader {
              margin-right: 20px;
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
}
</style>
