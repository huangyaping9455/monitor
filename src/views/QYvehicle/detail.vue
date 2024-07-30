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
    <div class="qyvCard">
      <el-form ref="form" :model="vehiclemsgList" class="cehicleCard_form" :disabled="true">
        <el-col :span="8">
          <el-form-item label="单位名称：">
            <el-input v-model="vehiclemsgList.deptName" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="社会统一信用代码：">
            <el-input v-model="vehiclemsgList.jigoubianma" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="有效日期" prop="yyzzksdate">
            <div class="datem">
              <el-date-picker
                v-model="vehiclemsgList.yyzzksdate"
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
                  v-model="vehiclemsgList.yyzzjzdate"
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
        <el-col :span="8">
          <el-form-item label="经济类型" prop="jingjileixing">
            <el-input
              v-model="vehiclemsgList.jingjileixing"
              placeholder="请输入经济类型"
              style="width: 100%"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="道路运输许可证号" prop="daoluxukezhenghao">
            <el-input
              v-model="vehiclemsgList.daoluxukezhenghao"
              placeholder="请输入道路运输许可证号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="有效日期" prop="daoluyunshuzhengkaishiriqi">
            <div class="datem">
              <el-date-picker
                v-model="vehiclemsgList.daoluyunshuzhengkaishiriqi"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
              <span class="zhi">至</span>
              <el-date-picker
                v-model="vehiclemsgList.daoluyunshuzhengjieshuriqi"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="机构类型" prop="jigouleixing">
            <el-select
              v-model="vehiclemsgList.jigouleixing"
              placeholder="请选择机构类型"
              style="width: 100%"
            >
              <el-option
                v-for="(item, index) in jigouleixingList"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营许可证：">
            <el-input v-model="vehiclemsgList.jingyingxukezhengbianma" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="有效日期" prop="jingyingxukezhengchulingriqi">
            <div class="datem">
              <el-date-picker
                v-model="vehiclemsgList.jingyingxukezhengchulingriqi"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
              <span class="zhi">至</span>
              <el-date-picker
                v-model="vehiclemsgList.jingyingxukezhengyouxiaoqi"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同期限" prop="htbegindate">
            <div class="datem">
              <el-date-picker
                v-model="vehiclemsgList.htbegindate"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
              <span class="zhi">至</span>
              <el-date-picker
                v-model="vehiclemsgList.htlastdate"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业分级" prop="qiyefenji">
            <el-input v-model="vehiclemsgList.qiyefenji" placeholder="请输入企业等级"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地址" prop="jingyingdizhi">
            <div class="datem">
              <el-input v-model="vehiclemsgList.jingyingdizhi" placeholder="请输入地址"></el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法人名称" prop="farendaibiao">
            <el-input v-model="vehiclemsgList.farendaibiao" placeholder="请输入法人名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法人电话" prop="farendianhua">
            <el-input v-model="vehiclemsgList.farendianhua" placeholder="请输入法人电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否建立“标准化”管理体系" prop="isstandardization">
            <el-input
              v-model="vehiclemsgList.isstandardization"
              placeholder="请输入是否建立“标准化”管理体系"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主要运输线路" prop="haulway">
            <el-input v-model="vehiclemsgList.haulway" placeholder="请输入主要运输线路"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="经营范围" prop="jingyingfanwei">
            <el-input
              v-model="vehiclemsgList.jingyingfanwei"
              placeholder="请输入经营范围"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="企业是否存在重大危险源" prop="isfataldangerfountainhead">
            <el-input
              v-model="vehiclemsgList.isfataldangerfountainhead"
              placeholder="请输入企业是否存在重大危险源"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="重大危险源基本情况及风险等级" prop="risklevel">
            <el-input
              v-model="vehiclemsgList.risklevel"
              placeholder="请输入重大危险源基本情况及风险等级"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="重大风险源风险管理措施" prop="riskmanagementmeasure">
            <el-input
              v-model="vehiclemsgList.riskmanagementmeasure"
              placeholder="请输入重大风险源风险管理措施"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="涉危险岗位从业人员数量" prop="congyerenshuliang">
            <el-input-number
              controls-position="right"
              :min="0"
              v-model="vehiclemsgList.congyerenshuliang"
              placeholder="请输入涉危险岗位从业人员数量"
              style="width: 100%"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="省" prop="province">
            <div class="datem">
              <el-select
                v-model="vehiclemsgList.province"
                placeholder="请选择省"
                style="width: 100%"
                clearable
                filterable
                @change="changeSheng"
              >
                <el-option
                  v-for="(item, index) in shengList"
                  :key="index"
                  :label="item.title"
                  :value="item.id"
                  @click.native="clickProvince(item)"
                >
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="市" prop="city">
            <div class="datem">
              <el-select
                v-model="vehiclemsgList.city"
                placeholder="请选择市"
                style="width: 100%"
                clearable
                filterable
                @change="changeShi"
              >
                <el-option
                  v-for="(item, index) in shiList"
                  :key="index"
                  :label="item.title"
                  :value="item.id"
                  @click.native="clickCity(item)"
                >
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="县" prop="country">
            <div class="datem">
              <el-select
                v-model="vehiclemsgList.country"
                placeholder="请选择县"
                style="width: 100%"
                clearable
                filterable
              >
                <el-option
                  v-for="(item, index) in xianList"
                  :key="index"
                  :label="item.deptName"
                  :value="item.id"
                  @click.native="clickCountry(item)"
                >
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="营业执照照片：">
            <div class="datem">
              <el-upload
                disabled
                :action="'/api/blade-upload/upload/upload?fileId=profilePhoto&table=company'"
                list-type="picture-card"
                :file-list="fileList1"
                :on-preview="handlePictureCardPreview"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="经营许可证照片：">
            <div class="datem">
              <el-upload
                disabled
                :action="'/api/blade-upload/upload/upload?fileId=logoPhoto&table=company'"
                list-type="picture-card"
                :file-list="fileList2"
                :on-preview="handlePictureCardPreview"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="道路运输许可证照片：">
            <div class="datem">
              <el-upload
                disabled
                :action="'/api/blade-upload/upload/upload?fileId=logoRizhi&table=company'"
                list-type="picture-card"
                :file-list="fileList3"
                :on-preview="handlePictureCardPreview"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业组织结构图照片：">
            <div class="datem">
              <el-upload
                disabled
                :action="'/api/blade-upload/upload/upload?fileId=homePhotoApp&table=company'"
                list-type="picture-card"
                :file-list="fileList4"
                :on-preview="handlePictureCardPreview"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
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
import governmentApi from "@/api/modules/government";
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
      dateLong: "长期",
      jigouleixingList: [],
      shengList: [],
      shiList: [],
      xianList: [],
      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
    };
  },
  computed: {},
  watch: {
    vehicleVisible: {
      handler(val) {
        this.vehiclemsgList = {};
        this.fileList1 = [];
        this.fileList2 = [];
        this.fileList3 = [];
        this.fileList4 = [];
        if (val === true) {
          this.detailByDeptId();
          this.getDicData("xinjigouleixing").then((res) => {
            this.jigouleixingList = res;
          });
          // this.getDeptById(this.companyDetail.id, 0, 1).then((red) => {
          //   this.shengList = red;
          // });
        }
      },
    },
    // "vehiclemsgList.province": {
    //   handler(val) {
    //     if (val) {
    //       this.getDeptById(this.companyDetail.id, 0, 1).then((red) => {
    //         let label = red.find((el) => {
    //           return el.deptName === this.vehiclemsgList.province;
    //         });
    //         if (label) {
    //           this.vehiclemsgList.province = label.id;
    //           this.changeSheng(label.id);
    //           if (this.vehiclemsgList.city) {
    //             this.getDeptById(label.id, 1, 1).then((redd) => {
    //               let labels = redd.find((el) => {
    //                 return el.deptName === this.vehiclemsgList.city;
    //               });
    //               if (labels) {
    //                 this.vehiclemsgList.city = labels.id;
    //                 this.changeShi(labels.id);
    //               }
    //             });
    //           }
    //         }
    //       });
    //     }
    //   },
    // },
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
        if (data.yingyezhizhaofujian && data.yingyezhizhaofujian.indexOf("[") != -1) {
          this.fileList1 = [JSON.parse(data.yingyezhizhaofujian)[0]];
        } else if (data.yingyezhizhaofujian.indexOf("http") != -1) {
          if (data.yingyezhizhaofujian.indexOf(",") != -1) {
            this.fileList1 = [
              {
                url: data.yingyezhizhaofujian.split(",")[0],
              },
            ];
          } else {
            this.fileList1 = [
              {
                url: data.yingyezhizhaofujian,
              },
            ];
          }
        }
        if (data.jingyingxukezhengfujian && data.jingyingxukezhengfujian.indexOf("[") != -1) {
          this.fileList2 = [JSON.parse(data.jingyingxukezhengfujian)[0]];
        } else if (data.jingyingxukezhengfujian.indexOf("http") != -1) {
          if (data.jingyingxukezhengfujian.indexOf(",") != -1) {
            this.fileList2 = [
              {
                url: data.jingyingxukezhengfujian.split(",")[0],
              },
            ];
          } else {
            this.fileList2 = [
              {
                url: data.jingyingxukezhengfujian,
              },
            ];
          }
        }
        if (data.daoluyunshuzhengfujian && data.daoluyunshuzhengfujian.indexOf("[") != -1) {
          this.fileList3 = [JSON.parse(data.daoluyunshuzhengfujian)[0]];
        } else if (data.daoluyunshuzhengfujian.indexOf("http") != -1) {
          if (data.daoluyunshuzhengfujian.indexOf(",") != -1) {
            this.fileList3 = [
              {
                url: data.daoluyunshuzhengfujian.split(",")[0],
              },
            ];
          } else {
            this.fileList3 = [
              {
                url: data.daoluyunshuzhengfujian,
              },
            ];
          }
        }
        if (data.zuzhijigoutu && data.zuzhijigoutu.indexOf("[") != -1) {
          this.fileList4 = [JSON.parse(data.zuzhijigoutu)[0]];
        } else if (data.zuzhijigoutu.indexOf("http") != -1) {
          if (data.zuzhijigoutu.indexOf(",") != -1) {
            this.fileList4 = [
              {
                url: data.zuzhijigoutu.split(",")[0],
              },
            ];
          } else {
            this.fileList4 = [
              {
                url: data.zuzhijigoutu,
              },
            ];
          }
        }
        if (data.yyzzjzdate !== "长期") {
          this.dateLong = "非长期";
        } else {
          this.dateLong = "长期";
          this.vehiclemsgList.yyzzjzdate = "";
        }
      } else {
        this.$message.error(err);
      }
    },
    //改变省
    changeSheng(val) {
      this.getDeptById(val, 1, 1).then((res) => {
        this.shiList = res;
      });
    },
    // 改变市
    changeShi(val) {
      this.getDeptById(val, 1, 1).then((res) => {
        this.xianList = res;
      });
    },
    // 获取省市县
    async getDeptById(id, type, remark) {
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getDeptById(id, type, remark)
      );
      if (data) {
        return data;
      }
    },
    // 获取字典
    async getDicData(val) {
      let [err, data] = await governmentApi.awaitWrap(governmentApi.getByCode({ code: val }));
      if (data) {
        return data;
      }
    },
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
      .qyvCard {
        height: 600px;
        background-color: #0a3774;
        padding: 10px;
        .cehicleCard_form {
          height: calc(100% - 10px);
          background-color: #0f1f40;
          padding: 5px;
          color: #fff;
          overflow: auto;
          .el-col {
            padding: 0 10px;
            .el-form-item {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              margin-bottom: 15px;
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
              .el-form-item__content {
                width: 100%;
                .datem {
                  display: flex;
                  align-items: center;
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
                    color: #606266;
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
