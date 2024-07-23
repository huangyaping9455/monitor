<template>
  <el-dialog
    :title="active.name"
    :visible.sync="previewVisible"
    class="pmodel"
    top="0"
    width="50%"
    :close-on-click-modal="false"
  >
    <scroll ref="scroll" :ops="scrollOps">
      <div class="printConent wh100" style="width: 100%; height: 100%">
        <div
          v-if="!active.fType || (active.fType && active.fType == 'img')"
          style="width: 100%; height: 100%"
        >
          <el-image
            v-for="(src, index) in files"
            :src="src"
            :key="index"
            :preview-src-list="[src]"
            style="padding-top: 2px"
          />
        </div>
        <doc-preview
          v-else-if="active.fType && active.fType == 'doc'"
          :file="files[0]"
          :isModal="true"
          ref="docmodal"
        ></doc-preview>
        <excel-preview
          v-else-if="active.fType && active.fType == 'xls'"
          :file="files[0]"
        ></excel-preview>
        <div
          v-else-if="active.fType && active.fType == 'pdf'"
          style="width: 100%; height: 100%; position: relative"
        >
          <VueDragResize :w="0" :h="0" :z="0" :x="110" :y="0" :isResizable="false">
            <div ref="pdfview" style="position: relative" @mousewheel="bbimg">
              <pdf
                :src="pdfUrl"
                style="
                    width: 553.95pt;
                    min-height: 262pt;
                    padding: 10px;
                    background-color: gray;
                  "
                ref="pdf"
                v-for="i in numPages"
                :key="i"
                :page="i"
              ></pdf>
              <!-- <vue-office-pdf :src="pdfUrl" class="docx-calss" /> -->
            </div>
          </VueDragResize>
        </div>
        <iframe v-else width="100%" style="height: 87vh" :src="files[0]" frameborder="0"></iframe>
      </div>
    </scroll>
  </el-dialog>
</template>
<script>
import DocPreview from "./docPreview.vue";
import ExcelPreview from "./excelPreview.vue";
import pdf from "vue-pdf";
import PreviewModal from "./previewModal.vue";
import VueDragResize from "vue-drag-resize";
// import VueOfficePdf from "@vue-office/pdf";
export default {
  components: {
    DocPreview,
    ExcelPreview,
    pdf,
    PreviewModal,
    VueDragResize,
    // VueOfficePdf,
  },
  props: {
    files: {
      type: Array,
      default: () => {
        return [];
      },
    },
    scrollOps: {
      type: Object,
      default: () => {
        return {};
      },
    },
    pdfUrl: {
      type: String,
      default: () => {
        return "";
      },
    },
    active: {
      type: Object,
      default: () => {
        return {};
      },
    },
    numPages: {
      type: Number,
      default: () => {
        return 0;
      },
    },
  },
  data() {
    return {
      previewVisible: false,
    };
  },

  methods: {
    // 滚轮缩放
    bbimg() {
      for (let i = 0; i < this.$refs.pdfview.children.length; i++) {
        let zoom = parseInt(this.$refs.pdfview.children[i].style.zoom, 10) || 100;
        zoom += event.wheelDelta / 12;
        if (zoom > 0) this.$refs.pdfview.children[i].style.zoom = zoom + "%";
        // return false;
      }
    },
  },
};
</script>
<style lang="scss">
.pmodel {
  .el-dialog {
    position: relative;
    height: calc(100% - 54px);
    margin: 0 auto;
    .el-dialog__header {
      width: calc(50% - 40px);
      position: fixed;
      top: 0;
      z-index: 999;
      background-color: #fff;
      border-bottom: 1px solid gainsboro;
      .el-dialog__close {
        font-size: 20px;
        font-weight: 600;
      }
    }
    .el-dialog__body {
      padding: 0;
      margin-top: 54px;
      height: calc(100%);
      overflow: auto;
      .content-container {
        width: 100% !important;
        height: 100% !important;
      }
    }
  }
}
</style>
