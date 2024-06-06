<style lang="scss" scoped>
.dataAnalysis {
  height: 100vh;
  overflow: hidden;
  background-image: url("~@/assets/img/speed/bg.png");
  background-size: 100% 100%;
  // display: flex;
  // flex-direction: column;
  .dheader {
    display: block;
    height: 80px;
    width: 100%;
    background-image: url("~@/assets/img/speed/head.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    position: relative;
    .time {
      position: absolute;
      top: 16px;
      left: 25px;
      color: #fff;
    }
  }
  .speed_body {
    display: flex;
    flex-direction: column;
    width: calc(100% - 30px);
    height: calc(100% - 120px);
    padding: 0 15px;
    .speed_b_t {
      display: flex;
      width: calc(100%);
      height: calc(70%);
      .speed_l,
      .speed_r {
        width: 20%;
        height: 100%;
        .l_top,
        .l_bot {
          height: 50%;
          width: 100%;
          .card_chart {
            height: calc(100% - 50px);
            width: 100%;
          }
        }
      }
      .speed_c {
        width: 60%;
        height: 100%;
        .c_item {
          display: flex;
          width: 100%;
          height: 90px;
          .item {
            height: calc(100% - 40px);
            width: calc(25% - 100px);
            background-image: url("~@/assets/img/speed/item1.png");
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            padding: 20px 50px;
            justify-content: space-around;
            padding-right: 80px;
            color: #fff;
            font-size: 14px;
            .item_t {
              display: flex;
              // width: 100%;
              // height: 100%;
              justify-content: space-between;
              align-items: center;
              position: relative;
              span {
                color: #fff;
                font-size: 1.6vmin;
              }
              .up {
                position: absolute;
                top: 7px;
                right: -21px;
                width: 16px;
                height: 14px;
              }
            }
            .qiri {
              // margin-top: 25px;
                font-size: 1.6vmin;
            }
          }
          .item:nth-child(2) {
            background-image: url("~@/assets/img/speed/item2.png");
          }
          .item:nth-child(3) {
            background-image: url("~@/assets/img/speed/item3.png");
          }
          .item:nth-child(4) {
            background-image: url("~@/assets/img/speed/item4.png");
          }
        }
        .c_map {
          width: calc(100% - 30px);
          height: calc(100% - 105px);
          padding: 0 15px 15px;
        }
      }
    }
    .speed_b_b {
      height: calc(30%);
      width: calc(100%);
      display: flex;
      .speed_b_l {
        width: 50%;
        height: 100%;
        .bl_chart {
          display: flex;
          justify-content: space-around;
          width: calc(100% - 80px);
          height: calc(100% - 60px);
          padding: 0 40px;
          .bl_t {
            position: relative;
            width: 18%;
            height: 100%;
            .bl_txt {
              position: absolute;
              top: 40%;
              left: 50%;
              transform: translate(-50%);
              color: #fff;
              display: flex;
              align-items: end;
              span:first-child {
                width: 100%;
                display: block;
                font-size: 2.9vmin;
                margin-right: 1px;
              }
            }
            .bl_bg {
              width: 91%;
              height: 55%;
              background-image: url("~@/assets/img/speed/border1.png");
              background-size: 100% 100%;
              position: absolute;
              top: 23px;
              left: 7px;
            }
            .bl_bom {
              width: 59%;
              height: 28%;
              background-image: url("~@/assets/img/speed/bottom1.png");
              background-size: 100% 100%;
              position: absolute;
              bottom: 5px;
              left: 35px;
            }
            .bom1 {
              background-image: url("~@/assets/img/speed/bottom1.png");
              left: 30px;
            }
            .bom2 {
              background-image: url("~@/assets/img/speed/bottom2.png");
              left: 31px;
            }
            .bom3 {
              background-image: url("~@/assets/img/speed/bottom3.png");
            }
          }
        }
        .card_h {
          background-image: url("~@/assets/img/speed/card2.png");
        }
      }
    }
    .card_h {
      height: 50px;
      width: 100%;
      background-image: url("~@/assets/img/speed/card1.png");
      background-size: 100% 100%;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      span {
        margin-left: 50px;
        color: #fff;
        font-size: 15px;
        font-weight: 700;
      }
      .pick_date {
        width: 120px;
        margin-right: 5px;
        ::v-deep .el-input__inner {
          height: 25px;
          line-height: 25px;
          background: #155579;
          color: #b6f6f6;
        }
      }
      
      .btns {
        margin-top: 14px;
        display: flex;
        .isbtn {
          width: 4.2vmin;
          height: 2.2vmin;
          font-size: 1.4vmin;
          border-radius: 5px;
          // background-image: url("~@/assets/img/btn_1.png");
          // background-size: 100% 100%;
          border:1px solid #fff;
        color: #fff;
        font-weight:600;
          text-align: center;
          line-height: 1.6;
          cursor: pointer;
        }
        .isbtn:first-of-type{
          margin-right:10px;
        }
        .active {
          // background-image: url("~@/assets/img/btn_2.png");
          color: #06C0FC;
          border:1px solid #06C0FC;
        }
      }
    }
  }

  .dbom {
    display: block;
    height: 40px;
    width: 100%;
    background-image: url("~@/assets/img/speed/bom.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
</style>

<template>
  <div class="dataAnalysis">
    <div class="dheader">
      <p class="time">{{ newtime }}</p>
    </div>
    <div class="speed_body">
      <div class="speed_b_t">
        <div class="speed_l">
          <div class="l_top">
            <div class="card_h">
              <span>超速总统计</span>
              <div class="btns">
              <div @click="changeCar('carousel', 'chaosu')" :class="isbtn == 0 ? 'isbtn active' : 'isbtn'"
                >
                当月
                </div
              >
              <div
                @click="changeCar('carousel', 'chaosu2')"
                :class="isbtn == 1 ? 'isbtn active' : 'isbtn'"
                >
                近7日
                </div
              >
            </div>
            </div>

            <el-carousel
              class="gpsCarousel"
              style="height: calc(100%); width: 100%"
              trigger="click"
              height="100%"
              ref="carousel"
              arrow="always"
              indicator-position="none"
              @change="changeGps($event, 'isbtn')"
            >
              <el-carousel-item name="chaosu">
                <div
                  class="card_chart"
                  v-loading="loading1"
                  element-loading-background="rgba(0, 0, 0, 0.4)"
                >
                  <echart-base height="100%" width="100%" :chart-option="option1"></echart-base>
                </div>
              </el-carousel-item>
              <el-carousel-item name="chaosu2">
                <div
                  class="card_chart"
                  v-loading="loading8"
                  element-loading-background="rgba(0, 0, 0, 0.4)"
                >
                  <echart-base height="100%" width="100%" :chart-option="option9"></echart-base>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="l_bot">
            <div class="card_h">
              <span>昨日超速前五企业排名</span>
            </div>
            <div
              class="card_chart"
              v-loading="loading2"
              element-loading-background="rgba(0, 0, 0, 0.4)"
            >
              <echart-base height="100%" width="100%" :chart-option="option2"></echart-base>
            </div>
          </div>
        </div>
        <div class="speed_c">
          <div class="c_item">
            <div class="item">
              <div class="item_t">
                <span>今日总数</span>
                <span>
                  <span style="font-size: 17px;">
                    <CountTo
                      :startVal="0"
                      :endVal="alarmToDayData.vehicleCount ? alarmToDayData.vehicleCount : 0"
                      :duration="5000"
                    ></CountTo
                  ></span>
                  台
                </span>
                <img
                  v-if="alarmToDayData.vehicleCount > alarmYesterDayData.vehicleCount"
                  class="up"
                  src="@/assets/img/speed/up.png"
                />
                <img
                  v-else-if="alarmToDayData.vehicleCount < alarmYesterDayData.vehicleCount"
                  class="up"
                  src="@/assets/img/speed/down.png"
                />
              </div>
              <div class="item_t">
                <span>昨日总数</span>
                <span>
                  <span style="font-size: 17px;">
                    <CountTo
                      :startVal="0"
                      :endVal="
                        alarmYesterDayData.vehicleCount ? alarmYesterDayData.vehicleCount : 0
                      "
                      :duration="5000"
                    ></CountTo
                  ></span>
                  台
                </span>
              </div>
            </div>
            <div class="item">
              <div class="item_t">
                <span>当前在线</span>
                <span>
                  <span style="font-size: 17px;"
                    ><CountTo
                      :startVal="0"
                      :endVal="alarmToDayData.vehicleOlCount ? alarmToDayData.vehicleOlCount : 0"
                      :duration="5000"
                    ></CountTo
                  ></span>
                  台
                </span>
                <img
                  v-if="alarmToDayData.vehicleOlCount > alarmYesterDayData.vehicleOlCount"
                  class="up"
                  src="@/assets/img/speed/up.png"
                />
                <img
                  v-else-if="alarmToDayData.vehicleOlCount < alarmYesterDayData.vehicleOlCount"
                  class="up"
                  src="@/assets/img/speed/down.png"
                />
              </div>
              <div class="item_t">
                <span>昨日在线</span>
                <span>
                  <span style="font-size: 17px;"
                    ><CountTo
                      :startVal="0"
                      :endVal="
                        alarmYesterDayData.vehicleOlCount ? alarmYesterDayData.vehicleOlCount : 0
                      "
                      :duration="5000"
                    ></CountTo
                  ></span>
                  台
                </span>
              </div>
            </div>
            <div class="item">
              <div class="item_t">
                <span>超速总数</span>
                <span>
                  <span style="font-size: 17px;">
                    <CountTo
                      :startVal="0"
                      :endVal="alarmToDayData.overspeedCount ? alarmToDayData.overspeedCount : 0"
                      :duration="5000"
                    ></CountTo
                  ></span>
                  次
                </span>
                <img
                  v-if="alarmToDayData.overspeedCount > alarmYesterDayData.overspeedCount"
                  class="up"
                  src="@/assets/img/speed/up.png"
                />
                <img
                  v-else-if="alarmToDayData.overspeedCount < alarmYesterDayData.overspeedCount"
                  class="up"
                  src="@/assets/img/speed/down.png"
                />
              </div>
              <div class="item_t">
                <span>昨日报警</span>
                <span>
                  <span style="font-size: 17px;"
                    ><CountTo
                      :startVal="0"
                      :endVal="
                        alarmYesterDayData.overspeedCount ? alarmYesterDayData.overspeedCount : 0
                      "
                      :duration="5000"
                    ></CountTo
                  ></span>
                  次
                </span>
              </div>
            </div>
            <div class="item">
              <echart-base height="100%" width="100%" :chart-option="option8"></echart-base>
              <span class="qiri">七日趋势变化表</span>
            </div>
          </div>
          <div class="c_map" v-loading="loading7" element-loading-background="rgba(0, 0, 0, 0.4)">
            <sp-map :alarmDatas="mapDatas" ref="mapss" />
          </div>
        </div>
        <div class="speed_r">
          <div class="l_top">
            <div class="card_h">
              <span>昨日超速前五归属区域排名</span>
            </div>
            <div
              class="card_chart"
              v-loading="loading3"
              element-loading-background="rgba(0, 0, 0, 0.4)"
            >
              <echart-base height="100%" width="100%" :chart-option="option3"></echart-base>
            </div>
          </div>
          <div class="l_bot">
            <div class="card_h">
              <span>实时超速统计和变化趋势</span>
            </div>
            <div
              class="card_chart"
              v-loading="loading4"
              element-loading-background="rgba(0, 0, 0, 0.4)"
            >
              <echart-base height="100%" width="100%" :chart-option="option4"></echart-base>
            </div>
          </div>
        </div>
      </div>
      <div class="speed_b_b">
        <div class="speed_b_l">
          <div class="card_h">
            <span>动态超速事件滚动屏</span>
            <!--<el-date-picker
              class="pick_date"
              v-model="changeDate"
              type="month"
              format="yyyy-MM"
              placeholder="选择周"
              @change="dateChange"
            >
            </el-date-picker>-->
          </div>
          <el-table
            :data="tableData"
            class="speedTable speedTable1"
            stripe
            style="width: 100%"
            :header-cell-style="
              () => {
                return 'background-color:#0D2037;color:#39BDE5;padding:8px 0;font-size: 1.5vmin';
              }
            "
          >
            <el-table-column prop="date" label="车牌号" align="center"> </el-table-column>
            <el-table-column
              prop="date"
              label="所属运输公司"
              align="center"
              width="200"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column prop="date" label="超速速度" align="center"> </el-table-column>
            <el-table-column prop="date" label="超速持续时间" align="center"> </el-table-column>
            <el-table-column prop="date" label="超速级别" align="center"> </el-table-column>
            <el-table-column
              prop="date"
              label="超速地段详情"
              align="center"
              width="220"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
          <vueSeamlessScroll
            :data="alarmDatas"
            :class-option="classOption"
            style="height: 16vh; overflow: hidden"
            v-loading="loading5"
            element-loading-background="rgba(0, 0, 0, 0.4)"
          >
            <el-table
              :data="alarmDatas"
              class="speedTable"
              stripe
              style="width: 100%"
              :show-header="false"
              :header-cell-style="
                () => {
                  return 'background-color:#0D2037;color:#39BDE5;padding:8px 0;font-size: 1.6vmin';
                }
              "
            >
              <el-table-column prop="cheliangpaizhao" label="车牌号" align="center">
              </el-table-column>
              <el-table-column
                prop="deptName"
                label="所属运输公司"
                align="center"
                width="200"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column prop="velocity" label="超速速度" align="center"> </el-table-column>
              <el-table-column prop="keepTime" label="超速持续时间" align="center">
                <template scope="{row}">
                  <span>{{ formatTime(row.keepTime) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="超速级别" align="center">
                <template scope="{row}">
                  <span>{{ leveList[row.status] }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="roadName"
                label="超速地段详情"
                align="center"
                width="220"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </vueSeamlessScroll>
        </div>
        <div class="speed_b_l">
          <div class="card_h">
            <span>实时超速状态一览表</span>
          </div>
          <div
            class="bl_chart"
            v-loading="loading6"
            element-loading-background="rgba(0, 0, 0, 0.4)"
          >
            <div class="bl_t">
              <echart-base height="100%" width="100%" :chart-option="option5"></echart-base>
              <div class="bl_txt">
                <span
                  ><CountTo
                    :startVal="0"
                    :decimals="2"
                    :endVal="alarmChartData.Level1 ? alarmChartData.Level1 : 0"
                    :duration="5000"
                  ></CountTo
                ></span>
                <span>%</span>
              </div>
              <div class="bl_bg"></div>
              <div class="bl_bom bom1"></div>
            </div>
            <div class="bl_t">
              <echart-base height="100%" width="100%" :chart-option="option6"></echart-base>
              <div class="bl_txt">
                <span
                  ><CountTo
                    :startVal="0"
                    :decimals="2"
                    :endVal="alarmChartData.Level2 ? alarmChartData.Level2 : 0"
                    :duration="5000"
                  ></CountTo
                ></span>
                <span>%</span>
              </div>
              <div class="bl_bg"></div>
              <div class="bl_bom bom2"></div>
            </div>
            <div class="bl_t">
              <echart-base height="100%" width="100%" :chart-option="option7"></echart-base>
              <div class="bl_txt">
                <span
                  ><CountTo
                    :startVal="0"
                    :decimals="2"
                    :endVal="alarmChartData.Level3 ? alarmChartData.Level3 : 0"
                    :duration="5000"
                  ></CountTo
                ></span>
                <span>%</span>
              </div>
              <div class="bl_bg"></div>
              <div class="bl_bom bom3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="dbom"></div>
  </div>
</template>

<script>
import { format } from "@/config/date";
import dataAnalysisApi from "@/api/modules/speed";
import echartBase from "@/components/EChart/index";
import vueSeamlessScroll from "vue-seamless-scroll";
import { mapGetters } from "vuex";
import {
  geooption1,
  geooption2,
  geooption3,
  geooption4,
  geooption5,
  geooption6,
  geooption7,
  geooption8,
  geooption9,
} from "@/config/echartspeed.js";
import SpMap from "./map/spMap";
import dayjs from "dayjs";
import CountTo from "vue-count-to";
export default {
  data() {
    return {
      option1: {},
      option2: {},
      option3: {},
      option4: {},
      option5: {},
      option6: {},
      option7: {},
      option8: {},
      option9: {},
      loading1: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      loading6: false,
      loading7: false,
      loading8: false,
      tableData: [],
      // 数据
      alarmDatas: [],
      mapDatas: [],
      alarmChartData: [],
      alarmTendencyData: [],
      alarmDeptFifthData: [],
      alarmMothWeekData: [],
      alarmSevenData: [],
      alarmToDayData: [],
      alarmYesterDayData: [],
      changeDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      leveList: { 1: "轻微超速", 2: "一般超速", 3: "严重超速" },
      newtime: "",
      isbtn: 0,
    };
  },
  components: {
    "echart-base": echartBase,
    vueSeamlessScroll,
    SpMap,
    CountTo,
  },
  mounted() {
    const timer = setInterval(() => {
      // 某些定时器操作
      this.setNewTime();
    }, 1000);
    // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });

    this.getByAlarm();
    this.getByAlarm2();
    this.getByAlarmChart();
    this.getByAlarmTendency();
    this.getByDeptFifth();
    this.getByMothWeekAlarm();
    this.getBySevenAlarm();
    this.getByToDay();
    this.getByYesterDay();
    this.getDiquFifth();
  },
  computed: {
    ...mapGetters({
      userinfo: "userinfo",
    }),
    classOption() {
      return {
        step: 0.6, //数值越大速度滚动越快
        limitMoveNum: 5, //开始无缝滚动的数据量  //this.fourDatata.length
        hoverStop: true, //是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, //开启数据实时监控刷新dom
        singleHeight: 0, //单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, //单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, //单步运动停止的时间(默认值1000ms)
      };
    },
  },
  methods: {
    setNewTime() {
      this.newtime = format(new Date(), "YYYY-MM-DD HH:mm:ss dddd");
    },
    changeCar(name, carName) {
      this.$refs[name].setActiveItem(carName);
    },
    changeGps(e, type) {
      this[type] = e;
    },
    //动态超速滚动数据及热力图数据
    async getByAlarm() {
      this.loading5 = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getByAlarm({
          beginTime: dayjs(this.changeDate).format("YYYY-MM-DD 00:00:00"),
          endTime: dayjs(this.changeDate).format("YYYY-MM-DD HH:mm:ss"),
          deptId: this.userinfo.deptId,
        })
      );
      if (data) {
        this.alarmDatas = data;
        this.loading5 = false;
      } else {
        this.alarmDatas = [];
        this.$message.error(err);
        this.loading5 = false;
      }
    },
    //动态超速滚动数据及热力图数据
    async getByAlarm2() {
      this.loading7 = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getByAlarm({
          beginTime: dayjs(this.changeDate)
            .subtract(1, "month")
            .format("YYYY-MM-DD HH:mm:ss"),
          endTime: dayjs(this.changeDate).format("YYYY-MM-DD HH:mm:ss"),
          deptId: this.userinfo.deptId,
        })
      );
      if (data) {
        this.mapDatas = data.map((el) => {
          el.lng = el.longitude;
          el.lat = el.latitude;
          return el;
        });
        this.$refs.mapss.init(this.mapDatas);
        this.loading7 = false;
      } else {
        this.mapDatas = [];
        this.$message.error(err);
        this.loading7 = false;
      }
    },
    //超速看板-状态一览表
    async getByAlarmChart() {
      this.loading6 = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getByAlarmChart({ deptId: this.userinfo.deptId })
      );
      if (data) {
        let d = {
          Level1: Number(data.overspeedLevel1Avg.split("%")[0]),
          Level2: Number(data.overspeedLevel2Avg.split("%")[0]),
          Level3: Number(data.overspeedLevel3Avg.split("%")[0]),
        };
        this.alarmChartData = d;
        this.option5 = geooption5(d.Level1);
        this.option6 = geooption6(d.Level2);
        this.option7 = geooption7(d.Level3);
        this.loading6 = false;
      } else {
        this.$message.error(err);
        this.loading6 = false;
      }
    },
    //实时报警曲线
    async getByAlarmTendency() {
      this.loading4 = false;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getByAlarmTendency({ deptId: this.userinfo.deptId })
      );
      if (data) {
        let datas = [];
        let data1 = [];
        let data2 = [];
        let data3 = [];
        if (data.length > 0) {
          data.forEach((val) => {
            datas.push(val.part);
            data1.push(val.overspeedLevel1Count);
            data2.push(val.overspeedLevel2Count);
            data3.push(val.overspeedLevel3Count);
          });
        }
        this.option4 = geooption4(datas, data1, data2, data3);
        this.loading4 = false;
      } else {
        this.$message.error(err);
        this.option4 = geooption4([], [], [], []);
        this.loading4 = false;
      }
    },
    //昨日企业报警前五排名数据
    async getByDeptFifth() {
      this.loading2 = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getByDeptFifth({ deptId: this.userinfo.deptId })
      );
      if (data) {
        // this.alarmDeptFifthData = data;
        let time = [];
        let datas = [];
        if (data.length > 0) {
          data.forEach((val) => {
            time.push(val.deptName);
            datas.push(val.overspeedCount);
          });
        }
        this.option2 = geooption2(time, datas);
        this.loading2 = false;
      } else {
        this.option2 = geooption2([], []);
        this.loading2 = false;
        this.$message.error(err);
      }
    },
    //月度报警柱状数据
    async getByMothWeekAlarm() {
      this.loading1 = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getByMothWeekAlarm({ deptId: this.userinfo.deptId })
      );
      if (data) {
        if (data.length > 0) {
          let datas = data[0];
          let data1 = [
            datas.firstOverOneCount,
            datas.twoOverOneCount,
            datas.threeOverOneCount,
            datas.fourOverOneCount,
          ];
          let data2 = [
            datas.firstOverTwoCount,
            datas.twoOverTwoCount,
            datas.threeOverTwoCount,
            datas.fourOverTwoCount,
          ];
          let data3 = [
            datas.firstOverThreeCount,
            datas.twoOverThreeCount,
            datas.threeOverThreeOCount,
            datas.fourOverThreeCount,
          ];

          this.option1 = geooption1(data1, data2, data3);
          this.loading1 = false;
        } else {
          this.option1 = geooption1([], [], []);
          this.$message.error(err);
          this.loading1 = false;
        }
      }
    },
    //近七天报警柱状数据
    async getBySevenAlarm() {
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getBySevenAlarm({ deptId: this.userinfo.deptId })
      );
      if (data) {
        // this.alarmSevenData = data;
        let datas = [];
        let data1 = [];
        let data2 = [];
        let data3 = [];
        let dates = [];
        if (data.length > 0) {
          data.forEach((val) => {
            datas.push(val.overspeedCount);
            data1.push(val.overspeedLevel1Count);
            data2.push(val.overspeedLevel2Count);
            data3.push(val.overspeedLevel3Count);
            dates.push(dayjs(val.calcDate).format("MM-DD"));
          });
        }
        this.option8 = geooption8(datas);
        this.option9 = geooption9(data1,data2,data3,dates);
      } else {
        this.$message.error(err);
        this.option8 = geooption8([]);
        this.option9 = geooption9([],[],[],[]);
      }
    },
    //今日数据
    async getByToDay() {
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getByToDay({ deptId: this.userinfo.deptId })
      );
      if (data) {
        this.alarmToDayData = data;
      } else {
        this.$message.error(err);
      }
    },
    //昨日数据
    async getByYesterDay() {
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getByYesterDay({ deptId: this.userinfo.deptId })
      );
      if (data) {
        this.alarmYesterDayData = data;
      } else {
        this.$message.error(err);
      }
    },
    //昨日政府报警前五排名数据
    async getDiquFifth() {
      this.loading3 = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getDiquFifth({ deptId: this.userinfo.deptId })
      );
      if (data) {
        let time = [];
        let datas = [];
        if (data.length > 0) {
          data.forEach((val, index) => {
            time.push("NO." + (index + 1) + "-" + val.areaname);
            datas.push(val.overspeedCount);
          });
        }
        console.log(time, datas);
        this.option3 = geooption3(time.reverse(), datas.reverse());
        this.loading3 = false;
      } else {
        this.$message.error(err);
        this.option3 = geooption3([], []);
        this.loading3 = false;
      }
    },
    // 时间选择
    dateChange() {
      this.getByAlarm();
    },
    // 换算时间
    formatTime(seconds) {
      var hours = Math.floor(seconds / 3600);
      var minutes = Math.floor((seconds % 3600) / 60);
      var secs = seconds % 60;
      return hours + "时" + minutes + "分" + secs + "秒";
    },
  },
};
</script>
<style lang="scss">
.speedTable {
  &.el-table--enable-row-hover .el-table__body tr:hover > td {
    background: #0a182a;
  }
  thead.is-group th {
    background: #0a1020;
  }
  &.el-table--border th {
    border-bottom: 1px solid #0a3774;
    &.gutter:last-of-type {
      border-bottom: 1px solid #0a3774;
    }
  }
  tr {
    background: #0a1020;
  }
  td {
    // border-right: 1px solid #0a3774;
    border-bottom: 1px solid #0a3774;
    color: #ffffff;
    padding: 8px 0;
    font-size: 1.4vmin;
  }
  th.is-leaf {
    border-bottom: 1px solid #0a3774;
  }
  th {
    background: transparent;
    // border-right: 1px solid #0a3774;
    color: #ffffff;
  }
  &::before {
    background-color: #58626e;
  }
  &::after {
    background-color: #58626e;
  }
  .el-table__body-wrapper {
    height: calc(100% - 92px);
  }
  .el-table__row--striped td {
    background: #0a1629 !important;
  }
}
.speedTable1 {
  .el-table__empty-block {
    display: none;
  }
}
</style>
