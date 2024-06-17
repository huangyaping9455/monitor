<style lang="scss" scoped>
.mapAnalysis {
  height: 100vh;
  overflow: hidden;
  background: #0b122e;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .home-center {
    width: 100%;
    // height: calc(100% - 5rem);
    height: calc(100%);
    position: relative;
    .map-style {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 2;
      display: flex;
      flex-direction: column;
      span {
        padding: 2px 6px;
        border: 1px solid #1f71ff;
        background-color: #fff;
        color: #333;
        border-radius: 5px;
        margin-bottom: 5px;
        cursor: pointer;
      }
      .act {
        background-color: #1f71ff;
        color: #fff;
      }
    }
    .baidumap {
      width: 100%;
      height: 100%;
    }
    .mapSearch {
      width: 22%;
      position: absolute;
      top: 15px;
      right: 15px;
      padding: 25px 15px;
      border-radius: 15px;
      background-color: #fff;
      .searchFor {
        width: 100%;
        display: flex;
      }
      .mapCard {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        .card_list {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 50%;
          margin-top: 15px;
          span:first-of-type {
            font-size: 20px;
            color: #1e80ff;
            font-weight: 600;
          }
          span:last-of-type {
            font-size: 15px;
          }
        }
      }
    }
  }
}
</style>
<style>
.amap-icon img {
  width: 40px !important;
  height: 40px !important;
}
</style>

<template>
  <div class="mapAnalysis">
    <!-- <all-header></all-header> -->
    <div class="home-center">
      <div class="map-style">
        <span :class="['map-btn', mapType == 1 ? 'act' : '']" @click="mapType = 1">百度</span>
        <span :class="['map-btn', mapType == 2 ? 'act' : '']" @click="mapType = 2">高德</span>
      </div>
      <baidu-map
        v-show="mapType == 1"
        class="baidumap"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        v-loading="loading"
      >
        <bml-marker-clusterer :averageCenter="true" :styles="cluesterStyle">
          <bm-marker
            v-for="item in vehicleList"
            :key="item.key"
            :position="{ lng: item.longitude, lat: item.latitude }"
            :zIndex="4"
            :icon="icon"
            @click="infoWindowOpen(item)"
          >
            <bm-label
              :content="item.vehicleNo"
              :labelStyle="item.labelStyle"
              :offset="{ width: 0, height: 25 }"
            />
          </bm-marker>
        </bml-marker-clusterer>
        <!-- @close="infoWindowClose(mapInfo)"
          @open="infoWindowOpen(mapInfo)" -->
        <bm-info-window
          :position="{ lng: mapInfo.longitude, lat: mapInfo.latitude }"
          :show="mapInfo.show"
        >
          <p>所属企业：{{ mapInfo.DeptName }}</p>
          <p>当前位置：{{ mapInfo.roadName }}</p>
          <p>卫星定位速度：{{ mapInfo.velocity }}</p>
          <p>运营商：{{ mapInfo.yunyingshangmingcheng }}</p>
          <p>使用性质：{{ mapInfo.shiyongxingzhi }}</p>
          <p>在线状态：{{ mapInfo.zaixian }}</p>
          <p>行政区划：{{ mapInfo.area }}</p>
          <p>最后上传时间：{{ mapInfo.gpstime }}</p>
          <el-button
            type="text"
            size="small"
            style="text-decoration: underline"
            @click="
              () => {
                index++;
                visible = true;
              }
            "
          >
            轨迹
          </el-button>
          <el-button
            type="text"
            size="small"
            style="text-decoration: underline"
            @click="
              () => {
                $message.warning('该企业暂无视频配置');
              }
            "
          >
            视频
          </el-button>
        </bm-info-window>
      </baidu-map>
      <el-amap
        v-if="mapType == 2"
        class="baidumap"
        vid="amapContainer"
        :zoom="zoom"
        :center="amapCenter"
      >
        <!-- <MarkerClusterer :points="emptrMark" /> -->
        <el-amap-marker
          v-for="(marker, index) in vehicleList"
          :position="[marker.longitude, marker.latitude]"
          :key="index"
          :icon="marker.iconAmap"
          :label="{
            content: marker.vehicleNo,
            offset: [-12, -22],
          }"
        ></el-amap-marker>
      </el-amap>
      <div class="mapSearch">
        <div class="searchFor">
          <el-select
            filterable
            clearable
            size="small"
            v-model="fromLine.deptName"
            placeholder="请选择企业"
            style="margin-right: 10px; width: 100%"
            @change="deptChange"
          >
            <el-option
              v-for="(item, index) in deptsList"
              :key="index"
              :label="item.deptName"
              :value="item.deptName"
            >
            </el-option>
          </el-select>
          <el-select
            filterable
            clearable
            size="small"
            v-model="fromLine.cheliangpaizhao"
            placeholder="请选择车辆"
            style="margin-right: 10px; width: 250px"
          >
            <el-option
              v-for="(item, index) in carList"
              :key="index"
              :label="item.cheliangpaizhao"
              :value="item.cheliangpaizhao"
            >
            </el-option>
          </el-select>
          <el-button
            icon="el-icon-search"
            type="primary"
            size="small"
            @click="
              () => {
                getVehicleList();
                selectGetZFJk();
              }
            "
          >
            搜索
          </el-button>
        </div>
        <div class="mapCard">
          <div class="card_list">
            <span>{{ countMsg.vehnum }}</span>
            <span>车辆总数</span>
          </div>
          <div class="card_list">
            <span>{{ countMsg.onlineRate }}</span>
            <span>上线率</span>
          </div>
          <div class="card_list">
            <span>{{ countMsg.sxvehnum }}</span>
            <span>在线车辆</span>
          </div>
          <div class="card_list">
            <span>{{ countMsg.lxvehnum }}</span>
            <span>离线车辆</span>
          </div>
        </div>
      </div>
      <trajectory
        :visible="visible"
        key="index"
        :vehicleoption="mapInfo"
        @close="visible = false"
        @changeclose="changeTwo"
      ></trajectory>
    </div>
  </div>
