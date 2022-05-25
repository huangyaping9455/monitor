<template>
  <div
    class="document-doc wh100"
    style="width:100%;height:100%;"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.4)"
  >
    <div :class="['bookcase', { one: shelf.id }]" v-show="listdata.length > 0">
      <scroll :ops="scrollOps">
        <bookcase-shelf
          v-for="(item, index) in listdata"
          v-show="isShow(item)"
          :key="index"
          :split="split"
          :shelf="item"
          :active="doc"
          @contextmenu="contextmenu"
          @open="openDoc"
        ></bookcase-shelf>
      </scroll>
    </div>
    <p v-show="listdata.length == 0" style="text-align:center;margin-top:15vh;">
      <img src="@/assets/img/empty.png" alt="" srcset="" />
    </p>
    <document-book
      ref="book"
      :class="{ one: !shelf.id }"
      :rootNode="doc"
      @back="closeDoc"
      @on-view="emitView"
    ></document-book>
  </div>
</template>

<script>
import dataAnalysisApi from "@/api/modules/report";
import { documentBook } from "@/components/index-book";
import bookcaseShelf from "./shelf";
export default {
  name: "mulu",
  components: {
    documentBook,
    bookcaseShelf,
  },
  props: {
    split: Number,
  },
  data() {
    return {
      loading: false,
      listdata: [],
      shelf: {},
      doc: {},
      // 柜子架 滚动配置
      scrollOps: {
        vuescroll: {
          detectResize: false,
          sizeStrategy: 250,
        },
        scrollPanel: {
          scrollingX: false,
          scrollingY: true,
        },
      },
    };
  },
  mounted() {
    // this.getTree();
  },
  methods: {
    // 获取目录接口方法
    async getTree(deptId) {
      this.loading = true;
      let [err, data] = await dataAnalysisApi.awaitWrap(
        dataAnalysisApi.directoryTree(deptId)
      );
      this.loading = false;
      if (data) {
        if (data.length == 1) {
          this.listdata = data[0].children;
        } else {
          this.listdata = data;
        }
      }
    },
    isShow(shelf) {
      let id = this.shelf.documentNumber;
      return id == undefined ? true : id == shelf.documentNumber;
    },
    emitView(params) {
      this.$emit("on-view", params);
    },
    openDoc({ doc, shelf }) {
      if (doc.name === "出车三检") {
        this.$router.push({ path: "/daily/threeInspect" });
      } else if (doc.name === "隐患台账") {
        this.$router.push({ path: "/daily/hidDanger" });
      } else if (doc.name === "隐患整治台帐") {
        this.$router.push({
          path: "/daily/hidDanger",
          query: { zhenggaijd: 1 },
        });
      } else if (doc.name === "驾驶员违章") {
        this.$router.push({ path: "/daily/violation" });
      } else if (doc.name === "车辆事故") {
        this.$router.push({ path: "/daily/accident" });
      } else {
        this.shelf = shelf;
        this.doc = doc;
      }
    },
    closeDoc() {
      this.shelf = {};
      this.doc = {};
    },
    contextmenu(params) {
      this.$refs.book.contextmenu(params);
    },
  },
};
</script>

