<template>
  <div class="hide">
    <el-form :inline="true" size="mini" class="hide-search">
      <el-form-item label="公司名称">
        <el-input
          v-model="deptName"
          placeholder="请输入公司名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="sbtn" @click="getDate(1)"
          >搜索</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      class="hideTable"
      :data="tableData"
      border
      v-loading="msgloading"
      element-loading-background="rgba(0, 0, 0, 0.4)"
      :height="tableListH"
    >
      <el-table-column
        prop="deptName"
        label="公司名称"
        width="210"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column label="一级风险数" show-overflow-tooltip align="center">
        <template slot-scope="{ row }">
          <span
            v-if="row.riskOne > 0"
            class="spancolor"
            @click="hidView(row, 1)"
          >
            {{ row.riskOne }}
          </span>
          <span v-else>{{ row.riskOne }}</span>
        </template>
      </el-table-column>
      <el-table-column label="二级风险数" show-overflow-tooltip align="center">
        <template slot-scope="{ row }">
          <span
            v-if="row.riskTwo > 0"
            class="spancolor"
            @click="hidView(row, 2)"
          >
            {{ row.riskTwo }}
          </span>
          <span v-else>{{ row.riskTwo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="三级风险数" show-overflow-tooltip align="center">
        <template slot-scope="{ row }">
          <span
            v-if="row.riskThree > 0"
            class="spancolor"
            @click="hidView(row, 3)"
          >
            {{ row.riskThree }}
          </span>
          <span v-else>{{ row.riskThree }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总风险数" show-overflow-tooltip align="center">
        <template slot-scope="{ row }">
          <span
            v-if="row.riskCount > 0"
            class="spancolor"
            @click="hidView(row, '')"
          >
            {{ row.riskCount }}
          </span>
          <span v-else>{{ row.riskCount }}</span>
        </template>
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
    <hideview ref="hidev"></hideview>
  </div>
</template>

<script>
import dataAnalysisApi from "@/api/modules/report";
import { mapGetters } from "vuex";
import { format } from "@/config/date";
import hideview from "./view";
export default {
  components: {
    hideview,
  },
  data() {
    return {
      msgloading: false,
      total: 0, //消息总数
      current: 1, //当前页数
      pageTotal: 1, //总页数
      pagesize: [10, 20, 30, 50, 100], //每页显示列表
      pagesizeactive: 20, //当前每页显示
      tableListH: "calc(100vh - 12.8828rem)",
      tableData: [],
      zhengfuId: this.$store.state.userinfo.deptId,
      deptName: "",
    };
  },
  created() {
    this.getRiskList();
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
    // 请求数据判断
    getDate(page) {
      this.getRiskList(page);
    },
    //地区报警处理率
    async getRiskList(current = 1) {
      current = Number(current);
      this.msgloading = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getRiskList({
          deptId: this.zhengfuId,
          date: format(new Date().getTime(), "YYYY-MM-DD"),
          current: current,
          size: this.pagesizeactive,
          deptName: this.deptName,
        })
      );
      this.msgloading = false;
      if (data && data != "") {
        this.tableData = data.records;
        //分页处理
        this.current = data.current;
        this.total = data.total;
        this.pageTotal = data.pageTotal;
      } else {
        this.$message.error(err);
      }
    },
    // 隐患明细
    hidView(row, index) {
      this.$refs.hidev.rows = row;
      this.$refs.hidev.getRiskListByType(index);
      this.$refs.hidev.hidVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.hide {
  .hide-search {
    display: flex;
    align-items: center;
    /deep/.el-form-item__label {
      color: #01f8ff;
    }
    /deep/ input {
      background: #112e4d;
      border-color: #004b77;
      color: #ffffff;
      height: 2.8571rem;
      font-size: 1rem;
      &:focus {
        border-color: #00d2ff;
      }
    }
    /deep/.el-form-item--mini.el-form-item {
      margin-bottom: 0.8rem;
      display: flex;
      align-items: center;
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
.hideTable {
  width: 100%;
  background: #0f1f40;
  border: 0.0714rem solid #0a3774;
  // margin-top: 15px;
  .spancolor {
    color: #00c8f5;
    cursor: pointer;
    text-decoration: underline;
  }
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
</style>
