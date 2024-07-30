<template>
  <el-form class="organform" ref="rowDetail" :model="dataForm" :disabled="state">
    <div class="form_detail">
      <div class="v_type">
        <div class="line"></div>
        <span>车辆信息</span>
      </div>
      <el-col :span="8">
        <el-form-item label="所属企业" prop="deptId">
          <el-input
            v-model="rows.deptName"
            placeholder="请输入所属企业"
            clearable
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车牌号码" prop="cheliangpaizhao">
          <el-input
            v-model="dataForm.cheliangpaizhao"
            placeholder="请输入车牌号码"
            clearable
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车牌颜色" prop="chepaiyanse">
          <el-select
            placeholder="请选择车牌颜色"
            v-model="dataForm.chepaiyanse"
            style="width: 100%"
            :disabled="true"
            filterable
          >
            <el-option
              v-for="item in colorList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车主姓名" prop="chezhu">
          <el-input
            v-model="dataForm.chezhu"
            placeholder="请输入车主姓名"
            clearable
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车主电话" prop="chezhudianhua">
          <el-input v-model="dataForm.chezhudianhua" placeholder="请输入车主电话"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="驾驶员姓名" prop="jiashiyuanid">
          <el-input
            v-model="dataForm.jiashiyuanxingming"
            placeholder="请输入驾驶员姓名"
            clearable
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="驾驶员电话" prop="jiashiyuandianhua">
          <el-input v-model="dataForm.jiashiyuandianhua" placeholder="请输入驾驶员电话"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车辆型号" prop="cheliangxinghao">
          <el-select
            placeholder="请选择车辆型号"
            v-model="dataForm.cheliangxinghao"
            style="width: 100%"
            filterable
          >
            <el-option
              v-for="item in xinghaoList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="经营路线" prop="jingyingluxian">
          <el-input
            v-model="dataForm.jingyingluxian"
            placeholder="请输入经营路线"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="经营类型" prop="jingjileixing">
          <el-input
            v-model="dataForm.jingjileixing"
            placeholder="请输入经营类型"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="经营方式" prop="jingyingzuzhifangshi">
          <el-select
            placeholder="请选择经营方式"
            v-model="dataForm.jingyingzuzhifangshi"
            style="width: 100%"
            filterable
          >
            <el-option
              v-for="(item, index) in jingyingList"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="车辆照片(只能上传jpg/png格式)">
          <div class="datem">
            <el-col :span="8">
              <el-upload
                action="api/blade-upload/upload/upload?fileId=driver&table=anbiao_driver"
                style="display: flex; width: 800px"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :file-list="fileList1"
                multiple
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-col>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="">
          <div class="v_liness"></div>
        </el-form-item>
      </el-col>
      <div class="v_type">
        <div class="line"></div>
        <span>车辆技术参数</span>
      </div>
      <el-col :span="8">
        <el-form-item label="车辆品牌" prop="cheliangpinpai">
          <el-input v-model="dataForm.cheliangpinpai" placeholder="请输入车辆品牌"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车身颜色" prop="cheliangyanse">
          <el-input v-model="dataForm.cheliangyanse" placeholder="请输入车身颜色"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车辆识别代号/车架号" prop="chejiahao">
          <el-input v-model="dataForm.chejiahao" placeholder="请输入车架号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="国产/进口" prop="shifouguochan">
          <el-radio-group v-model="dataForm.shifouguochan" size="">
            <el-radio label="是">国产</el-radio>
            <el-radio label="否">进口</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="发动机号" prop="fadongjihao">
          <el-input v-model="dataForm.fadongjihao" placeholder="请输入发动机号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="发动机型号" prop="fadongjixinghao">
          <el-input v-model="dataForm.fadongjixinghao" placeholder="请输入发动机型号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="燃料种类" prop="ranliaozhonglei">
          <el-input
            v-model="dataForm.ranliaozhonglei"
            placeholder="请输入燃料种类"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="排量(ml)/功率(kw)" prop="pailianggonglv">
          <div class="datem">
            <el-input-number
              v-model="dataForm.pailiang"
              placeholder="请输入排量"
              @change="$forceUpdate()"
              clearable
              :min="0"
              controls-position="right"
            >
            </el-input-number>
            <el-input-number
              v-model="dataForm.gonglv"
              placeholder="请输入功率"
              @change="$forceUpdate()"
              clearable
              :min="0"
              controls-position="right"
            >
            </el-input-number>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="制造厂名称" prop="zhizaochangmingcheng">
          <el-input
            v-model="dataForm.zhizaochangmingcheng"
            placeholder="请输入制造厂名称"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="转向形式" prop="zhuanxiangxingshi">
          <el-input
            v-model="dataForm.zhuanxiangxingshi"
            placeholder="请输入转向形式"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="轮胎数" prop="luntaishu">
          <el-input type="number" v-model="dataForm.luntaishu" placeholder="请输入轮胎数" clearable>
            <template slot="append">个</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="轮胎规格" prop="luntaiguige">
          <el-input
            v-model="dataForm.luntaiguige"
            placeholder="请输入轮胎规格"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item label="轮距" prop="lunju">
          <div class="datem">
            <el-input type="number" v-model="dataForm.lunju" placeholder="请输入前轮距" clearable>
              <template slot="append">mm</template>
            </el-input>
            <el-input
              type="number"
              v-model="dataForm.frontlunju"
              placeholder="请输入后轮距"
              clearable
            >
              <template slot="append">mm</template>
            </el-input>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车辆出厂日期" prop="cheliangchuchangriqi">
          <el-date-picker
            v-model="dataForm.cheliangchuchangriqi"
            type="date"
            style="width: 100%"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="钢板弹簧片数" prop="tongbantanhuangpianshu">
          <el-input
            type="number"
            v-model="dataForm.tongbantanhuangpianshu"
            placeholder="请输入钢板弹簧片数"
          >
            <template slot="append">个</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="轴距" prop="zhouju">
          <el-input type="number" v-model="dataForm.zhouju" placeholder="请输入轴距">
            <template slot="append">mm</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="轴数" prop="zhoushu">
          <el-input type="number" v-model="dataForm.zhoushu" placeholder="请输入轴数"> </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="外廓尺寸" prop="waikuochicun">
          <el-input v-model="dataForm.waikuochicun" placeholder="请输入外廓尺寸">
            <template slot="append">mm</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="货箱内部尺寸" prop="huoxiangneibuchicun">
          <el-input v-model="dataForm.huoxiangneibuchicun" placeholder="请输入货箱内部尺寸">
            <template slot="append">mm</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="总质量" prop="zongzhiliang">
          <el-input type="number" v-model="dataForm.zongzhiliang" placeholder="请输入总质量">
            <template slot="append">kg</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="核定载质量" prop="hedingzaizhiliang">
          <el-input
            type="number"
            v-model="dataForm.hedingzaizhiliang"
            placeholder="请输入核定载质量"
          >
            <template slot="append">kg</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="核定载客" prop="hedingzaikeshu">
          <el-input type="number" v-model="dataForm.hedingzaikeshu" placeholder="请输入核定载客">
            <template slot="append">人</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="准牵引总质量" prop="zhunqianyinzongzhiliang">
          <el-input
            type="number"
            v-model="dataForm.zhunqianyinzongzhiliang"
            placeholder="请输入准牵引总质量"
            clearable
          >
            <template slot="append">kg</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="驾驶室载客" prop="jiashishizaikeshu">
          <el-input
            type="number"
            v-model="dataForm.jiashishizaikeshu"
            placeholder="请输入驾驶室载客"
            clearable
          >
            <template slot="append">人</template>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="使用性质" prop="shiyongxingzhi">
          <el-input
            v-model="dataForm.shiyongxingzhi"
            placeholder="请输入使用性质"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车辆获得方式" prop="chelianghuodefangshi">
          <el-input
            v-model="dataForm.chelianghuodefangshi"
            placeholder="请输入车辆获得方式"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="户籍登记" prop="domicile">
          <el-input v-model="dataForm.domicile" placeholder="请输入户籍登记" clearable></el-input>
        </el-form-item>
      </el-col>
    </div>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
