import { $axios, awaitWrap } from "../api";
// import qs from "qs";
// import Cookies from "js-cookie";
/** 数据分析模块 */
export default {
  // 精细化超速看板-动态超速滚动数据及热力图数据
  getByAlarm(params) {
    return $axios.get("/blade-anbiao/anbiao/hpTotalReal/getByAlarm", {
      params,
    });
  },
  // 精细化超速看板-状态一览表
  getByAlarmChart(params) {
    return $axios.get("/blade-anbiao/anbiao/hpTotalReal/getByAlarmChart", {
      params,
    });
  },
  // 精细化超速看板-实时报警曲线
  getByAlarmTendency(params) {
    return $axios.get("/blade-anbiao/anbiao/hpTotalReal/getByAlarmTendency", {
      params,
    });
  },
  // 精细化超速看板-昨日企业报警前五排名数据
  getByDeptFifth(params) {
    return $axios.get("/blade-anbiao/anbiao/hpTotalReal/getByDeptFifth", {
      params,
    });
  },
  // 精细化超速看板-月度报警柱状数据
  getByMothWeekAlarm(params) {
    return $axios.get("/blade-anbiao/anbiao/hpTotalReal/getByMothWeekAlarm", {
      params,
    });
  },
  // 精细化超速看板-近七天报警柱状数据
  getBySevenAlarm(params) {
    return $axios.get("/blade-anbiao/anbiao/hpTotalReal/getBySevenAlarm", {
      params,
    });
  },
  // 精细化超速看板-今日数据
  getByToDay(params) {
    return $axios.get("/blade-anbiao/anbiao/hpTotalReal/getByToDay", {
      params,
    });
  },
  // 精细化超速看板-昨日
  getByYesterDay(params) {
    return $axios.get("/blade-anbiao/anbiao/hpTotalReal/getByYesterDay", {
      params,
    });
  },
  // 精细化超速看板-昨日政府报警前五排名数据
  getDiquFifth(params) {
    return $axios.get("/blade-anbiao/anbiao/hpTotalReal/getDiquFifth", {
      params,
    });
  },
  awaitWrap,
};
