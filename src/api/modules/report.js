import {
  $axios,
  awaitWrap
} from '../api';
import qs from 'qs';
/** 数据分析模块 */
export default {
  //政府报警统计-报警统计结算
  getZFBJTJJS(data) {
    return $axios.post('/blade-anbiao/anbiao/zhengFuBaoGao/getList', data);
  },
  getZFDQBJCLLVTJ(data) {
    return $axios.post('/blade-anbiao/anbiao/organization/getList', data);
  },
  // 车辆日运行情况统计
  getZFCLRYXTJ(data) {
    return $axios.post('/blade-anbiao/anbiao/zhengFuBaoJingTongJi/getZFCLRYXTJ', data);
  },
  // 企业日运行情况统计
  getQYRYXTJ(data) {
    return $axios.post('/blade-anbiao/anbiao/zhengFuBaoJingTongJi/GetQYRYXTJ', data);
  },
  //政府报警统计-报警统计结算
  getZFDQBJTJJS(data) {
    return $axios.post('/blade-anbiao/anbiao/zhengFuBaoJingTongJi/getZFDQBJTJPM', data);
  },
  getZFCLBJTJPM(data) {
    return $axios.post('/blade-anbiao/anbiao/zhengFuBaoJingTongJi/getZFCLBJTJPM', data);
  },
  // 周报下载
  getZBdown(data) {
    data = qs.stringify(data)
    return $axios.post('/blade-anbiao/anbiao/baobiaowenjian/preview', data);
  },
  // 月报下载
  getYBdown(data) {
    data = qs.stringify(data)
    return $axios.post('/blade-anbiao/anbiao/baobiaowenjian/preview', data);
  },
  // 标准化弹出列表
  getTreeTable(params) {
    return $axios.get('/blade-doc/doc/biaozhunhuamuban/listTree',{ params: params });
  },
  // 安全达标统计列表
  getSafetyStandardsQiYeList(data) {
    return $axios.post('/blade-anbiao/anbiao/zhengFuShouYeNew/getSafetyStandardsQiYeList', data);
  },
  awaitWrap
};
