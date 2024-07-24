<template>
  <div class="docxx">
    <VueDragResize :w="0" :h="0" :z="0" :x="450" :y="0" :isResizable="false" v-if="isModal">
      <div ref="file" class="doc_pp" @mousewheel="bbimg"></div>
    </VueDragResize>
    <div v-else ref="file" class="doc_p"></div>
  </div>
</template>
<script>
import axios from "axios";
let docx = require("docx-preview");
import VueDragResize from "vue-drag-resize";

export default {
  components: { VueDragResize },
  props: {
    file: {
      type: String,
      default: () => {
        return "";
      },
    },
    isModal: {
      type: Boolean,
      default: () => {
        return false;
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
  methods: {
    // 滚轮缩放
    bbimg() {
      if (!this.isModal) return;
      var zoom = parseInt(this.$refs.file.children[3].children[0].style.zoom, 10) || 100;
      zoom += event.wheelDelta / 12;
      if (zoom > 0) this.$refs.file.children[3].children[0].style.zoom = zoom + "%";
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
.docxx {
  width: 100%;
  height: 100%;
  position: relative;
  .doc_p,
  .doc_pp {
    width: 100%;
    height: 100%;
    position: relative;
    ::v-deep .docx-wrapper {
      padding: 0;
      padding-bottom: 10pt;
      .docx {
        padding: 0 14pt !important;
        margin-bottom: 0pt !important;
        margin-top: 10pt !important;
      }
    }
  }
}
</style>
<style lang="scss">
.doc_pp .docx-wrapper {
  background: none !important;
}
</style>
