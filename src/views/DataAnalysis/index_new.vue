<style lang="scss" scoped>
.dataAnalysis {
  height: 100vh;
  overflow: hidden;
  //   background: #0b122e;
  background-image: url("~@/assets/img/bg_24.png");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .home-center {
    display: flex;
    justify-content: space-around;
    padding: 1vmin 3vmin 3vmin;
    .home-c-l,
    .home-c-r {
      width: 28%;
      height: 54vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 4px;
    }
    .home-l-top {
      width: 100%;
      height: 100%;
      background-image: url("~@/assets/img/bg_22.png");
      background-size: 100% 100%;
      .top_title {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        font-size: 2vmin;
        color: #01c4f7;
        height: 3vmin;
        line-height: 2.7vmin;
      }
      .top_card {
        margin-top: 2.5vh;
        height: 10vh;
        padding: 0 2vmin;
        display: flex;
        justify-content: space-between;
        .top_card_d {
          width: 31%;
          background-image: url("~@/assets/img/bg_25.png");
          background-size: 100% 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          span:first-child {
            color: #fff;
            margin-bottom: 10px;
          }
          span:last-child {
            color: #ffb508;
            font-size: 3vmin;
            margin-top: 5px;
          }
          .car_line {
            width: 100%;
            height: 1px;
            background: linear-gradient(
              to right,
              rgba(0, 180, 255, 0),
              rgba(0, 180, 255, 1),
              rgba(0, 180, 255, 0)
            ); //
          }
        }
      }
      .top_card_b {
        height: 38vh;
        padding-top: 10px;
        display: flex;
      }
    }
    .home-c-r {
      .title {
        font-size: 1.1429rem;
        height: 12%;
        color: #01f8ff;
        font-weight: normal;
        margin-top: 1rem;
        margin-bottom: 0.5714rem;
        display: flex;
        align-items: center;
        span:first-of-type {
          flex: 1;
          text-align: center;
          margin-left: 24%;
        }
        .more {
          text-align: center;
          flex: 0 0 12%;
          margin-right: 12%;
          font-size: 0.8571rem;
          cursor: pointer;
          &:hover {
            transform: scale(1.4);
            transition: transform 0.2s;
          }
        }
      }
    }
    .home-c-c {
      width: 44%;
      height: 54vh;
      background-size: 100% 100%;
      position: relative;
      .title {
        margin-top: 1.0714rem;
        margin-bottom: 0;
        font-size: 1.4286rem;
        color: #01f5f8;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "MicrosoftYaHei";
      }
      .ptevbtn {
        position: absolute;
        top: 5%;
        left: 2%;
      }
    }
  }
  .home-footer {
    display: flex;
    justify-content: space-between;
    padding: 0 3vmin 3vmin;
    .home-f-l,
    .home-f-r {
      width: 49%;
      height: 31vh;
      background-image: url("~@/assets/img/bg_23.png");
      background-size: 100% 100%;
      display: flex;
    }
  }
  .box {
    position: relative;
    .inbox1 {
      position: absolute;
      z-index: 0;
      width: 0;
      height: 0;
      border-top: 1.4286rem solid #064e9f;
      border-left: 2.1429rem solid #064e9f;
      border-bottom: 1.4286rem solid transparent;
      border-right: 2.1429rem solid transparent;
      &::after {
        position: absolute;
        z-index: 0;
        content: "";
        top: -0.7143rem;
        left: -1.4286rem;
        width: 0;
        height: 0;
        border-top: 1rem solid #0b122e;
        border-left: 1.4286rem solid #0b122e;
        border-bottom: 0.7143rem solid transparent;
        border-right: 1.4286rem solid transparent;
      }
    }
    .inbox2 {
      position: absolute;
      z-index: 0;
      right: 0;
      width: 0;
      height: 0;
      border-top: 1.4286rem solid #064e9f;
      border-left: 2.1429rem solid transparent;
      border-bottom: 1.4286rem solid transparent;
      border-right: 2.1429rem solid #064e9f;
      &::after {
        position: absolute;
        z-index: 0;
        content: "";
        top: -0.7143rem;
        right: -1.4286rem;
        width: 0;
        height: 0;
        border-top: 1rem solid #0b122e;
        border-left: 1.4286rem solid transparent;
        border-bottom: 0.7143rem solid transparent;
        border-right: 1.4286rem solid #0b122e;
      }
    }
  }
}
</style>

