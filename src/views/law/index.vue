<style lang="scss" scoped>
.enterprise {
  width: 100%;
  height: 100vh;
  background: #0b122e;
  .main {
    height: calc(100vh - 7rem);
    display: flex;
    padding: 0 10px 10px 10px;
    box-sizing: border-box;
    .main-r {
      margin-left: 1.0714rem;
      //   width: calc(100% - 24rem);
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
      <!-- <statistics-aside></statistics-aside> -->
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
          ><el-form-item label="标题">
            <el-input
              v-model="form.biaoti"
              placeholder="请输入标题"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="文号">
            <el-input
              v-model="form.wenhao"
              placeholder="请输入文号"
              clearable
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="发布日期">
            <el-date-picker
              v-model="form.begintime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择发布日期"
            ></el-date-picker>
          </el-form-item> -->
          <el-form-item label="分类">
            <el-select
              v-model="form.biaoqianType"
              placeholder="请选择分类"
              clearable
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item, index) in lawTypeList"
                :key="index"
              ></el-option>
            </el-select>
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
          <el-table-column
            label="文件名"
            prop="name"
            min-width="100"
            :show-overflow-tooltip="true"
            align="center"
          >
            <template scope="scope">
              <span
                style="color: #01f8ff; cursor: pointer"
                @click="detailView(scope.row)"
                >{{ scope.row.name }}</span
              >
            </template> </el-table-column
          ><el-table-column
            label="文号"
            prop="number"
            :show-overflow-tooltip="true"
            align="center"
          ></el-table-column>
          <el-table-column
            label="发布机关"
            prop="authority"
            :show-overflow-tooltip="true"
            align="center"
          ></el-table-column>
          <el-table-column
            label="分类"
            prop="type"
            align="center"
          ></el-table-column>
          <el-table-column
            label="发布日期"
            prop="releaseDate"
            align="center"
          ></el-table-column>
          <el-table-column
            label="实施日期"
            prop="materialDate"
            align="center"
          ></el-table-column>
          <el-table-column
            label="文件状态"
            prop="status"
            align="center"
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
import dataAnalysisApi from "@/api/modules/report";
import dataApi from "@/api/modules/government";
import { mapGetters } from "vuex";
import { format } from "@/config/date";
import { export_json_to_excel } from "@/config/Export2Excel";
export default {
  components: {
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
        // begintime: format(new Date().getTime(), "YYYY-MM-DD"),
        begintime: "2000-01-01",
        wenhao: "",
        biaoti: "",
        biaoqianType: "",
      },
      enterpriseList: [],
      lawTypeList: [],
      policyTypeList: [],
    };
  },
  created() {
    this.getPolicyType();
    this.getLawype();
    this.getlawList();
  },
  computed: {
    ...mapGetters({
      xuanzhongchengshi: "government/xuanzhongchengshi",
      userinfo: "userinfo",
    }),
  },
  watch: {},
  methods: {
    refresh() {
      this.form = {
        begintime: "2000-01-01",
      };
      this.getDate(1);
    },
    // 请求数据判断
    getDate(page) {
      this.getlawList(page);
    },
    //地区报警处理率
    async getlawList(current = 1) {
      current = Number(current);
      this.loading = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getlawList({
          current: current,
          size: this.pagesizeactive,
          releaseDate: this.form.begintime,
          name: this.form.biaoti,
          type: this.form.biaoqianType,
          number: this.form.wenhao,
        })
      );
      this.loading = false;
      if (data) {
        this.enterpriseList = data.records.map((el) => {
          let types = this.lawTypeList.find((val) => val.value == el.type);
          if (types) el.type = types.label;
          let status = this.policyTypeList.find(
            (val) => val.value == el.status
          );
          if (status) el.status = status.label;
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
    // 获取字典
    async getPolicyType() {
      let [err, data] = await dataApi.awaitWrap(
        dataApi.getByCode({ code: "lawstatus" })
      );
      if (data) {
        this.policyTypeList = data;
      }
    },
    // 获取字典
    async getLawype() {
      let [err, data] = await dataApi.awaitWrap(
        dataApi.getByCode({ code: "lawtype" })
      );
      if (data) {
        this.lawTypeList = data;
      }
    },
    // 文件预览
    async detailView(item) {
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getlawDetail({ Id: item.id })
      );
      if (data) {
        if (data.filePdfUrl) {
          window.open(this.userinfo.urlPrefix + data.filePdfUrl, "_blank");
        } else {
          this.$message.error("文件打开失败");
        }
      }
    },
    // 统计下载
    async downtable() {
      this.downloading = true;
      let req, url;
      url = "getlawList";
      req = {};
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi[url]({
          ...req,
          current: 0,
          size: 0,
          releaseDate: this.form.begintime,
          name: this.form.biaoti,
          type: this.form.biaoqianType,
          number: this.form.wenhao,
        })
      );
      this.downloading = false;
      if (data) {
        data = data.records.map((el, index) => {
          let types = this.lawTypeList.find((val) => val.value == el.type);
          el.type = types.label;
          let status = this.policyTypeList.find(
            (val) => val.value == el.status
          );
          el.status = status.label;
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
          "文件名",
          "文号",
          "发布机关",
          "分类",
          "发布日期",
          "实施日期",
          "文件状态",
        ];
        filterVal = [
          "name",
          "number",
          "authority",
          "type",
          "releaseDate",
          "materialDate",
          "status",
        ];
        merges = [
          "A1:A2",
          "B1:B2",
          "C1:C2",
          "D1:D2",
          "E1:E2",
          "F1:F2",
          "G1:G2",
        ];
        filename = "法律法规";
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
