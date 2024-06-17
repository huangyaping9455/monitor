<style lang="scss" scoped>
.leftMenu {
  width: 200px;
  height: 100vh;
  background-image: url("~@/assets/img/bg_12.png");
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  transition: transform 0.3s;

  &.noshow {
    transform: translateX(-100%);
  }

  &.show {
    transform: translateX(0%);
  }

  .leftMenu-menu {
    // height: 69%;
    height: 100%;
    width: 170px;
    overflow: hidden;
    border-right: 0px;

    .menu-item {
      display: flex;
      align-items: center;

      .icon,
      i {
        width: 18px;
        height: 18px;
        margin-right: 5px;
        fill: #01f8ff;
      }
    }
  }

  .movebtn {
    position: absolute;
    cursor: pointer;
    color: #ffffff;
    display: flex;
    align-items: center;
    padding-left: 1px;
    left: 100%;
    width: 39px;
    height: 75px;
    overflow: hidden;

    /* background-image: url('~@/assets/img/bg_13.png');
    background-size: 100% 100%; */
    .movebtn-info {
      position: absolute;
      z-index: -1;
      border-radius: 50%;
      left: -10%;
      width: 14px;
      height: 14px;
      background: rgba(10, 51, 109, 1);
      animation: movea 2.7s ease-out infinite;
    }

    .two {
      animation-delay: 0.9s;
    }

    .three {
      animation-delay: 1.8s;
    }
  }
}

@keyframes movea {
  0% {
    transform: scale(1);
    background: rgba(10, 51, 109, 1);
  }

  90% {
    transform: scale(5.5);
    background: rgba(10, 51, 109, 0.5);
  }

  100% {
    transform: scale(5.5);
    background: rgba(10, 51, 109, 0);
  }
}
</style>
<style lang="scss">
.leftMenu {
  .el-submenu__title,
  .el-menu-item {
    background: transparent !important;
  }

  .el-menu-item,
  .el-submenu__title {
    padding: 0 0 0 10px !important;
  }

  .el-submenu__icon-arrow {
    right: 10px;
    color: #01f8ff;
  }

  .el-submenu .el-menu-item {
    width: 100%;
    padding: 0 0 0 32px !important;
  }

  .el-menu-item.is-active .menu-item .icon {
    fill: #ffffff;
  }
}
</style>

