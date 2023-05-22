import { $axios, awaitWrap } from "../api";
import Cookies from "js-cookie";
/** 政企互通模块 */
export default {
  // 分页-通知公告管理
  getanbiaolist(data) {
    return $axios.post("/blade-anbiao/anbiao/xinxijiaohuzhuti/list", data);
  },
  // 新增-通知公告
  createanbiaolist(data) {
    return $axios.post("/blade-anbiao/anbiao/xinxijiaohuzhuti/insert", data);
  },
  // 根据ID查询通知公告详情
  getOne(data) {
    return $axios.post("/blade-anbiao/anbiao/xinxijiaohuzhuti/getOne", data);
  },
  // 编辑-通知公告
  update(data) {
    return $axios.post("/blade-anbiao/anbiao/xinxijiaohuzhuti/update", data);
  },
  // 获取送达企业列表
  getQiYe(params) {
    return $axios.get("/blade-anbiao/anbiao/xinxijiaohuzhuti/getQiYe", {
      params: params,
    });
  },
  // 政府-获取统计车辆数据
  getVehicleList(params) {
    return $axios.get("/blade-anbiao/anbiao/gpsVehicle/getVehicleList", {
      params: params,
    });
  },
  // 政府-获取政府组织树结构数据
  getTree(params) {
    return $axios.get("/blade-anbiao/anbiao/organization/getTree", {
      params: params,
    });
  },
  // 政府-获取政府组织树结构数据
  getByCode(params) {
    return $axios.get("/blade-system/dict/getByCode", {
      params: params,
    });
  },
  // 回复企业
  getHFQY(params) {
    return $axios.get("/blade-anbiao/anbiao/xinxijiaohuzhuti/getHFQY", {
      params: params,
    });
  },
  // 回复企业 list
  xinXiJiaoHuHuiFuList(data) {
    return $axios.post("/blade-anbiao/anbiao/xinXiJiaoHuHuiFu/list", data);
  },
  // 政府车辆统计-运营商
  getVehicleYunYingShang(data) {
    return $axios.post(
      "/blade-anbiao/anbiao/vehicle/getVehicleYunYingShang",
      data
    );
  },
  // 政府报警统计-实时监控-指标分析
  selectGetZFJk(data) {
    return $axios.post(
      "/blade-anbiao/anbiao/zhengFuBaoJingTongJi/selectGetZFJk",
      data
    );
  },
  // 运营商查岗-列表
  getCheckPostList(data) {
    return $axios.post("/blade-anbiao/anbiao/checkPost/getCheckPostList", data);
  },
  // 运营商查岗-新增
  checkPostInsert(data) {
    return $axios.post("/blade-anbiao/anbiao/checkPost/insert", data);
  },
  // 运营商查岗-详情
  checkPostDetail(params) {
    return $axios.get("/blade-anbiao/anbiao/checkPost/detail", {
      params: params,
    });
  },

  // 整改审核
  changeAudit(params) {
    return $axios.get("/blade-anbiao/anbiao/issueAbarbeitung/audit", {
      params,
      headers: {
        "blade-auth": "Bearer " + Cookies.get("accessToken"),
      },
    });
  },
  //批量审核
  batchAudit(params) {
    return $axios.get("/blade-anbiao/anbiao/issueAbarbeitung/batchAudit", {
      params,
      headers: {
        "blade-auth": "Bearer " + Cookies.get("accessToken"),
      },
    });
  },
  // 整改通知详情
  abarbeitungDetail(params) {
    return $axios.get(
      "/blade-anbiao/anbiao/issueAbarbeitung/detail",
      {
        params,
      },
      {
        headers: {
          "blade-auth": "Bearer " + Cookies.get("accessToken"),
        },
      }
    );
  },
  // 整改审核详情
  detailDeptList(params) {
    return $axios.get(
      "/blade-anbiao/anbiao/issueAbarbeitung/detailDeptList",
      {
        params,
      },
      {
        headers: {
          "blade-auth": "Bearer " + Cookies.get("accessToken"),
        },
      }
    );
  },
  // 下发整改 分页
  getAnquanhuiyiPage(data) {
    return $axios.post(
      "/blade-anbiao/anbiao/issueAbarbeitung/getAnquanhuiyiPage",
      data,
      {
        headers: {
          "blade-auth": "Bearer " + Cookies.get("accessToken"),
        },
      }
    );
  },
  // 下发整改新增
  insert(data) {
    return $axios.post("/blade-anbiao/anbiao/issueAbarbeitung/insert", data, {
      headers: {
        "blade-auth": "Bearer " + Cookies.get("accessToken"),
      },
    });
  },
  awaitWrap,
};
