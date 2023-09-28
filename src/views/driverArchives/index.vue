<style lang="scss" scoped>
.enterprise {
  height: 90vh;
  background: #0b122e;
  .main {
    height: calc(100vh - 7rem);
    display: flex;
    padding: 0 10px 10px 10px;
    box-sizing: border-box;
    .main-r {
      //   margin-left: 1.0714rem;
      width: calc(100%);
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
  <div class="enterprise">
    <div class="main">
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
            @click="downLoadList"
            class="btn"
          >
            <svg-icon class="icon" v-show="!downloading" icon-class="down" />
            下载
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
              class="inputW"
            ></el-input>
          </el-form-item>
          <el-form-item label="驾驶员姓名">
            <el-input
              v-model="form.jiashiyuanxingming"
              placeholder="请输入驾驶员姓名"
              clearable
              class="inputW"
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
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            :align="item.align"
            :show-overflow-tooltip="true"
            :width="item.width"
            v-for="(item, index) in formItemList"
            :key="index"
          >
          </el-table-column>
          <el-table-column label="操作" align="center" width="80" fixed="right">
            <template slot-scope="{ row }">
              <el-button
                size="mini"
                style="color: #00c8f5"
                type="text"
                @click="viewShow(row)"
                >详情</el-button
              >
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
        <view-detail
          ref="viewShow"
          :vehiclemsgList="vehiclemsgList"
        ></view-detail>
      </div>
    </div>
  </div>
</template>

<script>
import dataAnalysisApi from "@/api/modules/report";
import { mapGetters } from "vuex";
import { format } from "@/config/date";
import { driverList } from "@/config/vehicleList";
import viewDetail from "./viewDetail.vue";
import { export_json_to_excel } from "@/config/Export2Excel";
export default {
  components: { viewDetail },
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
        deptName: "",
        jiashiyuanxingming: "",
      },
      enterpriseList: [],
      zhengfuId: "", //地区id
      vehiclemsgList: {},
      downloading: false,
    };
  },
  created() {
    if (this.$route.query.deptName) {
      this.form.deptName = this.$route.query.deptName;
    }
    this.selectZFPersonLearnInfoAll();
  },
  computed: {
    ...mapGetters({
      zhuzzhiId: "government/fasongdanwei",
      xuanzhongchengshi: "government/xuanzhongchengshi",
    }),
    formItemList() {
      let List = [];
      driverList().map((el) => {
        if (el.hide == undefined || el.hide == false) {
          List.push(el);
        }
      });
      let b = 0; //设置用来调换位置的值
      let a = List; //冒泡排序
      for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - i; j++) {
          if (a[j + 1] != undefined) {
            if (a[j].sort > a[j + 1].sort) {
              b = a[j];
              a[j] = a[j + 1];
              a[j + 1] = b;
            }
          }
        }
      }
      return a;
    },
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
        deptName: "",
        jiashiyuanxingming: "",
      };
      this.getDate(1);
    },
    // 请求数据判断
    getDate(page) {
      this.selectZFPersonLearnInfoAll(page);
    },
    //地区报警处理率
    async selectZFPersonLearnInfoAll(current = 1) {
      current = Number(current);
      this.loading = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getZFJSYPageList({
          deptId: this.zhuzzhiId,
          current: current,
          size: this.pagesizeactive,
          ...this.form,
        })
      );
      this.loading = false;
      if (data) {
        this.enterpriseList = data.records.map((i, index) => {
          if (i.xingbie == "2") {
            i.xingbie = "女";
          } else if (i.xingbie == "1") {
            i.xingbie = "男";
          } else {
            i.xingbie = i.xingbie;
          }
          if (i.congyeleibie == "0") {
            i.congyeleibie = "经营性道路旅客运输驾驶员";
          } else if (i.congyeleibie == "1") {
            i.congyeleibie = "经营性道路货物运输驾驶员";
          } else if (i.congyeleibie == "2") {
            i.congyeleibie = "危险货物运输驾驶员";
          } else if (i.congyeleibie == "3") {
            i.congyeleibie = "道路危险货物运输押运员";
          } else if (i.congyeleibie == "4") {
            i.congyeleibie = "道路危险货物运输装卸管理人员";
          } else {
            i.congyeleibie = i.congyeleibie;
          }
          if (i.shenfenzhenghao) {
            i.shenfenzhenghao = i.shenfenzhenghao.replace(
              /^(.{6})(?:\d+)(.{4})$/,
              "$1****$2"
            );
          }
          return i;
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
    // 查看详情
    viewShow(item) {
      this.vehiclemsgList = item;
      this.$refs.viewShow.vehicleVisible = true;
    },
    // 下载
    async downLoadList() {
      this.downloading = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getZFJSYPageList({
          deptId: this.zhuzzhiId,
          current: 0,
          size: 0,
          ...this.form,
        })
      );
      this.downloading = false;
      if (data) {
        data = data.records.map((el) => {
          if (el.xingbie == "2") {
            el.xingbie = "女";
          } else if (el.xingbie == "1") {
            el.xingbie = "男";
          } else {
            el.xingbie = el.xingbie;
          }
          if (el.congyeleibie == "0") {
            el.congyeleibie = "经营性道路旅客运输驾驶员";
          } else if (el.congyeleibie == "1") {
            el.congyeleibie = "经营性道路货物运输驾驶员";
          } else if (el.congyeleibie == "2") {
            el.congyeleibie = "危险货物运输驾驶员";
          } else if (el.congyeleibie == "3") {
            el.congyeleibie = "道路危险货物运输押运员";
          } else if (el.congyeleibie == "4") {
            el.congyeleibie = "道路危险货物运输装卸管理人员";
          } else {
            el.congyeleibie = el.congyeleibie;
          }
          if (el.shenfenzhenghao) {
            el.shenfenzhenghao = el.shenfenzhenghao.replace(
              /^(.{6})(?:\d+)(.{4})$/,
              "$1****$2"
            );
          }
          return {
            ...el,
          };
        });
        this.export2Excel(data);
      } else {
        this.$message.error(err);
      }
    }, //处理下载数据
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    export2Excel(list) {
      require.ensure([], () => {
        const tHeader = [
          "企业名称",
          "驾驶员姓名",
          "性别",
          "身份证号",
          "手机号码",
          "发证机关",
          "从业资格证号",
          "备注",
        ];
        const filterVal = [
          "deptName",
          "jiashiyuanxingming",
          "xingbie",
          "shenfenzhenghao",
          "shoujihaoma",
          "fazhengjiguan",
          "congyezigezheng",
          "beizhu",
        ];
        const data = this.formatJson(filterVal, list);
        export_json_to_excel({ header: tHeader, data, filename: "驾驶员档案" });
      });
    },
  },
};
</script>