<template>
  <aside class="leftMenu" :class="ismenuShow ? 'show' : 'noshow'">
    <scroll style="height: 69%; width: 170px">
      <el-menu
        :default-active="urlName"
        class="leftMenu-menu"
        active-text-color="#ffffff"
        router
        background-color="transparent"
        text-color="#01f8ff"
        :unique-opened="true"
      >
        <el-menu-item index="home" @click="openMenu">
          <div class="menu-item">
            <svg-icon class="icon" icon-class="home" />
            <span slot="title">首 页</span>
          </div>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="shuju" />
              <span>动态监管分析</span>
            </div>
          </template>
          <el-menu-item index="dataAnalysis" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="shujvfenxi" />
              <span>数据分析</span>
            </div>
          </el-menu-item>
          <!-- <el-menu-item index="dataBoard" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="zhenggai" />
              <span>数据看板</span>
            </div>
          </el-menu-item> -->
          <el-menu-item index="home" @click="openMap">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="map" />
              <span>地图监控</span>
            </div>
          </el-menu-item>
          <!-- <el-menu-item index="overspeed" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="map" />
              <span>精细化超速看板</span>
            </div>
          </el-menu-item> -->
          <!-- <el-menu-item index="dataAnalysis_gz" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="shujvfenxi" />
              <span>数据分析</span>
            </div>
          </el-menu-item> -->
          <!-- <el-menu-item index="OBDDataAnalysis" @click="openMenu">
          <div class="menu-item">
            <svg-icon class="icon" icon-class="shuju" />
            <span>OBD数据分析</span>
          </div>
        </el-menu-item> -->
          <el-menu-item index="treatmentRate" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="chulilv" />
              <span>处理率统计</span>
            </div>
          </el-menu-item>
          <el-menu-item index="vehicle" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="cheliang" />
              <span>车辆状态统计</span>
            </div>
          </el-menu-item>
          <!-- <el-menu-item index="QYvehicle" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="zhengqi" />
              <span>企业统计</span>
            </div>
          </el-menu-item> -->
          <el-menu-item index="DayStatistics" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="cheliangyunxing" />
              <span>车辆日运行统计</span>
            </div>
          </el-menu-item>
          <el-menu-item index="QYDayStatistics" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="qiyeyunxing" />
              <span>企业日运行统计</span>
            </div>
          </el-menu-item>

          <!-- <el-menu-item index="YYSDayStatistics_qd" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="yunyingshang" />
              <span>运营商日运行统计</span>
            </div>
          </el-menu-item> -->
          <!-- <el-menu-item index="YYSDayStatistics_ts" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="yunyingshang" />
              <span>运营商日运行统计</span>
            </div>
          </el-menu-item> -->
          <!-- <el-menu-item index="LWLKStatic" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="qiyekaohe" />
              <span>企业考核评分</span>
            </div>
          </el-menu-item>
          <el-menu-item index="LWLKStatic" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="qiyekaohe" />
              <span>动态监督考核表</span>
            </div>
          </el-menu-item> -->
          <!-- <el-menu-item index="YYSStatic" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="yunyingshangkaohe" />
              <span>运营商考核评分</span>
            </div>
          </el-menu-item> -->
          <el-menu-item index="gpsAlarmAll" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="yunyingshangkaohe" />
              <span>企业月报警统计</span>
            </div>
          </el-menu-item>
          <el-menu-item index="gpsAlarmLv" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="yunyingshangkaohe" />
              <span>企业月平均报警率</span>
            </div>
          </el-menu-item>
          <el-menu-item index="gpsAlarmReport" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="yunyingshangkaohe" />
              <span>企业月报警分析</span>
            </div>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="chulilv" />
              <span>报警排名</span>
            </div>
          </template>
          <el-menu-item index="ZFDQ" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="zhenggai" />
              <span>地区报警排名</span>
            </div>
          </el-menu-item>
          <el-menu-item index="enterprise" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="shuju" />
              <span>企业报警排名</span>
            </div>
          </el-menu-item>
          <!-- <el-menu-item index="VehicleRank" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="cheliang" />
              <span>车辆报警排名</span>
            </div>
          </el-menu-item> -->
          <!-- <el-menu-item index="YYSEnterprise" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="yunyingshang" />
              <span>运营商报警排名</span>
            </div>
          </el-menu-item> -->
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="zhengqi" />
              <span>政企互通</span>
            </div>
          </template>
          <el-menu-item index="notice" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="tongzhi" />
              <span>通知公告</span>
            </div>
          </el-menu-item>
          <el-menu-item index="SafetyInspection" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="anquan" />
              <span>安全查岗</span>
            </div>
          </el-menu-item>
          <el-menu-item index="documentFile" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="wenjian" />
              <span>文件下发</span>
            </div>
          </el-menu-item>
          <el-menu-item index="issueRectification" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="zhenggai" />
              <span>下发整改</span>
            </div>
          </el-menu-item>
          <!-- <el-menu-item index="yysInspect" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="tongzhi" />
              <span>运营商查岗</span>
            </div>
          </el-menu-item>
          <el-menu-item index="yysInspectRank" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="tongzhi" />
              <span>运营商自动查岗</span>
            </div>
          </el-menu-item> -->
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="anquanbaogao" />
              <span>安全报告</span>
            </div>
          </template>
          <el-menu-item index="weekReport" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="zhoubao" />
              <!-- <span>周报</span> -->
              <span>周通报</span>
            </div>
          </el-menu-item>
          <el-menu-item index="weekReportYYS" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="zhoubao" />
              <span>运营商周报</span>
            </div>
          </el-menu-item>
          <el-menu-item index="monthReport" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="yuebao" />
              <!-- <span>月报</span> -->
              <span>月排名</span>
            </div>
          </el-menu-item>
          <el-menu-item index="quarterReport" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="jibao" />
              <!-- <span>季报</span> -->
              <span>季考核</span>
            </div>
          </el-menu-item>
          <el-menu-item index="LWLKStatic_cd" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="qiyekaohe" />
              <span>企业质量达标考核</span>
            </div>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="tongzhi" />
              <span>安全达标</span>
            </div>
          </template>
          <!-- <el-menu-item index="safeStandard" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="zhenggai" />
              <span>企业达标明细</span>
            </div>
          </el-menu-item> -->
          <el-menu-item index="safeDocument" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="zhenggai" />
              <span>安全台账明细</span>
            </div>
          </el-menu-item>
          <el-menu-item index="safeStandardRank" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="shuju" />
              <span>合规台账排名</span>
            </div>
          </el-menu-item>
          <el-menu-item index="infomationRank" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="wanzheng" />
              <span>资料完整率统计</span>
            </div>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="jiaoyu" />
              <span>安全教育学习</span>
            </div>
          </template>
          <el-menu-item index="learningPlatform" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="wenjian" />
              <span>学习情况统计</span>
            </div>
          </el-menu-item>
        </el-submenu>
        <!-- <el-submenu index="8">
          <template slot="title">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="anquanguanli" />
              <span>安全管理</span>
            </div>
          </template>
          <el-menu-item index="hidDanger" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="yinhuanpaicha" />
              <span>隐患排查统计</span>
            </div>
          </el-menu-item> -->
        <!-- <el-menu-item index="dayHideDanger" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="riyinhuan" />
              <span>日隐患排查统计</span>
            </div>
          </el-menu-item>
          <el-menu-item index="weekHideDanger" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="zhouyinhuan" />
              <span>周隐患排查统计</span>
            </div>
          </el-menu-item>
          <el-menu-item index="monthHideDanger" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="yueyinhuan" />
              <span>月隐患排查统计</span>
            </div>
          </el-menu-item>
          <el-menu-item index="seasonHideDanger" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="jijie" />
              <span>季节性排查</span>
            </div>
          </el-menu-item>
          <el-menu-item index="holidayHideDanger" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="jiejiari" />
              <span>重大节假日排查</span>
            </div>
          </el-menu-item>
          <el-menu-item index="specialHideDanger" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="zhuanxiang" />
              <span>专项排查</span>
            </div>
          </el-menu-item>
          <el-menu-item index="compreHideDanger" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="zonghe" />
              <span>综合排查</span>
            </div>
          </el-menu-item> -->
        <!-- <el-menu-item index="risk" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="fengxianguanli" />
              <span>风险管理</span>
            </div>
          </el-menu-item>
        </el-submenu> -->
        <!-- <el-submenu index="9">
          <template slot="title">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="yiqing" />
              <span>跨境检查</span>
            </div>
          </template>
          <el-menu-item index="ZFDQ_yq" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="zhenggai" />
              <span>地区出/入区统计</span>
            </div>
          </el-menu-item>
          <el-menu-item index="enterprise_yq" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="zhenggai" />
              <span>企业出/入区统计</span>
            </div>
          </el-menu-item>
          <el-menu-item index="vehicleRank_yq" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="zhenggai" />
              <span>车辆出/入区统计</span>
            </div>
          </el-menu-item>
        </el-submenu> -->
        <el-submenu index="10">
          <template slot="title">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="dangan" />
              <span>档案管理</span>
            </div>
          </template>
          <el-menu-item index="QYvehicle" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="zhengqi" />
              <span>企业档案</span>
            </div>
          </el-menu-item>
          <el-menu-item index="vehicleArchives" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="cheliang" />
              <span>车辆档案</span>
            </div>
          </el-menu-item>
          <el-menu-item index="driverArchives" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="jiashiyuan" />
              <span>驾驶员档案</span>
            </div>
          </el-menu-item>
          <!-- <el-menu-item index="YYSArchives" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="yunyingshangkaohe" />
              <span>运营商档案</span>
            </div>
          </el-menu-item> -->
          <!-- <el-menu-item index="vehicleMaintain" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="weihu" />
              <span>车辆维护档案</span>
            </div>
          </el-menu-item> -->
          <el-menu-item index="accident" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="shigu" />
              <span>车辆事故档案</span>
            </div>
          </el-menu-item>
          <el-menu-item index="law" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="falv" />
              <span>法律法规档案</span>
            </div>
          </el-menu-item>
        </el-submenu>
        <!-- <el-submenu index="11">
          <template slot="title">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="fengxian" />
              <span>风险管控</span>
            </div>
          </template>
          <el-menu-item index="home" @click="openThree1">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="zhenggai" />
              <span slot="title">广东</span>
            </div>
          </el-menu-item>
        </el-submenu> -->
        <!-- <el-submenu index="12">
          <template slot="title">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="fengxian" />
              <span>风控服务</span>
            </div>
          </template>
          <el-menu-item index="home" @click="openThree3">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="zhenggai" />
              <span slot="title">智能坐席</span>
            </div>
          </el-menu-item>
          <el-menu-item index="home" @click="openThree4">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="zhenggai" />
              <span slot="title">视频监控</span>
            </div>
          </el-menu-item>
          <el-menu-item index="">
            <div class="menu-item" @click="openThree5">
              <svg-icon class="icon" icon-class="zhenggai" />
              <span slot="title">监控巡查</span>
            </div>
          </el-menu-item>
          <el-menu-item index="">
            <div class="menu-item" @click="openThree5">
              <svg-icon class="icon" icon-class="zhenggai" />
              <span slot="title">核警抽查</span>
            </div>
          </el-menu-item>
          <el-menu-item index="">
            <div class="menu-item" @click="openThree6">
              <svg-icon class="icon" icon-class="zhenggai" />
              <span slot="title">基础资料管理</span>
            </div>
          </el-menu-item> -->
        <!-- <el-menu-item index="">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="zhenggai" />
              <span slot="title">风控云屏</span>
            </div>
          </el-menu-item>-->
        <!-- </el-submenu> -->
        <el-submenu index="13">
          <template slot="title">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="kaohe" />
              <span>动态考核</span>
            </div>
          </template>
          <el-menu-item index="dayExamine" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="rikaohe" />
              <span slot="title">企业日考核查询</span>
            </div>
          </el-menu-item>
          <el-menu-item index="weekExamine" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="zhoukaohe" />
              <span slot="title">企业周考核查询</span>
            </div>
          </el-menu-item>
          <el-menu-item index="monthExamine" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="yuekaohe" />
              <span slot="title">企业月考核查询</span>
            </div>
          </el-menu-item>
          <el-menu-item index="dayExamineOper" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="rikaoheoper" />
              <span slot="title">服务商日考核查询</span>
            </div>
          </el-menu-item>
          <el-menu-item index="weekExamineOper" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="rikaoheoper" />
              <span slot="title">服务商周考核查询</span>
            </div>
          </el-menu-item>
          <el-menu-item index="monthExamineOper" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="rikaoheoper" />
              <span slot="title">服务商月考核查询</span>
            </div>
          </el-menu-item>
          <el-menu-item index="vehicleMultiple" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="vehicle" />
              <span slot="title">车辆综合查询</span>
            </div>
          </el-menu-item>
          <el-menu-item index="dataQualified" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="hege" />
              <span slot="title">数据合格率</span>
            </div>
          </el-menu-item>
          <el-menu-item index="completeTrack" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="wanzheng" />
              <span slot="title">轨迹完整率</span>
            </div>
          </el-menu-item>
          <el-menu-item index="trackDrift" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="piaoyi" />
              <span slot="title">轨迹漂移率</span>
            </div>
          </el-menu-item>
          <el-menu-item index="weekReportRank" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="zhoubao" />
              <span>周通报(评分排名)</span>
            </div>
          </el-menu-item>
          <!-- <el-menu-item index="YYSSafetyInspection" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="anquan" />
              <span>运营商查岗</span>
            </div>
          </el-menu-item> -->
        </el-submenu>
        <el-submenu index="14">
          <template slot="title">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="kaohe" />
              <span>执法线索</span>
            </div>
          </template>
          <el-menu-item index="VehicleRank" @click="openMenu">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="cheliang" />
              <span>车辆违规线索</span>
            </div>
          </el-menu-item>
          <el-menu-item index="home">
            <div class="menu-item">
              <svg-icon class="icon" icon-class="cheliang" />
              <span>自治区通报线索</span>
            </div>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </scroll>
    <div
      class="movebtn"
      :class="ismenuShow ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right'"
      @click="changeleftMenu"
    >
      <span class="movebtn-info"></span>
      <span class="movebtn-info two"></span>
      <span class="movebtn-info three"></span>
    </div>
  </aside>
