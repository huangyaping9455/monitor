<template>
  <el-dialog
    title="课程详情"
    class="learns"
    center
    top="10vh"
    :show-close="false"
    :close-on-click-modal="false"
    :visible.sync="learnVisible"
    append-to-body
    width="70%"
  >
    <el-table
      :data="tableData"
      class="learnTable"
      style="width: 100%; height: 100%"
      v-loading="loading"
      border
      element-loading-background="rgba(0, 0, 0, 0.4)"
    >
      <el-table-column prop="courseName" label="课件名称" align="center">
      </el-table-column>
      <el-table-column prop="createtime" label="同步时间" align="center">
      </el-table-column>
      <el-table-column prop="readLength" label="课件时长(小时)" align="center">
      </el-table-column>
      <el-table-column
        prop="creationDate"
        label="课件学习完成时间"
        align="center"
      >
      </el-table-column>
    </el-table>
    <div slot="footer">
      <el-button class="topbtn" size="mini" @click="learnVisible = false">
        取 消
      </el-button>
    </div>
    <view-learn ref="viewlearn"></view-learn>
  </el-dialog>
</template>

<script>
import dataAnalysisApi from "@/api/modules/report";
export default {
  data() {
    return {
      learnVisible: false,
      loading: false,
      rows: {},
      tableData: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    open(row) {
      this.rows = row;
      this.tableData = [];
      this.loading = false;
      this.learnVisible = true;
      this.getCoursewareList();
    },
    //地区报警处理率
    async getCoursewareList() {
      this.loading = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.getCoursewareList({
          sn: this.rows.sn,
        })
      );
      this.loading = false;
      if (data) {
        this.tableData = data;
        this.loading = false;
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
