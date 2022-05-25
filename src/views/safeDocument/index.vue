<style lang="scss" scoped>
.enterprise {
  height: 90vh;
  background: #0b122e;
  .main {
    height: calc(100vh - 7rem);
    display: flex;
    padding: 0 10px 10px 10px;
    box-sizing: border-box;
    .main-r {
      width: calc(100%);
      .learn_head {
        display: flex;
        padding: 10px 0;
        align-items: center;
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
    }
    .docbody {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: calc(100% - 25px);
      overflow: hidden;
    }
  }
}
</style>
<template>
  <div class="enterprise">
    <div class="main">
      <div class="main-r">
        <!-- 操作按钮 -->
        <div class="learn_head">
          <span>企业名称 : </span>
          <el-select
            filterable
            collapse-tags
            class="time"
            size="mini"
            value-key="deptId"
            v-model="songdadanwei"
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
          <el-button size="small" type="primary" @click="search"
            >搜索</el-button
          >
        </div>
        <div class="docbody">
          <mulu
            slot="left"
            :split="0.5"
            @on-view="onView"
            style="width:50%"
            ref="mulu"
          ></mulu>
          <tag-tabs
            slot="right"
            v-model="tab"
            :tabs="tabs"
            style="width:49%;height:100%;"
          >
            <preview-doc
              slot="doc"
              :active="previewNode"
              :action="previewAction"
              :info="previewNode != doc"
              :closeBtn="previewNode != doc"
              :printBtn="previewNode != doc"
              @close-view="closeView"
            ></preview-doc>
          </tag-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { previewDoc } from "@/components/index-book";
import tagTabs from "@/components/tag-tabs";
import mulu from "./mulu";
import { SET_DEPTS } from "@/store/mutation-types";
import governmentApi from "@/api/modules/government";
export default {
  name: "document",
  components: {
    tagTabs,
    previewDoc,
    mulu,
  },
  data() {
    return {
      searchshow: false,
      zhengfuId: "", //地区id
      tab: "doc",
      isPreview: true,
      tabs: [{ label: "正文", slot: "doc", class: "preview-bg" }],
      doc: {
        name: "文件和档案管理制度",
        _fileList: [
          require("@/assets/img/1.png"),
          require("@/assets/img/2.png"),
          require("@/assets/img/3.png"),
          require("@/assets/img/4.png"),
        ],
      },
      previewNode: {},
      previewAction: null,
      isdabiao: [],
      songdadanwei: "",
    };
  },
  mounted() {
    this.previewNode = this.doc;
    // 获取获取送达企业列表
    this.getQiYe();
    this.$message.warning("请先选择企业");
  },
  computed: {
    ...mapGetters({
      zhuzzhiId: "government/fasongdanwei",
      xuanzhongchengshi: "government/xuanzhongchengshi",
      userinfo: "userinfo",
      depts: "government/depts",
    }),
  },
  watch: {
    zhuzzhiId(newid) {
      // 切换单位
      if (newid) {
        this.zhengfuId = this.zhuzzhiId;
      }
    },
  },
  methods: {
    onView({ node, request }) {
      this.isPreview = true;
      this.previewNode = node;
      this.previewAction = request;
    },
    closeView() {
      this.previewNode = this.doc;
    },

    ...mapMutations({
      SET_DEPTS: "government/SET_DEPTS",
    }),
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
    search() {
      if (!this.songdadanwei) return this.$message.warning("请先选择企业");
      this.$refs.mulu.getTree(this.songdadanwei.deptId);
    },
  },
};
</script>
