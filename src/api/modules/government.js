import {
  $axios,
  awaitWrap
} from '../api';
/** 政企互通模块 */
export default {
  // 分页-通知公告管理
  getanbiaolist(data) {
    return $axios.post('/blade-anbiao/anbiao/xinxijiaohuzhuti/list', data);
  },
  // 新增-通知公告
  createanbiaolist(data) {
    return $axios.post('/blade-anbiao/anbiao/xinxijiaohuzhuti/insert', data);
  },
  // 根据ID查询通知公告详情
  getOne(data) {
    return $axios.post('/blade-anbiao/anbiao/xinxijiaohuzhuti/getOne', data);
  },
  // 编辑-通知公告
  update(data) {
    return $axios.post('/blade-anbiao/anbiao/xinxijiaohuzhuti/update', data);
  },
  // 获取送达企业列表
  getQiYe(params) {
    return $axios.get('/blade-anbiao/anbiao/xinxijiaohuzhuti/getQiYe', {
      params: params
    });
  },
  // 政府-获取统计车辆数据
  getVehicleList(params) {
    return $axios.get('/blade-anbiao/anbiao/gpsVehicle/getVehicleList', {
      params: params
    });
  },
  // 政府-获取政府组织树结构数据
  getTree(params) {
    return $axios.get('/blade-anbiao/anbiao/organization/getTree', {
      params: params
    });
  },
  // 政府-获取政府组织树结构数据
  getByCode(params) {
    return $axios.get('/blade-system/dict/getByCode', {
      params: params
    });
  },
  awaitWrap
};