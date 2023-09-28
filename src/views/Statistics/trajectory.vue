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
    &.nom {
      margin: 0;
      cursor: pointer;
    }
  }
  .searchss {
    margin: 10px 0;
    ::v-deep .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 175px;
    }
    ::v-deep .el-button {
      margin-left: 5px;
    }
  }
  .baidumap {
    width: 100%;
    height: 450px;
  }
  .play-box {
    position: absolute;
    top: 480px;
    right: 40px;
  }
  .vehdetail {
    display: flex;
    flex-direction: column;
    color: #fff;
    padding: 10px;
    position: absolute;
    left: 35px;
    top: 320px;
    background: #0b122e8a;
    border-radius: 10px;
    .detail_list {
      display: flex;
      line-height: 30px;
    }
  }
  .map_b {
    // width: 100%;
    display: flex;
    justify-content: space-between;
    ::v-deep.el-calendar {
      width: 31%;
      margin-top: 10px;
      border-radius: 10px;
      .el-calendar__header {
        padding: 10px;
      }
      .el-calendar__body {
        padding: 20px;
      }
      .el-calendar-table .el-calendar-day {
        height: auto;
        padding: 0;
        position: relative;
        p {
          padding: 8px;
          margin: 0 !important;
        }
        .is-selected {
          background-color: #409eff;
          color: #fff;
        }
        .calc_red {
          background-color: red;
          width: 5px;
          height: 5px;
          display: block;
          position: absolute;
          top: -15px;
          right: 10px;
          border-radius: 50%;
        }
        .calc_green {
          background-color: #8bc34a;
          width: 5px;
          height: 5px;
          display: block;
          position: absolute;
          top: -15px;
          right: 10px;
          border-radius: 50%;
        }
      }
      table thead th {
        padding: 0;
      }
    }
    .veh-main {
      width: 68%;
      margin-top: 10px;
      .main-top {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        .table-box {
          width: 100%;
          height: 300px;
          margin-top: 0;
          display: flex;
          justify-content: space-between;
          padding: 10px 10px 10px 0;
          .box_btns {
            width: 50px;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            padding: 0px 10px 0px 0;
            .el-button {
              width: 100%;
              height: 45%;
              white-space: pre-wrap;
              margin-left: 0px;
              padding: 3px;
              span {
                margin-left: 0;
              }
            }
          }
          .chart {
            width: calc(100% - 50px);
            height: 100%;
          }
        }
      }
    }
  }
}
</style>

