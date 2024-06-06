import * as echarts from "echarts";
export const geooption1 = (data1, data2, data3) => {
  return {
    grid: {
      top: "15%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      textStyle: {
        color: "#fff",
      },
    },
    xAxis: {
      type: "category",
      axisLabel: {
        color: "#fefefe",
      },
      data: ["第一周", "第二周", "第三周", "第四周"],
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#fefefe",
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "#152C4C",
        },
      },
    },
    series: [
      {
        name: "轻微超速",
        barWidth: 10, //柱状图 宽度
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#06C0FC" },
            { offset: 1, color: "#0292FF" },
          ]),
        },
        data: data1,
        type: "bar",
      },
      {
        name: "一般超速",
        barWidth: 10, //柱状图 宽度
        barGap: 0.6, //柱子之间间距
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#DBB005" },
            { offset: 1, color: "#C29B00" },
          ]),
        },
        data: data2,
        type: "bar",
      },
      {
        name: "严重超速",
        barWidth: 10, //柱状图 宽度
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#FF6D03" },
            { offset: 1, color: "#BE3F05" },
          ]),
        },
        data: data3,
        type: "bar",
      },
    ],
  };
};
export const geooption9 = (data1, data2, data3, date) => {
  return {
    grid: {
      top: "15%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      textStyle: {
        color: "#fff",
      },
    },
    xAxis: {
      type: "category",
      axisLabel: {
        color: "#fefefe",
      },
      data: date,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#fefefe",
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "#152C4C",
        },
      },
    },
    series: [
      {
        name: "轻微超速",
        barWidth: 10, //柱状图 宽度
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#06C0FC" },
            { offset: 1, color: "#0292FF" },
          ]),
        },
        data: data1,
        type: "bar",
      },
      {
        name: "一般超速",
        barWidth: 10, //柱状图 宽度
        barGap: 0.6, //柱子之间间距
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#DBB005" },
            { offset: 1, color: "#C29B00" },
          ]),
        },
        data: data2,
        type: "bar",
      },
      {
        name: "严重超速",
        barWidth: 10, //柱状图 宽度
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#FF6D03" },
            { offset: 1, color: "#BE3F05" },
          ]),
        },
        data: data3,
        type: "bar",
      },
    ],
  };
};
export const geooption2 = (time, data) => {
  return {
    grid: {
      top: "5%",
      left: "8%",
      right: "4%",
      bottom: "10%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      position: "top",
      // data: ["安全系数", "变化趋势"],
      textStyle: {
        color: "#fff",
        position: "top",
      },
    },
    xAxis: [
      {
        type: "category",
        axisLabel: {
          color: "#fefefe",
          formatter: function(value) {
            let res = value;
            if (res.length > 4) {
              res = res.substring(0, 3) + "..";
            }
            return res;
          },
        },
        data: time,
      },
    ],
    yAxis: [
      {
        type: "value",
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#fefefe",
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "#152C4C",
          },
        },
      },
    ],
    series: [
      {
        type: "bar",
        barWidth: 12, //柱状图 宽度
        label: {
          show: true,
          position: "top", // 顶部显示
          formatter: "{c}", // 显示数据值
          color: "#fff",
        },
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#69CDF8" },
            { offset: 1, color: "#0292FF" },
          ]),
        },
        data: data,
      },
    ],
  };
};
export const geooption3 = (time, data) => {
  data[4] = {
    value: data[4],
    itemStyle: {
      color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
        { offset: 0, color: "#f4c25a" },
        { offset: 1, color: "#e8a71d" },
      ]),
    },
  };
  console.log(data);
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      top: "3%",
      left: "15%",
      right: "10%",
      bottom: "8%",
    },
    legend: {
      position: "right",
      textStyle: {
        color: "#fff",
      },
    },
    xAxis: {
      show: false,
      type: "value",
      splitLine: {
        show: false,
        lineStyle: {
          type: "dashed",
          color: "#fefefe",
        },
      },
    },
    yAxis: {
      type: "category",
      axisLabel: {
        color: "#fefefe",
        lineHeight: 15,
        formatter: function(value) {
          let str = value.split("-");
          return str[0] + "\n" + str[1];
        },
      },
      splitLine: {
        show: false,
        lineStyle: {
          type: "dashed",
          color: "#fefefe",
        },
      },
      data: time,
    },
    series: [
      {
        type: "bar",
        barWidth: 10, //柱状图 宽度
        label: {
          show: true,
          position: "right", // 顶部显示
          formatter: "{c}", // 显示数据值
          color: "#fff",
        },
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#69CDF8" },
            { offset: 1, color: "#0292FF" },
          ]),
        },
        data: data,
      },
    ],
  };
};