<style lang="scss">
.document-doc {
  .bookcase {
    padding: 10px;
    height: 100%;
  }

  .bookcase.one {
    height: 220px;
    .bookcase-item {
      margin-bottom: 0px;
    }
  }

  .bookcase-item {
    height: 200px;
    padding: 0 30px 6px 5px;
    margin-bottom: 12px;
    background: #627a7f;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;
    z-index: 0;
    &::before {
      content: "";
      width: calc(100% - 50px);
      height: 70%;
      position: absolute;
      bottom: 0;
      left: 0;
      background: #799396;
      border-radius: 6px;
      z-index: -1;
    }
    &::after {
      content: "";
      width: 100%;
      height: 6px;
      position: absolute;
      bottom: 0;
      left: 0;
      background: #f0eeec;
      border-radius: 3px;
      z-index: -1;
      box-shadow: 1px 1px 4px #6d6d6d;
    }
  }

  .bookcase-item:last-child {
    margin-bottom: 0px;
  }

  .index-book {
    height: calc(100% - 230px);
  }
  .index-book.one {
    height: 0px;
  }
  // 透明背景
  .block-n {
    height: 184px;
    width: 42px;
    margin: 20px 10px 0 10px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    // justify-content: center;
    color: #ffffff;
    font-size: 14px;
    text-align: center;
    background: url("~@/assets/img/block-n.png") no-repeat;
    position: relative;
    z-index: 2;
    box-shadow: 1px 0px 4px #6d6d6d;
  }
  .number {
    width: 16px;
    height: 16px;
    position: absolute;
    top: -7px;
    right: -8px;
    line-height: 16px;
    text-align: center;
    font-size: 14px;
    background: #d6e4fb;
    border-radius: 50%;
    box-shadow: 1px 1px 4px #6d6d6d;
  }
  .title-box {
    align-self: center;
    height: 188px;
    width: 30px;
    margin-right: 10px;
    padding: 0 40px;
    line-height: 20px;
    color: #000;
    text-align: center;
    font-size: 18px;
    position: relative;
    z-index: 2;
    box-shadow: 0px 0px 4px #6d6d6d;
    cursor: pointer;
  }
  .name_w {
    width: 40px !important;
  }
  .bg_A {
    background: url("~@/assets/img/a.png") no-repeat;
  }
  .bg_B {
    background: url("~@/assets/img/b.png") no-repeat;
  }
  .bg_C {
    background: url("~@/assets/img/c.png") no-repeat;
  }
  .bg_D {
    background: url("~@/assets/img/d.png") no-repeat;
  }
  .bg_E {
    background: url("~@/assets/img/a.png") no-repeat;
  }
  .bg_F {
    background: url("~@/assets/img/b.png") no-repeat;
  }
  .bg_G {
    background: url("~@/assets/img/c.png") no-repeat;
  }
  .bg_H {
    background: url("~@/assets/img/d.png") no-repeat;
  }
  .bg_I {
    background: url("~@/assets/img/a.png") no-repeat;
  }
  .bg_J {
    background: url("~@/assets/img/b.png") no-repeat;
  }
  .bg_K {
    background: url("~@/assets/img/c.png") no-repeat;
  }
  .bg_L {
    background: url("~@/assets/img/d.png") no-repeat;
  }
  .bg_M {
    background: url("~@/assets/img/a.png") no-repeat;
  }
  .bg_N {
    background: url("~@/assets/img/b.png") no-repeat;
  }
  .bg_O {
    background: url("~@/assets/img/c.png") no-repeat;
  }
  .bg_P {
    background: url("~@/assets/img/d.png") no-repeat;
  }
  .title {
    height: 140px;
    // display: flex;
    // align-items: center;
    padding-top: 10px;
    padding-bottom: 7px;
    overflow: hidden;
  }
  .xuhao {
    display: inline-block;
    margin: 20px 0 8px 0;
    font-size: 24px;
    font-weight: 700;
  }
  .level2 {
    width: calc(100% - 120px);
    height: 100%;
  }
  .doc-item {
    height: 184px;
    width: 20px;
    margin: 0 10px 1px 10px;
    padding: 5px 10px 0 10px;
    font-size: 14px;
    line-height: 14px;
    text-align: center;
    cursor: pointer;
    background: url("~@/assets/img/block.png") no-repeat;
    position: relative;
    z-index: 999;
    transition: all 0.3s;
    box-shadow: 0px 0px 2px #6d6d6d;

    p {
      margin: 0;
      padding-top: 3px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 10;
      overflow: hidden;
      height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    p.hidden {
      height: 110px;
    }
    .isRequery {
      position: absolute;
      bottom: 7px;
      right: 13px;
      color: red;
      font-size: 30px;
    }
  }

  .doc-item.active {
    margin-bottom: -25px;
    box-shadow: 0px 0px 10px 2px #2d4970;
  }

  .__panel.__slide {
    display: flex;
    align-items: flex-end;
  }
}
</style>
