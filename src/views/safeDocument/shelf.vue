<template>
  <div class="bookcase-item">
    <div
      :class="[
        'title-box',
        'bg_' + shelf.documentNumber,
        { name_w: shelf.name.length > 6 },
      ]"
      @click="$emit('open', { doc: shelf, shelf })"
      @contextmenu.prevent="
        $emit('contextmenu', { event: $event, data: shelf })
      "
    >
      <span class="xuhao">{{ shelf.documentNumber }}</span>
      <div class="title">
        <el-tooltip
          class="item"
          effect="light"
          :content="shelf.name"
          placement="top"
        >
          <b>{{ shelf.name }}</b>
        </el-tooltip>
        <!-- <b>{{ shelf.name }}</b> -->
      </div>
    </div>
    <div class="level2">
      <scroll ref="scroll" :ops="scrollOpsBySlide">
        <div
          v-for="doc in shelf.children"
          :key="doc.id"
          :class="['doc-item', { active: active.id == doc.id }]"
          :title="doc.name"
          @mousedown="e = $event"
          @mouseup="mouseup($event, { doc, shelf })"
          @contextmenu.prevent="
            $emit('contextmenu', { event: $event, data: doc })
          "
        >
          <b>{{ doc.documentNumber }}</b>
          <p :class="{ hidden: doc.name.length > 7 }">
            <b
              v-for="(n, i) in doc.name.length > 7
                ? doc.name.substr(0, 6)
                : doc.name"
              :key="i"
              >{{ n }}</b
            >
          </p>
          <span v-if="doc.name.length > 7">...</span>
          <span v-show="doc.fileNum != 0" class="number">
            {{ doc.fileNum }}
          </span>
          <el-tooltip
            effect="light"
            content="必填"
            placement="right"
            v-if="doc.isRequired == 1"
            class="isRequery"
          >
            <span>*</span>
          </el-tooltip>
        </div>
        <!-- <div class="block-n">
          <p>添加文件夹</p>
        </div>-->
      </scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: "shelf",
  props: {
    shelf: Object,
    active: Object,
    split: Number,
  },
  data() {
    return {
      e: {},
      // 柜子架 横向滚动配置
      scrollOpsBySlide: {
        scrollPanel: {
          scrollingY: false,
        },
        bar: {
          disable: true,
        },
        vuescroll: {
          detectResize: false,
          mode: "slide",
          scroller: {
            bouncing: {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            },
            minZoom: 1,
            maxZoom: 1,
          },
        },
      },
    };
  },
  watch: {
    split() {
      this.$refs.scroll.refresh();
    },
  },
  methods: {
    mouseup(e, params) {
      if (e.x == this.e.x && e.y == this.e.y && e.button == 0)
        this.$emit("open", params);
    },
  },
};
</script>

<style lang="scss"></style>