export const geooption4 = (datas, data1, data2, data3) => {
  return {
    tooltip: {
      trigger: "axis",
      position: function(pt) {
        return [pt[0], "1%"];
      },
    },
    grid: {
      top: "15%",
      left: "3%",
      right: "4%",
      bottom: "20%",
      containLabel: true,
    },
    dataZoom: [
      {
        show: true,
        // realtime: true,
        start: 0,
        end: 100,
      },
    ],
    legend: {
      textStyle: {
        color: "#fff",
      },
    },
    xAxis: {
      type: "category",
      axisLabel: {
        color: "#fefefe",
      },
      // boundaryGap: false,
      // axisLine: { onZero: true },
      data: datas,
    },
    yAxis: {
      type: "value",
      // boundaryGap: [0, "100%"],
      axisLabel: {
        color: "#fefefe",
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "#113d5e",
        },
      },
    },
    series: [
      {
        name: "轻微超速",
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 2,
        },
        itemStyle: {
          color: "#06C0FC",
        },
        areaStyle: {
          opacity: 0.3,
          // color: "#09b0e746",
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 1, color: "#69cdf817" },
            { offset: 0, color: "#69CDF8" },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: data1,
      },
      {
        name: "一般超速",
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 2,
        },
        itemStyle: {
          color: "#DBB005",
        },
        areaStyle: {
          opacity: 0.3,
          // color: "#dbb00556",
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 1, color: "#dbb00511" },
            { offset: 0, color: "#DBB005" },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: data2,
      },
      {
        name: "严重超速",
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 2,
        },
        itemStyle: {
          color: "#FF6D03",
        },
        areaStyle: {
          opacity: 0.3,
          // color: "#ff6c0357",
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 1, color: "#ff6c0311" },
            { offset: 0, color: "#FF6D03" },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: data3,
      },
    ],
  };
};

export const geooption5 = (data) => {
  return {
    grid: {
      top: "10%",
      left: "3%",
      right: "4%",
      bottom: "30%",
    },
    series: [
      {
        type: "gauge",
        startAngle: 225,
        endAngle: -45,
        min: 0,
        max: 100,
        splitNumber: 10,
        itemStyle: {
          // color: "#58D9F9",
          // shadowColor: "rgba(0,138,255,0.45)",
          // shadowBlur: 10,
          // shadowOffsetX: 2,
          // shadowOffsetY: 2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#8EB9FA" },
            { offset: 1, color: "#0292FF" },
          ]),
        },
        progress: {
          show: true,
          roundCap: false,
          width: 11,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          roundCap: false,
          lineStyle: {
            width: 11,
            color: [[1, "#142A46"]],
          },
          itemStyle: {
            color: "red",
            shadowColor: "#142A46",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 30,
          color: "#B6F9FF",
          fontSize: 20,
        },
        title: {
          show: false,
        },
        detail: {
          title: "轻微超速",
          // backgroundColor: "#fff",
          // borderColor: "#999",
          // borderWidth: 2,
          width: "100%",
          lineHeight: 70,
          height: 40,
          borderRadius: 0,
          offsetCenter: [0, "35%"],
          valueAnimation: true,
          color: "#B6F9FF",
          fontSize: 14,
          formatter: function(value) {
            return "轻微超速";
          },
          // formatter: function(value) {
          //   return "{value|" + value.toFixed(0) + "}{unit|km/h}";
          // },
          rich: {
            value: {
              fontSize: 14,
              fontWeight: "inherit",
              color: "#B6F9FF",
            },
          },
        },
        data: [
          {
            value: data,
          },
        ],
      },
    ],
  };
};

