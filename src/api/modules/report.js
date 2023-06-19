import { $axios, awaitWrap } from "../api";
import qs from "qs";
/** 数据分析模块 */
export default {
  //政府报警统计-报警统计结算
  getZFBJTJJS(data) {
    return $axios.post("/blade-anbiao/anbiao/zhengFuBaoGao/getList", data);
  },
  getZFDQBJCLLVTJ(data) {
    return $axios.post("/blade-anbiao/anbiao/organization/getList", data);
  },
  // 企业详情
  detailByDeptId(params) {
    return $axios.get(`/blade-anbiao/anbiao/organizations/detailByDeptId`, {
      params: params,
    });
  },
  // 车辆日运行情况统计
  getZFCLRYXTJ(data) {
    return $axios.post(
      "/blade-anbiao/anbiao/zhengFuBaoJingTongJi/getZFCLRYXTJ",
      data
    );
  },
  // 企业日运行情况统计
  getQYRYXTJ(data) {
    return $axios.post(
      "/blade-anbiao/anbiao/zhengFuBaoJingTongJi/GetQYRYXTJ",
      data
    );
  },
  // 运营商日运行情况统计 青岛
  getYYSRYXTJ(data) {
    return $axios.post(
      "/blade-anbiao/anbiao/zhengFuBaoJingTongJi/getYYSRYXTJ",
      data
    );
  },
  // 运营商日运行情况统计 唐僧
  getTSYYSRYXTJ(data) {
    return $axios.post("/blade-anbiao/anbiao/operatorInfo/getYYSRYXTJ", data);
  },
  // 运营商 档案
  getYYSZFVehiclePage(data) {
    return $axios.post(
      "/blade-anbiao/anbiao/operatorInfo/getZFVehiclePage",
      data
    );
  },
  // 道路运输企业联网联控考核评分
  getLWLKTJ(data) {
    return $axios.post(
      "/blade-anbiao/anbiao/zhengFuBaoJingTongJi/getLWLKTJ",
      data
    );
  },
  // 道路运输企业联网联控考核评分 成都
  getCDDayTJ(data) {
    return $axios.post("/blade-anbiao/anbiao/lwlkDeptDay/getCDDayTJ", data);
  },
  // 道路运输运营商联网联控考核评分
  getFWSLWLKTJ(data) {
    return $axios.post(
      "/blade-anbiao/anbiao/zhengFuBaoJingTongJi/getFWSLWLKTJ",
      data
    );
  },
  //政府报警统计-报警统计结算
  getZFDQBJTJJS(data) {
    return $axios.post(
      "/blade-anbiao/anbiao/zhengFuBaoJingTongJi/getZFDQBJTJPM",
      data
    );
  },
  //政府报警统计-地区进区域报警排名统计
  getDQIntoAreaPMTJ(data) {
    return $axios.post(
      "/blade-anbiao/anbiao/zhengFuBaoJingTongJi/getDQIntoAreaPMTJ",
      data
    );
  },
  //政府报警统计-企业进区域报警排名统计
  getDeptIntoAreaPMTJ(data) {
    return $axios.post(
      "/blade-anbiao/anbiao/zhengFuBaoJingTongJi/getDeptIntoAreaPMTJ",
      data
    );
  },
  //政府报警统计-车辆进区域报警排名统计
  gettDeptCLIntoAreaPMTJ(data) {
    return $axios.post(
      "/blade-anbiao/anbiao/zhengFuBaoJingTongJi/gettDeptCLIntoAreaPMTJ",
      data
    );
  },
  getZFCLBJTJPM(data) {
    return $axios.post(
      "/blade-anbiao/anbiao/zhengFuBaoJingTongJi/getZFCLBJTJPM",
      data
    );
  },
  // 周报下载
  getZBdown(data) {
    data = qs.stringify(data);
    return $axios.post("/blade-anbiao/anbiao/baobiaowenjian/preview", data);
  },
  // 月报下载
  getYBdown(data) {
    data = qs.stringify(data);
    return $axios.post("/blade-anbiao/anbiao/baobiaowenjian/preview", data);
  },
  // 标准化弹出列表
  getTreeTable(params) {
    return $axios.get("/blade-doc/doc/biaozhunhuamuban/listTree", {
      params: params,
    });
  },
  // 安全达标统计列表
  getSafetyStandardsQiYeList(data) {
    return $axios.post(
      "/blade-anbiao/anbiao/zhengFuShouYeNew/getSafetyStandardsQiYeList",
      data
    );
  },
  // 获取学习记录列表
  selectZFPersonLearnInfoAll(data) {
    return $axios.post(
      "/blade-anbiao/anbiao/qiYeShouYe/selectZFPersonLearnCoutAll",
      data
    );
  },
  // 获取学习 详情 记录列表
  selectPersonLearnInfoAll(data) {
    return $axios.post(
      "/blade-anbiao/anbiao/qiYeShouYe/selectPersonLearnInfoAll",
      data
    );
  },
  // 获取隐患排查 明细 列表
  getTroubleSetList(data) {
    return $axios.post("/blade-anbiao/anbiao/trouble/buiness/list", data);
  },
  // 获取隐患排查列表
  getTroubleList(data) {
    return $axios.post(
      "/blade-anbiao/anbiao/trouble/buiness/statisticsList",
      data
    );
  },
  // 获取隐患排查 数
  getTroublelistCount(params) {
    return $axios.get("/blade-anbiao/anbiao/trouble/buiness/listCount", {
      params: params,
    });
  },
  // 获取首页隐患排查 数
  getTroubleCountNum(comId) {
    return $axios.get(
      `/blade-anbiao/anbiao/trouble/buiness/countNumZF?yunguanid=${comId}`
    );
  },
  // 政府-联网考核五率统计
  getOneRate(params) {
    return $axios.get(`/blade-anbiao/anbiao/zhengFuShouYeNew/getOneRate`, {
      params: params,
    });
  },
  // 风险管控列表
  getRiskList(data) {
    return $axios.post(
      `/blade-anbiao/anbiao/zhengFuBaoJingTongJi/getDQRiskPMTJ`,
      data
    );
  },
  // 风险管控详情
  getRiskListByType(params) {
    return $axios.get(`/blade-anbiao/anbiao/yinhuanpaicha/getRiskListByType`, {
      params: params,
    });
  },
  // 政府车辆档案信息
  getZFVehiclePage(data) {
    return $axios.post("/blade-anbiao/anbiao/vehicle/getZFVehiclePage", data);
  },
  // 政府驾驶员档案信息
  getZFJSYPageList(data) {
    return $axios.post(
      "/blade-anbiao/anbiao/jiashiyuan/getZFJSYPageList",
      data
    );
  },
  // 车辆详情
  getVehicleDetail(params) {
    return $axios.get(`/blade-anbiao/anbiao/vehicle/detail`, {
      params: params,
    });
  },
  // 驾驶员详情
  getDriverDetail(params) {
    return $axios.get(`/blade-anbiao/anbiao/jiashiyuan/detail`, {
      params: params,
    });
  },
  // 车辆维护
  getZFVehicleWeiHuPage(data) {
    return $axios.post(
      `/blade-anbiao/anbiao/cheliangweihu/getZFVehicleWeiHuPage`,
      data
    );
  },
  // 车辆维护详情
  getvehicleWHrDetail(params) {
    return $axios.get(`/blade-anbiao/anbiao/cheliangweihu/detail`, {
      params: params,
    });
  },
  // 车辆事故
  getZFCLSGPage(data) {
    return $axios.post(`/blade-anbiao/anbiao/shigubaogao/getZFCLSGPage`, data);
  },
  // 车辆事故详情
  getvehicleSGDetail(params) {
    return $axios.get(`/blade-anbiao/anbiao/shigubaogao/detail`, {
      params: params,
    });
  },
  directoryTree(deptId, parentId) {
    return $axios.get(`/blade-doc/doc/SafetyProductionFile/boxTree`, {
      params: {
        deptId,
        parentId,
      },
    });
  },
  // 法律法规列表
  getlawList(data) {
    return $axios.post(
      `/blade-anbiao/anbiao/lawsRegulations/getNoticeAll`,
      data
    );
  },
  // 法律法规详情
  getlawDetail(params) {
    return $axios.get(`/blade-anbiao/anbiao/lawsRegulations/detail`, {
      params,
    });
  },
  // 政府隐患排查统计
  getZFPage(data) {
    return $axios.post(`/blade-anbiao/anbiao/dangerTrouble/getZFPage`, data);
  },
  // 合规台账排名
  safetyList(data) {
    return $axios.post(
      `/blade-anbiao/anbiao/safetyproductionfileNum/getList`,
      data
    );
  },
  // 学习情况统计--课件明细
  getCoursewareList(params) {
    return $axios.get(`/blade-anbiao/anbiao/qiYeShouYe/getCoursewareList`, {
      params,
    });
  },
  // 驾运宝 学习地址前缀
  getLearnRecordUrl(params) {
    return $axios.get(
      `/blade-anbiao/anbiao/jiaYunBaoStudyInfo/getLearnRecordUrl`,
      {
        params,
      }
    );
  },
  // 档案信息完整率列表列表
  getDeptFullRateTJ(data) {
    return $axios.post(
      "/blade-anbiao/anbiao/deptFullRate/getDeptFullRateTJ",
      data
    );
  },
  awaitWrap,
};
