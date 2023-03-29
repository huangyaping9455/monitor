<style lang="scss" scoped>
li{
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
        <td class="required">发起单位：</td>
        <td>
          <span>{{ userinfo.deptName }}</span>
        </td>
        <td class="required">标题名称：</td>
        <td>
          <el-input
            v-if="!eye"
            size="mini"
            v-model="from.zhutimingcheng"
          ></el-input>
          <span v-else>{{ from.zhutimingcheng }}</span>
        </td>
        <td class="required">下发时间：</td>
        <td colspan="3">
          <el-date-picker
            class="time"
            size="mini"
            v-if="!eye"
            v-model="from.faqishijian"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            :picker-options="expireTimeOption"
            placeholder="选择日期时间"
          >
          </el-date-picker>
          <span v-else>{{ from.faqishijian }}</span>
        </td>
      </tr>
      <tr>
        <td class="required">文件类型：</td>
        <td>
          <el-select
            v-if="!eye"
            class="time"
            size="mini"
            v-model="from.wenjianleixing"
            placeholder="请选择"
          >
            <el-option label="一般文件" value="一般文件"></el-option>
            <el-option label="特殊文件" value="特殊文件"></el-option>
            <el-option label="紧急文件" value="紧急文件"></el-option>
          </el-select>
          <span v-else>{{ from.wenjianleixing }}</span>
        </td>
        <td class="required">送达单位：</td>
        <td>
          <el-select
            filterable
            v-if="!eye"
            multiple
            collapse-tags
            class="time"
            size="mini"
            value-key="deptId"
            v-model="from.songdadanwei"
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
          <span v-else>{{ from.songdadanwei }}</span>
        </td>
        <td>是否回执：</td>
        <td>
          <el-checkbox v-if="!eye" size="mini" v-model="from.zhuangtai"
            >回执</el-checkbox
          >
          <span v-else>{{ from.zhuangtai ? "是" : "否" }}</span>
        </td>
        <td :class="from.zhuangtai ? 'required' : ''">回复有效期(分钟)：</td>
        <td>
          <el-input
            v-if="!eye"
            size="mini"
            type="number"
            v-model="from.huifuyouxiaoqi"
            :disabled="from.zhuangtai ? false : true"
          ></el-input>
          <span v-else>{{ from.huifuyouxiaoqi }}</span>
        </td>
      </tr>
      <tr>
        <td class="required">整改时间：</td>
        <td colspan="7">
          <el-date-picker
            class="time"
            size="mini"
            v-if="!eye"
            v-model="from.zhenggaishijian"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            :picker-options="expireTimeOption"
            placeholder="选择日期时间"
          >
          </el-date-picker>
          <span v-else>{{ from.zhenggaishijian }}</span>
        </td>
      </tr>
      <tr>
        <td>备注：</td>
        <td colspan="7">
          <el-input
            v-if="!eye"
            size="mini"
            type="textarea"
            v-model="from.zhutizhengwen"
          ></el-input>
          <span v-else>{{ from.zhutizhengwen }}</span>
        </td>
      </tr>
      <tr>
        <td>附件：</td>
        <td colspan="7">
          <el-upload
            v-if="!eye"
            class="upload-demo"
            action="/blade-upload/upload/upload"
            :data="uploadData"
            :headers="headers"
            :show-file-list="true"
            :on-success="handlePreview"
            :limit="100"
            :file-list="[]"
          >
            <el-button size="mini" class="upbtn">上传附件</el-button>
          </el-upload>
          <li v-for="(item, index) in fu_jian" :key="index">
            <a
              :href="item"
              target="_blank"
              download
              class="file"
              :class="eye ? 'noml' : ''"
            >
              {{ item }}
            </a>
            <br>
            <br>
          </li>
        </td>
      </tr>
    </table>

    <p class="errmsg">{{ errmsg }}</p>
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
export default {
  components: {
    "operation-group": operationGroup,
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
      from: {
        zhutimingcheng: "",
        wenjianleixing: "",
        songdadanwei: "",
        zhuangtai: "",
        faqishijian: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        zhenggaishijian: "",
        huifuyouxiaoqi: "",
        zhutizhengwen: "",
      },
      eye: false, //查看模式
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() <= Date.now() - 1000 * 60 * 60 * 24;
        },
      }, //时间范围限制
      files: "", //附件
      fileName: "",
      errmsg: "",
      headers: {
        "blade-auth": "Bearer " + Cookies.get("accessToken"),
      },
    };
  },
  created() {
    this.type = this.$route.query.type;
    this.returnUrl = this.$route.query.returnUrl;
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
        this.from = {
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
  },
  methods: {
    // 获取详情
    async getOne(id) {
      let [err, data] = await governmentApi.awaitWrap(
        governmentApi.getOne({
          id: id,
        })
      );
      this.loading = false;
      if (data) {
        let songdadanwei = data.songdadanwei.split(",");
        let songdadanweiid = data.songdadanweiid.split(",");
        songdadanwei = this.eye
          ? songdadanwei.join(",")
          : songdadanwei.map((el, index) => {
              return {
                deptId: songdadanweiid[index],
                deptName: el,
              };
            });
        this.from = {
          ...data,
          songdadanwei: songdadanwei,
          zhuangtai: data.zhuangtai == 1 ? true : false,
          huifuyouxiaoqi: this.eye
            ? data.huifuyouxiaoqi
            : data.huifuyouxiaoqi.replace("分钟", ""),
        };
        this.fileName = this.strhandle(data.fujian, "/");
      } else {
        this.$message.error(err);
      }
      this.fu_jian = this.from.fujian.split(",");

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
      if (!this.from.zhutimingcheng) {
        this.errmsg = "标题名称不能为空";
        return false;
      }
      if (!this.from.faqishijian) {
        this.errmsg = "下发时间不能为空";
        return false;
      }
      if (!this.from.wenjianleixing) {
        this.errmsg = "文件类型不能为空";
        return false;
      }
      if (!this.from.songdadanwei.length) {
        this.errmsg = "送达单位不能为空";
        return false;
      }
      if (this.from.zhuangtai && !this.from.huifuyouxiaoqi) {
        this.errmsg = "回复有效期不能为空";
        return false;
      }
      if (!this.from.zhenggaishijian) {
        this.errmsg = "整改时间不能为空";
        return false;
      }
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
      let songdadanwei = [],
        songdadanweiid = [];
      this.from.songdadanwei.forEach((el) => {
        songdadanwei.push(el.deptName);
        songdadanweiid.push(el.deptId);
      });
      this.operationOption.loading.save = true;
      let [err, data] = await governmentApi.awaitWrap(
        governmentApi.createanbiaolist({
          type: 4,
          fasongdanweiid: this.userinfo.deptId,
          fasongdanwei: this.userinfo.deptName,
          zhutimingcheng: this.from.zhutimingcheng,
          wenjianleixing: this.from.wenjianleixing,
          songdadanwei: songdadanwei.join(","),
          songdadanweiid: songdadanweiid.join(","),
          zhuangtai: this.from.zhuangtai ? 1 : 0,
          faqishijian: format(this.from.faqishijian, "YYYY-MM-DD HH:mm:ss"),
          zhenggaishijian: format(
            this.from.zhenggaishijian,
            "YYYY-MM-DD HH:mm:ss"
          ),
          // fujian: this.files.url ? this.files.url : "",
          fujian: this.files,
          huifuyouxiaoqi: this.from.huifuyouxiaoqi
            ? this.from.huifuyouxiaoqi + "分钟"
            : "",
          zhutizhengwen: this.from.zhutizhengwen,
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
      this.from.songdadanwei.forEach((el) => {
        songdadanwei.push(el.deptName);
        songdadanweiid.push(el.deptId);
      });
      this.operationOption.loading.save = true;
      let [err, data] = await governmentApi.awaitWrap(
        governmentApi.update({
          ...this.from,
          songdadanwei: songdadanwei.join(","),
          songdadanweiid: songdadanweiid.join(","),
          zhuangtai: this.from.zhuangtai ? 1 : 0,
          huifuyouxiaoqi: this.from.huifuyouxiaoqi
            ? this.from.huifuyouxiaoqi + "分钟"
            : "",
          // fujian: this.files.url ? this.files.url : this.from.fujian,
          fujian:this.files
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
    handlePreview(response, file, fileList) {
      const arr = fileList.map((item) => {
        return item.response.data.url;
      });
      const a = arr.join();
      console.log(arr.join());
      console.log(a.split(","));
      // this.files = response.data;
      this.files = arr.join();
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