</template>

<script>
import allHeader from "@/components/Header/index";
import {
  BmPolyline,
  BmPolygon,
  BmlLushu,
  BmMarker,
  BmMapType,
  BmLabel,
  BmInfoWindow,
  BmlMarkerClusterer,
} from "vue-baidu-map";
import { mapGetters } from "vuex";
import governmentApi from "@/api/modules/government";
import Trajectory from "../Statistics/trajectory";
export default {
  components: {
    "all-header": allHeader,
    BmlMarkerClusterer,
    BmMarker,
    BmLabel,
    BmInfoWindow,
    Trajectory,
  },
  data() {
    return {
      // center: { lng: 104.251902, lat: 30.78794 },
      // amapCenter: [120.147076, 30.245426],
      center: { lng: 106.26666, lat: 38.466667 },
      amapCenter: [106.26666, 38.466667],
      zoom: 9,
      icon: {
        url: "http://api.map.baidu.com/library/LuShu/1.2/examples/car.png",
        size: { width: 52, height: 26 },
        opts: { anchor: { width: 27, height: 13 } },
      },
      labelOpt: {
        style: { color: "red", fontSize: "14px", padding: "0 5px" },
        styleks: { color: "blue", fontSize: "14px", padding: "0 5px" },
        offset: { width: -10, height: 27 },
      },
      cluesterStyle: [
        {
          url: require("@/assets/img/juhe.gif"),
          size: { width: 52, height: 52 },
          textColor: "white",
          opt_textSize: 14,
        },
      ],
      mapInfo: {},
      show: false,
      deptsList: [],
      fromLine: { deptName: "", cheliangpaizhao: "" },
      emptrMark: [],
      vehicleList: [],
      loading: false,
      countMsg: {},
      visible: false,
      index: 1,
      carList: [],
      mapType: 1,
      amap: null,
    };
  },
  created() {
    this.getQiYe();
    this.mapType = 1;
  },
  mounted() {},
  beforeDestroy() {
    this.vehicleList = [];
  },
  computed: {
    ...mapGetters({
      userinfo: "userinfo",
      zhuzzhiId: "government/fasongdanwei",
    }),
  },
  methods: {
    changeTwo() {
      this.index++;
    },
    // 打开信息窗体
    async infoWindowOpen(item) {
      item.roadName = await this.getPointDataShow(item.latitude, item.longitude);
      this.mapInfo = item;
      this.mapInfo.show = true;
    },
    // 关闭信息窗体
    async infoWindowClose(item) {
      item.roadName = await this.getPointDataShow(item.latitude, item.longitude);
      this.mapInfo.show = false;
      this.mapInfo = item;
    },
    // 获取获取送达企业列表
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
    // 获取车辆列表
    async getByIdYWVehicleList(deptId) {
      let [err, data] = await governmentApi.awaitWrap(
        governmentApi.getByIdYWVehicleList({
          deptId: deptId,
        })
      );
      if (data) {
        this.carList = data;
      }
    },
    // 获取获取送达企业列表
    async getQiYe() {
      let [err, data] = await governmentApi.awaitWrap(
        governmentApi.getQiYe({
          deptId: this.userinfo.deptId,
          deptName: this.userinfo.deptName,
        })
      );
      if (data) {
        this.deptsList = data;
        this.fromLine.deptName = this.deptsList[0].deptName;
        this.getByIdYWVehicleList(this.deptsList[0].deptId);
        // 上线率统计
        this.selectGetZFJk();
        //获取统计车辆数据
        this.getVehicleList();
      } else {
        this.$message.error(err);
      }
    },
    // 获取 实时监控-指标分析
    async selectGetZFJk() {
      let [err, data] = await governmentApi.awaitWrap(
        governmentApi.selectGetZFJk({
          deptId: this.userinfo.deptId,
          deptName: this.fromLine.deptName,
        })
      );
      if (data) {
        this.countMsg = data;
      } else {
        this.$message.error(err);
      }
    },
    // 获取车辆数 地图数据
    async getVehicleList() {
      this.vehicleList = [];
      this.loading = true;
      let [err, data] = await governmentApi.awaitWrap(
        governmentApi.getVehicleList({
          dept: this.zhuzzhiId,
          page: 0,
          cph: this.fromLine.cheliangpaizhao,
          deptname: this.fromLine.deptName,
          pagesize: 0,
          zaixian: 1,
          zhuangtai: 1,
          shiyongxingzhi: "",
          yunyingshang: "",
        })
      );
      this.loading = false;
      if (data) {
        this.vehicleList = data.records.map((el) => {
          el.iconAmap = this.getMapCarImgAmap(el.VehState, el.alarm, el.zaixian, el.Angle);
          return el;
        });
        if (data.records.length == 1) {
          this.center = {
            lng: data.records[0].longitude,
            lat: data.records[0].latitude,
          };
        }
      } else {
        this.vehicleList = [];
        this.$message.error(err);
      }
    },
    // 企业 change
    deptChange(val) {
      console.log(val);
      let label = this.deptsList.find((el) => {
        return el.deptName == val;
      });
      if (label) this.getByIdYWVehicleList(label.deptId);
    },

    // 根据状态添加车辆图标 高德
    getMapCarImgAmap(status, alarmStatus, zaixian, angle) {
      let img = "http://api.map.baidu.com/library/LuShu/1.2/examples/car.png";
      if (alarmStatus === "报警") {
        if (angle == 0 || angle == 360) {
          img = require("@/assets/img/icons/car_w.png");
        } else if (angle > 0 && angle < 90) {
          img = require("@/assets/img/icons/car_w_es.png");
        } else if (angle == 90) {
          img = require("@/assets/img/icons/car_w_s.png");
        } else if (angle > 90 && angle < 180) {
          img = require("@/assets/img/icons/car_w_sw.png");
        } else if (angle == 180) {
          img = require("@/assets/img/icons/car_w_w.png");
        } else if (angle > 180 && angle < 270) {
          img = require("@/assets/img/icons/car_w_wn.png");
        } else if (angle == 270) {
          img = require("@/assets/img/icons/car_w_n.png");
        } else if (angle > 270 && angle < 360) {
          img = require("@/assets/img/icons/car_w_ne.png");
        }
      } else {
        if (status == "在用") {
          if (angle == 0 || angle == 360) {
            img = require("@/assets/img/icons/car_y.png");
          } else if (angle > 0 && angle < 90) {
            img = require("@/assets/img/icons/car_y_es.png");
          } else if (angle == 90) {
            img = require("@/assets/img/icons/car_y_s.png");
          } else if (angle > 90 && angle < 180) {
            img = require("@/assets/img/icons/car_y_sw.png");
          } else if (angle == 180) {
            img = require("@/assets/img/icons/car_y_w.png");
          } else if (angle > 180 && angle < 270) {
            img = require("@/assets/img/icons/car_y_wn.png");
          } else if (angle == 270) {
            img = require("@/assets/img/icons/car_y_n.png");
          } else if (angle > 270 && angle < 360) {
            img = require("@/assets/img/icons/car_y_ne.png");
          }
        }
        if (status == "闲置") {
          if (angle == 0 || angle == 360) {
            img = require("@/assets/img/icons/car_x.png");
          } else if (angle > 0 && angle < 90) {
            img = require("@/assets/img/icons/car_x_es.png");
          } else if (angle == 90) {
            img = require("@/assets/img/icons/car_x_s.png");
          } else if (angle > 90 && angle < 180) {
            img = require("@/assets/img/icons/car_x_sw.png");
          } else if (angle == 180) {
            img = require("@/assets/img/icons/car_x_w.png");
          } else if (angle > 180 && angle < 270) {
            img = require("@/assets/img/icons/car_x_wn.png");
          } else if (angle == 270) {
            img = require("@/assets/img/icons/car_x_n.png");
          } else if (angle > 270 && angle < 360) {
            img = require("@/assets/img/icons/car_x_ne.png");
          }
        }
      }
      if (zaixian == "未上线") {
        if (angle == 0 || angle == 360) {
          img = require("@/assets/img/icons/car_l.png");
        } else if (angle > 0 && angle < 90) {
          img = require("@/assets/img/icons/car_l_es.png");
        } else if (angle == 90) {
          img = require("@/assets/img/icons/car_l_s.png");
        } else if (angle > 90 && angle < 180) {
          img = require("@/assets/img/icons/car_l_sw.png");
        } else if (angle == 180) {
          img = require("@/assets/img/icons/car_l_w.png");
        } else if (angle > 180 && angle < 270) {
          img = require("@/assets/img/icons/car_l_wn.png");
        } else if (angle == 270) {
          img = require("@/assets/img/icons/car_l_n.png");
        } else if (angle > 270 && angle < 360) {
          img = require("@/assets/img/icons/car_l_ne.png");
        }
      }
      return img;
    },
  },
};
</script>
