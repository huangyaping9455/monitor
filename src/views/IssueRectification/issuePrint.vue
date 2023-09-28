<template>
  <el-dialog
    title="下发整改打印预览"
    class="iss_only"
    center
    top="10vh"
    :show-close="false"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    width="50%"
  >
    <div class="iss_form">
      <table
        border="1px solid #ccc"
        cellspacing="0"
        cellpadding="0"
        style="width: 100%; table-layout: fixed"
        class="printBody"
      >
        <tbody>
          <tr>
            <td colspan="8" align="center">
              <span style="display: block; padding: 5px">
                综合治理数字监管平台安全主体责任落实情况表
              </span>
            </td>
          </tr>
          <tr>
            <td colspan="2" align="center">
              <span style="display: block; padding: 5px"> 检查企业 </span>
            </td>
            <td colspan="2" align="center">
              <span style="display: block; padding: 5px"
                >{{ dataForm.deptName }}
              </span>
            </td>
            <td colspan="2" align="center">
              <span style="display: block; padding: 5px"> 检查时间 </span>
            </td>
            <td colspan="2" align="center">
              <span style="display: block; padding: 5px"
                >{{ dataForm.rectificationTime }}
              </span>
            </td>
          </tr>
          <tr>
            <td colspan="2" align="center">
              <span style="display: block; padding: 5px"> 法人代表 </span>
            </td>
            <td colspan="2" align="center">
              <span style="display: block; padding: 5px">
                {{ rows.farendaibiao }}</span
              >
            </td>
            <td colspan="2" align="center">
              <span style="display: block; padding: 5px">
                企业性质（客/货运）
              </span>
            </td>
            <td colspan="2" align="center">
              <span style="display: block; padding: 5px">货运 </span>
            </td>
          </tr>
          <tr>
            <td colspan="6" align="center">
              <span style="display: block; padding: 5px"> 检查项目 </span>
            </td>
            <td colspan="2" align="center">
              <span style="display: block; padding: 5px"> 检查情况</span>
            </td>
          </tr>
          <tr>
            <td colspan="6">
              <span style="display: block; padding: 5px; min-height: 150px"
                >{{ dataForm.existingProblem }}
              </span>
            </td>
            <td colspan="2">
              <span style="display: block; padding: 5px; min-height: 150px"
                >{{ dataForm.rectificationRequirement }}
              </span>
            </td>
          </tr>
          <tr>
            <td colspan="2" align="center">
              <span style="display: block; padding: 5px"> 企业回复情况 </span>
            </td>
            <td colspan="2" align="center">
              <span style="display: block; padding: 5px"
                >{{ rows.responseSituation }}
              </span>
            </td>
            <td colspan="2" align="center">
              <span style="display: block; padding: 5px"> 企业回复人姓名 </span>
            </td>
            <td colspan="2" align="center">
              <span style="display: block; padding: 5px"
                >{{ rows.readName }}
              </span>
            </td>
          </tr>
          <tr>
            <td colspan="2" align="center">
              <span style="display: block; padding: 5px"> 企业回复时间 </span>
            </td>
            <td colspan="2" align="center">
              <span style="display: block; padding: 5px">
                {{ rows.responseTime }}</span
              >
            </td>
            <td colspan="2" align="center">
              <span style="display: block; padding: 5px"> 企业完成日期 </span>
            </td>
            <td colspan="2" align="center">
              <span style="display: block; padding: 5px">
                {{ rows.responseTime }}</span
              >
            </td>
          </tr>
          <tr>
            <td colspan="2" align="center">
              <span style="display: block; padding: 5px"> 参检人员签字 </span>
            </td>
            <td colspan="6" align="center">
              <span style="display: block; padding: 5px"> </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div slot="footer">
      <el-button class="topbtn" size="mini" @click="dialogVisible = false">
        取消
      </el-button>
      <el-button class="topbtn" size="mini" @click="printClick">
        打印
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      rows: {},
      dataForm: {},
      dialogVisible: false,
    };
  },
  created() {},
  methods: {
    open(row, form) {
      this.rows = row;
      this.dataForm = form;
      this.dialogVisible = true;
    },
    // 打印
    printClick() {
      //   window.print.portrait = true;//横向打印
      let printConent = document.querySelector(".printBody").cloneNode(true);
      //   console.log(printConent);
      let newWindow = window.open("", "_blank");
      newWindow.document.querySelector("body").appendChild(printConent);
      newWindow.document.title = `综合治理数字监管平台安全主体责任落实情况表`;
      this.$nextTick(() => {
        newWindow.print();
        newWindow.close();
      });
    },
  },
};
</script>

<style lang="scss">
.iss_only {
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
      .iss_form {
        background-color: #0a3774;
        padding: 5px;
        color: #fff;
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