<template>
  <div class="dataAnalysis">
    <all-header></all-header>
    <div class="home-center">
      <div class="home-c-l">
        <div
          class="home-l-top"
          v-loading="loading1"
          element-loading-background="rgba(0, 0, 0, 0.4)"
        >
          <span class="top_title">入网车辆与排放数据统计</span>
          <div class="top_card">
            <div class="top_card_d">
              <span>总入网车辆(辆)</span>
              <div class="car_line"></div>
              <span>6380</span>
            </div>
            <div class="top_card_d">
              <span>总入网车辆(辆)</span>
              <div class="car_line"></div>
              <span>6380</span>
            </div>
            <div class="top_card_d">
              <span>总入网车辆(辆)</span>
              <div class="car_line"></div>
              <span>6380</span>
            </div>
          </div>
          <div class="top_card_b">
            <echart-base
              height="100%"
              width="100%"
              autoresize
              :chart-option="chartOption.option1"
            ></echart-base>
          </div>
        </div>
      </div>
      <div
        class="home-c-c"
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.4)"
      >
        <echart-base
          @click="echartclick"
          height="100%"
          width="100%"
          :chart-option="chartOption.option2"
        ></echart-base>
        <el-button
          class="ptevbtn"
          v-show="cengji > 0 && !loading"
          size="mini"
          @click="turnBack"
          >返回</el-button
        >
      </div>
      <div class="home-c-r">
        <div
          class="home-l-top"
          v-loading="loading2"
          element-loading-background="rgba(0, 0, 0, 0.4)"
        >
          <span class="top_title">入网车辆与排放数据统计</span>
          <div
            class="top_card"
            style="justify-content: space-evenly;margin-top: 4.5vh;"
          >
            <div class="top_card_d">
              <span>总入网车辆(辆)</span>
              <div class="car_line"></div>
              <span>6380</span>
            </div>
            <div class="top_card_d">
              <span>总入网车辆(辆)</span>
              <div class="car_line"></div>
              <span>6380</span>
            </div>
          </div>
          <div class="top_card_b">
            <echart-base
              height="100%"
              width="50%"
              :chart-option="chartOption.option3"
            ></echart-base>
            <echart-base
              height="100%"
              width="50%"
              :chart-option="chartOption.option4"
            ></echart-base>
          </div>
        </div>
      </div>
    </div>
    <div class="home-footer">
      <div
        class="home-f-l"
        v-loading="loading4"
        element-loading-background="rgba(0, 0, 0, 0.4)"
      >
        <echart-base
          height="100%"
          width="100%"
          :chart-option="chartOption.option5"
        ></echart-base>
      </div>
      <div
        class="home-f-r"
        v-loading="loading4"
        element-loading-background="rgba(0, 0, 0, 0.4)"
      >
        <echart-base
          height="100%"
          width="50%"
          :chart-option="chartOption.option6"
        ></echart-base>
        <echart-base
          height="100%"
          width="50%"
          :chart-option="chartOption.option7"
        ></echart-base>
      </div>
    </div>
  </div>
</template>

