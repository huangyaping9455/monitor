<template>
  <el-form class="organform" ref="rowDetail" :model="rowDetail">
    <div class="form_detail">
      <p>工种：车辆驾驶员</p>
      <p>{{ rows.jiashiyuanxingming }}</p>
      <p>
        你将从事的普通货物车辆驾驶作业，存在着侧翻、交通事故等岗位危险，予以告知。你在驾驶时务必遵守相关的规章制度和操作规程，并熟记作业要点及其特性，掌握好相应的安全防范技能；每天开始工作前，要进行检查，发现异常情况和不安全因素必须及时采取有效措施排除；要正确使用和佩戴劳动保护用品，在做好自我防范的同时，还要认真贯彻联保互保。同时对以下针对性措施必须经常对照执行：
      </p>
      <p>1、驾驶普通货物车辆应严格执行交通规则的规定，驾驶员严禁穿拖鞋。</p>
      <p>
        2、车辆时速应严格遵守相关规定。前后两车应保持安全距离。行驶中，应随时注意交通标志和道路情况，服从交通指挥人员和信号指挥，不得违反交通规则（条例）。
      </p>
      <p>
        3、施工道路应限速行驶，遵守车辆的相关规定，并服从现场人员的指挥，做好配合工作。
      </p>
      <p>
        4、严禁强行超车，禁止在刚超越后立即右驾方向或制动。驾车必须遵守有关规定，在狭路、弯道、下坡、冰雪道路、交叉路口、过桥、交通岗附近、设有禁令标志路段及其他有障碍或视线不清的路上禁止超车。
      </p>
      <p>
        5、通过交叉路口和岔道应先减速、鸣笛，观察人车往来，随时做好制动准备，通过公路平交叉路时，禁止抢道。
      </p>
      <p>
        6、禁止在雨天、雪、雾天、夜间盲目行驶。雨中行驶，应尽量避免靠近路边和采用紧急制动或急速转向。
      </p>
      <p>
        7、雾天行驶，必须打开黄色雾灯，禁止超车。雾天能见度低于5米时，不得继续行驶，可打开视宽灯停车休息。
      </p>
      <p>
        8、冰雪道路行驶，应适当控制车速，握紧转向盘。会车应选择比较安全的地方，不得猛打猛回转向盘，不得在冰冻路面上使用紧急制动。必要时应配置防滑链。
      </p>
      <p>
        9、高速公路行驶应自觉遵守高速公路行驶条例，无特殊情况不得随意停车，遇到车辆出故障，应停在行车道右侧，白天设三角警示牌，晚上开警示灯，并及时通知交警部门。
      </p>
      <p>10、夜间行车前，应预先检查灯光，并特别注意指挥信号和施工信号。</p>
      <p>11、严禁普通货物车辆熄火、挂空挡或踩离合器溜坡。</p>
      <p>此告知书一式两份，一份交作业者本人留存，一份留安技部存档备查。</p>
      <div class="text_foot">
        <div style="display: flex; justify-content: right">
          <span>被告知者签名：</span>
          <div v-if="rowDetail.ajwAutographEnclosure" v-viewer>
            <img
              style="
                width: 80px;
                height: 100px;
                transform: rotate(-90deg);
                margin-top: -20px;
              "
              :src="rowDetail.ajwAutographEnclosure"
              alt=""
            />
          </div>
          <span v-else>未签名</span>
        </div>
        <span> 日期:{{ rowDetail.ajwAutographTime }}</span>
      </div>
    </div>
  </el-form>
</template>

<script>
export default {
  props: {
    rowDetail: {
      type: Object,
      default: () => {
        return {};
      },
    },
    rows: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.organform {
  width: 100%;
  height: calc(100% - 120px);
  margin-top: 10px;
  .form_detail {
    width: 100%;
    height: calc(100%);
    overflow: auto;
    p {
      line-height: 40px;
      color: #fff;
      word-break: break-word;
      margin-right: 20px;
      text-indent: 32px;
      font-size: 15px;
    }
    p:first-child {
      text-indent: 0px;
    }
    p:nth-child(2) {
      text-indent: 0px;
    }
    .text_foot {
      display: flex;
      justify-content: space-between;
      padding: 0 32px;
      margin-top: 40px;
      font-size: 15px;
    }
  }
}
</style>
