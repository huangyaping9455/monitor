<style lang="scss" scoped>
.btns {
  float: right;
}

li {
  list-style: none;
}
.main {
  background: #0b122e;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.main-title {
  color: rgb(253, 197, 21);
  margin: 0;
  margin-bottom: 10px;
  margin-top: 20px;
}
.mainTable {
  width: 100%;
  // text-align: center;
  margin: 0 auto;
  color: #d3d4d6;
  border-collapse: collapse;
  border: 1px solid #58626e;
  border-spacing: 0px;
  font-size: 13px;
  tr {
    display: table-row;
  }
  td {
    padding: 8px;
    display: table-cell;
    vertical-align: middle;
    &:not(:last-of-type) {
      border-right: 0px;
    }
    &:first-of-type,
    &:nth-of-type(3),
    &:nth-of-type(5),
    &:nth-of-type(7) {
      width: 10%;
      text-align: right;
    }
    &:nth-of-type(2),
    &:nth-of-type(8) {
      width: 15%;
    }
    &:nth-of-type(4) {
      width: 20%;
    }
    .time {
      width: 100%;
    }
  }
  .upload-demo {
    display: inline-block;
  }
  .file {
    margin-left: 15px;
    color: #ffffff;
    &.noml {
      margin-left: 0px;
    }
  }
  .required:before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
}
.errmsg {
  color: red;
}
</style>
<style lang="scss">
.mainTable {
  .el-checkbox {
    color: #ffffff;
  }
}
</style>

<template>
  <div class="main" v-wechat-title="title">
    <!-- 操作按钮 -->
    <operation-group
      :option="operationOption"
      @operationclick="operationclick"
      class="btns"
    ></operation-group>
    <!-- main -->
    <p class="main-title">下发整改信息</p>
    <table
      class="mainTable"
      border="1"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.4)"
    >
      <tr>
        <td class="required">标题名称：</td>
        <td>
          <el-input
            v-if="!eye"
            size="mini"
            v-model="form.biaotimigcheng"
          ></el-input>
          <!-- <span v-else>{{ form.title }}</span> -->
          <el-input disabled v-else size="mini" v-model="form.title"></el-input>
        </td>

        <td class="required">整改对象</td>
        <td>
          <el-select
            filterable
            v-if="!eye"
            multiple
            collapse-tags
            class="time"
            size="mini"
            value-key="deptId"
            v-model="form.zhenggaiduixiang"
            placeholder="请选择"
          >
            <el-option
              v-for="item in depts"
              :key="item.deptId"
              :label="item.deptName"
              :value="item"
            >
            </el-option>
          </el-select>
          <!-- <span v-else>{{ form.deptName }}</span> -->
          <el-input
            disabled
            v-else
            size="mini"
            v-model="form.deptName"
          ></el-input>
        </td>
      </tr>
      <tr></tr>
      <tr>
        <td class="required">限期整改时间</td>
        <td>
          <el-date-picker
            class="time"
            size="mini"
            v-if="!eye"
            v-model="form.zhenggaishijian"
            value-format="yyyy-MM-dd"
            type="date"
            :picker-options="expireTimeOption"
            placeholder="选择日期时间"
          >
          </el-date-picker>
          <!-- <span v-else>{{ form.rectificationTime }}</span> -->
          <el-input
            disabled
            v-else
            size="mini"
            v-model="form.rectificationTime"
          ></el-input>
        </td>

        <td>是否强制整改时间</td>
        <td>
          <el-checkbox
            v-if="!eye"
            size="mini"
            v-model="form.zhuangtai"
          ></el-checkbox>
          <!-- <span v-else>{{ form.zhuangtai ? "是" : "否" }}</span> -->
          <el-checkbox
            disabled
            v-else
            size="mini"
            v-model="form.isAbarbeitung2"
          ></el-checkbox>
        </td>
      </tr>
      <tr>
        <td>存在问题：</td>
        <td colspan="3">
          <textarea
            cols="100"
            style="width: 100%"
            v-if="!eye"
            rows="4"
            v-model="form.cunzaiwenti"
          ></textarea>
          <!-- <span v-else>{{ form.existingProblem }}</span> -->
          <textarea
            disabled
            cols="100"
            style="width: 100%; background: white"
            v-else
            rows="4"
            v-model="form.existingProblem"
          ></textarea>
        </td>
      </tr>
      <tr>
        <td>整改要求：</td>
        <td colspan="3">
          <textarea
            cols="100"
            style="width: 100%"
            v-if="!eye"
            rows="4"
            v-model="form.zhenggaiyaoqiu"
          ></textarea>
          <!-- <span v-else>{{ form.rectificationRequirement }}</span> -->
          <textarea
            disabled
            cols="100"
            style="width: 100%; background: white"
            v-else
            rows="4"
            v-model="form.rectificationRequirement"
          ></textarea>
        </td>
      </tr>
      <tr>
        <td>附件(可支持多个附件)：</td>
        <td colspan="7">
          <el-upload
            v-if="!eye"
            class="upload-demo"
            action="/api/blade-upload/upload/upload"
            :data="uploadData"
            :headers="headers"
            :show-file-list="true"
            :on-success="handleSuccess"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :limit="100"
            :file-list="fu_jian"
          >
            <el-button size="mini" class="upbtn">附件</el-button>
          </el-upload>
          <el-upload
            v-else
            disabled
            class="upload-demo"
            action="/blade-upload/upload/upload"
            :data="uploadData"
            :headers="headers"
            :show-file-list="true"
            :on-success="handleSuccess"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :limit="100"
            :file-list="fu_jian"
          >
            <el-button disabled size="mini" class="upbtn">附件</el-button>
          </el-upload>
        </td>
      </tr>
    </table>
    <p class="errmsg">{{ errmsg }}</p>
    <p v-if="type !== 'add'" class="main-title">下发整改审核</p>
    <!-- && showStatus !=='待处理' -->
    <audit style="height: 50%" v-if="type !== 'add'"></audit>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import operationGroup from "@/components/0perationGroup/index";