<script>
import echartBase from "@/components/EChart/index";
import allHeader from "@/components/Header/index_new";
import dataAnalysisApi from "@/api/modules/dataAnalysis";
import vueSeamlessScroll from "vue-seamless-scroll";
import {
  geooption1,
  geooption11,
  geooption22,
  geooption33,
  geooption44,
  geooption55,
  geooption66,
} from "@/config/echartoption2";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      timer: null,
      loading: false,
      loading1: false,
      loading2: false,
      loading3: false,
      loading4: false,
      chartOption: {
        option1: {},
        option2: {},
        option3: {},
        option4: {},
        option5: {},
        option6: {},
        option7: {},
      },
      alarmProcessing: {
        yuebaojingshu: 0,
        yueweichulishu: 0,
        yuechulilv: "0.00%",
        yearbaojingshu: 0,
        yearweichulishu: 0,
        yearchulilv: "0.00%",
      }, //报警处理情况
      cengji: 0,
      areaName: "",
      mapData: [],
      g_clickTime: null,
      g_TimeFn: "",
    };
  },
  components: {
    "echart-base": echartBase,
    "all-header": allHeader,
    vueSeamlessScroll,
  },
  created() {
    this.init();
  },
  mounted() {},
  computed: {
    ...mapGetters({
      userinfo: "userinfo",
    }),
  },
  methods: {
    // 初始化
    init() {
      // 获取报警处理情况(月)
      this.getZFBJMonthList(this.userinfo.deptId, 0, "");
      //报警处理情况(年)
      this.getZFBJYearList(this.userinfo.deptId);
      this.chartOption.option1 = geooption11();
      this.chartOption.option3 = geooption22();
      this.chartOption.option4 = geooption33();
      this.chartOption.option5 = geooption44();
      this.chartOption.option6 = geooption55();
      this.chartOption.option7 = geooption66();
    },
    // 获取报警处理情况(月)
    async getZFBJMonthList(deptId, type = 0, areaName = "", isxiazhuan = true) {
      this.loading = true;
      if (type == 0) this.cengji = 0;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getZFBJMonthList({
          deptId: deptId,
          type: type,
          size: this.cengji,
        })
      );
      this.loading = false;
      if (data) {
        // 判断下钻有无数据
        if (type > 0 && data.xjlist.length <= 0 && isxiazhuan) {
          this.cengji--;
          return false;
        }
        // 判断是否下钻  单击
        if (!isxiazhuan) {
          this.cengji--;
          this.alarmProcessing = {
            ...this.alarmProcessing,
            yuebaojingshu: data.baojingshu,
            yueweichulishu: data.weichulishu,
            yuechulilv: data.chulilv,
          };
          this.mapData = this.mapData.map((el) => {
            return {
              ...el,
              itemStyle: {
                borderWidth: el.name == areaName ? 4 : 1,
              },
            };
          });
          this.chartOption.option2 = geooption1(this.areaName, this.mapData);
          return false;
        }
        let mapData;
        if (type == 0) {
          mapData = [
            {
              name: data.areaname,
              value: data.baojingshu,
              yueweichulishu: data.weichulishu,
              yuechulilv: data.chulilv,
              zhengfuid: data.zhengfuid,
            },
          ];
        } else {
          mapData = data.xjlist.map((el) => {
            return {
              name: el.areaname,
              value: el.baojingshu,
              yueweichulishu: el.weichulishu,
              yuechulilv: el.chulilv,
              zhengfuid: el.zhengfuid,
            };
          });
        }
        this.alarmProcessing = {
          ...this.alarmProcessing,
          yuebaojingshu: data.baojingshu,
          yueweichulishu: data.weichulishu,
          yuechulilv: data.chulilv,
        };
        this.mapData = mapData;
        this.areaName = areaName ? areaName : this.userinfo.diqu;
        this.chartOption.option2 = geooption1(
          areaName ? areaName : this.userinfo.diqu,
          mapData
        );
      } else {
        this.$message.error(err);
      }
    },
    //报警处理情况(年)
    async getZFBJYearList(deptId) {
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getZFBJYearList({
          deptId: deptId,
          // deptId:5448
        })
      );
      if (data) {
        this.alarmProcessing = {
          ...this.alarmProcessing,
          yearbaojingshu: data.baojingshu,
          yearweichulishu: data.weichulishu,
          yearchulilv: data.chulilv,
        };
      } else {
        this.$message.error(err);
      }
    },
    // 地图下钻
    echartdblclick(el, isxiazhuan) {
      this.cengji++;
      this.getZFBJMonthList(el.data.zhengfuid, 1, el.name, isxiazhuan);
      this.getZFBJYearList(el.data.zhengfuid);
    },
    echartclick(el) {
      if (!el.value) return false;
      let myDate = new Date();
      if (this.g_clickTime == null) {
        //第一次进来
        this.g_clickTime = myDate.getMilliseconds();
        //起一个定时器，进行重置
        this.g_TimeFn = setTimeout(() => {
          this.echartdblclick(el, false);
          this.g_clickTime = null;
        }, 300);
      } else {
        clearTimeout(this.g_TimeFn);
        //第二次进来，
        if (Math.abs(myDate.getMilliseconds() - this.g_clickTime) < 300) {
          //是双击操作
          this.echartdblclick(el, true);
        }
        this.g_clickTime = null;
      }
    },
    turnBack() {
      this.getZFBJMonthList(this.userinfo.deptId, 0, "");
      this.getZFBJYearList(this.userinfo.deptId);
    },
  },
};
</script>
