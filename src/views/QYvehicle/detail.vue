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
    <div class="cehicleCard_form">
      <el-form
        ref="form"
        :model="vehiclemsgList"
        label-width="170px"
        style="overflow:auto;"
      >
        <el-col :span="8">
          <el-form-item label="企业名称：">
            <el-input v-model="vehiclemsgList.deptName" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="社会统一信用代码：">
            <el-input v-model="vehiclemsgList.jigoubianma" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营许可证：">
            <el-input
              v-model="vehiclemsgList.jingyingxukezhengbianma"
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营范围：">
            <el-input v-model="vehiclemsgList.jingyingfanwei" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="初次发证日期：">
            <el-date-picker
              type="date"
              disabled
              v-model="vehiclemsgList.jingyingxukezhengchulingriqi"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="有效截止日期：">
            <el-date-picker
              type="date"
              disabled
              v-model="vehiclemsgList.jingyingxukezhengyouxiaoqi"
              style="width: 100%;"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地址：">
            <el-input disabled v-model="vehiclemsgList.xiangxidizhi" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系方式：">
            <el-input disabled v-model="vehiclemsgList.lianxidianhua" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法人姓名：">
            <el-input disabled v-model="vehiclemsgList.farendaibiao" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法人身份证号：">
            <el-input disabled v-model="vehiclemsgList.farenshenfenzheng" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法人电话：">
            <el-input disabled v-model="vehiclemsgList.farendianhua" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业安全负责人电话：">
            <el-input
              disabled
              v-model="vehiclemsgList.securityofficertelephone"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="道路运输许可证：">
            <el-upload
              :action="
                '/api/blade-upload/upload/upload?fileId=profilePhoto&table=company'
              "
              list-type="picture-card"
              :file-list="
                !vehiclemsgList.profilePhoto ||
                vehiclemsgList.profilePhoto === ''
                  ? []
                  : typeof vehiclemsgList.profilePhoto !== typeof 'profilePhoto'
                  ? vehiclemsgList.profilePhoto
                  : vehiclemsgList.profilePhoto.indexOf('[') != -1
                  ? JSON.parse(vehiclemsgList.profilePhoto)
                  : [vehiclemsgList.profilePhoto]
              "
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="营业许可证：">
            <el-upload
              :action="
                '/api/blade-upload/upload/upload?fileId=logoPhoto&table=company'
              "
              list-type="picture-card"
              :file-list="
                !vehiclemsgList.logoPhoto || vehiclemsgList.logoPhoto === ''
                  ? []
                  : typeof vehiclemsgList.logoPhoto !== typeof 'logoPhoto'
                  ? vehiclemsgList.logoPhoto
                  : vehiclemsgList.logoPhoto.indexOf('[') != -1
                  ? JSON.parse(vehiclemsgList.logoPhoto)
                  : [vehiclemsgList.logoPhoto]
              "
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业安全负责人：">
            <el-upload
              :action="
                '/api/blade-upload/upload/upload?fileId=logoRizhi&table=company'
              "
              list-type="picture-card"
              :file-list="
                !vehiclemsgList.logoRizhi || vehiclemsgList.logoRizhi === ''
                  ? []
                  : typeof vehiclemsgList.logoRizhi !== typeof 'logoRizhi'
                  ? vehiclemsgList.logoRizhi
                  : vehiclemsgList.logoRizhi.indexOf('[') != -1
                  ? JSON.parse(vehiclemsgList.logoRizhi)
                  : [vehiclemsgList.logoRizhi]
              "
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="经营许可证：">
            <el-upload
              :action="
                '/api/blade-upload/upload/upload?fileId=homePhotoApp&table=company'
              "
              list-type="picture-card"
              :file-list="
                !vehiclemsgList.homePhotoApp ||
                vehiclemsgList.homePhotoApp === ''
                  ? []
                  : typeof vehiclemsgList.homePhotoApp !== typeof 'homePhotoApp'
                  ? vehiclemsgList.homePhotoApp
                  : vehiclemsgList.homePhotoApp.indexOf('[') != -1
                  ? JSON.parse(vehiclemsgList.homePhotoApp)
                  : [vehiclemsgList.homePhotoApp]
              "
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工商营业执照：">
            <el-upload
              :action="
                '/api/blade-upload/upload/upload?fileId=loginPhotoApp&table=company'
              "
              list-type="picture-card"
              :file-list="
                !vehiclemsgList.loginPhotoApp ||
                vehiclemsgList.loginPhotoApp === ''
                  ? []
                  : typeof vehiclemsgList.loginPhotoApp !==
                    typeof 'loginPhotoApp'
                  ? vehiclemsgList.loginPhotoApp
                  : vehiclemsgList.loginPhotoApp.indexOf('[') != -1
                  ? JSON.parse(vehiclemsgList.loginPhotoApp)
                  : [vehiclemsgList.loginPhotoApp]
              "
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="法人代表：">
            <el-upload
              :action="
                '/api/blade-upload/upload/upload?fileId=fujian&table=company'
              "
              list-type="picture-card"
              :file-list="
                !vehiclemsgList.fujian || vehiclemsgList.fujian === ''
                  ? []
                  : typeof vehiclemsgList.fujian !== typeof 'fujian'
                  ? vehiclemsgList.fujian
                  : vehiclemsgList.fujian.indexOf('[') != -1
                  ? JSON.parse(vehiclemsgList.fujian)
                  : [vehiclemsgList.fujian]
              "
            >
              <i class="el-icon-plus"></i>
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
import { format } from "@/config/date";
export default {
  props: {
    companyDetail: {
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
      vehiclemsgList: {},
      weihuleibieList: [],
    };
  },
  computed: {},
  watch: {
    vehicleVisible: {
      handler(val) {
        if (val === true) {
          this.detailByDeptId();
        }
      },
    },
  },
  methods: {
    //地区报警处理率
    async detailByDeptId() {
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.detailByDeptId({
          id: this.companyDetail.id,
        })
      );
      this.msgloading = false;
      if (data) {
        this.vehiclemsgList = data;
      } else {
        this.$message.error(err);
      }
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
      .cehicleCard_form {
        height: 600px;
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
