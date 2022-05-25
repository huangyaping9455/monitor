<style lang="scss" scoped>
.vehicledetails {
  .topbtn {
    border: solid 1px #0a3774;
    background-image: linear-gradient(0deg, #0080de 0%, #00c8f5 100%);
    color: #ffffff;
    font-weight: bold;
    width: 130px;
    cursor: default;
    font-size: 16px;
    &:last-of-type {
      margin-left: 30px;
    }
    &.active {
      background-color: #0add32;
      color: #ffffff;
    }
    &.noact {
      background: red;
    }
    &.nom {
      margin: 0;
      cursor: pointer;
    }
  }
  .subbtn {
    background-image: linear-gradient(0deg, #0080de 0%, #00c8f5 100%);
    color: #ffffff;
  }
  .veh-main {
    .main-top {
      display: flex;
      justify-content: space-between;
      .baidumap {
        flex: 0 0 50%;
      }
      .top-r {
        flex: 0 0 49%;
        border: solid 1px #0a3774;
        .title {
          display: flex;
          justify-content: center;
          p {
            text-align: center;
            // color: #01f8ff;
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            padding: 3px 2rem;
            cursor: pointer;
          }
          p:hover {
            background-color: #0a3774;
            color: white;
            box-shadow: 2px 3px 10px black;
            border-radius: 10px;
          }
        }
      }
      .means {
        .means-top {
          display: flex;
          padding: 10px;
          box-sizing: border-box;
          min-height: 175px;
        }
        .img {
          width: 200px;
          margin-right: 20px;
          img {
            width: 100%;
          }
        }
        .means-name {
          color: #ffffff;
          font-size: 20px;
          margin: 5px 0;
        }
        .means-txt {
          color: #ffffff;
          margin: 5px 0;
        }
        .means-bottom {
          border-top: solid 1px #0a3774;
          padding: 10px;
          box-sizing: border-box;
          color: #668bd6;
          display: flex;
          flex-wrap: wrap;
          p {
            flex: 0 0 50%;
            margin: 5px 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .main-bottom {
          flex: 0 0 40%;
          .bottom-item-head {
            display: flex;
            background-color: #0f1f40;
            border: solid 1px #0a3774;
            color: #ffffff;
            span:first-of-type {
              box-sizing: border-box;
              display: flex;
              justify-content: center;
              border-right: solid 1px #0a3774;
              flex: 0 0 60%;
              padding: 5px;
            }
            span:last-of-type {
              padding: 7px 0;
              box-sizing: border-box;
              display: flex;
              justify-content: center;
              border-right: solid 1px #0a3774;
              flex: 0 0 40%;
            }
          }
          .bottom-item {
            display: flex;
            background-color: #0f1f40;
            border: solid 1px #0a3774;
            color: #ffffff;
            &:first-of-type {
              text-align: center;
              border-bottom: none;
              div {
                padding: 7px 0;
                box-sizing: border-box;
              }
            }
            &:last-of-type {
              height: 200px;
              div {
                padding: 10px;
                box-sizing: border-box;
                overflow-y: auto;
              }
            }
            div:first-of-type {
              flex: 0 0 60%;
            }
            div:last-of-type {
              flex: 0 0 40%;
            }

            .item-txt {
              display: flex;
              flex-wrap: wrap;
              flex-grow: 1;
              // flex-direction: column;
              justify-content: flex-start;
              border-right: solid 1px #0a3774;
              overflow-y: scroll;
              p {
                margin: 8px;
                p:nth-of-type(6),
                p:nth-of-type(7) {
                  display: flex;
                }
                span:first-of-type {
                  color: #395da8;
                }
              }
            }
            .item-msg {
              display: flex;
              flex-direction: column;
              border-right: solid 1px #0a3774;
              p {
                margin: 8px;
                .pingzheng {
                  cursor: pointer;
                  width: 30px;
                  height: 30px;
                  margin: -10px 0;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <el-dialog
    top="1vh"
    width="60%"
    class="vehicledetails"
    center
    :show-close="false"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
  >
    <div slot="title">
      <el-button class="topbtn" size="mini">{{
        vehicleoption.cheliangpaizhao
      }}</el-button>
      <el-button
        :class="
          vehicleoption.chulizhuangtai == '未处理' ||
          vehicleoption.chulizhuangtai == '未申述'
            ? 'noact'
            : 'active'
        "
        class="topbtn"
        size="mini"
        >{{ vehicleoption.chulizhuangtai }}</el-button
      >
    </div>
    <div
      class="veh-main"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div class="main-top">
        <baidu-map
          class="baidumap"
          :center="center"
          :zoom="zoom"
          :scroll-wheel-zoom="true"
        >
          <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
          <bm-marker :top="true" :position="center">
            <bm-label
              :content="
                `起点 ${vehicleoption.date}` +
                  `<br>` +
                  `地址：${vehicleoption.roadName}`
              "
              :labelStyle="labelOpt.style"
              :offset="{ width: 10, height: 30 }"
            />
          </bm-marker>
          <bm-polygon
            :path="path"
            stroke-color="red"
            :fillOpacity="0.3"
            :stroke-weight="4"
          ></bm-polygon>
        </baidu-map>
        <div class="top-r means">
          <div class="title">
            <p>车辆资料</p>
          </div>
          <div class="means-top">
            <div class="img">
              <img
                v-show="cheliang.cheliangzhaopian"
                :src="cheliang.cheliangzhaopian"
              />
              <img
                v-show="!cheliang.cheliangzhaopian"
                src="@/assets/img/che.png"
              />
            </div>
            <div>
              <p class="means-name">{{ vehicleoption.plate }}</p>
              <p class="means-txt">车牌颜色：{{ cheliang.chepaiyanse }}</p>
              <p class="means-txt">运营类型：{{ cheliang.shiyongxingzhi }}</p>
            </div>
          </div>
          <div class="means-bottom">
            <p>
              驾&nbsp;&nbsp;驶&nbsp;&nbsp;员：{{ cheliang.jiashiyuanxingming }}
            </p>
            <p>驾驶员电话：{{ cheliang.jiashiyuandianhua }}</p>
            <p>押&nbsp; 运&nbsp; 员：{{ cheliang.yayunyuanxingming }}</p>
            <p>押运员电话：{{ cheliang.yayunyuandianhua }}</p>
            <p>车&emsp;&emsp;主：{{ cheliang.chezhu }}</p>
            <p>车 主 电 话：{{ cheliang.chezhudianhua }}</p>
            <p>终端型号：{{ cheliang.zongduanxinghao }}</p>
            <p>车 &nbsp;&nbsp;架 &nbsp;&nbsp;号：{{ cheliang.chejiahao }}</p>
            <p>厂&emsp;&emsp;牌：{{ cheliang.changpai }}</p>
            <p>
              运 &nbsp;&nbsp;营 &nbsp;&nbsp;商：{{
                cheliang.yunyingshangmingcheng
              }}
            </p>
          </div>
          <div class="main-bottom">
            <div class="bottom-item-head">
              <span ref="fenxi">情况分析</span>
              <span>处理信息</span>
            </div>
            <div class="bottom-item">
              <div class="item-txt">
                <p>
                  <span>违规内容：</span>
                  <span>{{ vehicleoption.note }}</span>
                </p>
                <p>
                  <span>行驶速度：</span>
                  <span>{{ vehicleoption.velocity }}(km/h)</span>
                </p>
                <p>
                  <span>违规时间：</span>
                  <span>{{ vehicleoption.date }}</span>
                </p>
                <p>
                  <span>驾驶员IC卡登签信息：</span>
                  <span>{{ vehicleoption.icardsign }}</span>
                </p>
                <p>
                  <span>违规地点：</span>
                  <span>{{ vehicleoption.roadName }}</span>
                </p>
              </div>
              <div class="item-msg">
                <p>
                  <span>处理方式：</span>
                  <span>{{ vehicleoption.chulixingshi }}</span>
                </p>
                <p>
                  <span>处理内容：</span>
                  <span>{{ vehicleoption.chulimiaoshu }}</span>
                </p>
                <p>
                  <span>处理人：</span>
                  <span>{{ vehicleoption.chuliren }}</span>
                </p>
                <p>
                  <span>处理时间：</span>
                  <span>{{ vehicleoption.chulishijian }}</span>
                </p>
                <p>
                  <span>处理凭证：</span>
                  <span v-if="vehicleoption.fujian !== ''">
                    <el-popover placement="top-start" trigger="click">
                      <img
                        src="../../assets/img/ping.png"
                        slot="reference"
                        class="pingzheng"
                        alt
                      />
                      <div class="fujian">
                        <!-- <img :src="vehicleoption.fujian" style="max-height:180px;" alt /> -->
                        <img
                          v-for="(item, index) in arryImg"
                          :key="index"
                          class="fujian"
                          :src="arryImg[index]"
                          style="max-height:180px;"
                          alt
                        />
                      </div>
                    </el-popover>
                  </span>
                </p>
                <p>
                  <span>申诉审核人：</span>
                  <span>{{ vehicleoption.chulishijian }}</span>
                </p>
                <p>
                  <span>申诉审核时间：</span>
                  <span>{{ vehicleoption.chulishijian }}</span>
                </p>
                <p>
                  <span>申诉审核意见：</span>
                  <span>{{ vehicleoption.shensumiaoshu }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer">
      <el-button class="topbtn nom" size="mini" @click="dialogVisible = false"
        >取 消</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { format } from "@/config/date";
import dataAnalysisApi from "@/api/modules/dataAnalysis";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    vehicleoption: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      loading: false,
      cheliang: {},
      jiashiyuan: {},
      center: { lng: 116.404, lat: 39.915 },
      path: [],
      labelOpt: {
        style: { color: "red", fontSize: "14px", padding: "0 5px" },
        styleks: { color: "blue", fontSize: "14px", padding: "0 5px" },
        offset: { width: 20, height: -25 },
      },
      arryImg: "",
      zoom: 10,
    };
  },
  computed: {
    dialogVisible: {
      get: function() {
        return this.visible;
      },
      set: function(newValue) {
        this.$emit("close");
      },
    },
  },
  watch: {
    visible(newvisible) {
      if (newvisible) {
        this.loading = true;
        this.getData();
      }
    },
  },
  methods: {
    getData() {
      this.selectByCPYS();
      let arry = this.vehicleoption.fujian.replace(/\,$/g, "").split(",");
      this.arryImg = arry;
    },
    //获取数据明细
    async selectByCPYS() {
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.selectByCPYS({
          cheliangpaizhao: this.vehicleoption.cheliangpaizhao,
          chepaiyanse: this.vehicleoption.chepaiyanse,
        })
      );
      if (data) {
        if (
          data.cheliang.jiashiyuandianhua == -1 ||
          data.cheliang.yayunyuandianhua == -1 ||
          data.cheliang.chezhudianhua == -1 ||
          data.cheliang.changpai == "null" ||
          data.cheliang.chejiahao == "null"
        ) {
          data.cheliang.jiashiyuandianhua = "";
          data.cheliang.yayunyuandianhua = "";
          data.cheliang.chezhudianhua = "";
          data.cheliang.changpai = "";
          data.cheliang.chejiahao = "";
        }
        this.cheliang = data.cheliang;
        this.jiashiyuan = data.jiashiyuan;
        this.getPointDataNew();
        this.loading = false;
      } else {
        this.$message.error(err);
        this.loading = false;
      }
    },
    // 路书的方法
    mapPoints(points) {
      return points.map((item) => {
        return new BMap.Point(item.longitude, item.latitude);
      });
    },
    //获取点位数据
    async getPointDataNew() {
      this.center = {
        lng: this.vehicleoption.longitude,
        lat: this.vehicleoption.latitude,
      };
      let point = this.vehicleoption.points.split(";").map((el) => {
        return el.split(",").map((val, inx) => {
          return {
            longitude: el.split(",")[0],
            latitude: el.split(",")[1],
          };
        });
      });
      let points = point.map((el) => {
        return el[0];
      });
      this.path = this.mapPoints(points);
    },
  },
};
</script>

<style lang="scss">
.vehicledetails {
  .el-dialog {
    background-image: url("~@/assets/img/bg_14.png");
    background-size: 100% 100%;
    background-color: transparent;
  }
}
.baidumap {
  .BMap_Marker:nth-of-type(n + 4) {
    display: none;
  }
}
.mainTable th.is-leaf {
  border-bottom: 1px solid #0a3774;
}
.mainTable th {
  border-right: 1px solid #0a3774;
  padding: 6px 0;
}
</style>
