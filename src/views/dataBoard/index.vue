<style lang="scss" scoped>
.home {
  height: 100vh;
  overflow: hidden;
  background-image: url("~@/assets/img/bg.png");
  background-size: 100% 100%;
  position: relative;

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
    font-size: 24px;
    font-weight: bold;
    color: #fff;
  }

  .center {
    height: 90%;
    margin-top: 4%;
    padding: 30px;
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

        .btn {
          background-image: url("~@/assets/img/nav_btn.png");
          background-size: 100% 100%;
          width: calc(64% / 8);
          padding: 13px 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .jiance {
        width: 50%;
        height: 35%;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -10px;
        margin: auto;
        display: flex;
        justify-content: space-evenly;
        font-size: 18px;
        font-weight: 800;

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
            width: 43%;
            height: 10%;
            display: flex;
            justify-content: center;
            align-items: center;

          }

          .bg2 {
            margin-top: 6%;
            background-image: url("~@/assets/img/contentLeft2.png");
            background-size: 100% 100%;
            width: 100%;
            height: 20%;

            .tit {
              padding-left: 18%;
              padding-top: 2%;
              font-size: 15px;
              font-weight: 400;
            }

            .item {
              display: flex;
              justify-content: space-evenly;
              margin-top: 10px;
              padding-left: 10px;
              height: 50%;

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
                font-size: 22px;
              }

            }
          }

          .bg3 {
            margin-top: 6%;
            background-image: url("~@/assets/img/contentLeft3.png");
            background-size: 100% 100%;
            width: 100%;
            height: 55%;

            .tit {
              padding-left: 18%;
              padding-top: 2%;
              font-size: 15px;
              font-weight: 400;
            }

            .list {
              height: 80%;
              display: flex;
              flex-wrap: wrap;
              padding-left: 8%;
              margin-top: 20px;

              div {
                width: 40%;
                height: 23%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                margin-left: 5%;
              }

              .span {
                font-size: 22px;
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
          width: 50%;
          height: 8%;
          margin-top: 2%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          font-weight: 800;
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
          padding: 10px 40px;

          .tit {
            display: flex;
            justify-content: space-around;
            width: 100%;
            height: 10%;

            .control {
              background-image: url("~@/assets/img/contentLeft1.png");
              background-size: 100% 100%;
              width: 40%;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .manage {
              background-image: url("~@/assets/img/contentLeft1.png");
              background-size: 100% 100%;
              width: 40%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }

          .action {
            margin-top: 20px;

            .action_bg {
              background-image: url("~@/assets/img/contentRight_action.png");
              background-size: 100% 100%;
              padding: 6px 0 6px 40px;
              margin-bottom: 10px;
              display: flex;
              align-items: center;
            }

            .actionList {
              display: flex;
              justify-content: space-around;
              flex-wrap: wrap;

              .item {
                width: calc(90% / 2);
                padding: 10px 0;
                margin-bottom: 10px;
                display: flex;
                justify-content: center;

                .text {
                  display: flex;
                  flex-direction: column;

                  .span {
                    font-size: 20px;
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
              padding: 6px 0 6px 40px;
              margin-bottom: 10px;
              display: flex;
              align-items: center;
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
      <span>综合治理数字监管平台</span>
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
                  <span class="span">{{ oneList.zcvehnumb }}</span><span>车辆总数</span>
                </div>
                <div class="item2">
                  <span class="span">{{ oneList.qiyeshu }}</span><span>企业总数</span>
                </div>
              </div>
            </div>
            <div class="bg3">
              <div class="tit">平台安全标准</div>
              <div class="list">
                <div>
                  <span class="span">{{ alarmCount.csclnum }}</span><span>超速报警</span>
                </div>
                <div>
                  <span class="span">{{ alarmCount.plclnum }}</span><span>疲劳驾驶报警</span>
                </div>
                <div>
                  <span class="span">{{ alarmCount.yjclnum }}</span><span>夜间行驶报警</span>
                </div>
                <div>
                  <span class="span">{{ alarmCount.ycclnum }}</span><span>异常车辆报警</span>
                </div>
                <div>
                  <span class="span">86</span><span>企业安全标准化</span>
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
                    <span class="span">{{ monitor.gpschaosu }}</span>
                    <span>超速报警</span>
                  </div>
                </div>
                <div class="item item2">
                  <div class="text">
                    <span class="span">{{ monitor.gpspilao }}</span>
                    <span>疲劳驾驶</span>
                  </div>
                </div>
                <div class="item item3">
                  <div class="text">
                    <span class="span">{{ monitor.gpsyejian }}</span>
                    <span>夜间行驶</span>
                  </div>
                </div>
                <div class="item item4">
                  <div class="text">
                    <span class="span">{{ monitor.gpsyichang }}</span>
                    <span>异常车辆</span>
                  </div>
                </div>
                <div class="item item5">
                  <div class="text">
                    <span class="span">{{ monitor.dmsjiedadianhua }}</span>
                    <span>接打电话</span>
                  </div>
                </div>
                <div class="item item6">
                  <div class="text">
                    <span class="span">{{ monitor.dmsfenshen }}</span>
                    <span>分神驾驶</span>
                  </div>
                </div>
                <div class="item item7">
                  <div class="text">
                    <span class="span">{{ monitor.dmschouyan }}</span>
                    <span>抽烟报警</span>
                  </div>
                </div>
                <div class="item item8">
                  <div class="text">
                    <span class="span">{{ monitor.dmspilao }}</span>
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
                    <span>TIS下发</span>
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
      monitor: {}
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
  methods: {
    init() {
      this.getOne(this.userinfo.deptId);
      this.getVehAlarmCount(this.userinfo.deptId);
      this.getAlarmCount(this.userinfo.deptId);
    },

    // 数据接入
    async getOne(deptId) {
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