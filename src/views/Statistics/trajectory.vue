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
    position: absolute;
    top: 68px;
    right: 25px;
    /deep/ .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 175px;
    }
    /deep/ .el-button {
      margin-left: 5px;
    }
  }
  .veh-main {
    margin-top: 10px;
    .main-top {
      display: flex;
      justify-content: space-between;
      // margin-bottom: 10px;
      .baidumap {
        height: 470px;
        flex: 1;
      }
      .play-box {
        position: absolute;
        bottom: 50px;
        left: 30px;
      }
    }
  }
}
</style>

<template>
  <el-dialog
    width="50%"
    class="vehicledetails"
    center
    :show-close="false"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    :destroy-on-close="true"
  >
    <div slot="title">
      <el-button class="topbtn" size="mini">{{
        vehicleoption.vehicleNo
      }}</el-button>
    </div>
    <!-- 查询 -->
    <div class="searchss">
      <el-date-picker
        v-model="begintime"
        type="datetime"
        size="mini"
        value-format="yyyy-MM-dd HH:mm:ss"
        placeholder="选择开始日期"
      ></el-date-picker>
      <span style="color:#fff;">-</span>
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
        >搜索</el-button
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
      </div>
    </div>
    <div slot="footer">
      <el-button class="topbtn nom" size="mini" @click="closeChange()"
        >取 消</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { format } from "@/config/date";
import dataAnalysisApi from "@/api/modules/dataAnalysis";
import { BmlLushu } from "vue-baidu-map";
export default {
  components: {
    BmlLushu,
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
      this.begintime = format(
        new Date().getTime() - 30 * 60 * 1000,
        "YYYY-MM-DD HH:mm:ss"
      );
      this.endtime = format(new Date().getTime(), "YYYY-MM-DD HH:mm:ss");
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
          mark: this.vehicleoption.alarmtype,
          vehid: this.vehicleoption.vehicleID,
        })
      );
      this.loading = false;
      if (data) {
        if (data.length > 0) {
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
          gc.getLocation(pointqidian, function(rs) {
            qidian = rs.address;
            _this.qidian = qidian;
          });
          gc.getLocation(pointzhongdian, function(rs) {
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
