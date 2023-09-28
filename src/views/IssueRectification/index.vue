<style lang="scss" scoped>
.operate {
  color: #4bb7e0;
  border: none;
  background: none;
}
.main {
  background: #0b122e;
  padding: 20px;
  box-sizing: border-box;
  height: 100%;
  .search_iss {
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
.search_iss {
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
  display: flex;
  align-items: center;
  /* .el-input__inner{
    padding:0 10px;
  } */
  .el-input-group__append {
    border: none;
    background: #315780;
  }
}
.tablePopper {
  max-width: 400px;
}
.search_iss {
  .el-form-item {
    .el-input {
      width: 6vw;
    }
    .el-date-editor.el-input {
      width: 6.4vw;
    }
    .el-select {
      .el-input {
        width: 4vw;
      }
    }
  }
}
</style>
<template>
  <div class="main">
    <el-form :inline="true" size="mini" :model="form" class="search_iss">
      <el-form-item label="标题:">
        <el-input
          v-model="form.biaoti"
          placeholder="请输入标题"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item class="ztime" label="限期整改时间:">
        <el-date-picker
          class="time"
          size="mini"
          v-model="form.beginDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
        <span>-</span>
        <el-date-picker
          class="time"
          size="mini"
          v-model="form.endDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="通知时间：">
        <el-date-picker
          class="time"
          size="mini"
          v-model="form.createBeginTime"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
        <span>-</span>
        <el-date-picker
          class="time"
          size="mini"
          v-model="form.createEndTime"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="运输企业:">
        <el-input
          v-model="form.yunshuqiye"
          placeholder="请输入企业"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="审核状态:">
        <!-- <el-input
          v-model="form.shenhezhuangtai"
          placeholder="请输入状态"
          clearable
        ></el-input> -->
        <el-select
          @change="changeSelect"
          v-model="form.shenhezhuangtai"
          placeholder="请选择审核状态"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          class="sbtn"
          icon="el-icon-search"
          @click="getdata(1)"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="sbtn"
          icon="el-icon-plus"
          @click="newAdd"
          >新增</el-button
        >
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
      :cell-style="{ 'text-align': 'center' }"
      :header-cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column
        size="mini"
        prop="zhutimingcheng"
        type="index"
        label="序号"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="title"
        label="标题"
      ></el-table-column>
      <el-table-column
        prop="deptName"
        show-overflow-tooltip
        label="整改对象"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        show-overflow-tooltip
        label="通知时间"
      ></el-table-column>
      <el-table-column
        prop="rectificationTime"
        label="限期整改日期"
      ></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="existingProblem" label="整改要求">
      </el-table-column>
      <el-table-column label="下发企业数/已读企业数/未读企业数">
        <template slot-scope="{ row }">
          <span>{{ row.count }}/{{ row.ydcount }}/{{ row.wdcount }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="fasongdanwei" label="操作">
        <template slot-scope="{ row }">
          <el-button size="mini" @click="examine(row)" class="operate">
            查看
          </el-button>
          <el-button
            size="mini"
            v-if="row.status == '待审核' && row.ydcount !== 0"
            @click="audit(row)"
            class="operate"
          >
            审核
          </el-button>
        </template>
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
  </div>
</template>

<script>
import operationGroup from "@/components/0perationGroup/index";
import governmentApi from "@/api/modules/government";
import { mapGetters, mapMutations } from "vuex";
import { SET_DEPTS } from "@/store/mutation-types";
import { format } from "@/config/date";
import dayjs from "dayjs";
export default {
  components: {
    "operation-group": operationGroup,
  },
  data() {
    return {
      types: 2,
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
          // refresh: true,
        },
      }, // 操作按钮配置
      options: [
        {
          value: "",
          label: "全部",
        },
        {
          value: 0,
          label: "待处理",
        },
        {
          value: 1,
          label: "待审核",
        },
        {
          value: 2,
          label: "审核通过",
        },
        {
          value: 3,
          label: "审核未通过",
        },
      ],
      form: {
        biaoti: "",
        riqishijian: dayjs().format("YYYY-MM-DD"),
        yunshuqiye: "",
        shenhezhuangtai: "",
        tongzhishijian: dayjs().format("YYYY-MM-DD"),

        beginDate: dayjs(this.chooseMonth)
          .startOf("month")
          .format("YYYY-MM-DD"), //限期整改时间
        endDate: dayjs().format("YYYY-MM-DD"),
        createBeginTime: "", //通知时间
        createEndTime: "",
      }, // 搜索参数
      defaultdDate: "",
      // expireTimeOption: {
      //   disabledDate(date) {
      //     return date.getTime() <= Date.now() - 1000 * 60 * 60 * 24;
      //   },
      // }, //时间范围限制
    };
  },
  mounted() {
    // 获取获取送达企业列表
    this.getQiYe();
    // 获取数据
    this.getdata();
  },
  created() {
    // this.form.riqishijian = this.$route.query.date
    //   ? this.$route.query.date
    //   : dayjs().format("YYYY-MM-DD");
    this.form.beginDate = this.$route.query.beginDate
      ? this.$route.query.beginDate
      : dayjs(this.chooseMonth).startOf("month").format("YYYY-MM-DD");

    this.form.endDate = this.$route.query.endDate
      ? this.$route.query.endDate
      : dayjs().format("YYYY-MM-DD");

    this.form.createBeginTime = this.$route.query.createBeginTime
      ? this.$route.query.createBeginTime
      : "";

    this.form.createEndTime = this.$route.query.createEndTime
      ? this.$route.query.createEndTime
      : "";
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
        governmentApi.getAnquanhuiyiPage({
          current: current,
          size: this.pagesizeactive,
          deptId: this.zhuzzhiId,
          title: this.form.biaoti,
          date: this.form.riqishijian,
          deptName: this.form.yunshuqiye,
          status: this.form.shenhezhuangtai,
          beginDate: this.form.beginDate, //限期整改时间
          endDate: this.form.endDate,
          createBeginTime: this.form.createBeginTime, //通知时间
          createEndTime: this.form.createEndTime,
        })
      );
      this.loading = false;
      if (data) {
        this.recordsList = data.records.map((el) => {
          if (el.status == 0) {
            el.status = "待处理";
          } else if (el.status == 1) {
            el.status = "待审核";
          } else if (el.status == 2) {
            el.status = "审核通过";
          } else if (el.status == 3) {
            el.status = "审核未通过";
          }
          return el;
        });
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
    // 选择审核状态
    changeSelect(value) {
      this.form.shenhezhuangtai = value;
    },
    // 新增
    newAdd() {
      this.$router.push({
        path: "/addIssueRectification",
        query: {
          type: "add",
          returnUrl: "/issueRectification",
        },
      });
    },
    // 查看
    examine(row) {
      this.$router.push({
        path: "/addIssueRectification",
        query: {
          id: row.id,
          btnType: 1,
          status: row.status,
          // date: this.form.riqishijian,
          beginDate: this.form.beginDate, //限期整改时间
          endDate: this.form.endDate,
          createBeginTime: this.form.createBeginTime, //通知时间
          createEndTime: this.form.createEndTime,
          returnUrl: "/issueRectification",
        },
      });
    },
    // 审核
    audit(row) {
      this.$router.push({
        path: "/audit",
        query: {
          id: row.id,
          // date: this.form.riqishijian,
          beginDate: this.form.beginDate, //限期整改时间
          endDate: this.form.endDate,
          createBeginTime: this.form.createBeginTime, //通知时间
          createEndTime: this.form.createEndTime,
          returnUrl: "/issueRectification",
        },
      });
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
            songdadanweiid: "",
            zhutimingcheng: "",
          };
          this.getdata();
          break;
        case "add":
          this.$router.push({
            path: "/addIssueRectification",
            query: {
              type: "add",
              returnUrl: "/issueRectification",
            },
          });
          break;
        default:
          break;
      }
    },
    changePage(type, row) {
      this.$router.push({
        path: "/addIssueRectification",
        query: {
          type: type,
          id: row.id,
          returnUrl: "/issueRectification",
        },
      });
    },
    ...mapMutations({
      SET_DEPTS: "government/SET_DEPTS",
    }),
  },
};
</script>
