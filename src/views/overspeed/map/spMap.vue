<template>
  <div style="height:100%;justify-content: center;position: relative" id="map" />
</template>

<script>
import { HeatmapLayer, Scene } from "@antv/l7";
import { BaiduMap } from "@antv/l7-maps";
export default {
  data() {
    return {
      scene: null,
    };
  },
  mounted() {
    // this.scene = new Scene({
    //   id: "map",
    //   map: new BaiduMap({
    //     center: [110.097892, 33.853662],
    //     zoom: 5.056,
    //     style: "344b005fd5b4220a55241c25e7733e81",
    //     // 百度地图的logo是否可见，默认true
    //     logoVisible: false,
    //   }),
    // });
  },
  methods: {
    init(list) {
      let scene = new Scene({
        id: "map",
        map: new BaiduMap({
          center: [110.097892, 33.853662],
          zoom: 5.056,
          style: "344b005fd5b4220a55241c25e7733e81",
          // 百度地图的logo是否可见，默认true
          logoVisible: false,
        }),
      });
      scene.on("loaded", () => {
        console.log(list);
        const layer = new HeatmapLayer({
          // autoFit: true,
        })
          .source(list, {
            parser: {
              type: "json",
              x: "longitude",
              y: "latitude",
            },
            transforms: [
              {
                type: "grid",
                size: 10000,
                field: "v",
                method: "sum",
              },
            ],
          })
          .shape("square")
          .style({
            coverage: 1,
            angle: 0,
          })
          .color(
            "count",
            [
              "#8C1EB2",
              "#8C1EB2",
              "#DA05AA",
              "#F0051A",
              "#FF2A3C",
              "#FF4818",
              "#FF4818",
              "#FF8B18",
              "#F77B00",
              "#ED9909",
              "#ECC357",
              "#EDE59C",
            ].reverse()
          );
        scene.addLayer(layer);
      });
    },
  },
};
</script>
