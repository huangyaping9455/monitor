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
  }
  .speed_body {
    display: flex;
    flex-direction: column;
    width: calc(100% - 30px);
    height: calc(100% - 150px);
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
          border: 1px solid red;
          .card_h {
            height: 50px;
            width: 100%;
            background-image: url("~@/assets/img/speed/card1.png");
            background-size: 100% 100%;
          }
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
            height: 100%;
            width: calc(100% / 4);
            background-image: url("~@/assets/img/speed/item1.png");
            background-size: 100% 100%;
          }
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
        border: 1px solid red;
      }
    }
  }

  .dbom {
    display: block;
    height: 70px;
    width: 100%;
    background-image: url("~@/assets/img/speed/bom.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
</style>

<template>
  <div class="dataAnalysis">
    <div class="dheader"></div>
    <div class="speed_body">
      <div class="speed_b_t">
        <div class="speed_l">
          <div class="l_top">
            <div class="card_h"></div>
            <div class="card_chart">
              <echart-base height="100%" width="100%" :chart-option="option1"></echart-base>
            </div>
          </div>
          <div class="l_bot">
            <div class="card_h"></div>
            <div class="card_chart">
              <echart-base height="100%" width="100%" :chart-option="option1"></echart-base>
            </div>
          </div>
        </div>
        <div class="speed_c">
          <div class="c_item">
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
          </div>
          <div class="c_map"></div>
        </div>
        <div class="speed_r">
          <div class="l_top">
            <div class="card_h"></div>
            <div class="card_chart">
              <echart-base height="100%" width="100%" :chart-option="option1"></echart-base>
            </div>
          </div>
          <div class="l_bot">
            <div class="card_h"></div>
            <div class="card_chart">
              <echart-base height="100%" width="100%" :chart-option="option1"></echart-base>
            </div>
          </div>
        </div>
      </div>
      <div class="speed_b_b">
        <div class="speed_b_l"></div>
        <div class="speed_b_l"></div>
      </div>
    </div>
    <div class="dbom"></div>
  </div>
</template>

<script>
import echartBase from "@/components/EChart/index";
import vueSeamlessScroll from "vue-seamless-scroll";
import { mapGetters } from "vuex";
import { geooption66 } from "@/config/echartoption2";
export default {
  data() {
    return { option1: {} };
  },
  components: {
    "echart-base": echartBase,
    vueSeamlessScroll,
  },
  mounted() {
    this.option1 = geooption66();
  },
  computed: {
    ...mapGetters({
      userinfo: "userinfo",
    }),
  },
  methods: {},
};
</script>