</template>

<script>
import { config } from "@/config/config.js";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      ismenuShow: false,
      urlName: "",
    };
  },
  watch: {
    $route() {
      let urlName = this.$route.path;
      urlName = urlName.substring(1, urlName.length);
      this.urlName = urlName;
    },
  },
  computed: {
    ...mapGetters({
      userinfo: "userinfo",
    }),
  },
  methods: {
    changeleftMenu() {
      this.ismenuShow = !this.ismenuShow;
    },
    // 菜单点击清除存在xuex中的树节点id
    openMenu() {
      this.SET_FASONGDANWEI(this.$store.state.userinfo.deptId);
    },
    ...mapMutations({
      SET_FASONGDANWEI: "government/SET_FASONGDANWEI",
    }),
    openThree() {
      window.open("http://139.155.45.177/dashboard/analysis?username=shaanxi&password=SS@123456");
    },
    openThree1() {
      window.open("http://219.153.12.86:6600/dualMechanismData/safeBrain/SafeBrain?type=sp");
    },
    openThree3() {
      let userName = config.Encrypt(
        // "NDJTJ-001",
        "FZFQ-001",
        "abcdefgabcdefg12",
        "abcdefgabcdefg12"
      );
      let passWord = config.Encrypt("123456", "abcdefgabcdefg12", "abcdefgabcdefg12");
      window.open(
        `http://aimonitoring.rybsj.cn/webgis/data/tsriskhandlePage.action?userName=${userName}&password=${passWord}`
      );
    },
    openThree4() {
      let userName = config.Encrypt(
        // "NDJTJ-001",
        "FZFQ-001",
        "abcdefgabcdefg12",
        "abcdefgabcdefg12"
      );
      let passWord = config.Encrypt("123456", "abcdefgabcdefg12", "abcdefgabcdefg12");
      window.open(
        `http://aimonitoring.rybsj.cn/webgis/data/tsredRiskDataScreen.action?userName=${userName}&password=${passWord}`
      );
    },
    openThree5() {
      // let userName = config.aesEncrypt("NDJC-001");
      // let passWord = config.aesEncrypt("TS123456");
      let userName = config.aesEncrypt("FZQY-001");
      let passWord = config.aesEncrypt("ts123456");
      window.open(
        `http://120.35.12.85:3330/monitor-web/loginAuth.action?username=${userName}&password=${passWord}`
      );
      // window.open(
      //   `http://222.75.204.88:8203/monitor-web/loginAuth.action?username=${userName}&password=${passWord}`
      // );
    },
    openThree6() {
      window.open(`http://120.35.12.85:3321/#/loginOn`);
      // window.open(`http://222.75.204.88:8201/#/loginOn`);
    },
    // 地图监控
    openMap() {
      let routeData = this.$router.resolve({ path: "/mapAnalysis" });
      window.open(routeData.href, "_blank");
    },
  },
};
</script>
