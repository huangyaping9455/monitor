<style lang="scss" scoped>
.home {
  height: 100vh;
  overflow: hidden;
  background-image: url("~@/assets/img/bg.png");
  background-size: 100% 100%;
  position: relative;
  font-weight: bold;

  .head {
    background-image: url("~@/assets/img/bg_head.png");
    background-size: 100% 100%;
    width: 100%;
    height: 10%;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: relative;

    .tit {
      font-size: 3.2vmin;
      letter-spacing: 28px;
    }

    .time {
      position: absolute;
      right: 2vmin;
      top: 20%;
      font-size: 1.5vmin;
    }

  }

  .center {
    height: 90%;
    padding: 15px 30px;
    color: #fff;

    .nav {
      background-image: url("~@/assets/img/nav_bg.png");
      background-size: 100% 100%;
      height: 13%;
      padding-top: 33px;
      position: relative;

      .btns {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        font-size: 1.8vmin;

        .btn {
          background-image: url("~@/assets/img/nav_btn.png");
          background-size: 100% 100%;
          width: calc(64% / 8);
          padding: 15px 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .jiance {
        width: 50%;
        height: 29%;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -10px;
        margin: auto;
        display: flex;
        justify-content: space-evenly;
        font-size: 2.3vmin;
        letter-spacing: 6px;

        .car {
          background-image: url("~@/assets/img/nav_dept.png");
          background-size: 100% 100%;
          width: 35%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        .dept {
          background-image: url("~@/assets/img/nav_dept.png");
          background-size: 100% 100%;
          width: 35%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        .isShow {
          background-image: url("~@/assets/img/nav_car.png");
        }
      }
    }

    .content {
      height: 77%;
      display: flex;
      align-items: center;
      margin-top: -1.5%;
      color: #fff;

      .contentLeft {
        flex: 1;
        height: 80%;
        padding: 60px 0;
        background-image: url("~@/assets/img/contentLeft_bg.png");
        background-size: 100% 100%;

        .bg {
          height: 100%;
          padding: 10px 40px;

          .bg1 {
            background-image: url("~@/assets/img/contentLeft1.png");
            background-size: 100% 100%;
            width: 45%;
            height: 13%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.8vmin;
            letter-spacing: 5px;
          }

          .bg2 {
            margin-top: 3%;
            background-image: url("~@/assets/img/contentLeft2.png");
            background-size: 100% 100%;
            width: 100%;
            height: 23%;

            .tit {
              padding-left: 18%;
              padding-top: 2%;
              font-size: 18px;
            }

            .item {
              display: flex;
              justify-content: space-evenly;
              margin-top: 17px;
              padding-left: 10px;
              height: 46%;

              div {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
              }

              .item1 {
                width: 25%;
              }

              .item2 {
                width: 20%;
              }

              .span {
                font-size: 2.2vmin;
              }

            }
          }

          .bg3 {
            margin-top: 6%;
            background-image: url("~@/assets/img/contentLeft3.png");
            background-size: 100% 100%;
            width: 100%;
            height: 50%;

            .tit {
              padding-left: 18%;
              padding-top: 2%;
              font-size: 18px;
            }

            .list {
              height: 80%;
              display: flex;
              flex-wrap: wrap;
              padding-left: 8%;
              margin-top: 14px;

              div {
                width: 40%;
                height: 25%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                margin-left: 5%;
              }

              .span {
                font-size: 2.2vmin;
              }
            }
          }

        }

      }

      .contentCenter {
        flex: 2;
        background-image: url("~@/assets/img/contentCenter_bg.png");
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        width: 100%;
        height: 84%;
        margin: 0 20px;
        position: relative;

        .tit {
          background-image: url("~@/assets/img/contentCenter1.png");
          background-size: 100% 100%;
          width: 60%;
          height: 9%;
          margin-top: 4%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2vmin;
          letter-spacing: 8px;
        }

        .ball {
          background-image: url("~@/assets/img/contentCenter2.png");
          background-size: 100% 100%;
          width: 78%;
          height: 70%;
          position: absolute;
          bottom: 20px;
        }
      }

      .contentRight {
        flex: 1;
        height: 80%;
        padding: 60px 0;
        background-image: url("~@/assets/img/contentRight_bg.png");
        background-size: 100% 100%;

        .bg {
          height: 100%;
          padding: 0 40px;

          .tit {
            display: flex;
            justify-content: space-around;
            width: 100%;
            height: 13%;

            .control {
              background-image: url("~@/assets/img/contentLeft1.png");
              background-size: 100% 100%;
              width: 45%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 1.8vmin;
              letter-spacing: 5px;
            }

            .manage {
              background-image: url("~@/assets/img/contentLeft1.png");
              background-size: 100% 100%;
              width: 45%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 1.8vmin;
              letter-spacing: 5px;
            }
          }

          .action {
            margin-top: 10px;

            .action_bg {
              background-image: url("~@/assets/img/contentRight_action.png");
              background-size: 100% 100%;
              padding: 8px 0 8px 45px;
              margin-bottom: 10px;
              display: flex;
              align-items: center;
              font-size: 1.6vmin;
            }

            .actionList {
              display: flex;
              justify-content: space-around;
              flex-wrap: wrap;

              .item {
                width: calc(90% / 2);
                padding: 10px 0;
                margin-bottom: 5px;
                display: flex;
                justify-content: center;

                .text {
                  display: flex;
                  flex-direction: column;
                  margin-bottom: 6px;

                  .span {
                    font-size: 2vmin;
                    color: #00b6e2;
                  }
                }


              }

              .item1 {
                background-image: url("~@/assets/img/contentRight_action1.png");
                background-size: 100% 100%;
              }

              .item2 {
                background-image: url("~@/assets/img/contentRight_action2.png");
                background-size: 100% 100%;
              }

              .item3 {
                background-image: url("~@/assets/img/contentRight_action3.png");
                background-size: 100% 100%;
              }

              .item4 {
                background-image: url("~@/assets/img/contentRight_action4.png");
                background-size: 100% 100%;
              }

              .item5 {
                background-image: url("~@/assets/img/contentRight_action5.png");
                background-size: 100% 100%;
              }

              .item6 {
                background-image: url("~@/assets/img/contentRight_action6.png");
                background-size: 100% 100%;
              }

              .item7 {
                background-image: url("~@/assets/img/contentRight_action5.png");
                background-size: 100% 100%;
              }

              .item8 {
                background-image: url("~@/assets/img/contentRight_action6.png");
                background-size: 100% 100%;
              }

            }

          }

          .handle {
            margin-top: 10px;
            width: 100%;

            .handle_bg {
              background-image: url("~@/assets/img/contentRight_action.png");
              background-size: 100% 100%;
              padding: 8px 0 8px 45px;
              margin-bottom: 10px;
              display: flex;
              align-items: center;
              font-size: 1.6vmin;
            }

            .handleList {
              display: flex;
              justify-content: space-evenly;

              .item {
                width: calc(80% / 2);
                display: flex;
                align-items: center;

                img {
                  width: 30%;
                  height: 90%;
                }

                div {
                  display: flex;
                  flex-direction: column;
                  margin-left: 10px;
                }

              }
            }
          }
        }
      }
    }
  }


  .foot {
    color: #fff;
    background-image: url("~@/assets/img/bg_foot.png");
    background-size: 100% 100%;
    width: 100%;
    height: 10%;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;

    .footList {
      width: 40%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding-top: 16px;


      div {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          width: 30%;
          height: 30%;
        }
      }
    }
  }

}
</style>

<template>
  <div class="home">
    <div class="head">
      <span class="tit">综合治理数字监管平台</span>
      <span class="time">{{ newtime }}</span>
    </div>
    <div class="center">
      <div class="nav">
        <div class="btns" v-if="isActive == 1">
          <div class="btn" v-for="(item, index) in carList" :key="index">{{ item.label }}</div>
        </div>
        <div class="btns" v-else>
          <div class="btn" v-for="(item, index) in deptList" :key="index">{{ item.label }}</div>
        </div>
        <div class="jiance">
          <div :class="['car', isActive == 1 ? 'isShow' : '']" @click="isActive = 1">车辆运行监测</div>
          <div :class="['car', isActive == 2 ? 'isShow' : '']" class="dept" @click="isActive = 2">企业风险监测</div>
        </div>
      </div>
      <div class="content">
        <div class="contentLeft">
          <div class="bg">
            <div class="bg1">事前严防</div>
            <div class="bg2">
              <div class="tit">数据接入</div>
              <div class="item">
                <div class="item1">
                  <!-- <span class="span">{{ oneList.zcvehnumb }}</span> -->
                  <animate-number class="span" ref="reNum" from="0" :to="oneList.zcvehnumb" :key="oneList.zcvehnumb"
                    duration="5000"></animate-number>
                  <span>车辆总数</span>
                </div>
                <div class="item2">
                  <!-- <span class="span">{{ oneList.qiyeshu }}</span> -->
                  <animate-number class="span" ref="reNum" from="0" :to="oneList.qiyeshu" :key="oneList.qiyeshu"
                    duration="5000"></animate-number>
                  <span>企业总数</span>
                </div>
              </div>
            </div>
            <div class="bg3">
              <div class="tit">平台安全标准</div>
              <div class="list">
                <div>
                  <!-- <span class="span">{{ alarmCount.csclnum }}</span> -->
                  <animate-number class="span" ref="reNum" from="0" :to="alarmCount.csclnum" :key="alarmCount.csclnum"
                    duration="5000"></animate-number>
                  <span>超速报警</span>
                </div>
                <div>
                  <!-- <span class="span">{{ alarmCount.plclnum }}</span> -->
                  <animate-number class="span" ref="reNum" from="0" :to="alarmCount.csclnum" :key="alarmCount.csclnum"
                    duration="5000"></animate-number>
                  <span>疲劳驾驶报警</span>
                </div>
                <div>
                  <!-- <span class="span">{{ alarmCount.yjclnum }}</span> -->
                  <animate-number class="span" ref="reNum" from="0" :to="alarmCount.yjclnum" :key="alarmCount.yjclnum"
                    duration="5000"></animate-number>
                  <span>夜间行驶报警</span>
                </div>
                <div>
                  <!-- <span class="span">{{ alarmCount.ycclnum }}</span> -->
                  <animate-number class="span" ref="reNum" from="0" :to="alarmCount.ycclnum" :key="alarmCount.ycclnum"
                    duration="5000"></animate-number>
                  <span>异常车辆报警</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="contentCenter">
          <div class="tit"><span>安全过程管理</span></div>
          <div class="ball"></div>
        </div>
        <div class="contentRight">
          <div class="bg">
            <div class="tit">
              <div class="control">事中严控</div>
              <div class="manage">事后严管</div>
            </div>
            <div class="action">
              <div class="action_bg">监控行为</div>
              <div class="actionList">
                <div class="item item1">
                  <div class="text">
                    <!-- <span class="span">{{ monitor.gpschaosu }}</span> -->
                    <animate-number class="span" ref="reNum" from="0" :to="monitor.gpschaosu" :key="monitor.gpschaosu"
                      duration="5000"></animate-number>
                    <span>超速报警</span>
                  </div>
                </div>
                <div class="item item2">
                  <div class="text">
                    <!-- <span class="span">{{ monitor.gpspilao }}</span> -->
                    <animate-number class="span" ref="reNum" from="0" :to="monitor.gpspilao" :key="monitor.gpspilao"
                      duration="5000"></animate-number>
                    <span>疲劳驾驶</span>
                  </div>
                </div>
                <div class="item item3">
                  <div class="text">
                    <!-- <span class="span">{{ monitor.gpsyejian }}</span> -->
                    <animate-number class="span" ref="reNum" from="0" :to="monitor.gpsyejian" :key="monitor.gpsyejian"
                      duration="5000"></animate-number>
                    <span>夜间行驶</span>
                  </div>
                </div>
                <div class="item item4">
                  <div class="text">
                    <!-- <span class="span">{{ monitor.gpsyichang }}</span> -->
                    <animate-number class="span" ref="reNum" from="0" :to="monitor.gpsyichang" :key="monitor.gpsyichang"
                      duration="5000"></animate-number>
                    <span>异常车辆</span>
                  </div>
                </div>
                <div class="item item5">
                  <div class="text">
                    <!-- <span class="span">{{ monitor.dmsjiedadianhua }}</span> -->
                    <animate-number class="span" ref="reNum" from="0" :to="monitor.dmsjiedadianhua"
                      :key="monitor.dmsjiedadianhua" duration="5000"></animate-number>
                    <span>接打电话</span>
                  </div>
                </div>
                <div class="item item6">
                  <div class="text">
                    <!-- <span class="span">{{ monitor.dmsfenshen }}</span> -->
                    <animate-number class="span" ref="reNum" from="0" :to="monitor.dmsfenshen" :key="monitor.dmsfenshen"
                      duration="5000"></animate-number>
                    <span>分神驾驶</span>
                  </div>
                </div>
                <div class="item item7">
                  <div class="text">
                    <!-- <span class="span">{{ monitor.dmschouyan }}</span> -->
                    <animate-number class="span" ref="reNum" from="0" :to="monitor.dmschouyan" :key="monitor.dmschouyan"
                      duration="5000"></animate-number>
                    <span>抽烟报警</span>
                  </div>
                </div>
                <div class="item item8">
                  <div class="text">
                    <!-- <span class="span">{{ monitor.dmspilao }}</span> -->
                    <animate-number class="span" ref="reNum" from="0" :to="monitor.dmspilao" :key="monitor.dmspilao"
                      duration="5000"></animate-number>
                    <span>生理疲劳</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="handle">
              <div class="handle_bg">报警处理</div>
              <div class="handleList">
                <div class="item">
                  <img src="@/assets/img/contentRight_handle2.png">
                  <div>
                    <span>TTS下发</span>
                    <span>9863个</span>
                  </div>
                </div>
                <div class="item">
                  <img src="@/assets/img/contentRight_handle1.png">
                  <div>
                    <span>电话处理</span>
                    <span>9863个</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      <!-- <div class="footList">
        <div>
          <img src="@/assets/img/foot1.png">
          <span>政府监测系统</span>
        </div>
        <div>
          <img src="@/assets/img/foot2.png">
          <span>企业基础档案</span>
        </div>
        <div>
          <img src="@/assets/img/foot3.png">
          <span>动态监控系统</span>
        </div>
        <div>
          <img src="@/assets/img/foot5.png">
          <span>安全生产标准化</span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import homeApi from "@/api/modules/newHome";
import { format } from "@/config/date";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // 车辆运行监测
      isActive: 1,
      carList: [{
        label: "超速报警",
      }, {
        label: "疲劳驾驶报警",
      }, {
        label: "夜间行驶报警",
      }, {
        label: "异常车辆报警",
      }, {
        label: "抽烟报警",
      }, {
        label: "接打电话报警",
      }, {
        label: "分神驾驶报警",
      }, {
        label: "生理疲劳报警",
      }],
      deptList: [{
        label: "车辆入网率",
      }, {
        label: "车辆上线率",
      }, {
        label: "轨迹完整率",
      }, {
        label: "漂移车辆率",
      }, {
        label: "数据合格率",
      }],
      // 数据接入
      oneList: {},
      // 平台安全标准
      alarmCount: {},
      // 监控行为
      monitor: {},
      newtime: "",
    }
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters({
      userinfo: "userinfo",
    }),
  },
  mounted() {
    let _this = this
    const timer = setInterval(() => {
      // 某些定时器操作
      _this.setNewTime();
    }, 1000);
    // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });

    const timerData = setInterval(() => {
      _this.init();
    }, 90000);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timerData);
    });
  },
  methods: {
    setNewTime() {
      this.newtime = format(new Date(), "YYYY-MM-DD HH:mm:ss dddd");
    },

    init() {
      this.getOne(this.userinfo.deptId);
      this.getVehAlarmCount(this.userinfo.deptId);
      this.getAlarmCount(this.userinfo.deptId);
    },

    // 数据接入
    async getOne(deptId) {
      this.oneList = {
        zcvehnumb: 0,
        qiyeshu: 0
      }
      let [err, data] = await homeApi.awaitWrap(
        homeApi.getOne({
          deptId: deptId,
        })
      );
      if (err) {
        this.$message.error(err);
      } else {
        this.oneList = data[0]
      }
    },

    // 平台安全标准
    async getVehAlarmCount(deptId) {
      this.alarmCount = {
        csclnum: 0,
        plclnum: 0,
        yjclnum: 0,
        ycclnum: 0
      }
      let [err, data] = await homeApi.awaitWrap(
        homeApi.getVehAlarmCount({
          deptId: deptId,
          size: 100,
          current: 1,
        })
      );
      if (err) {
        this.$message.error(err);
      } else {
        this.alarmCount = data
      }
    },

    // 监控行为
    async getAlarmCount(deptId) {
      this.monitor = {
        gpschaosu: 0,
        gpspilao: 0,
        gpsyejian: 0,
        gpsyichang: 0,
        dmsjiedadianhua: 0,
        dmsfenshen: 0,
        dmschouyan: 0,
        dmspilao: 0,
      }
      let [err, data] = await homeApi.awaitWrap(
        homeApi.getAlarmCount({
          deptId: deptId,
          size: 100,
          current: 1,
        })
      );
      if (err) {
        this.$message.error(err);
      } else {
        this.monitor = data
      }
    }

  }
}

</script>