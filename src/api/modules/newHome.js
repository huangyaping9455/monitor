import { $axios, awaitWrap } from "../api";

export default {
  // 车辆 企业总数
  getOne(params) {
    return $axios.get('/blade-anbiao/anbiao/zhengFuShouYeNew/getOne', {
      params: params,
    });
  },

  // 平台安全标准
  getVehAlarmCount(data) {
    return $axios.post('/blade-anbiao/anbiao/zhengFuShouYeTJ/getVehAlarmCount',
      data
    );
  },

  // 大屏首页-监控行为
  getAlarmCount(data) {
    return $axios.post('/blade-anbiao/anbiao/zhengFuShouYeTJ/getAlarmCount',
      data
    );
  },

  awaitWrap
};

