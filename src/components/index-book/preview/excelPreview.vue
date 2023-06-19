<template>
  <div
    id="luckysheet"
    style="
      margin: 0px;
      padding: 0px;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0px;
      top: 0px;
    "
  ></div>
</template>

<script>
import axios from "axios";
import { asynLoad } from "./excel";
import LuckyExcel from "luckyexcel";
export default {
  props: {
    file: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
      fileName: "hello",
    };
  },
  created() {
    this.loadPlugins();
  },
  methods: {
    // 获取传递的url参数
    getComment() {
      var afterUrl = window.location.search;
      let str = afterUrl.split("?")[1].split("&");
      for (let i = 0; i < str.length; i++) {
        let a = str[i].split("=");
        this.obj[a[0]] = a[1];
      }
    },
    loadPlugins() {
      const baseURL = "//cdn.jsdelivr.net/npm/luckysheet@latest/dist";
      Promise.all([
        asynLoad(`${baseURL}/plugins/css/pluginsCss.css`, true),
        asynLoad(`${baseURL}/plugins/plugins.css`, true),
        asynLoad(`${baseURL}/css/luckysheet.css`, true),
        asynLoad(`${baseURL}/assets/iconfont/iconfont.css`, true),
        asynLoad(`${baseURL}/plugins/js/plugin.js`),
        asynLoad(`${baseURL}/luckysheet.umd.js`),
      ])
        .then(() => {
          // luckysheet = window.luckysheet;
          this.getOriginFile(); // 获取远端文件
        })
        .catch((res) => {});
    },
    getOriginFile() {
      axios({
        method: "get",
        responseType: "blob",
        //请求头，要自己写
        headers: {},
        //excel文件路径
        url: `/previewapi/${this.file}`,
      })
        .then(({ data }) => {
          const blob = new Blob([data]);
          const file = new File([blob], this.fileName);
          this.init(file); // 开始渲染
        })
        .catch(() => {
          this.$message.error("文件打开失败");
        })
        .finally(() => {});
    },
    // 渲染方法，接受文件对象，如果是本地文件直接传入文件即可
    init(file) {
      luckysheet.destroy(); // 先销毁当前容器
      LuckyExcel.transformExcelToLucky(file, (exportJson) => {
        if (exportJson.sheets === null || !exportJson.sheets.length) {
          this.$message.error("无法读取excel文件的内容,当前不支持xls文件!");
          return;
        }
        luckysheet.create({
          container: "luckysheet",
          lang: "zh",
          data: exportJson.sheets,
          title: exportJson.info.name,
          userInfo: exportJson.info.name.creator,
          showinfobar: false, //头部栏
          showsheetbarConfig: { add: false, menu: false },
          showstatisticBar: true, //底部计数栏
          enableAddRow: false, //允许添加行
          enableAddCol: false, //允许添加行
          allowEdit: false, //前台编辑
          sheetFormulaBar: true, //公式栏
          showtoolbar: false, //工具栏
          enableAddBackTop: true, //回到顶部
          showtoolbar: false, //工具栏
          cellRightClickConfig: {
            copy: false, // 复制
            copyAs: false, // 复制为
            paste: false, // 粘贴
            insertRow: false, // 插入行
            insertColumn: false, // 插入列
            deleteRow: false, // 删除选中行
            deleteColumn: false, // 删除选中列
            deleteCell: false, // 删除单元格
            hideRow: false, // 隐藏选中行和显示选中行
            hideColumn: false, // 隐藏选中列和显示选中列
            rowHeight: false, // 行高
            columnWidth: false, // 列宽
            clear: false, // 清除内容
            matrix: false, // 矩阵操作选区
            sort: false, // 排序选区
            filter: false, // 筛选选区
            chart: false, // 图表生成
            image: false, // 插入图片
            link: false, // 插入链接
            data: false, // 数据验证
            cellFormat: false, // 设置单元格格式
          },
        });
      });
    },
  },
};
</script>