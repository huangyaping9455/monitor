<template>
  <el-dialog
    title="详情"
    class="learns"
    center
    top="10vh"
    :show-close="false"
    :close-on-click-modal="false"
    :visible.sync="hidVisible"
    width="70%"
  >
    <el-table
      class="learnTable"
      :data="tableDataMsg"
      border
      height="500"
      v-loading="msgloading"
      element-loading-background="rgba(0, 0, 0, 0.4)"
    >
      <el-table-column
        prop="dengji"
        label="风险等级"
        width="90"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="yujingfenlei"
        label="预警分类"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="yujingxiang"
        label="预警项"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="shuoming"
        label="说明"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
    </el-table>
    <div slot="footer">
      <el-button class="topbtn" size="mini" @click="hidVisible = false">
        取 消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import dataAnalysisApi from "@/api/modules/report";
export default {
  data() {
    return {
      hidVisible: false,
      msgloading: false,
      total: 0, //消息总数
      current: 1, //当前页数
      pageTotal: 1, //总页数
      pagesize: [10, 20, 30, 50, 100], //每页显示列表
      pagesizeactive: 20, //当前每页显示
      tableDataMsg: [],
      rows: {},
    };
  },
  computed: {},
  watch: {},
  methods: {
    //地区报警处理率
    async getRiskListByType(index) {
      this.msgloading = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getRiskListByType({
          deptId: this.rows.deptId,
          tongjiriqi: this.rows.tongjiriqi,
          type: index,
        })
      );
      this.msgloading = false;
      if (data) {
        this.tableDataMsg = data.map((el) => {
          el.dengji = index + "级";
          return el;
        });
      } else {
        this.$message.error(err);
      }
    },
  },
};
</script>

<style lang="scss">
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
    .learnTable {
      width: 100%;
      background: #0f1f40;
      border: 0.0714rem solid #0a3774;
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
