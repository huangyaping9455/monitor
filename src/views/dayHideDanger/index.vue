<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  padding: 0 10px 10px 10px;
  box-sizing: border-box;
  width: calc(100%);
  height: 90vh;
  background: #0b122e;
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
  .vehicleTable {
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
      &.ccur span {
        cursor: pointer;
        color: rgb(255, 217, 47);
        text-decoration: underline;
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
  .inputW {
    width: 11.7143rem;
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
.vehicleTable {
  &.el-table--enable-row-hover .el-table__body tr:hover > td,
  .el-table__body tr.hover-row > td {
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
  .el-table__fixed-right {
    background: #0f1f40;
    border-left: 1px solid #0a3774;
    height: calc(100%) !important;
  }
  .el-table__fixed::before,
  .el-table__fixed-right::before {
    height: 0;
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
  <div class="main">
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
        @click="refresh"
        size="mini"
        class="btn"
        icon="el-icon-refresh"
      >
        刷新
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
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="form.begintime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择开始日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          v-model="form.endtime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="sbtn" @click="getDate(1)">
          搜索
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.4)"
      size="mini"
      class="vehicleTable"
      :height="enterpriseListH"
      border
      :data="enterpriseList"
    >
      <el-table-column
        label="企业名称"
        prop="checkOrgname"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="checkName"
        label="排查名称"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="checkDate"
        label="排查日期"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="checkType"
        label="排查类型"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="checkRemark"
        label="排查结果"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="checkAddress"
        label="排查地点"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
    </el-table>
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
        <span class="el-icon-arrow-left" @click="getDate(current - 1)"></span>
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
        <span class="el-icon-arrow-right" @click="getDate(current + 1)"></span>
        <span class="el-icon-d-arrow-right" @click="getDate(pageTotal)"></span>
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
</template>

<script>
import dataAnalysisApi from "@/api/modules/report";
import { mapGetters } from "vuex";
import { format } from "@/config/date";
import { export_json_to_excel } from "@/config/Export2Excel";
export default {
  data() {
    return {
      loading: false,
      searchshow: false,
      total: 0, //消息总数
      current: 1, //当前页数
      pageTotal: 1, //总页数
      pagesize: [10, 20, 30, 50, 100], //每页显示列表
      pagesizeactive: 20, //当前每页显示
      enterpriseListH: "calc(100vh - 14.6814rem)",
      form: {
        begintime: format(
          new Date().getTime() - 3600 * 1000 * 24,
          "YYYY-MM-DD"
        ),
        endtime: format(new Date().getTime(), "YYYY-MM-DD"),
      },
      enterpriseList: [],
      zhengfuId: "", //地区id
      vehiclemsgList: {},
    };
  },
  created() {
    this.getZFPage();
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
        begintime: format(
          new Date().getTime() - 3600 * 1000 * 24,
          "YYYY-MM-DD"
        ),
        endtime: format(new Date().getTime(), "YYYY-MM-DD"),
      };
      this.getDate(1);
    },
    // 请求数据判断
    getDate(page) {
      this.getZFPage(page);
    },
    //地区报警处理率
    async getZFPage(current = 1) {
      current = Number(current);
      this.loading = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getZFPage({
          deptId: this.zhuzzhiId,
          current: current,
          size: this.pagesizeactive,
          checkType: 1,
          begDate: this.form.begintime,
          endDate: this.form.endtime,
        })
      );
      this.loading = false;
      if (data) {
        this.enterpriseList = data.records.map((el) => {
          el.checkType = "日隐患";
          return el;
        });
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
  },
};
</script>
