<template>
  <div class="wh100 preview-doc">
    <div class="head">
      <div
        @click="download"
        style="display: flex; align-items: center; cursor: pointer"
      >
        <p>{{ active.name }}</p>
        <div
          v-if="active.path && !active.down"
          style="display: flex"
          title="下载"
        >
          <i class="el-icon-download" />
        </div>
      </div>
      <div class="icons" @click="$refs.pmodel.previewVisible = true">
        <!-- <el-tooltip :content="move ? '取消滑动预览' : '滑动预览'">
          <i class="md-move" :class="{ active: move }" @click="toogelMove" />
        </el-tooltip> -->
        <i class="el-icon-full-screen"></i>
      </div>
    </div>
    <div class="body">
      <scroll ref="scroll" :ops="scrollOps">
        <div class="printConent wh100">
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
            :key="files"
          ></doc-preview>
          <excel-preview
            v-else-if="active.fType && active.fType == 'xls'"
            :file="files[0]"
            :key="files[0]"
          ></excel-preview>
          <div
            v-else-if="active.fType && active.fType == 'pdf'"
            style="width: 100%; height: 100%; min-height: 200px"
            v-loading="pdfLoading"
            element-loading-background="rgba(0, 0, 0, 0.4)"
          >
            <!-- <pdf
              :src="pdfUrl"
              style="
                width: 100%;
                height: 100%;
                padding: 10px 80px;
                background-color: gray;
              "
              ref="pdf"
              v-for="i in numPages"
              :key="i"
              :page="i"
              @page-loaded="pdfLoading = false"
            ></pdf> -->
            <vue-office-pdf
              :src="pdfUrl"
              class="docx-calss"
              @rendered="pdfLoading = false"
            />
          </div>
          <iframe
            v-else
            width="100%"
            style="height: 87vh"
            :src="files[0]"
            frameborder="0"
          ></iframe>
        </div>
      </scroll>
    </div>
    <div class="foot">
      <div class="btn">
        <el-button v-if="closeBtn" @click="close">关闭</el-button>
        <!-- <el-button v-if="printBtn" type="primary" @click="print"
          >打印</el-button
        > -->
      </div>
      <div v-if="info" class="info">
        <span>累计访问次数：{{ Math.abs(active.cumulativeVisits) }}</span>
        <span>最新访问时间：{{ active.lastPreviewTime }}</span>
      </div>
    </div>
    <preview-modal
      ref="pmodel"
      :scrollOps="scrollOps"
      :active="active"
      :files="files"
      :pdfUrl="pdfUrl"
      :numPages="numPages"
    ></preview-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import DocPreview from "./docPreview.vue";
