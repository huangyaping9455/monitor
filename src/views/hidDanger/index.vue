<template>
  <div class="hide">
    <div class="hide-top">
      <div :class="['car-item', { boxsd1: hideType == 0 }]" @click="hideTypeClick('')">
        <img src="@/assets/img/hide/icon1.png" alt="" srcset="" />
        <div>
          <span>隐患分值</span>
          <span>{{ listCount.num }}</span>
        </div>
      </div>
      <div :class="['car-item', { boxsd2: hideType == 1 }]" @click="hideTypeClick(1)">
        <img src="@/assets/img/hide/icon2.png" alt="" srcset="" />
        <div>
          <span>人的不安全行为</span>
          <span>{{ listCount.num1 }}</span>
        </div>
      </div>
      <div :class="['car-item', { boxsd3: hideType == 2 }]" @click="hideTypeClick(2)">
        <img src="@/assets/img/hide/icon3.png" alt="" srcset="" />
        <div>
          <span>物的不安全状态</span>
          <span>{{ listCount.num2 }}</span>
        </div>
      </div>
      <div :class="['car-item', { boxsd5: hideType == 5 }]" @click="hideTypeClick(5)">
        <img src="@/assets/img/hide/icon5.png" alt="" srcset="" />
        <div>
          <span>环境的不安全因素</span>
          <span>{{ listCount.num3 }}</span>
        </div>
      </div>
      <div :class="['car-item', { boxsd4: hideType == 3 }]" @click="hideTypeClick(3)">
        <img src="@/assets/img/hide/icon4.png" alt="" srcset="" />
        <div>
          <span>管理缺陷</span>
          <span>{{ listCount.num4 }}</span>
        </div>
      </div>
    </div>
    <el-form :inline="true" size="mini" class="hide-search">
      <el-form-item label="公司名称">
        <el-input size="small" v-model="deptName" placeholder="请输入公司名称" clearable></el-input>
      </el-form-item>
      <!-- <el-form-item label="时间">
        <div style="display: flex; align-items: center">
          <el-date-picker
            style="width: 90%"
            type="date"
            placeholder="开始日期"
            v-model="begintime"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <span style="color: #fff; margin: 0 5px"> - </span>
          <el-date-picker
            style="width: 90%"
            type="date"
            placeholder="结束日期"
            value-format="yyyy-MM-dd"
            v-model="endtime"
          ></el-date-picker>
        </div>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" class="sbtn" @click="getDate(1)">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      class="hideTable"
      :data="tableData"
      border
      v-loading="msgloading"
      element-loading-background="rgba(0, 0, 0, 0.4)"
      :height="tableListH"
      @sort-change="changeSort"
    >
      <el-table-column prop="deptName" label="公司名称" show-overflow-tooltip align="center">
      </el-table-column>
      <!-- <el-table-column
        label="行管名称"
        prop="zhengfuname"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column> -->
      <el-table-column label="隐患分类" prop="typeShow" show-overflow-tooltip align="center">
      </el-table-column>
      <!-- <el-table-column
        label="隐患类型"
        prop="tixingleixing"
        show-overflow-tooltip
        align="center"
        :width="100"
      >
      </el-table-column> -->
      <!-- <el-table-column
        label="严重程度"
        prop="statusShow"
        show-overflow-tooltip
        align="center"
        :width="100"
      >
      </el-table-column> -->
      <!-- <el-table-column
        label="隐患详情"
        prop="tixingxiangqing"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="统计日期"
        prop="tongjiriqi"
        show-overflow-tooltip
        align="center"
        :width="160"
        sortable
      >
      </el-table-column> -->
      <el-table-column
        label="已消除隐患项分值"
        prop="finshcountscore"
        show-overflow-tooltip
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column
        label="剩余隐患项分值"
        prop="countscore"
        show-overflow-tooltip
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="counts"
        label="剩余隐患数量"
        show-overflow-tooltip
        align="center"
        sortable
      >
        <template slot-scope="{ row }">
          <span v-if="row.counts > 0" class="spancolor" @click="hidView(row)">
            {{ row.counts }}
          </span>
          <span v-else>{{ row.counts }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="整改率"
        prop="finshRate"
        show-overflow-tooltip
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column label="操作" align="center" width="110">
        <template slot-scope="{ row }">
          <el-button size="mini" type="primary" @click="sendZG(row)">
            催办
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
    <hideview ref="hidev"></hideview>
  </div>
</template>

<script>
import dataAnalysisApi from "@/api/modules/report";
import { mapGetters } from "vuex";
import hideview from "./view";
import standardApi from "@/api/modules/standard";
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
      tableListH: "calc(100vh - 23.8828rem)",
      tableData: [],
      listCount: [],
      zhengfuId: this.$store.state.userinfo.deptId,
      deptName: "",
      begintime: "",
      endtime: "",
      hideDangerTypeList: [],
      hideType: "",
      orderColumns: "", //排序字段
      order: "", //正序/倒序
    };
  },
  created() {
    this.getHideDangerType();
    this.getTroublelistCount();
    this.getTroubleList();
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
        this.getTroublelistCount();
      }
    },
  },
  methods: {
    // 请求数据判断
    getDate(page) {
      this.getTroubleList(page);
    },
    //地区报警处理率
    async getTroubleList(current = 1) {
      current = Number(current);
      this.msgloading = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getZFYHFLPageList({
          current: current,
          size: this.pagesizeactive,
          deptId: this.zhengfuId,
          deptName: this.deptName,
          type: this.hideType,
          orderColumn: this.orderColumns,
          orderColumns: this.orderColumns,
          order: this.order,
        })
      );
      this.msgloading = false;
      if (data) {
        this.tableData = data.records.map((el) => {
          if (this.hideDangerTypeList.length > 0) {
            el.typeShow = this.hideDangerTypeList[el.type - 1].label;
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
    //排序
    changeSort(val) {
      this.order = val.order == "descending" ? 1 : 0;
      this.orderColumns = val.prop;
      this.getTroubleList(1);
    },
    //获取整改数
    async getTroublelistCount() {
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getTroubleCountNum(this.zhengfuId)
      );
      if (data) {
        let zongshu = 0;
        let finish = 0;
        let num1 = 0;
        let num2 = 0;
        let num3 = 0;
        let num4 = 0;
        this.listCount = {};
        data.map((el) => {
          if (el.type == 1) {
            num1 += el.countscore - el.finshcountscore;
          }
          if (el.type == 2) {
            num2 += el.countscore - el.finshcountscore;
          }
          if (el.type == 4) {
            num3 += el.countscore - el.finshcountscore;
          }
          if (el.type == 3) {
            num4 += el.countscore - el.finshcountscore;
          }
          zongshu += el.countscore;
          finish += el.finshcountscore;
        });
        this.listCount = {
          num: zongshu - finish,
          num1: num1,
          num2: num2,
          num3: num3,
          num4: num4,
        };
      } else {
        this.$message.error(err);
      }
    },
    // 隐患明细
    hidView(row, index) {
      this.$refs.hidev.troubleMc = "";
      this.$refs.hidev.troubleLy = "";
      this.$refs.hidev.troubleYhms = "";
      this.$refs.hidev.rows = row;
      this.$refs.hidev.troubleDJ = index;
      this.$refs.hidev.getTroubleSetList();
      this.$refs.hidev.hidVisible = true;
    },
    // 隐患类别
    async getHideDangerType() {
      let [err, data] = await standardApi.awaitWrap(standardApi.getDicData("hideDangerType"));
      if (data) {
        this.hideDangerTypeList = data;
      }
    },
    // 下发整改
    sendZG(row) {
      this.$router.push({
        path: "/addIssueRectification",
        query: {
          type: "add",
          returnUrl: "/hidDanger",
          comId: row.deptId,
        },
      });
    },
    // 图标切换
    hideTypeClick(index) {
      this.hideType = index;
      this.getDate(1);
    },
  },
};
</script>
<style lang="scss" scoped>
.hide {
  .hide-top {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    height: 10.7143rem;
    .car-item {
      width: 19.3%;
      height: 100%;
      border-radius: 0.7143rem;
      box-sizing: border-box;
      padding: 2.4286rem;
      color: #ffffff;
      font-size: 1.1429rem;
      overflow: hidden;
      position: relative;
      display: flex;
      background-size: 100% 100%;
      span:last-of-type {
        display: block;
        font-size: 2.8571rem;
        font-weight: bold;
      }
      &:nth-of-type(1) {
        background-image: url("~@/assets/img/hide/check1.png");
      }
      &:nth-of-type(2) {
        background-image: url("~@/assets/img/hide/check2.png");
      }
      &:nth-of-type(3) {
        background-image: url("~@/assets/img/hide/check3.png");
      }
      &:nth-of-type(5) {
        background-image: url("~@/assets/img/hide/check4.png");
      }
      &:nth-of-type(4) {
        background-image: url("~@/assets/img/hide/check5.png");
      }
      img {
        width: 38px;
        height: 38px;
        margin-right: 20px;
      }
    }
    .boxsd1 {
      background-image: url("~@/assets/img/hide/isCheck1.png") !important;
    }
    .boxsd2 {
      background-image: url("~@/assets/img/hide/isCheck2.png") !important;
    }
    .boxsd3 {
      background-image: url("~@/assets/img/hide/isCheck3.png") !important;
    }
    .boxsd4 {
      background-image: url("~@/assets/img/hide/isCheck4.png") !important;
    }
    .boxsd5 {
      background-image: url("~@/assets/img/hide/isCheck5.png") !important;
    }
  }
  .hide-search {
    margin-top: 10px;
    display: flex;
    align-items: center;
    ::v-deep.el-form-item__label {
      color: #01f8ff;
    }
    ::v-deep input {
      background: #112e4d;
      border-color: #004b77;
      color: #ffffff;
      // height: 2.8571rem;
      // font-size: 1rem;
      &:focus {
        border-color: #00d2ff;
      }
    }
    ::v-deep.el-form-item--mini.el-form-item {
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
