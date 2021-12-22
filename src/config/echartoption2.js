import echarts from 'echarts'
import * as maps from '@/assets/map/index'
export const geooption1 = (name, mapData) => {
  echarts.registerMap(name, maps[name]);
  return {
    legend: {
      textStyle: {
        color: '#fff',
        fontFamily: 'Microsoft YaHei',
        // backgroundColor:'red'
      },
      bottom: 10,
      left: 15,
      data: ['月报警数']
    },
    tooltip: {
      trigger: 'item',
      formatter: (val) => {
        let html = val.value >= 0 ? `<div>${val.name}</div>
        <div><span>月报警数：</span>${val.data.value}</div>
        <div><span>月未处理数：</span>${val.data.yueweichulishu}</div>
        <div><span>月处理率：</span>${val.data.yuechulilv}</div>` : `<div>${val.name}</div>`;
        return html
      },
      confine: true
    },
    visualMap: {
      type: 'continuous',
      min: 0,
      max: 2500,
      bottom: 20,
      right: 40,
      inRange: {
        color: ['rgba(78,253,0,1)', 'rgba(251,239,1,1)', 'rgba(252,0,26,1)']
      },
      text: ['高', '低'],
      textStyle: {
        color: '#ffffff'
      },
      calculable: true
    },
    animationDuration: 3000,
    series: {
      name: '月报警数',
      type: "map3D",
      map: name,
      itemStyle: {
        color: 'rgba(255,255,255,0.1)',
        borderColor: '#41b4e1',
        borderWidth: 1,
      },
      label: {
        show: true,
        textStyle: {
          color: '#ffffff',
          fontSize: 12,
          backgroundColor: 'transparent',
          borderColor: 'red'
        }
      },
      viewControl: {
        distance: name == 'China' ? 88 : 120,
        // alpha:name=='China'?35:20,
        // beta:name=='China'?-25:0,
        // distance:120,
        alpha: 90,
        beta: 0,
      },
      shading: 'lambert',
      emphasis: {
        show: false,
        // label:{
        //   show: false,
        // },
        itemStyle: {
          color: '#01f5f8',
        }
      },
      data: mapData
    }
  }
}

