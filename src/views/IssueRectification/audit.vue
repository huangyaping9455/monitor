<template>
  <div class="main">
    <!-- 操作按钮 -->
    <operation-group
      :option="operationOption"
      @operationclick="operationclick"
      class="btn"
      v-if="!btnType"
    ></operation-group>
    <el-button
      icon="el-icon-search"
      size="mini"
      type="primary"
      @click="plPass"
      class="btn"
      v-if="!btnType"
      :disabled="isDisable"
      >批量通过</el-button
    >
    <el-table
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.4)"
      size="mini"
      class="mainTable"
      border
      :data="form"
      :cell-style="{ 'text-align': 'center' }"
      :header-cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column
        prop="deptName"
        type="index"
        label="序号"
      ></el-table-column>
      <el-table-column prop="deptName" label="企业名称"></el-table-column>
      <el-table-column prop="isRead" label="阅读状态"> </el-table-column>

      <el-table-column prop="statusShow" label="状态"> </el-table-column>
      <el-table-column prop="responseSituation" label="回复情况">
      </el-table-column>
      <el-table-column prop="responseTime" label="完成日期"> </el-table-column>
      <el-table-column width="400" prop="beizhu" label="备注">
      </el-table-column>
      <el-table-column label="附件">
        <template slot-scope="{ row }">
          <a
            style="color: #4bb7e0"
            :href="val.url"
            v-for="(val, ind) in row.fujianList"
            target="_blank"
            :key="ind"
            >{{ val.name }}</a
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="!btnType">
        <template slot-scope="{ row }">
          <el-button
            size="mini"
            @click="examine(row)"
            class="operate"
            v-if="row.status == 1"
            >通过</el-button
          >
          <el-button
            size="mini"
            v-if="row.status == 1"
            @click="
              () => {
                dialogVisible = true;
                rows = row;
              }
            "
            class="operate"
            >不通过</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="不通过理由"
      class="learns_only"
      center
      top="10vh"
      :show-close="false"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div class="cehicleCard_form">
        <textarea v-model="message" cols="70" rows="20"></textarea>
      </div>
      <div slot="footer">
        <el-button class="topbtn" size="mini" @click="noExamine">
          确认
        </el-button>
        <el-button class="topbtn" size="mini" @click="dialogVisible = false">
          取 消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import operationGroup from "@/components/0perationGroup/index";
