<style lang="scss" scoped>
.carmap {
  height: calc(100% - 20px);
  width: calc(100% - 20px);
  padding: 10px;
  overflow: hidden;
  .mapSearch {
    position: absolute;
    top: 15px;
    right: 15px;
    .searchFor {
      width: 100%;
      display: flex;
    }
  }
}
.bgs {
  background-image: url("~@/assets/img/bg_15.jpg");
  background-size: 100% 100%;
}
</style>

<template>
  <div
    :class="['carmap', showNewWindow ? 'bgs' : '']"
    v-loading="carLoading"
    element-loading-background="rgba(0, 0, 0, 0.4)"
  >
    <echartBase height="100%" width="100%" :chart-option="chartOptionCar"></echartBase>
    <div class="mapSearch" v-if="!showNewWindow">
      <div class="searchFor">
        <el-button
          type="info"
          size="mini"
          @click="
            () => {
              $emit('return');
            }
          "
        >
          返回
        </el-button>
        <el-button type="info" size="mini" @click="openMap">
          在新窗口打开
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import echartBase from "@/components/EChart/index";
import sichuan from "@/assets/map/四川省/四川省.json";
import china from "@/assets/map/china.json";
import { mapGetters } from "vuex";
import governmentApi from "@/api/modules/government";
export default {
  props: {
    alarmDatas: Array,
  },
  components: {
    echartBase,
  },
  data() {
    return {
      chartOptionCar: {},
      fromLine: { deptName: "", cheliangpaizhao: "" },
      countMsg: {},
      vehicleList: [],
      carLoading: false,
    };
  },
  created() {},
  computed: {
    ...mapGetters({
      userinfo: "userinfo",
      zhuzzhiId: "government/fasongdanwei",
    }),
    showNewWindow() {
      return this.$route.query.type === "new";
    },
  },
  mounted() {
    // this.getVehicleList();
  },
  methods: {
    init(list){
      this.getMapDatas(list);
    },
    async getVehicleList() {
      this.carLoading = true;
      let [err, data] = await governmentApi.awaitWrap(
        governmentApi.getVehicleList({
          dept: this.zhuzzhiId,
          page: 1,
          pagesize: 500,
          zaixian: 2,
          zhuangtai: 1,
          cph: "",
          shiyongxingzhi: "",
          deptname: "",
          yunyingshang: "",
        })
      );
      this.carLoading = false;
      if (data) {
        this.vehicleList = data.records.map((item) => {
          item.value = [item.longitude, item.latitude];
          return item;
        });
      } else {
        this.vehicleList = [];
        this.$message.error(err);
      }
      this.getMapDatas();
    },
    // 新窗口 地图
    openMap() {
      let routeData = this.$router.resolve({ path: "/carMap", query: { type: "new" } });
      window.open(routeData.href, "_blank");
    },
    // 地图配置
    getMapDatas(list) {
      this.$echarts.registerMap("sichuan", sichuan);
      // this.$echarts.registerMap("china", china);
      this.chartOptionCar = {
        title: {
          text: "车辆分布情况图",
          x: "center",
          textStyle: {
            color: "#fff",
          },
        },
        legend: {
          show: false,
          // data: ["PM2.5"], //与series的name属性对应
          // orient: "vertical",
          // y: "bottom",
          // x: "right",
          // textStyle: {
          //   color: "#fff",
          // },
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            console.log(params);
            return `<p>车辆牌照：${params.data.vehicleNo}</p><p>所属企业：${params.data.DeptName}</p>`;
          },
        },
        // visualMap: {
        //   min: 0,
        //   max: 20,
        //   calculable: true,
        //   inRange: {
        //     color: ["#50a3ba", "#eac736", "#d94e5d"],
        //   },
        //   textStyle: {
        //     color: "#fff",
        //   },
        // },
        geo: {
          map: "sichuan",
          // map: "china",
          roam: true, //开启鼠标缩放和漫游
          zoom: 1.2, //地图缩放级别
          selectedMode: false, //选中模式：single | multiple
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          layoutCenter: ["50%", "50%"], //设置后left/right/top/bottom等属性无效
          layoutSize: "100%",
          label: {
            show: true,
            color: "#56e6ff",
            emphasis: {
              show: true,
              color: "#fff",
            },
          },
          itemStyle: {
            normal: {
              areaColor: "#101f32",
              borderWidth: 1.1,
              borderColor: "#43d0d6",
            },
            emphasis: {
              areaColor: "#069",
            },
          },
          silent: true,
        },
        series: [
          {
            name: "PM2.5",
            type: "effectScatter",
            // type: "scatter",
            coordinateSystem: "geo",
            symbolSize: 8,
            rippleEffect: {
              //涟漪特效
              period: 5, //特效动画时长
              scale: 4, //波纹的最大缩放比例
              brushType: "stroke", //波纹的绘制方式：stroke | fill
            },
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              emphasis: {
                borderColor: "#fff",
                borderWidth: 1,
              },
              normal: {
                color: "#f19000",
              },
            },
            silent: true,
            dimensions: ['lng', 'lat'],
            data: list,
          },
        ],
      };
    },
  },
};
</script>
