<template>
  <el-form class="organform" ref="rowDetail" :model="dataForm" :disabled="state" :rules="rules">
    <div class="form_detail">
      <el-col :span="8">
        <el-form-item label="终端ID" prop="zongduanid">
          <el-input v-model="dataForm.zongduanid" placeholder="请输入终端ID" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="终端类型" prop="zhongduanleixing">
          <el-select
            placeholder="请选择终端类型"
            v-model="dataForm.zhongduanleixing"
            style="width: 100%"
            filterable
          >
            <el-option
              v-for="item in zhongduanleixingList"
              :key="item.id"
              :label="item.label"
              :value="Number(item.value)"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="终端协议类型" prop="terminalprotocoltype">
          <el-select
            placeholder="请选择终端协议类型"
            v-model="dataForm.terminalprotocoltype"
            style="width: 100%"
            filterable
          >
            <el-option
              v-for="item in terminalProtocolTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="视频通道路数" prop="videochannelnum">
          <el-select
            placeholder="请选择视频通道路数"
            v-model="dataForm.videochannelnum"
            style="width: 100%"
            filterable
          >
            <el-option
              v-for="item in videoChannelNumList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="平台连接方式" prop="platformconnectiontype">
          <el-select
            placeholder="请选择平台连接方式"
            v-model="dataForm.platformconnectiontype"
            style="width: 100%"
            filterable
          >
            <el-option
              v-for="item in platformConnectionTypeList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="4G视频地址" prop="yunyingshang">
          <el-input v-model="dataForm.yunyingshang" placeholder="请输入4G视频地址"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="SIM卡号" prop="simnum">
          <el-input v-model="dataForm.simnum" placeholder="请输入SIM卡号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="终端厂家" prop="zhongduanchangshang">
          <el-input
            v-model="dataForm.zhongduanchangshang"
            placeholder="请输入终端厂家"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="终端型号" prop="zongduanxinghao">
          <el-input
            v-model="dataForm.zongduanxinghao"
            placeholder="请输入终端型号"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="运营商名称" prop="yunyingshangmingcheng">
          <el-input
            v-model="dataForm.yunyingshangmingcheng"
            placeholder="请输入运营商名称"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="运营商接入码" prop="yunyingshangjieruma">
          <el-input
            v-model="dataForm.yunyingshangjieruma"
            placeholder="请输入运营商接入码"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="营运状态" prop="cheliangzhuangtai">
          <el-select
            placeholder="请选择营运状态"
            v-model="dataForm.cheliangzhuangtai"
            style="width: 100%"
            filterable
          >
            <el-option
              v-for="item in vehicleStatusList"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
      vehicleVisible: false,
      rules: {
        // deptId: [
        //   { required: true, message: "请选择所属企业", trigger: "blur" },
        // ],
      },
      terminalProtocolTypeList: [],
      videoChannelNumList: [],
      platformConnectionTypeList: [],
      zhongduanleixingList: [],
      subLoading: false,
      dataForm: {},
      vehicleStatusList: [],
    };
  },
  computed: {},
  watch: {
    rowDetail: {
      handler(item) {
        this.dataForm = JSON.parse(JSON.stringify(item));
        this.getDicData("terminalProtocolType").then((res) => {
          this.terminalProtocolTypeList = res;
        });
        this.getDicData("videoChannelNum").then((res) => {
          this.videoChannelNumList = res;
        });
        this.getDicData("platformConnectionType").then((res) => {
          this.platformConnectionTypeList = res;
        });
        this.getDicData("zhongduanleixing").then((res) => {
          this.zhongduanleixingList = res;
        });
        this.getDicData("vehicle_state").then((res) => {
          this.vehicleStatusList = res;
        });
      },
    },
  },
  methods: {
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
          .avue-form__group {
            .el-form-item__content {
              margin-left: 0 !important;
            }
          }
        }
      }
    }
  }
}
</style>