import governmentApi from "@/api/modules/government";
export default {
  components: {
    "operation-group": operationGroup,
  },

  data() {
    return {
      message: "",
      type: 0,
      form: [],
      loading: false,
      dialogVisible: false,
      isShow: false,
      reason: "",
      fu_jian: [],
      btnType: -1,
      operationOption: {
        jurisdiction: {
          // save: true,
          close: true,
        },
        loading: {
          save: false,
        },
      }, // 操作按钮配置
      //   vehicleVisible: false,
      msgloading: false,
      vehiclemsgList: {},
      weihuleibieList: [],
      rows: {},
      isDisable: true,
      // isRead: "", //是否禁用
      // statusShow: "", //是否禁用
    };
  },
  created() {
    this.getData(this.$route.query.id);
    this.btnType = this.$route.query.btnType;
  },
  methods: {
    // 获取详情
    async getData(id) {
      this.loading = true;
      let [err, data] = await governmentApi.awaitWrap(
        governmentApi.detailDeptList({
          Id: id,
        })
      );
      this.loading = false;
      if (data) {
        let disabled = data.find((val) => {
          return val.status == 0 && isread != 1;
        });
        if (disabled) {
          this.isDisable = true;
        } else {
          this.isDisable = false;
        }
        this.form = data.map((item) => {
          item.fujianList = [];
          item.fujian
            ? item.fujian.indexOf(",") !== -1
              ? item.fujian.split(",").map((el) => {
                  item.fujianList.push({
                    name: this.strhandle(el, "/"),
                    url: el,
                  });
                })
              : (item.fujianList = [
                  { name: this.strhandle(item.fujian, "/"), url: item.fujian },
                ])
            : (item.fujianList = []);

          if (item.isRead == 0) {
            item.isRead = "未读";
          }
          if (item.isRead == 1) {
            item.isRead = "已读";
          }
          if (item.status == 0) {
            item.statusShow = "待处理";
          } else if (item.status == 1) {
            item.statusShow = "待审核";
          } else if (item.status == 2) {
            item.statusShow = "审核通过";
          } else if (item.status == 3) {
            item.statusShow = "审核未通过";
          }
          return item;
        });
      } else {
        this.$message.error(err);
      }
    },

    // 审核
    async changeAudit(id) {
      let [err, data] = await governmentApi.awaitWrap(
        governmentApi.changeAudit({
          Id: id,
          status: this.type,
          message: this.message,
        })
      );
      if (data) {
        this.$message("数据审核成功");
        this.loading = true;
        this.getData(this.$route.query.id);
      }
    },

    examine(row) {
      console.log(0);
      this.type = 2;
      this.changeAudit(row.id);
    },
    // 不通过
    async noExamine() {
      let [err, data] = await governmentApi.awaitWrap(
        governmentApi.changeAudit({
          Id: this.rows.id,
          status: 3,
          message: this.message,
        })
      );
      if (data) {
        this.$message("数据审核成功");
        this.dialogVisible = false;
        this.getData(this.$route.query.id);
      }
    },

    // plFilter() {
    //   this.form.filter(item => {
    //     item
    //   })
    // },
    // 批量通过
    async plPass() {
      // console.log("000000000000000000");
      // this.form.map((item) => {
      //   item.statusShow == "审核未通过";
      // });

      let [err, data] = await governmentApi.awaitWrap(
        governmentApi.batchAudit({
          Id: this.$route.query.id,
        })
      );
      if (data) {
        this.$message("数据审核成功");
        this.loading = true;
        this.getData(this.$route.query.id);
      } else {
        this.message(err);
      }
    },
    //点击操作按钮
    operationclick(type) {
      switch (type) {
        case "save":
          if (this.eye) {
            this.$router.push({
              path: this.returnUrl,
            });
            break;
          }
          this.errmsg = "";
          this.verification();
          break;
        case "close":
          this.$router.push({
            path: "/IssueRectification",
          });
          break;
        default:
          break;
      }
    },
    // 图片名称处理
    strhandle(str, name) {
      let index = str.lastIndexOf(`${name}`);
      str = str.substring(index + 1, str.length);
      return str;
    },
  },
  watch: {
    vehicleVisible: {},
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: #0b122e;
  padding: 20px;
  box-sizing: border-box;
  height: 100%;

  .btn {
    margin-left: 10px;
    float: right;
    width: 100px;
    border-right: 0;
    border-color: #2f4761;
    background: #324041;
    border-radius: 0;
    &:hover {
      background: rgb(49, 87, 128);
    }
    .icon {
      width: 12px;
      height: 12px;
      margin-right: 5px;
    }
  }
  .pass {
    // background-color: #324041;
    color: #ffffff;
    border: none;
    margin-right: 10px;
    // height: 20px;
  }
  .mainTable {
    background: transparent;
    border: 1px solid #58626e;
    margin: 0;
    .pointbtn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      .icon {
        cursor: pointer;
      }
    }
  }
  .operate {
    color: #4bb7e0;
    border: none;
    background: none;
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
.learns_only {
  .el-dialog {
    background-image: url("~@/assets/img/bg_14.png");
    background-size: 100% 100%;
    background-color: transparent; //背景透明
    .el-dialog__title {
      color: #ffffff !important;
      font-weight: bold;
    }
    .el-dialog__body {
      padding: 10px 20px;
      .cehicleCard_form {
        height: 300px;
        background-color: #0a3774;
        padding: 5px;
        color: #fff;
        textarea {
          background: #112e4d;
          border-color: #004b77;
          color: #ffffff;
          margin: 0 auto;
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