export const geooption6 = (data) => {
  return {
    grid: {
      top: "15%",
      left: "3%",
      right: "4%",
      bottom: "20%",
    },
    series: [
      {
        type: "gauge",
        startAngle: 225,
        endAngle: -45,
        min: 0,
        max: 100,
        splitNumber: 10,
        itemStyle: {
          // color: "#58D9F9",
          // shadowColor: "rgba(0,138,255,0.45)",
          // shadowBlur: 10,
          // shadowOffsetX: 2,
          // shadowOffsetY: 2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#DED29D" },
            { offset: 1, color: "#C29B00" },
          ]),
        },
        progress: {
          show: true,
          roundCap: false,
          width: 11,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          roundCap: false,
          lineStyle: {
            width: 11,
            color: [[1, "#142A46"]],
          },
          itemStyle: {
            color: "red",
            shadowColor: "#142A46",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 30,
          color: "#B6F9FF",
          fontSize: 20,
        },
        title: {
          show: false,
        },
        detail: {
          // backgroundColor: "#fff",
          // borderColor: "#999",
          // borderWidth: 2,
          width: "100%",
          lineHeight: 70,
          height: 40,
          // borderRadius: 5,
          offsetCenter: [0, "35%"],
          valueAnimation: true,
          color: "#B6F9FF",
          fontSize: 14,
          formatter: function(value) {
            return "一般超速";
          },
          // formatter: function(value) {
          //   return "{value|" + value.toFixed(0) + "}{unit|km/h}";
          // },
          rich: {
            value: {
              fontSize: 20,
              // fontWeight: "inherit",
              color: "#B6F9FF",
            },
            // unit: {
            //   fontSize: 20,
            //   color: "#B6F9FF",
            //   padding: [0, 0, 0, 10],
            // },
          },
        },
        data: [
          {
            value: data,
          },
        ],
      },
    ],
  };
};

export const geooption7 = (data) => {
  return {
    grid: {
      top: "15%",
      left: "3%",
      right: "4%",
      bottom: "20%",
    },
    series: [
      {
        type: "gauge",
        startAngle: 225,
        endAngle: -45,
        min: 0,
        max: 100,
        splitNumber: 10,
        itemStyle: {
          // color: "#58D9F9",
          // shadowColor: "rgba(0,138,255,0.45)",
          // shadowBlur: 10,
          // shadowOffsetX: 2,
          // shadowOffsetY: 2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#FEAD56" },
            { offset: 1, color: "#BE3F05" },
          ]),
        },
        progress: {
          show: true,
          roundCap: false,
          width: 11,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          roundCap: false,
          lineStyle: {
            width: 11,
            color: [[1, "#142A46"]],
          },
          itemStyle: {
            // shadowColor: "#142A46",
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 30,
          color: "#B6F9FF",
          fontSize: 20,
        },
        title: {
          show: false,
        },
        detail: {
          // backgroundColor: "#fff",
          // borderColor: "#999",
          // borderWidth: 2,
          width: "100%",
          lineHeight: 70,
          height: 40,
          // borderRadius: 5,
          offsetCenter: [0, "35%"],
          valueAnimation: true,
          color: "#B6F9FF",
          fontSize: 14,
          formatter: function(value) {
            return "严重超速";
          },
          // formatter: function(value) {
          //   return "{value|" + value.toFixed(0) + "}{unit|km/h}";
          // },
          rich: {
            value: {
              fontSize: 20,
              // fontWeight: "inherit",
              color: "#B6F9FF",
            },
            // unit: {
            //   fontSize: 20,
            //   color: "#B6F9FF",
            //   padding: [0, 0, 0, 10],
            // },
          },
        },
        data: [
          {
            value: data,
          },
        ],
      },
    ],
  };
};

export const geooption8 = (data) => {
  return {
    grid: {
      top: "50%",
      left: "-100%",
      right: "0%",
      bottom: "0%",
    },
    xAxis: {
      show: false,
      type: "category",
    },
    yAxis: {
      show: false,
      type: "value",
    },
    series: [
      {
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 2,
        },
        itemStyle: {
          color: "#FF6D03",
        },
        emphasis: {
          focus: "series",
        },
        data: data,
      },
    ],
  };
};