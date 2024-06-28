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
      <el-button @click="changeSearch" size="mini" class="btn" icon="el-icon-search"
        >查询</el-button
      >
      <el-button @click="refresh" size="mini" class="btn" icon="el-icon-refresh">
        刷新
      </el-button>
    </div>
    <!-- 查询 -->
    <el-form v-show="searchshow" :inline="true" size="mini" :model="form" class="search">
      <el-form-item label="企业名称">
        <el-input
          v-model="form.unitName"
          size="small"
          placeholder="请输入企业名称"
          style="width: 140px"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="课程名称">
        <el-input
          v-model="form.courseName"
          size="small"
          placeholder="请输入课程名称"
          style="width: 140px"
          clearable
        ></el-input>
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
      <el-table-column type="index" label="序号" width="50" align="center">
        <template scope="scope">
          <span>{{ (current - 1) * pagesizeactive + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="fullName"
        label="企业名称"
        align="center"
        width="230"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="courseName"
        label="课程名称"
        align="center"
        width="230"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="studyMonth"
        label="学习月份"
        align="center"
        width="90"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="duration"
        label="应学课时"
        align="center"
        width="120"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span> {{ countDown(scope.row.duration) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="finishStudyCount" label="完成人数" align="center"> </el-table-column>
      <el-table-column prop="inStudyNumber" label="在学人数" align="center"> </el-table-column>
      <el-table-column prop="shouldLearnNumber" label="应学人数" align="center"> </el-table-column>
      <el-table-column prop="weikaishi" label="未开始人数" align="center" width="110">
        <template slot-scope="scope">
          <span> {{ scope.row.shouldLearnNumber - scope.row.inStudyNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="unfinishedNumber" label="未完成人数" align="center" width="110">
        <template slot-scope="scope">
          <span> {{ scope.row.shouldLearnNumber - scope.row.finishStudyCount }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="finishExamCount" label="已完成考试人数" align="center" width="150">
      </el-table-column>
      <el-table-column prop="score" label="是否考试" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.score > 0 ? "考试" : "不考试" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="80" fixed="right">
        <template slot-scope="{ row }">
          <el-button size="mini" style="color: #00c8f5" type="text" @click="showDetail(row)">
            学员
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
    <student ref="student"></student>
  </div>
</template>

<script>
import dataAnalysisApi from "@/api/modules/examine";
import { mapGetters } from "vuex";
import { format } from "@/config/date";
import { export_json_to_excel } from "@/config/Export2Excel";
import student from "./student.vue";
export default {
  components: { student },
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
      form: {},
      enterpriseList: [],
      zhengfuId: "", //地区id
      vehiclemsgList: {},
    };
  },
  created() {
    this.getDeptDayTJ();
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
      this.form = {};
      this.getDate(1);
    },
    // 请求数据判断
    getDate(page) {
      this.getDeptDayTJ(page);
    },
    //地区报警处理率
    async getDeptDayTJ(current = 1) {
      current = Number(current);
      this.loading = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getZFCourseInfoList({
          deptId: this.zhuzzhiId,
          current: current,
          size: this.pagesizeactive,
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
    // 显示学员
    showDetail(row) {
      this.$refs.student.open(row);
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
