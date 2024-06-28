<template>
  <el-dialog
    title="学员统计"
    class="learns"
    center
    top="10vh"
    :show-close="false"
    :close-on-click-modal="false"
    :visible.sync="learnVisible"
    width="75%"
  >
    <!-- 查询 -->
    <el-form :inline="true" size="mini" :model="formLine" class="search">
      <el-form-item label="学员姓名">
        <el-input
          v-model="formLine.realname"
          size="small"
          placeholder="请输入学员姓名"
          style="width: 140px"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="车辆牌照">
        <el-input
          v-model="formLine.plateNumber"
          size="small"
          placeholder="请输入车辆牌照"
          style="width: 140px"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          placeholder="请选择"
          v-model="formLine.studyStatus"
          style="width: 140px"
          size="small"
          clearable
        >
          <el-option label="完成" value="完成"></el-option>
          <el-option label="未完成" value="未完成"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否考试">
        <el-select
          placeholder="请选择"
          v-model="formLine.finishExam"
          style="width: 140px"
          size="small"
          clearable
        >
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="sbtn" @click="getDate(1)">
          搜索
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      class="learnTable"
      :data="tableData"
      border
      height="550"
      v-loading="msgloading"
      element-loading-background="rgba(0, 0, 0, 0.4)"
    >
      <el-table-column prop="realName" label="学员姓名" align="center"> </el-table-column>
      <el-table-column prop="sex" label="性别" align="center"> </el-table-column>
      <el-table-column prop="station" label="岗位" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.station ? scope.row.station : "驾驶员" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="plateNumber" label="车牌号码" align="center"> </el-table-column>
      <el-table-column
        prop="courseBeginTime"
        label="开始学习时间"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="courseEndTime"
        label="结束学习时间"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="duration"
        label="课程总时长"
        align="center"
        width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="studyDuration"
        label="已有效学习时长"
        align="center"
        width="150"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="progress" label="学习进度" align="center"> </el-table-column>
      <el-table-column label="是否完成考试" align="center" width="130">
        <template slot-scope="scope">
          <span>{{ scope.row.finishExam == 1 ? "是" : "否" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center"> </el-table-column>
      <el-table-column prop="studyType" label="学习方式" align="center"> </el-table-column>
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
        <span class="num" v-show="current - 2 > 0" @click="getDate(current - 2)">{{
          current - 2
        }}</span>
        <span class="num" v-show="current - 1 > 0" @click="getDate(current - 1)">{{
          current - 1
        }}</span>
        <span class="num active">{{ current }}</span>
        <span class="num" v-show="current + 1 <= pageTotal" @click="getDate(current + 1)">{{
          current + 1
        }}</span>
        <span class="num" v-show="current + 2 <= pageTotal" @click="getDate(current + 2)">{{
          current + 2
        }}</span>
        <span class="el-icon-arrow-right" @click="getDate(current + 1)"></span>
        <span class="el-icon-d-arrow-right" @click="getDate(pageTotal)"></span>
        <div class="pagesize">
          每页显示
          <el-select class="showselect" size="mini" @change="getDate(1)" v-model="pagesizeactive">
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
  </el-dialog>
</template>

<script>
import dayjs from "dayjs";
import dataAnalysisApi from "@/api/modules/examine";
export default {
  data() {
    return {
      learnVisible: false,
      total: 0, //消息总数
      current: 1, //当前页数
      pageTotal: 1, //总页数
      pagesize: [10, 20, 30, 50, 100], //每页显示列表
      pagesizeactive: 20, //当前每页显示
      tableData: [],
      rows: {},
      formLine: {},
      msgloading: false,
      deptMsg: {},
    };
  },
  methods: {
    open(row) {
      this.tableData = [];
      this.formLine = {};
      this.deptMsg = {};
      this.rows = row;
      this.learnVisible = true;
      this.getUnitByName();
    },
    //地区报警处理率
    async getUnitByName() {
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getUnitByName({
          deptName: this.rows.fullName,
        })
      );
      if (data) {
        this.deptMsg = data;
        this.getStudentInfoList();
      } else {
        this.$message.error(err);
      }
    },
    // 请求数据判断
    getDate(page) {
      console.log(page);
      this.getStudentInfoList(page);
    },
    //地区报警处理率
    async getStudentInfoList(current = 1) {
      current = Number(current);
      console.log(current);
      this.msgloading = true;
      let datas = {
        ...this.formLine,
        courseId: this.rows.id,
        current: current,
        size: this.pagesizeactive,
        unitId: this.deptMsg.id,
      };
      let [err, data] = await dataAnalysisApi.awaitWrap(dataAnalysisApi.getStudentInfoList(datas));
      this.msgloading = false;
      if (data) {
        this.tableData = data.records.map((el) => {
          if (el.sex == "1") {
            el.sex = "男";
          } else if (el.sex == "2") {
            el.sex = "女";
          } else {
            el.sex = "未知";
          }
          if (el.studyType == 1) {
            el.studyType = "远程课程";
          } else if (el.studyType == 2) {
            el.studyType = "现场课程";
          } else if (el.studyType == 3) {
            el.studyType = "现场直播";
          } else if (el.studyType == 4) {
            el.studyType = "远程直播";
          }
          // 进度
          el.progress = isNaN(Number(el.studyDuration) / Number(el.duration))
            ? "0%"
            : ((Number(el.studyDuration) / Number(el.duration)).toFixed(2) * 100).toFixed(2);
          el.progress = el.progress > 100 ? "100%" : el.progress == 0.0 ? "0%" : el.progress + "%";
          // 状态
          if (Number(el.studyDuration) >= Number(el.duration)) {
            el.status = "完成";
          } else {
            el.status = "未完成";
          }
          el.duration = this.countDown(el.duration);
          el.studyDuration = el.studyDuration == 0 ? 0 + "秒" : this.countDown(el.studyDuration);
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
    // 时间戳转换
    countDown(inputTime) {
      //得到小时 格式化成前缀加零的样式
      let h = parseInt((inputTime / 60 / 60) % 24);
      h = h < 10 ? "0" + h : h;
      //得到分钟 格式化成前缀加零的样式
      let m = parseInt((inputTime / 60) % 60);
      m = m < 10 ? "0" + m : m;
      //得到秒 格式化成前缀加零的样式
      let s = parseInt(inputTime % 60);
      s = s < 10 ? "0" + s : s;
      if (h == "00") {
        return `${m}分${s}秒`;
      } else {
        return `${h}时${m}分${s}秒`;
      }
    },
  },
};
</script>

<style lang="scss">
.learns {
  .el-dialog {
    width: 100%;
    height: 80%;
    background-image: url("~@/assets/img/bg_14.png");
    background-size: 100% 100%;
    background-color: transparent;
    .el-dialog__title {
      color: #ffffff;
      font-weight: bold;
    }
    .el-dialog__body {
      padding: 10px 20px;
      height: calc(100% - 140px);
    }
    .search {
      display: flex;
      .el-form-item {
        display: flex;
        align-items: center;
      }
      .el-form-item__label {
        color: #01f8ff;
      }
      .inputW {
        width: 8.7143rem;
      }
      input {
        background: #112e4d;
        border-color: #004b77;
        color: #ffffff;
        // height: 2.8571rem;
        font-size: 1rem;
        &:focus {
          border-color: #00d2ff;
        }
      }
      .el-form-item--mini.el-form-item {
        margin-bottom: 0.8rem;
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