<template>
  <el-dialog
    width="70%"
    class="vehicledetails"
    center
    top="5vh"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    :destroy-on-close="true"
  >
    <!-- <div slot="title">
      <el-button class="topbtn" size="mini">
        {{ vehicleoption.vehicleNo }}
      </el-button>
    </div> -->
    <!-- 查询 -->
    <div class="searchss">
      <el-date-picker
        v-model="begintime"
        type="datetime"
        size="mini"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择开始日期"
      ></el-date-picker>
      <span style="color: #fff">-</span>
      <el-date-picker
        v-model="endtime"
        type="datetime"
        size="mini"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择结束日期"
      ></el-date-picker>
      <el-button
        type="primary"
        size="mini"
        class="sbtn"
        @click="getPointDataNew"
      >
        搜索
      </el-button>
    </div>
    <baidu-map
      class="baidumap"
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="true"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type>
      <bm-polyline
        :path="path"
        stroke-color="red"
        :stroke-opacity="1"
        :stroke-weight="4"
      ></bm-polyline>
      <bm-marker :top="true" :position="startline">
        <bm-label
          :content="`起点 ${time.start}` + `<br>` + `地址：${qidian}`"
          :labelStyle="labelOpt.style"
          :offset="{ width: 10, height: 30 }"
        />
      </bm-marker>
      <bm-marker :top="true" :position="endline">
        <bm-label
          :content="`终点 ${time.end}` + `<br>` + `地址：${zhongdian}`"
          :labelStyle="{ color: 'red', fontSize: '12px' }"
          :offset="{ width: 10, height: 30 }"
        />
      </bm-marker>
      <bml-lushu
        :path="path"
        :icon="icons"
        :play="bmllushus.play"
        :enableRotation="true"
        :speed="3000"
        :autoView="true"
        :rotation="true"
      >
      </bml-lushu>
    </baidu-map>
    <div class="play-box">
      <img
        v-show="!bmllushus.play"
        src="@/assets/img/paly.png"
        @click="bmllushus.play = true"
      />
      <img
        v-show="bmllushus.play"
        src="@/assets/img/pause.png"
        @click="bmllushus.play = false"
      />
    </div>
    <div class="vehdetail">
      <div class="detail_list">
        <span>企业名称：</span>
        <span>{{ vehicleoption.DeptName }}</span>
      </div>
      <div class="detail_list">
        <span>车辆牌照：</span>
        <span>{{ vehicleoption.vehicleNo }}</span>
      </div>
      <div class="detail_list">
        <span>车牌颜色：</span>
        <span>{{ vehicleoption.vehicleColor }}</span>
      </div>
      <div class="detail_list">
        <span>在线状态：</span>
        <span>{{ vehicleoption.zaixian }}</span>
      </div>
      <div class="detail_list">
        <span>运 营 商 ：</span>
        <span>{{ vehicleoption.yunguanmingcheng }}</span>
      </div>
      <div class="detail_list">
        <span>使用性质：</span>
        <span>{{ vehicleoption.shiyongxingzhi }}</span>
      </div>
    </div>
    <div
      class="map_b"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-calendar v-model="dateNow">
        <template slot="dateCell" slot-scope="{ data }">
          <div
            :class="[{ 'is-selected': data.isSelected }]"
            style="padding: 3px"
          >
            <span style="font-size: 14px">
              {{ data.day.split("-").slice(1)[1] }}
            </span>
            <div
              v-for="(item, index) in calendarList"
              :key="index"
              v-show="item.date == data.day"
              style="position: relative"
            >
              <span style="color: #807e7e">{{ item.travelMileage }}</span>
              <span
                :class="
                  item.alarmCount > 0
                    ? 'calc_red'
                    : item.travelMileage != '0.00公里'
                    ? 'calc_green'
                    : ''
                "
              ></span>
            </div>
          </div>
        </template>
      </el-calendar>
      <div class="veh-main">
        <div class="main-top">
          <div class="table-box">
            <div class="box_btns">
              <el-button
                :type="trackbtn == 1 ? 'primary' : ''"
                @click="trackbtn = 1"
                icon="el-icon-data-line"
              >
                运行分析
              </el-button>
              <el-button
                :type="trackbtn == 2 ? 'primary' : ''"
                @click="trackbtn = 2"
                icon="el-icon-place"
              >
                点位回放
              </el-button>
            </div>
            <echart-base
              v-if="trackbtn == 1"
              height="300px"
              width="100%"
              class="chart"
              :chart-option="alarmChartNew"
            ></echart-base>
            <el-table
              v-else
              :data="trackData"
              border
              height="100%"
              style="width: 100%"
              ref="singleTable"
              class="tabls"
            >
              <el-table-column
                prop="gpsTime"
                label="定位时间"
                align="center"
                width="160"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="Velocity"
                label="速度km/h"
                align="center"
                width="90"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="longitude"
                label="经度"
                align="center"
                width="150"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="latitude"
                label="纬度"
                align="center"
                width="150"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                label="地点"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span
                    v-if="!scope.row.roadName"
                    style="color: #cccccc"
                    @click="changePoint(scope.row)"
                  >
                    点击解析当前地理位置
                  </span>
                  <span v-else>{{ scope.row.roadName }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { format } from "@/config/date";
import dataAnalysisApi from "@/api/modules/dataAnalysis";
import governmentApi from "@/api/modules/government";
import { BmlLushu } from "vue-baidu-map";
import dayjs from "dayjs";
import echartBase from "@/components/EChart/index";
import { alarmChartNew } from "@/config/echartoption-new";
export default {
  components: {
    BmlLushu,
    echartBase,
  },
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
      center: { lng: 116.404, lat: 39.915 },
      startline: { lng: 116.404, lat: 39.915 },
      endline: { lng: 116.404, lat: 39.915 },
      kaishiline: { lng: "", lat: "" },
      time: { start: "", end: "" },
      kaishidi: "",
      qidian: "",
      zhongdian: "",
      begintime: format(
        new Date().getTime() - 30 * 60 * 1000,
        "YYYY-MM-DD HH:mm:ss"
      ),
      endtime: format(new Date().getTime(), "YYYY-MM-DD HH:mm:ss"),
      path: [],
      labelOpt: {
        style: { color: "red", fontSize: "14px", padding: "0 5px" },
        styleks: { color: "blue", fontSize: "14px", padding: "0 5px" },
        offset: { width: 20, height: -25 },
      },
      zoom: 12,
      bmllushus: {
        play: false,
      },
      icons: {
        url: "http://api.map.baidu.com/library/LuShu/1.2/examples/car.png",
        // url: require("@/assets/img/paly.png"),
        size: { width: 52, height: 26 },
        opts: { anchor: { width: 27, height: 13 } },
      },
      dateNow: new Date(),
      calendarList: [],
      trackbtn: 1,
      alarmChartData: [],
      scale: [],
      trackData: [],
    };
  },
  computed: {
    dialogVisible: {
      get: function () {
        return this.visible;
      },
      set: function (newValue) {
        this.$emit("close");
      },
    },
    alarmChartNew() {
      return alarmChartNew(this.alarmChartData, this.scale);
    },
  },
  watch: {
    visible(newvisible) {
      if (newvisible) {
        this.loading = true;
        this.getData();
        this.getVehTravel();
      }
    },
    dateNow(val) {
      this.begintime = dayjs(val).format("YYYY-MM-DD 00:00:00");
      this.endtime = dayjs(val).format("YYYY-MM-DD 23:59:59");
      this.bmllushus.play = false;
      this.getPointDataNew();
      this.trackPlay();
    },
  },
  methods: {
    closeChange() {
      this.dialogVisible = false;
      this.$emit("changeclose");
    },
    reset() {
      this.bmllushus.play = false;
    },
    pause() {
      this.bmllushus.play = false;
    },
    // 设置初始化
    getData() {
      this.bmllushus.play = false;
      this.begintime = dayjs(this.vehicleoption.gpstime)
        .subtract(5, "minute")
        .format("YYYY-MM-DD HH:mm:ss");
      this.endtime = dayjs(this.vehicleoption.gpstime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.getPointDataNew();
    },
    // 路书的方法
    mapPoints(points) {
      return points.map((item) => {
        return new BMap.Point(item.longitude, item.latitude);
      });
    },
    //获取点位数据
    async getPointDataNew() {
      this.loading = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getPointDataNew({
          beginTime: this.begintime,
          endTime: this.endtime,
          mark: this.vehicleoption.alarmtype ? this.vehicleoption.alarmtype : 0,
          vehid: this.vehicleoption.vehicleID,
        })
      );
      this.loading = false;
      if (data) {
        if (data.length > 0) {
          this.trackData = data;
          for (let i in data) {
            // 新的
            this.alarmChartData.push(data[i].Velocity);
            this.scale.push(data[i].gpsTime);
          }
          this.center = {
            lng: data[0].longitude,
            lat: data[0].latitude,
          };
          this.path = this.mapPoints(data);
          this.startline = {
            lng: data[0].longitude,
            lat: data[0].latitude,
          };
          this.endline = {
            lng: data[data.length - 1].longitude,
            lat: data[data.length - 1].latitude,
          };
          this.time = {
            start: data[0].GpsTime,
            end: data[data.length - 1].GpsTime,
          };
          // js解析经纬度为地理位置
          let pointqidian = new BMap.Point(
            this.startline.lng,
            this.startline.lat
          );
          let pointzhongdian = new BMap.Point(
            this.endline.lng,
            this.endline.lat
          );
          let gc = new BMap.Geocoder();
          let qidian;
          let zhongdian;
          let _this = this;
          gc.getLocation(pointqidian, function (rs) {
            qidian = rs.address;
            _this.qidian = qidian;
          });
          gc.getLocation(pointzhongdian, function (rs) {
            zhongdian = rs.address;
            _this.zhongdian = zhongdian;
          });
        } else {
          this.$message.warning("暂无轨迹");
          this.path = [];
          this.kaishiline = { lng: "", lat: "" };
          this.time = { start: "", end: "" };
          this.kaishidi = "";
          this.qidian = "";
          this.zhongdian = "";
          this.center = { lng: 116.404, lat: 39.915 };
          this.startline = { lng: 116.404, lat: 39.915 };
          this.endline = { lng: 116.404, lat: 39.915 };
        }
      } else {
        this.$message.error(err);
      }
    },
    //获取点位数据
    async getVehTravel() {
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getVehTravel({
          date: dayjs(this.dateNow).format("YYYY-MM-01"),
          vehId: this.vehicleoption.vehicleID,
        })
      );
      if (data) {
        this.calendarList = data.map((el) => {
          el.travelMileage = el.travelMileage.replace("公里", "");
          return el;
        });
      } else {
        this.$message.error(err);
      }
    },
    // 点击解析地理位置
    async changePoint(row) {
      row.roadName = await this.getPointDataShow(row.latitude, row.longitude);
    },
    // 解析地理位置
    async getPointDataShow(latitude, longitude) {
      let [err, data] = await governmentApi.awaitWrap(
        governmentApi.getPointDataShow({
          latitude: latitude,
          longitude: longitude,
        })
      );
      if (data) {
        return data.roadName;
      }
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
    .el-dialog__close {
      font-size: 25px;
      font-weight: 600;
      color: #fff;
    }
    .el-dialog__body {
      padding: 10px 20px;
    }
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

.tabls {
  &.el-table--enable-row-hover .el-table__body tr:hover > td {
    background: #ffffff38;
  }
  tr {
    background: #1e2e3e;
  }
  td {
    border-right: 1px solid #58626e;
    border-bottom: 1px solid #58626e;
    color: #ffffff;
  }
  th.is-leaf {
    border-bottom: 1px solid #58626e;
  }
  th {
    padding: 5px 0;
    background: #1e2e3e;
    border-right: 1px solid #58626e;
    color: #ffffff;
  }
  &::before {
    background-color: #58626e;
  }
  &::after {
    background-color: #58626e;
  }
  .el-table__body-wrapper {
    height: calc(100% - 4.5rem);
  }
}
</style>