import governmentApi from "@/api/modules/government";
import { mapGetters, mapMutations } from "vuex";
import { SET_DEPTS } from "@/store/mutation-types";
import { format } from "@/config/date";
import dayjs from "dayjs";
import audit from "./audit.vue";
export default {
  components: {
    "operation-group": operationGroup,
    audit,
  },
  data() {
    return {
      fu_jian: [],
      title: "",
      loading: false,
      type: "", //页面状态
      returnUrl: "", //跳转页面
      operationOption: {
        jurisdiction: {
          save: true,
          close: true,
        },
        loading: {
          save: false,
        },
      }, // 操作按钮配置
      form: {
        biaotimigcheng: "",
        zhenggaiduixiang: "",
        zhenggaishijian: dayjs().format("YYYY-MM-DD"),
        zhuangtai: "",
        cunzaiwenti: "",
        zhenggaiyaoqiu: "",
        isAbarbeitung2: "",
      },
      eye: false, //查看模式
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() <= Date.now() - 1000 * 60 * 60 * 24;
        },
      }, //时间范围限制
      files: "", //附件
      errmsg: "",
      headers: {
        "blade-auth": "Bearer " + Cookies.get("accessToken"),
      },
      showStatus: -1,
    };
  },
  created() {
    this.type = this.$route.query.type;
    this.showStatus = this.$route.query.status;
    this.returnUrl = "/issueRectification";
    if (this.$route.query.btnType == 1) {
      this.operationOption.jurisdiction.save = false;
    }
    if (this.type == "add") {
      this.title = "新增下发整改";
      // 获取获取送达企业列表
      let fasdw = [];
      this.getQiYe().then(() => {
        this.depts.map((el) => {
          if (el.deptId === this.$route.query.comId) {
            fasdw.push(el);
          }
        });
      });
      if (this.$route.query.comId) {
        this.form = {
          zhutimingcheng: "下发隐患排查整改通知",
          wenjianleixing: "紧急文件",
          songdadanwei: fasdw,
          zhuangtai: true,
          faqishijian: new Date(),
          zhenggaishijian: new Date(new Date() + 1000 * 60 * 60 * 24),
          huifuyouxiaoqi: 5,
          zhutizhengwen: "请尽快整改",
        };
      }
    } else if (this.type == "edit") {
      this.title = "修改下发整改";
      this.getQiYe();
      // 根据ID查询下发整改详情
      this.getOne(this.$route.query.id);
      this.loading = true;
    } else {
      this.title = "查看下发整改";
      // 根据ID查询下发整改详情
      this.getOne(this.$route.query.id);
      this.eye = true;
      this.loading = true;
    }
  },
  computed: {
    uploadData() {
      return {
        table: "zhengfu",
        fileId: format(new Date(), "MM"),
      };
    },
    ...mapGetters({
      userinfo: "userinfo",
      depts: "government/depts",
    }),

    ...mapGetters({
      // userinfo: "userinfo",
      // depts: "government/depts",
      zhuzzhiId: "government/fasongdanwei",
    }),
  },
  methods: {
    // 获取详情
    async getOne(id) {
      let [err, data] = await governmentApi.awaitWrap(
        governmentApi.abarbeitungDetail({
          Id: this.$route.query.id,
        })
      );
      this.loading = false;
      if (data) {
        let songdadanwei = data.deptName.split(",");
        let songdadanweiid = data.deptId.split(",");
        songdadanwei = this.eye
          ? songdadanwei.join(",")
          : songdadanwei.map((el, index) => {
              return {
                deptId: songdadanweiid[index],
                deptName: el,
              };
            });
        this.form = {
          ...data,
          songdadanwei: songdadanwei,
          isAbarbeitung2: data.isAbarbeitung == 1 ? true : false,
          huifuyouxiaoqi: this.eye
            ? data.huifuyouxiaoqi
            : data.huifuyouxiaoqi.replace("分钟", ""),
        };

        // 附件处理
        if (this.form.fujian) {
          if (this.form.fujian.indexOf(",") != -1) {
            this.fu_jian = this.form.fujian.split(",").map((ell) => {
              return { url: ell, name: this.strhandle(ell, "/") };
            });
          } else {
            this.fu_jian = [
              {
                url: this.form.fujian,
                name: this.strhandle(this.form.fujian, "/"),
              },
            ];
          }
        } else {
          this.fu_jian = [];
        }
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
            path: this.returnUrl,
          });
          break;
        default:
          break;
      }
    },
    // 表单验证
    verification() {
      if (!this.form.biaotimigcheng) {
        this.errmsg = "标题名称不能为空";
        return false;
      }
      if (!this.form.zhenggaishijian) {
        this.errmsg = "整改时间不能为空";
        return false;
      }
      // if (!this.form.wenjianleixing) {
      //   this.errmsg = "文件类型不能为空";
      //   return false;
      // }
      if (!this.form.zhenggaiduixiang.length) {
        this.errmsg = "整改对象不能为空";
        return false;
      }
      // if (this.form.zhuangtai && !this.form.huifuyouxiaoqi) {
      //   this.errmsg = "回复有效期不能为空";
      //   return false;
      // }
      // if (!this.form.zhenggaishijian) {
      //   this.errmsg = "整改时间不能为空";
      //   return false;
      // }
      if (this.type == "add") {
        // 新增-通知公告
        this.createfrom();
      } else {
        this.update();
      }
    },

    // 新增
    async createfrom() {
      // 处理送达单位
      let zhenggaiduixiang = [],
        zhenggaiduixiangid = [];
      this.form.zhenggaiduixiang.forEach((el) => {
        zhenggaiduixiang.push(el.deptName);
        zhenggaiduixiangid.push(el.deptId);
      });
      let fileList = [];
      this.fu_jian.forEach((val) => {
        fileList.push(val.url);
      });
      this.operationOption.loading.save = true;
      let [err, data] = await governmentApi.awaitWrap(
        governmentApi.insert({
          fasongdanweiid: this.zhuzzhiId,
          title: this.form.biaotimigcheng,
          deptName: zhenggaiduixiang.join(","),
          deptId: zhenggaiduixiangid.join(","),
          rectificationTime: format(this.form.zhenggaishijian, "YYYY-MM-DD"),
          isAbarbeitung: this.form.zhuangtai ? 1 : 0,
          existingProblem: this.form.cunzaiwenti,
          rectificationRequirement: this.form.zhenggaiyaoqiu,
          fujian: this.files.url ? this.files.url : "",
          fujian: fileList.join(","),
        })
      );
      this.operationOption.loading.save = false;
      if (data) {
        this.$message.success("添加成功");
        this.$router.push({
          path: this.returnUrl,
        });
      }
    },

    // 编辑
    async update() {
      let songdadanwei = [],
        songdadanweiid = [];
      this.form.songdadanwei.forEach((el) => {
        songdadanwei.push(el.deptName);
        songdadanweiid.push(el.deptId);
      });
      let fileList = [];
      this.fu_jian.forEach((val) => {
        fileList.push(val.url);
      });
      this.operationOption.loading.save = true;
      let [err, data] = await governmentApi.awaitWrap(
        governmentApi.update({
          ...this.form,
          songdadanwei: songdadanwei.join(","),
          songdadanweiid: songdadanweiid.join(","),
          zhuangtai: this.form.zhuangtai ? 1 : 0,
          huifuyouxiaoqi: this.form.huifuyouxiaoqi
            ? this.form.huifuyouxiaoqi + "分钟"
            : "",
          // fujian: this.files.url ? this.files.url : this.form.fujian,
          fujian: fileList.join(","),
        })
      );
      this.operationOption.loading.save = false;
      if (data) {
        this.$message.success("修改成功");
        this.$router.push({
          path: this.returnUrl,
        });
      }
    },
    // 图片信息
    handleSuccess(response, file, fileList) {
      // this.files = response.data;
      this.fu_jian.push(response.data);
    },
    // 附件预览
    handlePreview(file) {
      window.open(file.url, "_blank");
    },
    // 附件 删除
    handleRemove(file, fileList) {
      this.fu_jian = fileList;
    },
    // 获取图片名称
    strhandle(str, name) {
      let index = str.lastIndexOf(`${name}`);
      str = str.substring(index + 1, str.length);
      return str;
    },
    ...mapMutations({
      SET_DEPTS: "government/SET_DEPTS",
    }),
  },
};
</script>
