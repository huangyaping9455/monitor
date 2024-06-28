import { $axios, awaitWrap } from "../api";
/** 动态考核模块 */
export default {
  // 联网联控业户考核（日）列表
  getDayTJ(data) {
    return $axios.post("/blade-anbiao/anbiao/lwlkDeptDay/getDayTJ", data);
  },
  // 联网联控业户考核（日）列表
  getDeptDayTJ(data) {
    return $axios.post("/blade-anbiao/anbiao/lwlkDeptDay/getDayTJ", data);
  },
  // 联网联控车辆明细（日）列表
  getVehDayTJ(data) {
    return $axios.post("/blade-anbiao/anbiao/lwlkVehDay/getVehDayTJ", data);
  },
  // 车辆不合格点位明细列表
  getVehQualifyDetailTJ(data) {
    return $axios.post("/blade-anbiao/anbiao/lwlkQualifyDetail/getVehQualifyDetailTJ", data);
  },

  // 联网联控业户考核（周）列表
  getDeptWeekTJ(data) {
    return $axios.post("/blade-anbiao/anbiao/lwlkDeptWeek/getDeptWeekTJMX", data);
  },
  // 联网联控业户考核（月）列表
  getDeptMonthTJ(data) {
    return $axios.post("/blade-anbiao/anbiao/lwlkDeptMonth/getDeptMonthTJMX", data);
  },
  // 联网联控服务商考核（日）列表
  getOperDayTJ(data) {
    return $axios.post("/blade-anbiao/anbiao/lwlkOperDay/getOperDayTJMX", data);
  },
  // 联网联控服务商考核（周）列表
  getOperWeekTJ(data) {
    return $axios.post("/blade-anbiao/anbiao/lwlkOperWeek/getOperWeekTJ", data);
  },
  // 联网联控服务商考核（周）明细
  getOperWeekTJMX(data) {
    return $axios.post("/blade-anbiao/anbiao/lwlkOperWeek/getOperWeekTJMX", data);
  },
  // 联网联控服务商考核（月）列表
  getOperMonthTJ(data) {
    return $axios.post("/blade-anbiao/anbiao/lwlkOperMonth/getOperMonthTJ", data);
  },
  // 联网联控服务商考核（月）明细
  getOperMonthTJMX(data) {
    return $axios.post("/blade-anbiao/anbiao/lwlkOperMonth/getOperMonthTJMX", data);
  },
  // 联网联控车辆明细（日）列表
  getVehDayTJ(data) {
    return $axios.post("/blade-anbiao/anbiao/lwlkVehDay/getVehDayTJ", data);
  },
  // 车辆不合格点位明细列表
  getVehQualifyDetailTJ(data) {
    return $axios.post("/blade-anbiao/anbiao/lwlkQualifyDetail/getVehQualifyDetailTJ", data);
  },
  // 车辆不完整里程列表
  getVehContinuationDetailTJ(data) {
    return $axios.post(
      "/blade-anbiao/anbiao/lwlkContinuationDetail/getVehContinuationDetailTJ",
      data
    );
  },
  // 车辆漂移点位明细列表
  getVehDriftingDetailTJ(data) {
    return $axios.post("/blade-anbiao/anbiao/lwlkDriftingDetail/getVehDriftingDetailTJ", data);
  },
  // 课程情况
  getZFCourseInfoList(data) {
    return $axios.post("/blade-train/train/safetyEducation/getZFCourseInfoList", data);
  },
  // 学员情况
  getStudentInfoList(data) {
    return $axios.post("/blade-train/train/safetyEducation/getStudentInfoList", data);
  },
  // 根据企业名称获取 企业id
  getUnitByName(params) {
    return $axios.get("/blade-train/train/safetyEducation/getUnitByName", {
      params: params,
    });
  },
  // 政府-获取统计车辆数据
  getVehicleList(params) {
    return $axios.get("/blade-anbiao/anbiao/gpsVehicle/getVehicleList", {
      params: params,
    });
  },
  awaitWrap,
};
