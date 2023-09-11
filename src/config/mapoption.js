import echarts from "echarts";
import * as maps from "@/assets/map/index";

export const geooption = (name, mapData) => {
  console.log(name);
  echarts.registerMap(name, maps[name]);
  return {
    title: {
      text: `${name == "China" ? mapData[0].name : name}各地当月报警数`,
      textStyle: {
        color: "#01f8ff",
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Microsoft YaHei",
      },
      left: 20,
      top: 18,
    },
    tooltip: {
      trigger: "item",
      confine: true,
      formatter: (val) => {
        let html = `<div>${val.name}</div>
        <div>报警数：${val.value ? val.value : 0}</div>
        <div>车辆数：${
          val.data.cheliangshu && val.data.cheliangshu != -1
            ? val.data.cheliangshu
            : 0
        }</div>
        <div>企业数：${
          val.data.qiyeshu && val.data.qiyeshu != -1 ? val.data.qiyeshu : 0
        }</div>`;
        return html;
      },
    },
    visualMap: {
      type: "continuous",
      min: 0,
      max: 2500,
      bottom: 20,
      left: 40,
      inRange: {
        color: ["rgba(78,253,0,1)", "rgba(251,239,1,1)", "rgba(252,0,26,1)"],
      },
      text: ["高", "低"],
      textStyle: {
        color: "#ffffff",
      },
      calculable: true,
    },
    animationDuration: 3000,
    series: {
      name: "报警数",
      type: "map3D",
      map: name,
      instancing: true,
      itemStyle: {
        color: "rgba(255,255,255,0.1)",
        borderColor: "#41b4e1",
        borderWidth: 1,
      },
      top: "top",
      label: {
        show: true,
        textStyle: {
          color: "#ffffff",
          fontSize: 12,
          backgroundColor: "transparent",
          borderColor: "red",
        },
      },
      viewControl: {
        distance: name == "China" ? 88 : 120,
        // alpha:name=='China'?35:20,
        // beta:name=='China'?-25:0,
        // distance:120,
        alpha: 90,
        beta: 0,
      },
      shading: "lambert",
      emphasis: {
        show: false,
        // label:{
        //   show: false,
        // },
        itemStyle: {
          color: "#01f5f8",
        },
      },
      data: mapData,
    },
  };
};
export const geooption1 = (name, data) => {
  echarts.registerMap(name, maps[name]);
  //地图经纬度
  let geoCoordMap = {};
  var mapFeatures = echarts.getMap(name).geoJson.features;
  mapFeatures.forEach(function(v) {
    // 地区名称
    let name = v.properties.name;
    // 地区经纬度
    geoCoordMap[name] = v.properties.cp;
  });
  data = data.map((el) => {
    return {
      ...el,
      value: [...geoCoordMap[el.name], el.value],
    };
  });
  return {
    geo: {
      map: "china",
      itemStyle: {
        areaColor: "#0762fe",
        borderColor: "#051f98",
        emphasis: {
          areaColor: "#01f5f8",
        },
      },
      label: {
        emphasis: {
          show: false,
        },
      },
    },
    series: {
      type: "scatter",
      coordinateSystem: "geo",
      symbolSize: 8,
      itemStyle: {
        normal: {
          color: "#ffffff",
          borderColor: "#ffffff60",
          shadowBlur: 20,
        },
      },
      label: {
        normal: {
          formatter: "{b}",
          position: "right",
          show: true,
        },
      },
      data: data,
    },
  };
};
