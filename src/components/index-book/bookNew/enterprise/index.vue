<template>
  <div class="index-book">
    <div class="book-head">
      <el-tooltip content="企业文件目录" placement="bottom">
        <div class="title">企业文件目录</div>
      </el-tooltip>
      <div class="panel">
        <el-input
          clearable
          search
          size="small"
          class="search"
          placeholder="请输入关键字"
        ></el-input>
        <i type="md-cloud-download" class="md-cloud-download download"></i>
      </div>
    </div>
    <div class="book-container">
      <div v-if="treeData.length > 0">
        <tree-form
          :state="form"
          :active="nodeData"
          :parentNodes="parentNodes"
          @load="loadNode"
          @replace="replaceNode"
        ></tree-form>
        <tree-menu
          :state="menuState"
          :menu="treeMenu"
          @on-click="treeMenuClick"
        ></tree-menu>
      </div>
      <scroll>
        <div class="tree" v-loading="loading">
          <p v-show="!loading && treeData.length == 0">暂无数据</p>
          <tree-item
            v-for="(item, index) in treeData"
            :key="index"
            :data="item"
            :active="nodeData"
            :expandAll="expandAll"
            :order="index + 1"
            @on-click="treeItemClick"
            @contextmenu="contextmenu"
            @loadNode="loadNode"
            @parentNodes="getParentNodes"
          ></tree-item>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import action from "../actions/book";
import treeForm from "../tree-form";
import treeMenu from "../tree-menu";
import treeItem from "../tree-item";
import treeHead from "./tree-head";

import {
  getTree,
  addSubtemplateDir,
  modifyFileNumber,
  // remove,
  download,
  imgPreview,
  moveFile,
} from "@/api/modules/enterprise";

export default {
  name: "enterprise-book",
  components: {
    treeItem,
    treeMenu,
    treeForm,
  },
  mixins: [action],
  computed: {
    isFolder() {
      return this.nodeData.type == "文件夹";
    },
    treeMenu() {
      const menu = [
        {
          label: "查看文件",
          show: !this.isFolder,
          request: this.getDoc,
          action: this.viewFile,
        },
        {
          label: "下载文件",
          show: !this.isFolder,
          request: download,
          action: this.downloadFile,
        },
        {
          label: "替換文件",
          form: "upload",
          show: !this.isFolder,
          request: "/api/blade-doc/doc/qiyewenjian/replaceFile",
          param: "replace",
        },
        {
          label: "新增文件",
          form: "upload",
          show: this.isFolder,
          request: "/api/blade-doc/doc/qiyewenjian/addFile",
          param: "add",
        },
        // {
        //   label: "刪除文件",
        //   show: !this.isFolder || this.nodeData.fileNum == 0,
        //   request: remove,
        //   action: this.removeFile,
        // },
        {
          label: "新增文件夾",
          show: this.isFolder,
          form: "addFolder",
          request: addSubtemplateDir,
        },
        {
          label: "修改文件编号",
          show: !this.isFolder,
          form: "modifyFileNumber",
          request: modifyFileNumber,
        },
        {
          label: "上移文件",
          show: true,
          request: moveFile,
          action: this.moveFile,
          param: "up",
        },
        {
          label: "下移文件",
          show: true,
          request: moveFile,
          action: this.moveFile,
          param: "down",
        },
      ];
      return menu.filter((item) => item.show);
    },
  },
  beforeCreate() {
    treeItem.components.treeHead = treeHead;
  },
  mounted() {
    this.initBook();
  },
  methods: {
    getNode(data) {
      let id = data ? data.id : "";
      return getTree({ deptId: this.deptId, parentId: id });
    },
    getDoc() {
      return imgPreview(this.nodeData.id);
    },
  },
};
</script>

<style lang="scss">
@import "../index.scss";
</style>
