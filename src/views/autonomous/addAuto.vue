<template>
  <el-dialog
    :title="titleType"
    class="learns"
    center
    top="10vh"
    :show-close="false"
    :close-on-click-modal="false"
    :visible.sync="vehicleVisible"
    width="30%"
  >
    <div class="cehicleCard_form">
      <el-form
        ref="form"
        :model="dataForm"
        :rules="rules"
        label-width="100px"
        style="overflow: auto"
      >
        <el-col :span="24">
          <el-form-item
            label="运输局："
            prop="rcDeptId"
            :rules="{
              required: true,
              message: '运输局不能为空',
              trigger: 'blur',
            }"
          >
            <el-cascader
              v-model="dataForm.rcDeptId"
              :options="treeData"
              :props="{ checkStrictly: true, checkStrictly: true, emitPath: false }"
              clearable
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="文件名称：" prop="rcName">
            <el-input v-model="dataForm.rcName" placeholder="请输入文件名称" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="文件：">
            <el-upload
              action="/api/blade-upload/upload/upload?fileId=zizhiqu&table=zizhiqutongbao"
              multiple
              :headers="headers"
              :on-success="handlesuccessPrope"
              :file-list="fujianForm"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleremove"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div slot="footer">
      <el-button class="topbtn" size="mini" @click="vehicleVisible = false">
        取 消
      </el-button>
      <el-button
        v-if="titleType == '新增自治区通报'"
        class="topbtn"
        :loading="subLoading"
        size="mini"
        @click="insert"
      >
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import Cookies from "js-cookie";
import dataAnalysisApi from "@/api/modules/examine";
import governmentApi from "@/api/modules/government";
import { mapGetters } from "vuex";
import dayjs from "dayjs";
export default {
  data() {
    return {
      vehicleVisible: false,
      treeData: [],
      dataForm: {},
      subLoading: false,
      rules: {
        rcName: [{ required: true, message: "请输入文件名称", trigger: "blur" }],
      },
      titleType: "新增自治区通报",
      rows: {},
      headers: {
        "blade-auth": "Bearer " + Cookies.get("accessToken"),
      },
      fujianForm: [],
    };
  },
  computed: {
    ...mapGetters({
      userinfo: "userinfo",
    }),
  },
  methods: {
    open(row, type) {
      this.treeData = [];
      this.fujianForm = [];
      this.dataForm = {};
      this.rows = {};
      this.getTree();
      this.rows = row;
      this.titleType = type;
      if (type != "新增自治区通报") {
        row.rcDeptId = row.rcDeptId.toString();
        this.dataForm = row;
        if (this.dataForm.rcUrl) {
          if (this.dataForm.rcUrl.indexOf(",") != -1) {
            this.fujianForm = this.dataForm.rcUrl.split(",").map((el) => {
              return { name: this.strhandle(el, "/"), savename: this.strhandle(el, "/"), url: el };
            });
          } else {
            this.fujianForm = [
              {
                name: this.strhandle(this.dataForm.rcUrl, "/"),
                savename: this.strhandle(this.dataForm.rcUrl, "/"),
                url: this.dataForm.rcUrl,
              },
            ];
          }
        }
      }
      this.vehicleVisible = true;
    },
    // 获取图片名称
    strhandle(str, name) {
      let index = str.lastIndexOf(`${name}`);
      str = str.substring(index + 1, str.length);
      return str;
    },
    //获取目录树
    async getTree() {
      let [err, data] = await governmentApi.awaitWrap(
        governmentApi.getTree({
          Id: this.userinfo.userId,
        })
      );
      if (data) {
        data = [
          Object.assign(data[0], {
            xianlist: data[1].xianlist,
            shilist: data[1].shilist,
          }),
        ];
        this.treeData = this.setData(data, 2);
      } else {
        this.$message.error(err);
      }
    },
    //处理数据
    setData(data, icontype) {
      let tempArr = [];
      tempArr = data.map((el) => {
        let children = [],
          city = "";
        if (el.shilist.length > 0) {
          icontype = 0;
          city = el.city;
          children = this.setData(el.shilist, 1);
        }
        if (el.xianlist.length > 0) {
          icontype = 1;
          city = el.city;
          children = this.setData(el.xianlist, 2);
        }
        return {
          id: el.id,
          city: icontype == 0 ? el.province : icontype == 1 ? el.city : el.country,
          parentId: el.parentId,
          deptName: el.deptName,
          icontype: icontype,
          children: children.length > 0 ? children : undefined,
          label: el.deptName,
          value: el.id,
        };
      });
      return tempArr;
    },
    // 新增
    insert() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.subLoading = true;
          let img = [];
          if (this.fujianForm.length > 0) {
            this.fujianForm.forEach((l) => {
              img.push(l.savename);
            });
          }
          let [err, data] = await dataAnalysisApi.awaitWrap(
            dataAnalysisApi.getreportingClueInsert({
              ...this.dataForm,
              rcDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
              rcUrl: img.toString(),
            })
          );
          this.subLoading = false;
          if (data) {
            this.$message.success("新增成功");
            this.$parent.getDeptDayTJ();
            this.vehicleVisible = false;
          } else {
            this.$message.error(err);
          }
        }
      });
    },
    // 上传
    handlesuccessPrope(file, item, fileList) {
      this.fujianForm.push(file.data);
    },
    // 附件删除
    handleremove(file, fileList, fileIndex) {
      this.fujianForm = fileList;
    },
    //照片 预览
    handlePictureCardPreview(file) {
      window.open(file.url, "_blank");
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
      .cehicleCard_form {
        height: 300px;
        background-color: #0a3774;
        padding: 5px;
        color: #fff;
        .el-form {
          background-color: #0f1f40;
          padding: 10px;
          height: calc(100% - 20px);
          overflow: auto;
          .el-form-item__label {
            color: #fff;
          }
          .el-input-number__increase,
          .el-input-number__decrease,
          input,
          textarea {
            background: #112e4d;
            border-color: #004b77;
            color: #ffffff;
          }
        }
      }
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
