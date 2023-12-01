<template>
  <el-dialog
    title="详情"
    class="learns"
    center
    top="10vh"
    :show-close="false"
    :close-on-click-modal="false"
    :visible.sync="learnVisible"
    width="70%"
    :append-to-body="false"
  >
    <div class="learn_head">
      <span>姓名 : </span>
      <el-input
        size="small"
        clearable
        v-model="usernames"
        placeholder="请输入姓名"
      ></el-input>
      <span style="margin-left: 0.8rem">学习月份 : </span>
      <el-date-picker
        size="small"
        value-format="yyyy-MM"
        type="month"
        placement="bottom-end"
        v-model="lmonths"
        placeholder="请选择学习月份"
      ></el-date-picker>
      <span style="margin-left: 0.8rem">完成情况 : </span>
      <el-select
        size="small"
        placeholder="请选择完成情况"
        v-model="statusshow"
        clearable
      >
        <el-option label="全部" value=""></el-option>
        <el-option label="达标" value="达标"></el-option>
        <el-option label="未达标" value="未达标"></el-option>
        <el-option label="未学习" value="未学习"></el-option>
      </el-select>
      <span style="margin-left: 0.8rem">学习方式 : </span>
      <el-select
        size="small"
        placeholder="请选择学习方式"
        v-model="learnStudys"
        clearable
      >
        <el-option label="全部" value=""></el-option>
        <el-option label="线上学习" value="线上学习"></el-option>
        <el-option label="线下学习" value="线下学习"></el-option>
        <el-option
          label="线上学习、线下学习"
          value="线上学习、线下学习"
        ></el-option>
      </el-select>
      <el-button size="small" type="primary" @click="getDate(1)"
        >搜索</el-button
      >
    </div>
    <el-table
      class="learnTable"
      :data="tableData"
      border
      height="500"
      v-loading="msgloading"
      element-loading-background="rgba(0, 0, 0, 0.4)"
    >
      <el-table-column
        prop="username"
        label="姓名"
        width="100"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="usercardShow"
        label="身份证号"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="userphone"
        label="手机号"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="learnStudy"
        label="学习方式"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="chName"
        label="学时名称"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="{ row }">
          <el-button type="text" @click="viewChName(row)">{{
            row.chName
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="lmonth"
        label="学习月份"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="learntime"
        label="学习时长(小时)"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="luser"
        label="学习平台"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column label="完成情况" show-overflow-tooltip align="center">
        <template slot-scope="{ row }">
          <span>{{
            row.finishMark == 1
              ? "已完成未签名"
              : row.finishMark == 2
              ? "已完成已签名"
              : "未完成"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="180" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            @click="viewCard(row, '学习证明')"
            :disabled="row.finishMark == '' || row.finishMark == 0"
            >学习证明</el-button
          >
          <el-button
            v-if="row.luser != '替比'"
            type="text"
            @click="viewMonth(row)"
            :disabled="row.finishMark == '' || row.finishMark == 0"
            >学习月报</el-button
          >
          <el-button
            v-if="row.luser == '替比'"
            type="text"
            @click="viewCard(row, '结业证书')"
            :disabled="row.finishMark == '' || row.finishMark == 0"
          >
            结业证书
          </el-button>
          <el-button
            v-if="row.luser == '替比' && row.examurl"
            type="text"
            @click="viewCard(row, '考试记录')"
            :disabled="row.finishMark == '' || row.finishMark == 0"
          >
            考试记录
          </el-button>
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
    <div slot="footer">
      <el-button class="topbtn" size="mini" @click="learnVisible = false">
        取 消
      </el-button>
    </div>
    <view-learn ref="viewlearn"></view-learn>
    <view-list ref="viewlist"></view-list>
    <view-month ref="viewmonth"></view-month>
  </el-dialog>
</template>

<script>
import dataAnalysisApi from "@/api/modules/report";
import { format } from "@/config/date";
import viewLearn from "./viewLearn.vue";
import ViewList from "./viewList.vue";
import ViewMonth from "./viewMonth.vue";
import dayjs from "dayjs";
export default {
  components: { viewLearn, ViewList, ViewMonth },
  data() {
    return {
      learnVisible: false,
      msgloading: false,
      total: 0, //消息总数
      current: 1, //当前页数
      pageTotal: 1, //总页数
      pagesize: [10, 20, 30, 50, 100], //每页显示列表
      pagesizeactive: 20, //当前每页显示
      lmonths: format(new Date(), "yyyy-MM"),
      usernames: "",
      statusshow: "",
      learnStudys: "",
      tableData: [],
      rows: {},
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 请求数据判断
    getDate(page) {
      this.selectPersonLearnInfoAll(page);
    },
    //地区报警处理率
    async selectPersonLearnInfoAll(current = 1) {
      current = Number(current);
      this.msgloading = true;
      let lyear = this.lmonths.split("-")[0];
      let lmonth = this.lmonths.split("-")[1];
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.selectPersonLearnInfoAll({
          deptId: this.rows.deptid,
          current: current,
          size: this.pagesizeactive,
          lmonth: lmonth,
          lyear: lyear,
          user_name: this.usernames,
          status: this.statusshow,
          learnStudy: this.learnStudys,
        })
      );
      this.msgloading = false;
      if (data) {
        this.tableData = data.records.map((el) => {
          if (el.lmonth == "-1") {
            el.lmonth = "";
          }
          if (el.usercard) {
            el.usercardShow = el.usercard.replace(
              /^(.{6})(?:\d+)(.{4})$/,
              "$1****$2"
            );
          }
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
    // 学习证明
    viewCard(row, type) {
      this.$refs.viewlearn.open(
        row,
        dayjs(this.lmonths).format("YYYY-MM"),
        type
      );
    },
    // 从业人员月报
    viewMonth(row) {
      this.$refs.viewmonth.open(row, dayjs(this.lmonths).format("YYYY-MM"));
    },
    // 学习证明
    viewChName(row) {
      // this.$refs.viewlist.open(row);
    },
  },
};
</script>

<style lang="scss">
.el-tooltip__popper {
  max-width: 500px;
}
.learns {
  .el-dialog {
    background-image: url("~@/assets/img/bg_14.png");
    background-size: 100% 100%;
    background-color: transparent;
    .el-dialog__title {
      color: #ffffff;
      font-weight: bold;
    }
    .el-dialog__body {
      padding: 10px 20px;
    }
    .learn_head {
      display: flex;
      padding: 10px 0;
      span {
        font-size: 14px;
        font-weight: 600;
        display: flex;
        align-items: center;
        margin-right: 5px;
        color: #fff;
      }
      .el-input,
      .el-select,
      .el-date-picker {
        width: 15.2vmin !important;
      }
      .el-button {
        margin-left: 10px;
      }
    }
    .learnTable {
      width: 100%;
      background: #0f1f40;
      border: 0.0714rem solid #0a3774;
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
    .topbtn {
      border: solid 1px #0a3774;
      background-image: linear-gradient(0deg, #0080de 0%, #00c8f5 100%);
      color: #ffffff;
      font-weight: bold;
      width: 130px;
      cursor: default;
      font-size: 16px;
      cursor: pointer;
    }
  }
}
</style>
