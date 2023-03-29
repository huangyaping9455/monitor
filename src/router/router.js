import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout/index";

Vue.use(Router);

//解决点击同一个路由报错
const [originalPush, routerReplace] = [
  Router.prototype.push,
  Router.prototype.replace,
];
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Router.prototype.replace = function replace(location) {
  return routerReplace.call(this, location).catch((error) => error);
};

export const constantRouterMap = [
  {
    path: "/",
    // redirect: '/home'
    redirect: function() {
      if (window.location.search === "") {
        return "/home";
      } else {
        return "wel";
      }
    },
  },
  {
    path: "/login",
    meta: {
      title: "登录",
      requiresAuth: false,
    },
    component: () => import("@/views/login"),
  },
  {
    path: "/wel",
    meta: {
      title: "欢迎页",
      requiresAuth: false,
    },
    component: () => import("@/views/wel"),
  },
  {
    path: "/home",
    meta: {
      title: "首页",
      requiresAuth: true,
    },
    component: () => import("@/views/Home/index"),
  },
  {
    path: "/dataAnalysis",
    meta: {
      title: "数据分析",
      requiresAuth: true,
    },
    component: () => import("@/views/DataAnalysis/index"),
    // component: () => import('@/views/DataAnalysis/index_new')
  },
  {
    path: "/dataAnalysis_gz",
    meta: {
      title: "数据分析",
      requiresAuth: true,
    },
    component: () => import("@/views/DataAnalysis/index-gz"),
  },
  {
    path: "/mapAnalysis",
    meta: {
      title: "地图监控",
      requiresAuth: true,
    },
    component: () => import("@/views/mapAnalysis/index"),
  },
  {
    path: "/OBDDataAnalysis",
    meta: {
      title: "OBD数据分析",
      requiresAuth: true,
    },
    component: () => import("@/views/DataAnalysis/index_new"),
  },
  {
    path: "/enterprise",
    meta: {
      title: "报警排名统计",
      requiresAuth: true,
    },
    component: () => import("@/views/Statistics/enterprise"),
  },
  {
    path: "/treatmentRate",
    meta: {
      title: "处理率统计",
      requiresAuth: true,
    },
    component: () => import("@/views/TreatmentRate/index"),
  },
  {
    path: "/treatmentRateinfo",
    meta: {
      title: "处理率统计详情",
      requiresAuth: true,
    },
    component: () => import("@/views/TreatmentRate/treatmentRateinfo"),
  },
  {
    path: "/vehicleinfo",
    meta: {
      title: "报警车辆详情",
      requiresAuth: true,
    },
    component: () => import("@/views/TreatmentRate/vehicleinfo"),
  },
  {
    path: "/addNotice",
    name: "addNotice",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/Notice/addNotice"),
  },
  {
    path: "/addNotice",
    name: "addNotice",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/Notice/addNotice"),
  },
  {
    path: "/addSafetyInspection",
    name: "addSafetyInspection",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/SafetyInspection/addSafetyInspection"),
  },
  {
    path: "/addDocumentFile",
    name: "addDocumentFile",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/DocumentFile/addDocumentFile"),
  },
  {
    path: "/addIssueRectification",
    name: "addIssueRectification",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/IssueRectification/addIssueRectification"),
  },
  // 企业报警排名
  {
    path: "/QYvehicle",
    name: "QYvehicle",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/QYvehicle/index"),
  },
  // 日运行情况统计
  {
    path: "/DayStatistics",
    name: "DayStatistics",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/DayStatistics/index"),
  },
  // 企业日运行情况统计
  {
    path: "/QYDayStatistics",
    name: "QYDayStatistics",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/QYDayStatistics/index"),
  },
  // 运营商日运行情况统计
  {
    path: "/YYSDayStatistics_qd",
    name: "YYSDayStatistics_qd",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/YYSDayStatistics/index"),
  },
  {
    path: "/YYSDayStatistics_ts",
    name: "YYSDayStatistics_ts",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/YYSDayStatistics/index-ts.vue"),
  },
  {
    path: "/YYSEnterprise",
    name: "YYSEnterprise",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/YYSEnterprise/index.vue"),
  },
  // 道路运输企业联网联控考核评分
  {
    path: "/LWLKStatic",
    name: "LWLKStatic",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/LWLKStatic/index"),
  },
  // 道路运输运营商联网联控考核评分
  {
    path: "/YYSStatic",
    name: "YYSStatic",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/YYSStatic/index"),
  },
  {
    path: "/YYSArchives",
    name: "YYSArchives",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/YYSArchives/index"),
  },
  // 地区报警排名
  {
    path: "/ZFDQ",
    name: "ZFDQ",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/ZFDQ/index"),
  },
  // 车辆报警排名
  {
    path: "/VehicleRank",
    name: "VehicleRank",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/VehicleRank/index"),
  },
  // 地区报警排名
  {
    path: "/enterprise_yq",
    name: "enterprise_yq",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/enterprise_yq/index"),
  },
  // 地区报警详情
  {
    path: "/enterprisetreat",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/enterprise_yq/enterprisetreat"),
  },
  // 地区报警排名
  {
    path: "/ZFDQ_yq",
    name: "ZFDQ_yq",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/ZFDQ_yq/index"),
  },
  // 车辆报警排名
  {
    path: "/vehicleRank_yq",
    name: "vehicleRank_yq",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/vehicleRank_yq/index"),
  },
  {
    path: "/standard",
    name: "standard",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/standard/index"),
  },
  {
    path: "/law",
    name: "law",
    meta: {
      title: "法律法规",
      requiresAuth: true,
    },
    component: () => import("@/views/law/index"),
  },
  {
    path: "",
    meta: {
      title: "政企互通",
    },
    component: Layout,
    redirect: "/notice",
    children: [
      {
        path: "notice",
        name: "notice",
        meta: {
          title: "通知公告",
          requiresAuth: true,
        },
        component: () => import("@/views/Notice/index"),
      },
      {
        path: "/SafetyInspection",
        name: "SafetyInspection",
        meta: {
          title: "安全查岗",
          requiresAuth: true,
        },
        component: () => import("@/views/SafetyInspection/index"),
      },
      {
        path: "/documentFile",
        name: "documentFile",
        meta: {
          title: "文件下发",
          requiresAuth: true,
        },
        component: () => import("@/views/DocumentFile/index"),
      },

      {
        path: "/distributionOptions",
        name: "distributionOptions",
        meta: {
          title: "下发单位选择",
          requiresAuth: true,
        },
        component: () => import("@/views/DocumentFile/distributionOptions"),
      },
      {
        path: "/issueRectification",
        name: "issueRectification",
        meta: {
          title: "下发整改",
          requiresAuth: true,
        },
        component: () => import("@/views/IssueRectification/index"),
      },
      {
        path: "/vehicle",
        name: "vehicle",
        meta: {
          title: "车辆统计",
          requiresAuth: true,
        },
        component: () => import("@/views/Statistics/vehicle"),
      },
      {
        path: "/weekReport",
        name: "weekReport",
        meta: {
          title: "周报",
          requiresAuth: true,
        },
        component: () => import("@/views/weekReport/index"),
      },
      {
        path: "/monthReport",
        name: "monthReport",
        meta: {
          title: "月报",
          requiresAuth: true,
        },
        component: () => import("@/views/monthReport/index"),
      },
      {
        path: "/quarterReport",
        name: "quarterReport",
        meta: {
          title: "月报",
          requiresAuth: true,
        },
        component: () => import("@/views/monthReport/index"),
      },
      {
        path: "/safeStandard",
        name: "safeStandard",
        meta: {
          title: "企业达标明细",
          requiresAuth: true,
        },
        component: () => import("@/views/safeStandard/index"),
      },
      {
        path: "/safeDocument",
        name: "safeDocument",
        meta: {
          title: "安全台账明细",
          requiresAuth: true,
        },
        component: () => import("@/views/safeDocument/index"),
      },
      {
        path: "/learningPlatform",
        name: "learningPlatform",
        meta: {
          title: "学习情况统计",
          requiresAuth: true,
        },
        component: () => import("@/views/learningPlatform/index"),
      },
      {
        path: "/hidDanger",
        name: "hidDanger",
        meta: {
          title: "隐患排查",
          requiresAuth: true,
        },
        component: () => import("@/views/hidDanger/index"),
      },
      {
        path: "/dayHideDanger",
        name: "dayHideDanger",
        meta: {
          title: "日隐患排查",
          requiresAuth: true,
        },
        component: () => import("@/views/dayHideDanger/index"),
      },
      {
        path: "/weekHideDanger",
        name: "weekHideDanger",
        meta: {
          title: "周隐患排查",
          requiresAuth: true,
        },
        component: () => import("@/views/dayHideDanger1/index"),
      },
      {
        path: "/monthHideDanger",
        name: "monthHideDanger",
        meta: {
          title: "月隐患排查",
          requiresAuth: true,
        },
        component: () => import("@/views/dayHideDanger2/index"),
      },
      {
        path: "/seasonHideDanger",
        name: "seasonHideDanger",
        meta: {
          title: "季节性排查",
          requiresAuth: true,
        },
        component: () => import("@/views/dayHideDanger3/index"),
      },
      {
        path: "/holidayHideDanger",
        name: "holidayHideDanger",
        meta: {
          title: "重大节假日排查",
          requiresAuth: true,
        },
        component: () => import("@/views/dayHideDanger4/index"),
      },
      {
        path: "/specialHideDanger",
        name: "specialHideDanger",
        meta: {
          title: "专项排查",
          requiresAuth: true,
        },
        component: () => import("@/views/dayHideDanger5/index"),
      },
      {
        path: "/compreHideDanger",
        name: "compreHideDanger",
        meta: {
          title: "综合排查",
          requiresAuth: true,
        },
        component: () => import("@/views/dayHideDanger6/index"),
      },
      {
        path: "/risk",
        name: "risk",
        meta: {
          title: "风险管控",
          requiresAuth: true,
        },
        component: () => import("@/views/risk/index"),
      },
    ],
  },
  {
    path: "",
    meta: {
      title: "档案管理",
    },
    component: Layout,
    redirect: "/vehicleArchives",
    children: [
      {
        path: "/vehicleArchives",
        name: "vehicleArchives",
        meta: {
          title: "车辆档案",
          requiresAuth: true,
        },
        component: () => import("@/views/vehicleArchives/index"),
      },
      {
        path: "/driverArchives",
        name: "driverArchives",
        meta: {
          title: "驾驶员档案",
          requiresAuth: true,
        },
        component: () => import("@/views/driverArchives/index"),
      },
      {
        path: "/vehicleMaintain",
        name: "vehicleMaintain",
        meta: {
          title: "车辆维护",
          requiresAuth: true,
        },
        component: () => import("@/views/vehicleMaintain/index"),
      },
      {
        path: "/accident",
        name: "accident",
        meta: {
          title: "车辆事故",
          requiresAuth: true,
        },
        component: () => import("@/views/accident/index"),
      },
    ],
  },
  {
    path: "",
    meta: {
      title: "动态考核",
    },
    component: Layout,
    redirect: "/dayExamine",
    children: [
      {
        path: "/dayExamine",
        name: "dayExamine",
        meta: {
          title: "业户日考核查询",
          requiresAuth: true,
        },
        component: () => import("@/views/dayExamine/index"),
      },
      {
        path: "/weekExamine",
        name: "weekExamine",
        meta: {
          title: "业户周考核查询",
          requiresAuth: true,
        },
        component: () => import("@/views/weekExamine/index"),
      },
      {
        path: "/monthExamine",
        name: "monthExamine",
        meta: {
          title: "业户月考核查询",
          requiresAuth: true,
        },
        component: () => import("@/views/monthExamine/index"),
      },

      {
        path: "/dayExamineOper",
        name: "dayExamineOper",
        meta: {
          title: "服务商日考核查询",
          requiresAuth: true,
        },
        component: () => import("@/views/dayExamineOper/index"),
      },
      {
        path: "/weekExamineOper",
        name: "weekExamineOper",
        meta: {
          title: "服务商周考核查询",
          requiresAuth: true,
        },
        component: () => import("@/views/weekExamineOper/index"),
      },
      {
        path: "/weekExamineDetailOper",
        name: "weekExamineDetailOper",
        meta: {
          title: "服务商周考核明细查询",
          requiresAuth: true,
        },
        component: () => import("@/views/weekExamineDetailOper/index"),
      },
      {
        path: "/monthExamineOper",
        name: "monthExamineOper",
        meta: {
          title: "服务商月考核查询",
          requiresAuth: true,
        },
        component: () => import("@/views/monthExamineOper/index"),
      },
      {
        path: "/monthExamineDetailOper",
        name: "monthExamineDetailOper",
        meta: {
          title: "服务商月考核明细查询",
          requiresAuth: true,
        },
        component: () => import("@/views/monthExamineDetailOper/index"),
      },
      {
        path: "/vehicleMultiple",
        name: "vehicleMultiple",
        meta: {
          title: "车辆综合查询",
          requiresAuth: true,
        },
        component: () => import("@/views/vehicleMultiple/index"),
      },
      {
        path: "/dataQualified",
        name: "dataQualified",
        meta: {
          title: "数据合格率",
          requiresAuth: true,
        },
        component: () => import("@/views/dataQualified/index"),
      },
      {
        path: "/completeTrack",
        name: "completeTrack",
        meta: {
          title: "轨迹完整率",
          requiresAuth: true,
        },
        component: () => import("@/views/completeTrack/index"),
      },
      {
        path: "/trackDrift",
        name: "trackDrift",
        meta: {
          title: "轨迹漂移率",
          requiresAuth: true,
        },
        component: () => import("@/views/trackDrift/index"),
      },
      {
        path: "/YYSSafetyInspection",
        name: "YYSSafetyInspection",
        meta: {
          title: "运营商查岗",
          requiresAuth: true,
        },
        component: () => import("@/views/YYSSafetyInspection/index"),
      },
    ],
  },
];

export default new Router({
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRouterMap,
});
