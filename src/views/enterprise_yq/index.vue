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
      }
      .cur {
        cursor: pointer;
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
  .timetype {
    .el-form-item {
      margin-right: 0px;
      margin-bottom: 0px;
    }
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
  .timetype .el-form-item--mini.el-form-item {
    margin-bottom: 0px;
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
        </div>
        <!-- 查询 -->
        <el-form
          v-show="searchshow"
          :inline="true"
          size="mini"
          :model="form"
          class="search"
        >
          <el-form-item label="时间">
            <el-col :span="11" class="timetype">
              <el-form-item>
                <el-date-picker
                  style="width: 100%"
                  :picker-options="pickerOptions"
                  type="date"
                  placeholder="选择日期"
                  v-model="form.begintime"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11" class="timetype">
              <el-form-item>
                <el-date-picker
                  style="width: 100%"
                  :picker-options="pickerOptions"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  v-model="form.endtime"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input
              style="width:100%"
              clearable
              v-model="form.deptName"
            ></el-input>
          </el-form-item>
          <el-form-item label="风险区域">
            <el-input
              style="width:100%"
              clearable
              v-model="form.area"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="sbtn"
              @click="getDeptIntoAreaPMTJ(1)"
              >搜索</el-button
            >
          </el-form-item>
        </el-form>
        <!-- mainTable -->
        <el-table
          v-loading="loading"
          @sort-change="changeSort"
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
          <el-table-column label="地区" width="120" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.areaname }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="qiyemingcheng"
            label="企业名称"
            min-width="120"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="area"
            label="风险区域"
            min-width="140"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="date"
            label="统计日期"
            min-width="140"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="baojingcheliangshu"
            label="报警车辆数"
            min-width="100"
            sortable="custom"
            align="center"
          ></el-table-column>
          <el-table-column
            label="进区域报警"
            min-width="100"
            sortable="custom"
            align="center"
          >
            <template slot-scope="{ row }">
              <span
                v-if="row.baojingzongshu > 0"
                class="businessName cur"
                @click="getEnterprise(row)"
                >{{ row.baojingzongshu }}</span
              >
              <span v-else class="businessName">{{ row.baojingzongshu }}</span>
            </template>
          </el-table-column>
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
            <span
              class="el-icon-d-arrow-left"
              @click="getDeptIntoAreaPMTJ(1)"
            ></span>
            <span
              class="el-icon-arrow-left"
              @click="getDeptIntoAreaPMTJ(current - 1)"
            ></span>
            <span
              class="num"
              v-show="current - 2 > 0"
              @click="getDeptIntoAreaPMTJ(current - 2)"
              >{{ current - 2 }}</span
            >
            <span
              class="num"
              v-show="current - 1 > 0"
              @click="getDeptIntoAreaPMTJ(current - 1)"
              >{{ current - 1 }}</span
            >
            <span class="num active">{{ current }}</span>
            <span
              class="num"
              v-show="current + 1 <= pageTotal"
              @click="getDeptIntoAreaPMTJ(current + 1)"
              >{{ current + 1 }}</span
            >
            <span
              class="num"
              v-show="current + 2 <= pageTotal"
              @click="getDeptIntoAreaPMTJ(current + 2)"
              >{{ current + 2 }}</span
            >
            <span
              class="el-icon-arrow-right"
              @click="getDeptIntoAreaPMTJ(current + 1)"
            ></span>
            <span
              class="el-icon-d-arrow-right"
              @click="getDeptIntoAreaPMTJ(pageTotal)"
            ></span>
            <div class="pagesize">
              每页显示
              <el-select
                class="showselect"
                size="mini"
                @change="getDeptIntoAreaPMTJ(1)"
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
      newtime: "",
      loading: false,
      downloading: false,
      searchshow: false,
      total: 0, //消息总数
      current: 1, //当前页数
      pageTotal: 1, //总页数
      pagesize: [10, 20, 30, 50, 100], //每页显示列表
      pagesizeactive: 20, //当前每页显示
      enterpriseListH: "calc(100vh - 13.5714rem)",
      form: {
        begintime: format(
          new Date().getTime() - 24 * 60 * 60 * 1000,
          "YYYY-MM-DD"
        ),
        endtime: format(
          new Date().getTime() - 24 * 60 * 60 * 1000,
          "YYYY-MM-DD"
        ),
        deptName: "",
        area: "",
      },
      enterpriseList: [],
      pickerOptions: {
        disabledDate: (time) => {
          let nowData = new Date();
          nowData = new Date(nowData.setDate(nowData.getDate() - 1));
          return time > nowData;
        },
      },
      orderColumns: "", //排序字段
      order: "", //正序/倒序
      isorder: "",
    };
  },
  mounted() {
    //报警统计结算
    this.getDeptIntoAreaPMTJ();
    this.isorder = new Map()
      .set("ascending", 0)
      .set("descending", 1)
      .set(null, "");
  },
  computed: {
    ...mapGetters({
      zhuzzhiId: "government/fasongdanwei",
    }),
  },
  watch: {
    zhuzzhiId(newid) {
      // 切换单位
      if (newid) {
        this.getDeptIntoAreaPMTJ();
      }
    },
  },
  methods: {
    //报警统计结算
    async getDeptIntoAreaPMTJ(current = 1) {
      current = Number(current);
      this.loading = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getDeptIntoAreaPMTJ({
          deptId: this.zhuzzhiId,
          current: current,
          size: this.pagesizeactive,
          orderColumns: this.orderColumns,
          order: this.order,
          beginTime: this.form.begintime,
          endTime: this.form.endtime,
          deptName: this.form.deptName,
          area: this.form.area,
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
    //排序
    changeSort(val) {
      this.orderColumns = val.prop;
      this.order = this.isorder.get(val.order);
      this.getDeptIntoAreaPMTJ(1);
    },
    // 报警详情
    getEnterprise(row) {
      this.$router.push({
        path: "/enterprisetreat",
        query: {
          deptId: row.qiyeid,
          begintime: row.date.split("至")[0],
          endtime: row.date.split("至")[0],
          deptName: row.qiyemingcheng,
          area: row.area,
          areaId: row.areaId,
        },
      });
    },
    // 统计下载
    async downtable() {
      this.downloading = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getDeptIntoAreaPMTJ({
          deptId: this.zhuzzhiId,
          current: 0,
          size: 0,
          orderColumns: this.orderColumns,
          order: this.order,
          beginTime: this.form.begintime,
          endTime: this.form.endtime,
          deptName: this.form.deptName,
          area: this.form.area,
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
        const multiHeader = [
          "排名",
          "地区",
          "企业名称",
          "风险区域",
          "统计日期",
          "报警车辆数",
          "进区域报警",
        ];
        const filterVal = [
          "index",
          "areaname",
          "qiyemingcheng",
          "area",
          "date",
          "baojingcheliangshu",
          "baojingzongshu",
        ];
        const merges = [
          "A1:A2",
          "B1:B2",
          "C1:C2",
          "D1:D2",
          "E1:E2",
          "F1:F2",
          "G1:G2",
        ];
        const data = this.formatJson(filterVal, list);
        export_json_to_excel({
          multiHeader,
          header: multiHeader,
          data,
          merges,
          filename: "企业进区域报警排名统计",
        });
      });
    },
  },
};
</script>