export const geooption11 = () => {
  return {
    legend: {
      textStyle: {
        color: '#fefefe'
      },
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      axisLabel: {
        color: '#fefefe'
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      axisLabel: {
        color: '#fefefe'
      }
    },
    series: [{
      type: 'bar',
      barWidth: '25%',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 1,
            color: '#05AFD3'
          },
          {
            offset: 0,
            color: '#9507FC'
          }
        ])
      },
      data: [320, 332, 301, 334, 390, 330, 320]
    }, {
      type: 'bar',
      barWidth: '25%',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#12B986'
          },
          {
            offset: 1,
            color: '#DD9B17'
          }
        ])
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    }]
  }
}
export const geooption22 = () => {
  return {
    title: {
      text: "NOX超标占比",
      left: 'center',
      bottom: '21%',
      textStyle: {
        fontWeight: 'normal',
        color: '#44A9E1',
        textAlign: 'center',
      },
    },
    series: {
      name: '装备制造',
      type: 'pie',
      startAngle: 90,
      radius: [65, 85],
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#00cfb5' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#01e8f7' // 100% 处的颜色44A9E1
            }],
            global: false // 缺省为 false
          },
          shadowColor: 'rgba(0,0,0,0.1)',
          shadowBlur: 10,
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
        }
      },
      hoverAnimation: false,
      center: ['50%', '40%'],
      data: [{
        value: 30,
        label: {
          normal: {
            formatter: function (params) {
              return params.value + '%';
            },
            position: 'center',
            show: true,
            textStyle: {
              fontSize: 36,
              fontWeight: 'bold',
              color: '#00cfb5',
            }
          }
        },
      }, {
        value: 100 - 30,
        name: 'invisible',
        itemStyle: {
          normal: {
            color: '#12284c',
          },
        }
      }]
    }
  }
}
export const geooption33 = () => {
  return {
    title: {
      text: "BOD在线占比",
      left: 'center',
      bottom: '21%',
      textStyle: {
        fontWeight: 'normal',
        color: '#44A9E1',
        textAlign: 'center',
      },
    },
    series: {
      name: '装备制造',
      type: 'pie',
      startAngle: 90,
      radius: [65, 85],
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#f3752b' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#ffb508' // 100% 处的颜色44A9E1
            }],
            global: false // 缺省为 false
          },
          shadowColor: 'rgba(0,0,0,0.1)',
          shadowBlur: 10,
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
        }
      },
      hoverAnimation: false,
      center: ['50%', '40%'],
      data: [{
        value: 40,
        label: {
          normal: {
            formatter: function (params) {
              return params.value + '%';
            },
            position: 'center',
            show: true,
            textStyle: {
              fontSize: 36,
              fontWeight: 'bold',
              color: '#f3752b',
            }
          }
        },
      }, {
        value: 100 - 40,
        name: 'invisible',
        itemStyle: {
          normal: {
            color: '#12284c',
          },
        }
      }]
    }
  }
}
export const geooption44 = () => {
  var dataOption = [{
      value: 8,
      name: '国四'
    },
    {
      value: 3,
      name: '国五'
    },
    {
      value: 1,
      name: '国六'
    },
    {
      value: 0,
      name: '国三以下'
    }
  ]
  return {
    title: [{
      text: '今日超标车辆排放分布',
      left: 'center',
      bottom: '15',
      textStyle: {
        color: "#fff",
        fontWeight: 'normal'
      },
    }, {
      text: '12',
      left: 'center',
      top: 'center',
      textStyle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#44A9E1',
      },
    }, {
      text: '超标车辆数',
      left: 'center',
      top: '55%',
      textStyle: {
        color: "#fff",
        fontWeight: 'normal'
      },
    }],
    tooltip: {
      top: '5%',
      left: 'center',
      trigger: 'item'
    },
    legend: {
      top: '10%',
      right: '5%',
      orient: 'vertical',
      // left: 'right',
      textStyle: {
        color: '#fefefe',
        fontSize: 14
      },
      formatter: function (name) {
        var target;
        for (var i = 0, l = dataOption.length; i < l; i++) {
          if (dataOption[i].name == name) {
            target = dataOption[i].value;
          }
        }
        // var arr = [
        //   name + '    ', '67%' + '    ', '2.2%'
        // ]
        return name + '    ' + '67%' + '    ' + '2.2%'
      },
    },
    series: [{
      type: 'pie',
      radius: ['45%', '65%'],
      data: dataOption,
    }]
  }
}
export const geooption55 = () => {
  var dataOption2 = [{
      value: 1.4,
      name: '14%'
    },
    {
      value: 2,
      name: '20%'
    },
    {
      value: 3,
      name: '30%'
    },
    {
      value: 9,
      name: '8%'
    },
    {
      value: 2,
      name: '2%'
    },
    {
      value: 8,
      name: '8%'
    },
    {
      value: 1,
      name: '10%'
    },
    {
      value: 2,
      name: '20%'
    },
  ]
  return {
    title: [{
      text: '今日超标车辆运行时间特征',
      left: 'center',
      bottom: '15',
      textStyle: {
        color: "#fff",
        fontWeight: 'normal'
      },
    }, {
      text: '12',
      left: 'center',
      top: 'center',
      textStyle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#44A9E1',
      },
    }, {
      text: '超标车辆数',
      left: 'center',
      top: '55%',
      textStyle: {
        color: "#fff",
        fontWeight: 'normal'
      },
    }],
    tooltip: {
      top: '5%',
      left: 'center',
      trigger: 'item'
    },
    legend: {
      show: false
    },
    series: [{
      type: 'pie',
      radius: ['45%', '65%'],
      data: dataOption2,
    }]
  }
}
export const geooption66 = () => {
  return {
    xAxis: {
      type: 'category',
      axisLabel: {
        color: '#fefefe'
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#fefefe'
      }
    },
    series: [{
      lineStyle: {
        color: '#05E7F3',
        width: 4,
      },
      itemStyle: {
        borderWidth: 3,
        borderColor: '#FFCC1C',
        color: '#FFCC1C'
      },
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }]
  }
}