<style lang="scss" scoped>
.main {
  background: #0b122e;
  padding: 20px;
  box-sizing: border-box;
  height: 100%;
  .search {
    color: #ffffff;
    .sbtn {
      height: 2.1429rem;
      background: #315780;
      border: none;
      color: #d3d4d6;
    }
  }
  .mainTable {
    background: transparent;
    border: 1px solid #58626e;
    box-sizing: border-box;
    .pointbtn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      .icon {
        cursor: pointer;
      }
    }
    .songda {
      display: block;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .page {
    display: flex;
    color: #d3d4d6;
    padding: 0 10px;
    font-size: 12px;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    .page-l {
      display: flex;
      align-items: center;
      span {
        margin-right: 10px;
      }
    }
    .page-r {
      display: flex;
      align-items: center;
      span {
        cursor: pointer;
        padding: 0 2px;
        font-size: 18px;
        margin: 0 2px;
      }
      .jump {
        width: 90px;
        margin: 0 15px;
      }
      .jumpbtn {
        padding: 9px 8px 7px;
        border-color: #315780;
        background: #315780;
        color: #d3d4d6;
      }
      .pagesize {
        width: 200px;
      }
      .showselect {
        width: 90px;
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
    color: #d3d4d6;
  }
}
.mainTable {
  &.el-table--enable-row-hover .el-table__body tr:hover > td {
    background: #ffffff38;
  }
  tr {
    background: #1e2e3e;
  }
  td {
    border-right: 1px solid #58626e;
    border-bottom: 1px solid #58626e;
    color: #ffffff;
  }
  th.is-leaf {
    border-bottom: 0.5px solid #58626e;
  }
  th {
    background: #1e2e3e;
    border-right: 1px solid #58626e;
    color: #ffffff;
  }
  &::before {
    background-color: #58626e;
  }
  &::after {
    background-color: #58626e;
  }
  .el-table__body-wrapper {
    height: calc(100% - 63px);
  }
  &.el-table th.gutter {
    display: table-cell !important;
  }
}
.jump {
  .el-input__inner {
    padding: 0 10px;
  }
  .el-input-group__append {
    border: none;
    background: #315780;
  }
}
.tablePopper {
  max-width: 400px;
}
</style>

<template>
  <div class="main">
    <!-- 操作按钮 -->
    <operation-group
      :option="operationOption"
      @operationclick="operationclick"
    ></operation-group>
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
        <el-button
          type="primary"
          class="sbtn"
          icon="el-icon-search"
          @click="getdata(1)"
        ></el-button>
      </el-form-item>
    </el-form>
    <!-- main -->
    <el-table
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.4)"
      size="mini"
      class="mainTable"
      :height="mainTableH"
      border
      :data="recordsList"
    >
      <el-table-column label="查看" width="50">
        <template slot-scope="{ row }">
          <p class="pointbtn">
            <svg-icon
              @click="changePage('查看', row)"
              class="icon"
              icon-class="show"
            />
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="opCode" label="运营商code"> </el-table-column>
      <el-table-column prop="opName" label="运营商名称"> </el-table-column>
      <el-table-column label="查岗类型">
        <template slot-scope="{ row }">
          <span>{{ row.ckType == 1 ? "自动" : "手动" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ckPersonName" label="查岗人"> </el-table-column>
      <el-table-column label="响应状态">
        <template slot-scope="{ row }">
          <span>{{ row.ckResponseStatus == 1 ? "响应" : "未响应" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ckResponsePersonName" label="响应人">
      </el-table-column>
      <el-table-column prop="ckMessage" label="查岗问题"> </el-table-column>
      <el-table-column prop="ckResponseMessage" label="响应内容">
      </el-table-column>
      <el-table-column prop="ckDate" label="查岗时间" width="150">
      </el-table-column>
      <el-table-column prop="ckResponseDate" label="响应时间" width="150">
      </el-table-column>
      <el-table-column prop="ckResponseDuration" label="响应时长">
      </el-table-column>
    </el-table>
    <!-- page -->
    <div class="page">
      <div class="page-l">
        <span>总共 {{ total }} 条消息</span>
        <span>当前第 {{ current }} 页</span>
        <span>总 {{ pageTotal }} 页</span>
      </div>
      <div class="page-r">
        <span class="el-icon-d-arrow-left" @click="getdata(1)"></span>
        <span class="el-icon-arrow-left" @click="getdata(current - 1)"></span>
        <span
          class="num"
          v-show="current - 2 > 0"
          @click="getdata(current - 2)"
          >{{ current - 2 }}</span
        >
        <span
          class="num"
          v-show="current - 1 > 0"
          @click="getdata(current - 1)"
          >{{ current - 1 }}</span
        >
        <span class="num active">{{ current }}</span>
        <span
          class="num"
          v-show="current + 1 <= pageTotal"
          @click="getdata(current + 1)"
          >{{ current + 1 }}</span
        >
        <span
          class="num"
          v-show="current + 2 <= pageTotal"
          @click="getdata(current + 2)"
          >{{ current + 2 }}</span
        >
        <span class="el-icon-arrow-right" @click="getdata(current + 1)"></span>
        <span class="el-icon-d-arrow-right" @click="getdata(pageTotal)"></span>
        <el-input class="jump" v-model="jumpNum" size="mini">
          <el-button slot="append" @click="getdata(jumpNum)" class="jumpbtn"
            >跳转</el-button
          >
        </el-input>
        <div class="pagesize">
          每页显示
          <el-select
            class="showselect"
            size="mini"
            @change="getdata(1)"
            v-model="pagesizeactive"
          >
            <el-option
              v-for="item in pagesize"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          条信息
        </div>
      </div>
    </div>
    <add-safety-inspection
      ref="addsafety"
      :visible="visible"
      @close="visible = false"
      @changeclose="getdata"
    ></add-safety-inspection>
  </div>
</template>

<script>
import operationGroup from "@/components/0perationGroup/index";
import governmentApi from "@/api/modules/government";
import { mapGetters, mapMutations } from "vuex";
import { format } from "@/config/date";
import { SET_DEPTS } from "@/store/mutation-types";
import AddSafetyInspection from "./addSafetyInspection";
export default {
  components: {
    "operation-group": operationGroup,
    AddSafetyInspection,
  },
  data() {
    return {
      loading: false,
      searchshow: false, //是否展开查询
      recordsList: [], //公告列表
      mainTableH: "calc(100% - 6.0714rem)", //列表高度
      total: 0, //消息总数
      current: 1, //当前页数
      pageTotal: 1, //总页数
      pagesize: [10, 20, 30, 50, 100], //每页显示列表
      pagesizeactive: 20, //当前每页显示
      jumpNum: 1, //跳转页面
      operationOption: {
        jurisdiction: {
          search: true,
          add: true,
          refresh: true,
        },
      }, // 操作按钮配置
      form: {
        begintime: format(
          new Date().getTime() - 3600 * 1000 * 24,
          "YYYY-MM-DD"
        ),
        endtime: format(new Date().getTime(), "YYYY-MM-DD"),
      }, // 搜索参数
      visible: false,
    };
  },
  mounted() {
    // 获取获取送达企业列表
    this.getQiYe();
    // 获取数据
    this.getdata();
  },
  computed: {
    ...mapGetters({
      userinfo: "userinfo",
      depts: "government/depts",
      zhuzzhiId: "government/fasongdanwei",
    }),
  },
  watch: {
    zhuzzhiId(newid) {
      // 切换单位
      if (newid) {
        this.getdata();
      }
    },
  },
  methods: {
    // 获取数据
    async getdata(current = 1) {
      current = Number(current);
      this.loading = true;
      let [err, data] = await governmentApi.awaitWrap(
        governmentApi.getCheckPostList({
          current: current,
          size: this.pagesizeactive,
          deptId: this.zhuzzhiId,
          beginTime: this.form.begintime,
          endTime: this.form.endtime,
        })
      );
      this.loading = false;
      if (data) {
        this.recordsList = data.records;
        //分页处理
        this.jumpNum = data.current;
        this.current = data.current;
        this.total = data.total;
        this.pageTotal = data.pageTotal;
      } else {
        this.$message.error(err);
      }
    },
    // 获取获取送达企业列表
    async getQiYe() {
      let [err, data] = await governmentApi.awaitWrap(
        governmentApi.getQiYe({
          deptId: this.userinfo.deptId,
          deptName: this.userinfo.deptName,
        })
      );
      if (data) {
        this.SET_DEPTS(data);
      } else {
        this.$message.error(err);
      }
    },
    //点击操作按钮
    operationclick(type) {
      switch (type) {
        case "search":
          this.searchshow
            ? (this.mainTableH = "calc(100% - 6.0714rem)")
            : (this.mainTableH = "calc(100% - 8.7857rem)");
          this.searchshow = !this.searchshow;
          break;
        case "refresh":
          this.form = {
            begintime: format(
              new Date().getTime() - 3600 * 1000 * 24,
              "YYYY-MM-DD"
            ),
            endtime: format(new Date().getTime(), "YYYY-MM-DD"),
          };
          this.getdata();
          break;
        case "add":
          this.$refs.addsafety.init();
          this.visible = true;
          break;
        default:
          break;
      }
    },
    // 详情
    changePage(type, row) {
      this.visible = true;
      this.$refs.addsafety.getDetail(type, row);
    },
    ...mapMutations({
      SET_DEPTS: "government/SET_DEPTS",
    }),
  },
};
</script>
