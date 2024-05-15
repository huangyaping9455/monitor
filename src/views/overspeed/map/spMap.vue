<template>
  <baidu-map
    :center="{ lng: 104.074, lat: 30.7005 }"
    :zoom="8"
    :scroll-wheel-zoom="true"
    style="width: auto; height: 100%;"
    @ready="handler"
  >
    <!-- //地图类型 -->
    <bm-map-type
      :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
      anchor="BMAP_ANCHOR_TOP_LEFT"
    ></bm-map-type>
    <bml-heatmap
      :data="alarmDatas"
      :max="100"
      :radius="20"
      :gradient="{ 0.5: 'rgb(0, 110, 255)', 0.8: 'rgb(15, 255, 31)', 0.9: 'rgb(225, 75, 0)' }"
    ></bml-heatmap>
    <!-- <bm-point-collection
      :points="alarmDatas"
      shape="BMAP_POINT_SHAPE_STAR"
      color="red"
      size="BMAP_POINT_SIZE_SMALL"
    ></bm-point-collection> -->
  </baidu-map>
</template>

<script>
import { BmlHeatmap } from "vue-baidu-map"; //引人
export default {
  components: {
    //注册
    BmlHeatmap,
  },
  props: {
    alarmDatas: Array,
  },
  data() {
    return {
      mapList: [],
    };
  },
  mounted() {},
  methods: {
    handler({ BMap, map }) {
      let mapStyle = { style: "midnight" };
      map.setMapStyle(mapStyle);
    },
  },
};
</script>
