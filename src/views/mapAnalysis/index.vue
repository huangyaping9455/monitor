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
    .baidumap {
      width: 100%;
      height: 100%;
    }
    .mapSearch {
      width: 15%;
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

<template>
  <div class="mapAnalysis">
    <!-- <all-header></all-header> -->
    <div class="home-center">
      <baidu-map
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
        <bm-info-window
          :position="{ lng: mapInfo.longitude, lat: mapInfo.latitude }"
          :show="mapInfo.show"
          @close="infoWindowClose(mapInfo)"
          @open="infoWindowOpen(mapInfo)"
        >
          <p>所属企业：{{ mapInfo.DeptName }}</p>
          <p>当前位置：{{ mapInfo.latitude }}-{{ mapInfo.longitude }}</p>
          <p>卫星定位速度：{{ mapInfo.velocity }}</p>
          <p>运营商：{{ mapInfo.yunguanmingcheng }}</p>
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
      <div class="mapSearch">
        <div class="searchFor">
          <el-select
            filterable
            clearable
            size="small"
            v-model="fromLine.deptName"
            placeholder="请选择企业"
            style="margin-right: 10px"
          >
            <el-option
              v-for="(item, index) in deptsList"
              :key="index"
              :label="item.deptName"
              :value="item.deptName"
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
      center: { lng: 104.251902, lat: 30.78794 },
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
      fromLine: { deptName: "" },
      emptrMark: [],
      vehicleList: [],
      loading: false,
      countMsg: {},
      visible: false,
      index: 1,
    };
  },
  created() {
    this.getQiYe();
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
    infoWindowOpen(item) {
      this.mapInfo = item;
      this.mapInfo.show = true;
    },
    // 关闭信息窗体
    infoWindowClose(item) {
      this.mapInfo.show = false;
      this.mapInfo = item;
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
          cph: "",
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
        this.vehicleList = data.records;
      } else {
        this.vehicleList = [];
        this.$message.error(err);
      }
    },
  },
};
</script>