import governmentApi from "@/api/modules/government";
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
      vehicleVisible: false,
      fileList1: [],
      baseUrl: "api/blade-upload/upload/upload?fileId=vehicle&table=anbiao_vehicle",
      colorList: [],
      xinghaoList: [],
      jingyingList: [],
      dataForm: {},
    };
  },
  computed: {
    ...mapGetters({
      userinfo: "userinfo",
      depts: "government/depts",
    }),
  },
  watch: {
    rowDetail: {
      handler(item) {
        this.dataForm = JSON.parse(JSON.stringify(item));
        if (this.dataForm.pailianggonglv) {
          if (this.dataForm.pailianggonglv.indexOf("/") != -1) {
            this.dataForm.pailiang = this.dataForm.pailianggonglv.split("/")[0];
            this.dataForm.gonglv = this.dataForm.pailianggonglv.split("/")[1];
          } else {
            this.dataForm.pailiang = this.dataForm.pailianggonglv;
            this.dataForm.gonglv = "";
          }
        }
        this.fileList1 = [];
        // 车辆照片处理
        if (item.cheliangzhaopian && item.cheliangzhaopian.indexOf("[") != -1) {
          this.fileList1 = JSON.parse(item.cheliangzhaopian);
        } else if (item.cheliangzhaopian && item.cheliangzhaopian.indexOf("http") != -1) {
          if (item.cheliangzhaopian.indexOf(",") != -1) {
            item.cheliangzhaopian.split(",").map((el) => {
              this.fileList1.push({ url: el });
            });
          } else {
            this.fileList1 = [{ url: item.cheliangzhaopian }];
          }
        }
        this.getDicData("colour").then((res) => {
          this.colorList = res;
        });
        this.getDicData("xinghao").then((res) => {
          this.xinghaoList = res;
        });
        this.getDicData("jingyingType").then((res) => {
          this.jingyingList = res;
        });
      },
    },
  },
  methods: {
    //车辆照片 上传
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
    .v_liness {
      height: 8px;
      border-radius: 10px;
      background-color: #f5f5f5;
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
        }
      }
    }
  }
}
</style>
