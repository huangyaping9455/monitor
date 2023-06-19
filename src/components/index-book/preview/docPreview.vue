<template>
  <div ref="file" class="doc_p"></div>
</template>
<script>
import axios from "axios";
let docx = require("docx-preview");

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
    return {};
  },
  mounted() {
    axios({
      method: "get",
      responseType: "blob", // 设置响应文件格式
      url: `/previewapi/${this.file}`,
    })
      .then(({ data }) => {
        docx.renderAsync(data, this.$refs.file); // 渲染到页面预览
      })
      .catch(() => {
        this.$message.error("文件打开失败");
      });
  },
};
</script>
<style lang="scss" scoped>
.doc_p {
  width: 100%;
  height: 100%;
  :deep(.docx-wrapper) {
    padding: 0;
    padding-bottom: 10pt;
    .docx {
      padding: 0 14pt !important;
      margin-bottom: 0pt !important;
      margin-top: 10pt !important;
    }
  }
}
</style>