import ExcelPreview from "./excelPreview.vue";
import pdf from "vue-pdf";
import VueOfficePdf from "@vue-office/pdf";
import PreviewModal from "./previewModal.vue";
export default {
  name: "preview-doc",
  components: { DocPreview, ExcelPreview, pdf, PreviewModal, VueOfficePdf },
  props: {
    active: {
      type: Object,
      default: () => new Object(),
    },

    action: {
      type: Function,
    },

    closeBtn: {
      type: Boolean,
      default: true,
    },

    printBtn: {
      type: Boolean,
      default: true,
    },

    info: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: false,
      move: false,
      printStyle: {
        "page-break-after": "always",
        width: "100%",
      },

      scrollOps: {
        vuescroll: {
          mode: "native",
          scroller: {
            bouncing: {
              top: 50,
              bottom: 50,
              left: 0,
              right: 0,
            },
            locking: true,
            minZoom: 1,
            maxZoom: 1,
          },
        },
      },
      numPages: 0,
      pdfLoading: false,
    };
  },
  computed: {
    files() {
      return this.active._fileList || [];
    },
    ...mapGetters({
      userinfo: "userinfo",
    }),
    pdfUrl() {
      // return pdf.createLoadingTask("/previewapi/" + this.files[0]);
      return "/previewapi/" + this.files[0];
    },
  },
  watch: {
    active() {
      this.preview();
    },
  },
  methods: {
    download() {
      if (this.active.mubanPath) {
        if (this.active.mubanPath != "") {
          // let str = this.active.mubanPath.indexOf(".doc");
          window.location.href =
            // "http://59.36.239.170:8204/" +
            // "http://61.136.101.78:8894/" +
            // "http://sztoosun.com:8204/" +
            // "http://222.82.236.242:8204/" +
            // "http://58.144.142.198:8204/" +
            // "http://47.112.100.126:8204/" +
            // "http://125.64.5.2:8204/" +
            // "http://103.47.83.154:8204/" +
            // "http://www.zkgt-safety.com:8204/" +
            // "http://183.57.73.73:8204/" +
            // "http://150.138.133.178:8204/" +
            this.userinfo.urlPrefix +
            this.active.mubanPath +
            "/" +
            this.active.name;
        } else {
          this.$message.warning("暂不支持下载");
        }
      } else {
        axios({
          url: "/api/blade-anbiao/anbiao/baobiaowenjian/preview",
          method: "post",
          params: {
            fileType: 4,
            id: this.active.id,
          },
        }).then((res) => {
          if (!res.data.data.path) {
            this.$message.warning("暂不支持下载");
            return;
          }
          window.location.href =
            // "http://59.36.239.170:8204/" + res.data.data.path;
            // "http://61.136.101.78:8894/" + res.data.data.path;
            // "http://sztoosun.com:8204/" + res.data.data.path;
            // "http://222.82.236.242:8204/" + res.data.data.path;
            // "http://58.144.142.198:8204/" + res.data.data.path;
            // "http://47.112.100.126:8204/" + res.data.data.path;
            // "http://125.64.5.2:8204/" + res.data.data.path;
            // "http://103.47.83.154:8204/" + res.data.data.path;
            // "http://www.zkgt-safety.com:8204/" + res.data.data.path;
            // "http://183.57.73.73:8204/" + res.data.data.path;
            // "http://150.138.133.178:8204/" + res.data.data.path;
            this.userinfo.urlPrefix + res.data.data.path;
        });
      }
    },

    close() {
      this.$emit("close-view");
    },

    toogelMove() {
      this.move = !this.move;
      this.scrollOps.vuescroll.mode = this.move ? "slide" : "native";
    },

    print() {
      if (!this.active._fileList) {
        this.$message.info({
          content: "无文件可打印！",
          duration: 3,
        });
        return;
      }
      let printConent = document.querySelector(".printConent").cloneNode(true);
      let newWindow = window.open("", "_blank");
      newWindow.document.querySelector("body").appendChild(printConent);
      newWindow.document.title = `文件打印-${this.active.name}`;
      this.$nextTick(() => {
        newWindow.print();
        newWindow.close();
      });
    },

    preview() {
      this.loading = true;
      if (this.active._fileList) {
        setTimeout(() => {
          this.loading = false;
        }, 200);
        return;
      }

      if (this.action) {
        this.action()
          .then((res) => {
            let data = res[1];
            this.imgData = data;
            this.active.path = res[1].path;
            this.active.mubanPath = res[1].mubanPath;
            // this.$set(this.active, "_fileList", data.imgList);
            this.$set(this.active, "lastPreviewTime", data.lastPreviewTime);
            this.$set(this.active, "cumulativeVisits", data.cumulativeVisits);
            if (
              data.name.indexOf(".png") != -1 ||
              data.name.indexOf(".jpg") != -1 ||
              data.name.indexOf(".gif") != -1 ||
              data.name.indexOf(".jpeg") != -1 ||
              data.name.indexOf(".webp") != -1 ||
              data.name.indexOf(".bmp") != -1
            ) {
              this.$set(this.active, "fType", "img");
              this.$set(this.active, "_fileList", [
                this.$store.getters.userinfo.urlPrefix + data.path,
              ]);
            } else if (data.name.indexOf(".doc") != -1) {
              this.$set(this.active, "fType", "doc");
              this.$set(this.active, "_fileList", [
                data.isMuban && data.isMuban == 1
                  ? data.mubanPath.indexOf(".pdf") != -1
                    ? data.mubanPath
                    : data.mubanPath + "/" + data.name
                  : data.path,
              ]);
            } else if (data.name.indexOf(".xls") != -1) {
              this.$set(this.active, "fType", "xls");
              this.$set(this.active, "_fileList", [
                data.isMuban && data.isMuban == 1
                  ? data.mubanPath.indexOf(".pdf") != -1
                    ? data.mubanPath
                    : data.mubanPath + "/" + data.name
                  : data.path,
              ]);
            } else if (data.name.indexOf(".pdf") != -1) {
              this.pdfLoading = true;
              this.$set(this.active, "fType", "pdf");
              this.$set(this.active, "_fileList", [
                data.isMuban && data.isMuban == 1
                  ? data.mubanPath.indexOf(".pdf") != -1
                    ? data.mubanPath
                    : data.mubanPath + "/" + data.name
                  : data.path,
              ]);
              // 获取pdf分页
              // this.pdfUrl.promise.then((pdf) => {
              //   this.numPages = pdf.numPages;
              // });
            } else {
              this.$set(this.active, "fType", "qita");
              this.$set(this.active, "_fileList", [
                this.$store.getters.userInfo.urlPrefix + data.path,
              ]);
            }
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../tag-tabs/mixin.scss";

.preview-doc {
  $head-h: 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .head {
    height: $head-h;
    padding: 0px 20px;
    font-weight: 600;
    letter-spacing: 1px;
    @include box-center($justify: space-between, $align: center);
    p {
      font-size: 20px;
      @include ellipsis;
    }

    .el-icon-download {
      font-size: 18px;
      color: #2d8cf0;
      margin-left: 2px;
    }
    .ivu-icon.active {
      color: $primary-color;
    }
    .icons {
      display: flex;
      font-size: 18px;
      cursor: pointer;
      i {
        margin-left: 10px;
      }
    }
  }

  .foot {
    height: 50px;
    display: flex;
    padding: 0px 20px;
    align-items: center;
    justify-content: space-between;
    button,
    .info span {
      margin-right: 10px;
    }
  }

  .body {
    height: calc(100% - 90px);
    width: 100%;
    border-top: 1px solid #cccccc;
    position: relative;
    border-bottom: 1px solid #cccccc;
  }
  .move-cursor {
    cursor: move;
  }
  .btn-box {
    height: 40px;
    min-height: 40px;
    border-top: 1px solid #cccccc;
    @include box-center($justify: false, $align: center);
    .btn-size {
      width: 15%;
      margin-left: 10px;
    }
  }
  .__view {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    img {
      max-width: 100%;
    }
  }
}
</style>
