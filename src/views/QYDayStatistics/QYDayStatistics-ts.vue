<style lang="scss" scoped>
.enterprise {
  height: 100vh;
  background: #0b122e;
  .main {
    height: calc(100vh - 7rem);
    display: flex;
    padding: 0 10px 10px 10px;
    box-sizing: border-box;
    .main-r {
      margin-left: 1.0714rem;
      width: calc(100% - 24rem);
      .hide-top {
        margin-top: 5px;
        display: flex;
        justify-content: space-between;
        .car-item {
          width: 19%;
          height: 9.7143rem;
          border-radius: 0.7143rem;
          box-sizing: border-box;
          padding: 1.82rem 2.2286rem;
          color: #ffffff;
          font-size: 1.1429rem;
          background-size: 100% 100%;
          overflow: hidden;
          position: relative;
          span:last-of-type {
            display: block;
            font-size: 2.8571rem;
            font-weight: bold;
            margin-top: 5px;
          }
          &:nth-of-type(1) {
            background-image: url("~@/assets/img/bg33.gif");
          }
          &:nth-of-type(2) {
            background-image: url("~@/assets/img/bg34.gif");
          }
          &:nth-of-type(3) {
            background-image: url("~@/assets/img/bg35.gif");
          }
          &:nth-of-type(4) {
            background-image: url("~@/assets/img/bg36.gif");
          }
          &:nth-of-type(5) {
            background-image: url("~@/assets/img/bg37.gif");
          }
        }
      }
    }
    .line {
      color: #ffffff;
      text-align: center;
    }
    .sbtn {
      height: 30.0006px;
      width: 59.9998px;
      background-image: linear-gradient(0deg, #0080de 0%, #00c8f5 100%);
    }
    .mainTable {
      width: 100%;
      background: #0f1f40;
      border: 0.0714rem solid #0a3774;
      .businessName {
        color: #01f8ff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .cur {
        cursor: pointer;
      }
      .numerical {
        margin: 0;
        white-space: nowrap;
        /* span{
          color: rgb(255,217,47)
        } */
        &.ccur span {
          cursor: pointer;
          color: rgb(255, 217, 47);
          text-decoration: underline;
        }
      }
    }
  }
  .page {
    display: flex;
    color: #d3d4d6;
    padding: 0 0.7143rem;
    font-size: 0.8571rem;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.9rem;
    .page-l {
      display: flex;
      align-items: center;
      span {
        margin-right: 0.7143rem;
      }
      strong {
        font-size: 1.2857rem;
        color: #01f8ff;
        margin: 0 0.3571rem;
      }
    }
    .page-r {
      display: flex;
      align-items: center;
      span {
        cursor: pointer;
        padding: 0 0.1429rem;
        font-size: 1.2857rem;
        margin: 0 0.1429rem;
      }
      .pagesize {
        width: 14.2857rem;
        margin-left: 1.4286rem;
      }
      .showselect {
        width: 6.4286rem;
      }
      .num {
        font-size: 0.9286rem;
        width: 1.2857rem;
        height: 1.2857rem;
        padding: 5px;
        border-radius: 50%;
        text-align: center;
        &.active {
          background-image: linear-gradient(0deg, #0080de 0%, #00c8f5 100%);
        }
      }
    }
  }
}
</style>
<style lang="scss">
.search {
  margin-top: 10px;
  .el-form-item__label {
    color: #01f8ff;
  }
  .el-input-group__prepend {
    background: #112e4d;
    border-color: #004b77;
    color: #ffffff;
    font-size: 1rem;
    padding: 0 10px;
  }
  .inputW {
    width: 10.7143rem;
  }
  input {
    background: #112e4d;
    border-color: #004b77;
    color: #ffffff;
    height: 2.8571rem;
    font-size: 1rem;
    &:focus {
      border-color: #00d2ff;
    }
  }
  .el-form-item--mini.el-form-item {
    margin-bottom: 0.8rem;
  }
}
.mainTable {
  &.el-table--enable-row-hover .el-table__body tr:hover > td {
    background: #ffffff38;
  }
  thead.is-group th {
    background: transparent;
  }
  &.el-table--border th {
    border-bottom: 1px solid #0a3774;
    &.gutter:last-of-type {
      border-bottom: 1px solid #0a3774;
    }
  }
  tr {
    background: transparent;
  }
  td {
    border-right: 1px solid #0a3774;
    border-bottom: 1px solid #0a3774;
    color: #ffffff;
  }
  th.is-leaf {
    border-bottom: 1px solid #0a3774;
  }
  th {
    background: transparent;
    border-right: 1px solid #0a3774;
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
}
.pagesize {
  .el-input__inner {
    background-color: #0f1f40;
    border: 1px solid #0a3774;
  }
}
</style>

<template>
  <div class="enterprise">
    <all-header></all-header>
    <div class="main">
      <statistics-aside></statistics-aside>
      <div class="main-r">
        <div class="hide-top">
          <div class="car-item">
            <span>上线率</span>
            <span>{{ enterpriseCount.onlineRate }}</span>
          </div>
          <div class="car-item">
            <span>定位率</span>
            <span>{{ enterpriseCount.locateRate }}</span>
          </div>
          <div class="car-item">
            <span>数据合格率</span>
            <span>{{ enterpriseCount.qualifiedPositionRate }}</span>
          </div>
          <div class="car-item">
            <span>轨迹完整率</span>
            <span>{{ enterpriseCount.intactPositionRate }}</span>
          </div>
          <div class="car-item">
            <span>轨迹漂移率</span>
            <span>{{ enterpriseCount.driftPositionRate }}</span>
          </div>
        </div>
        <el-form :inline="true" size="mini" :model="form" class="search">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="form.begintime"
              type="date"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              placeholder="选择开始日期"
              class="inputW"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="form.endtime"
              type="date"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              placeholder="选择结束日期"
              class="inputW"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="车辆总数">
            <el-autocomplete
              class="inline-input inputW"
              v-model="vehicleCount"
              :fetch-suggestions="querySearch"
            >
              <template slot="prepend">≥</template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="sbtn" @click="getDate(1)"
              >搜索</el-button
            >
            <el-button
              size="mini"
              :loading="downloading"
              @click="downtable"
              type="primary"
              class="sbtn"
              >下载
            </el-button>
            <el-button @click="refresh" size="mini" type="primary" class="sbtn"
              >刷新</el-button
            >
          </el-form-item>
        </el-form>
        <!-- mainTable -->
        <el-table
          v-loading="loading"
          element-loading-background="rgba(0, 0, 0, 0.4)"
          size="mini"
          class="mainTable"
          :height="enterpriseListH"
          border
          :data="enterpriseList"
        >
          <el-table-column type="index" label="排名" width="50" align="center">
            <template scope="scope">
              <span>{{
                (current - 1) * pagesizeactive + scope.$index + 1
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="所属地市"
            prop="areaname"
            min-width="100"
            :show-overflow-tooltip="true"
            align="center"
          ></el-table-column
          ><el-table-column
            label="所属交通局"
            prop="zhengfuname"
            min-width="150"
            :show-overflow-tooltip="true"
            align="center"
          ></el-table-column>
          <el-table-column
            label="企业名称"
            prop="company"
            min-width="210"
            :show-overflow-tooltip="true"
            align="center"
          ></el-table-column>
          <el-table-column
            label="统计日期"
            prop="date"
            width="130"
            align="center"
          ></el-table-column>
          <el-table-column
            label="车辆总数"
            prop="vehicleCount"
            align="center"
            min-width="80"
          ></el-table-column>
          <el-table-column
            label="上线车辆数"
            prop="onlineCount"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            label="离线车辆数"
            prop="offlineCount"
            align="center"
            min-width="120"
          ></el-table-column>
          <el-table-column
            label="上线率"
            prop="onlineRate"
            align="center"
            min-width="100"
          ></el-table-column>
          <el-table-column
            prop="locateCount"
            label="定位车辆数"
            align="center"
            min-width="100"
          ></el-table-column>
          <el-table-column
            prop="locateRate"
            label="定位率"
            align="center"
            min-width="100"
          ></el-table-column>
          <el-table-column
            prop="driftPositionRate"
            label="轨迹漂移率"
            align="center"
            min-width="100"
          ></el-table-column>
          <el-table-column
            prop="intactPositionRate"
            label="轨迹完整率"
            align="center"
            min-width="100"
          ></el-table-column>
          <el-table-column
            prop="qualifiedPositionRate"
            label="数据合格率"
            align="center"
            min-width="100"
          ></el-table-column>
        </el-table>
        <!-- page -->
        <div class="page">
          <div class="page-l">
            <span>
              总共
              <strong>{{ total }}</strong> 条消息
            </span>
            <span>
              当前第
              <strong>{{ current }}</strong> 页
            </span>
            <span>
              总
              <strong>{{ pageTotal }}</strong> 页
            </span>
          </div>
          <div class="page-r">
            <span class="el-icon-d-arrow-left" @click="getDate(1)"></span>
            <span
              class="el-icon-arrow-left"
              @click="getDate(current - 1)"
            ></span>
            <span
              class="num"
              v-show="current - 2 > 0"
              @click="getDate(current - 2)"
              >{{ current - 2 }}</span
            >
            <span
              class="num"
              v-show="current - 1 > 0"
              @click="getDate(current - 1)"
              >{{ current - 1 }}</span
            >
            <span class="num active">{{ current }}</span>
            <span
              class="num"
              v-show="current + 1 <= pageTotal"
              @click="getDate(current + 1)"
              >{{ current + 1 }}</span
            >
            <span
              class="num"
              v-show="current + 2 <= pageTotal"
              @click="getDate(current + 2)"
              >{{ current + 2 }}</span
            >
            <span
              class="el-icon-arrow-right"
              @click="getDate(current + 1)"
            ></span>
            <span
              class="el-icon-d-arrow-right"
              @click="getDate(pageTotal)"
            ></span>
            <div class="pagesize">
              每页显示
              <el-select
                class="showselect"
                size="mini"
                @change="getDate(1)"
                v-model="pagesizeactive"
              >
                <el-option
                  v-for="item in pagesize"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option> </el-select
              >条信息
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import allHeader from "@/components/Header/index";
import statisticsAside from "@/components/StatisticsAside/index";
import dataAnalysisApi from "@/api/modules/report";
import { mapGetters } from "vuex";
import { format } from "@/config/date";
import { export_json_to_excel } from "@/config/Export2Excel";
export default {
  components: {
    "statistics-aside": statisticsAside,
    "all-header": allHeader,
  },
  data() {
    return {
      loading: false,
      downloading: false,
      searchshow: false,
      total: 0, //消息总数
      current: 1, //当前页数
      pageTotal: 1, //总页数
      pagesize: [20, 30, 50, 100, 200], //每页显示列表
      pagesizeactive: 20, //当前每页显示
      enterpriseListH: "calc(100vh - 23.6814rem)",
      form: {
        begintime: format(
          new Date().getTime() - 3600 * 1000 * 24,
          "YYYY-MM-DD"
        ),
        endtime: format(new Date().getTime(), "YYYY-MM-DD"),
      },
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() > Date.now() ||
            time.getTime() < Date.now() - 24 * 60 * 60 * 1000 * 30
          );
        },
      },
      enterpriseList: [],
      enterpriseCount: [],
      zhengfuId: "", //地区id
      vehicleCount: "1",
    };
  },
  mounted() {
    this.getQYRYXTJ();
    this.getOneRate();
  },
  computed: {
    ...mapGetters({
      zhuzzhiId: "government/fasongdanwei",
      xuanzhongchengshi: "government/xuanzhongchengshi",
    }),
  },
  watch: {
    zhuzzhiId(newid) {
      // 切换单位
      if (newid) {
        this.zhengfuId = this.zhuzzhiId;
        this.getDate(1);
        this.getOneRate();
      }
    },
  },
  methods: {
    refresh() {
      this.form = {
        begintime: format(
          new Date().getTime() - 3600 * 1000 * 24,
          "YYYY-MM-DD"
        ),
        endtime: format(new Date().getTime(), "YYYY-MM-DD"),
      };
      this.getDate(1);
    },
    // 车辆数 搜索建议
    querySearch(queryString, cb) {
      let restaurants = [
        { value: "1" },
        { value: "10" },
        { value: "15" },
        { value: "20" },
        { value: "25" },
        { value: "30" },
      ];
      // let results = queryString
      //   ? restaurants.filter(this.createFilter(queryString))
      //   : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(restaurants);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    // 请求数据判断
    getDate(page) {
      this.getQYRYXTJ(page);
    },
    //地区报警处理率
    async getQYRYXTJ(current = 1) {
      current = Number(current);
      this.loading = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getQYRYXTJ({
          deptId: this.zhuzzhiId,
          current: current,
          size: this.pagesizeactive,
          begintime: this.form.begintime,
          endtime: this.form.endtime,
          vehiclecount: this.vehicleCount,
        })
      );
      this.loading = false;
      if (data) {
        this.enterpriseList = data.records;
        //分页处理
        this.current = data.current;
        this.total = data.total;
        this.pageTotal = data.pageTotal;
      } else {
        this.$message.error(err);
      }
    },
    //联网考核五率统计
    async getOneRate() {
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getOneRate({
          deptId: this.zhuzzhiId,
        })
      );
      if (data) {
        this.enterpriseCount = data[0];
      } else {
        this.$message.error(err);
      }
    },
    // 统计下载
    async downtable() {
      this.downloading = true;
      let req, url;
      url = "getQYRYXTJ";
      req = {
        deptId: this.zhuzzhiId,
        // };
      };
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi[url]({
          ...req,
          current: 0,
          size: 0,
          begintime: this.form.begintime,
          endtime: this.form.endtime,
          vehiclecount: this.vehicleCount,
        })
      );
      this.downloading = false;
      if (data) {
        data = data.records.map((el, index) => {
          return {
            ...el,
            index: index + 1,
          };
        });
        this.export2Excel(data);
      } else {
        this.$message.error(err);
      }
    },
    //处理下载数据
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    export2Excel(list) {
      require.ensure([], () => {
        let multiHeader, filterVal, merges, filename;
        multiHeader = [
          "排名",
          "所属地市",
          "所属交通局",
          "企业名称",
          "统计日期",
          "车辆总数",
          "上线车辆数",
          "离线车辆数",
          "上线率",
          "定位车辆数",
          "定位率",
          "轨迹漂移率",
          "轨迹完整率",
          "数据合格率",
        ];
        filterVal = [
          "index",
          "areaname",
          "zhengfuname",
          "company",
          "date",
          "vehicleCount",
          "onlineCount",
          "offlineCount",
          "onlineRate",
          "locateCount",
          "locateRate",
          "driftPositionRate",
          "intactPositionRate",
          "qualifiedPositionRate",
        ];
        merges = [
          "A1:A2",
          "B1:B2",
          "C1:C2",
          "D1:D2",
          "E1:E2",
          "F1:F2",
          "G1:G2",
          "H1:H2",
          "I1:I2",
          "J1:J2",
          "K1:K2",
          "L1:L2",
          "M1:M2",
        ];
        filename = "企业日运行统计";
        const data = this.formatJson(filterVal, list);
        export_json_to_excel({
          multiHeader,
          header: multiHeader,
          data,
          filename: filename,
          merges,
        });
      });
    },
  },
};
</script>
