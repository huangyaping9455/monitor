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
    }
    .btns {
      margin-top: 0.3571rem;
      margin-bottom: 1.0714rem;
      .btn {
        width: 9.2857rem;
        height: 2.8571rem;
        font-size: 1.1429rem;
        border: none;
        color: #ffffff;
        background: url("~@/assets/img/btn.png");
        background-size: 100% 100%;
        .icon {
          width: 1.1429rem;
          height: 1.1429rem;
          margin-right: 0.3571rem;
        }
        &:before {
          background-color: rgba(255, 255, 255, 0);
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
  .el-form-item__label {
    color: #01f8ff;
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
        <!-- 操作按钮 -->
        <div class="btns">
          <el-button
            @click="changeSearch"
            size="mini"
            class="btn"
            icon="el-icon-search"
            >查询</el-button
          >
          <el-button
            size="mini"
            :loading="downloading"
            @click="downtable"
            class="btn"
          >
            <svg-icon
              class="icon"
              v-show="!downloading"
              icon-class="down"
            />下载
          </el-button>
          <el-button
            @click="refresh"
            size="mini"
            class="btn"
            icon="el-icon-refresh"
            >刷新</el-button
          >
        </div>
        <!-- 查询 -->
        <el-form
          v-show="searchshow"
          :inline="true"
          size="mini"
          :model="form"
          class="search"
        >
          <el-form-item label="企业名称">
            <el-input
              v-model="form.deptName"
              placeholder="请输入企业名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="form.date"
              type="month"
              value-format="yyyy-MM-01"
              format="yyyy-MM"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="sbtn" @click="getDate(1)"
              >搜索</el-button
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
          <el-table-column type="index" label="序号" width="50" align="center">
            <template scope="scope">
              <span>{{
                (current - 1) * pagesizeactive + scope.$index + 1
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="企业名称"
            prop="deptName"
            width="200"
            :show-overflow-tooltip="true"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="企业类型"
            prop="depType"
            width="100"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>{{ deptType[row.depType - 1] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="区域"
            prop="areaname"
            align="center"
            width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="五项报警平均数系数"
            prop="alarmFactor"
            align="center"
            width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="平均车辆超速报警率"
            prop="overspeedAlarmRatio"
            align="center"
            width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="平均驾驶员异常报警率"
            prop="safeAbnormalAlarmRatio"
            align="center"
            width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="平均接打电话报警率"
            prop="safePhoneAlarmRatio"
            align="center"
            width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="平均疲劳驾驶报警率"
            prop="safeFatigueAlarmRatio"
            align="center"
            width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="平均分神驾驶报警率"
            prop="safeDistractionAlarmRatio"
            align="center"
            width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="报警类得分（满分60）"
            prop="alarmScore"
            align="center"
            width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="数据类"
            prop="dataScore"
            align="center"
            width="100"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="服务类"
            prop="serviceScore"
            align="center"
            width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="档案类"
            prop="fileScore"
            align="center"
            width="180"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="总计得分"
            prop="score"
            width="150"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="等级A/B/C/D"
            prop="scoreLevel"
            width="150"
            align="center"
            show-overflow-tooltip
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
import { export_json_to_excel } from "@/config/Export2Excel";
import dayjs from "dayjs";
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
      enterpriseListH: "calc(100vh - 14.6814rem)",
      form: {
        date: dayjs().format("YYYY-MM-01"),
        deptName: "",
      },
      enterpriseList: [],
      zhengfuId: "", //地区id
      deptType: ["客运", "普货", "危货"],
    };
  },
  mounted() {
    this.getSafetyDeptScore();
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
      }
    },
  },
  methods: {
    refresh() {
      this.form = {
        date: dayjs().format("YYYY-MM-01"),
        deptName: "",
      };
      this.getDate(1);
    },
    // 请求数据判断
    getDate(page) {
      this.getSafetyDeptScore(page);
    },
    //地区报警处理率
    async getSafetyDeptScore(current = 1) {
      current = Number(current);
      this.loading = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getSafetyDeptScore({
          deptId: this.zhuzzhiId,
          current: current,
          size: this.pagesizeactive,
          kind: 13,
          ...this.form,
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
    changeSearch() {
      this.searchshow
        ? (this.enterpriseListH = "calc(100vh - 13.5714rem)")
        : (this.enterpriseListH = "calc(100vh - 16.8571rem)");
      this.searchshow = !this.searchshow;
    },
    // 统计下载
    async downtable() {
      this.downloading = true;
      let req, url;
      url = "getSafetyDeptScore";
      req = {
        deptId: this.zhuzzhiId,
        // };
      };
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi[url]({
          ...req,
          current: 0,
          size: 0,
          kind: 13,
          ...this.form,
        })
      );
      this.downloading = false;
      if (data) {
        data = data.records.map((el, index) => {
          el.depTypeShow = this.deptType[el.depType - 1];
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
          "序号",
          "企业名称",
          "企业类型",
          "区域",
          "五项报警平均数系数",
          "平均车辆超速报警率",
          "平均驾驶员异常报警率",
          "平均接打电话报警率",
          "平均疲劳驾驶报警率",
          "平均分神驾驶报警率",
          "报警类得分（满分60）",
          "数据类",
          "服务类",
          "档案类",
          "总计得分",
          "等级A/B/C/D",
        ];
        filterVal = [
          "index",
          "deptName",
          "depTypeShow",
          "areaname",
          "alarmFactor",
          "overspeedAlarmRatio",
          "safeAbnormalAlarmRatio",
          "safePhoneAlarmRatio",
          "safeFatigueAlarmRatio",
          "safeDistractionAlarmRatio",
          "alarmScore",
          "dataScore",
          "serviceScore",
          "fileScore",
          "score",
          "scoreLevel",
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
          "N1:N2",
          "O1:O2",
          "P1:P2",
        ];
        filename = "企业联月报警分析";
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
