<template>
  <el-form class="organform" ref="rowDetail" :model="rowDetail">
    <div class="form_detail printBody" id="printBody">
      <p>
        本人
        <span style="text-decoration: underline">
          {{ rows.jiashiyuanxingming }}
        </span>
        身份证号码:
        <span style="text-decoration: underline">
          {{ rows.shenfenzhenghao ? rows.shenfenzhenghao : " - " }}
        </span>
        准驾车型
        <span style="text-decoration: underline">
          {{ rowDetail.zhunjiachexing ? rowDetail.zhunjiachexing : " - " }}
        </span>
        ，系
        <span style="text-decoration: underline">
          {{ rowDetail.deptName }}
        </span>
        驾驶人。为预防和减少交通事故，确保安全驾驶货运车辆，特作出以下承诺:
      </p>
      <p>
        一、提高安全驾驶能力和安全意识。确保驾驶证按时换证和审验，及时处理交通违法，按时参加公司组织的月度安全教育培训和应急演练，实时学习典型事故案例，养成良好驾驶习惯。
      </p>
      <p>
        二、出车前做好车辆安全检查。重点检查车况 (转向.制动、轮胎、灯光等)
        是否良好、卫星定位装置运行是否正常、反光标识和防护装置是否齐全、是否有非法改装行为、轮胎花纹深度是否符合国家标准、车辆安全技术检验
        是否在有效期内等。
      </p>
      <p>
        三、严格遵守交通规则，杜绝非法营运。严格遵守《道路交通安全法》等法律法规，不酒驾、不醉驾、不超载、不超速、不疲劳驾驶、不闯红灯、礼让行人和非机动车。
      </p>
      <p>
        本人将严格遵守上述承诺，若有违反，愿意接受监管部门和公司处罚，并承担相应的法律责任。
      </p>
      <p>特此承诺</p>
      <div class="text_foot" style="text-align: right">
        <span>日期: {{ rowDetail.ajaAutographTime }}</span>
        <div style="display: flex; justify-content: right">
          <span>驾驶员签名：</span>
          <div v-viewer v-if="rowDetail.ajaAutographEnclosure">
            <img
              style="
                width: 80px;
                height: 100px;
                transform: rotate(-90deg);
                margin-top: -20px;
              "
              :src="rowDetail.ajaAutographEnclosure"
              alt=""
            />
          </div>
          <span v-else>未签名</span>
        </div>
      </div>
    </div>
    <!-- <div style="width: 100%; display: flex; justify-content: center">
      <el-button type="primary" @click="printClick" size="small">
        打印
      </el-button>
    </div> -->
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
  methods: {
    // 打印
    printClick() {
      let printConent = document.querySelector(".printBody").cloneNode(true);
      let newWindow = window.open("", "_blank");
      newWindow.document.querySelector("body").appendChild(printConent);
      newWindow.document.title = `驾驶人安全责任承诺书(普货运输)`;
      this.$nextTick(() => {
        newWindow.print();
        newWindow.close();
      });
    },
  },
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
    .font_th {
      font-weight: 600;
      font-size: 16px;
    }
    .text_foot {
      display: flex;
      flex-direction: column;
      padding: 0 52px;
      margin-top: 40px;
      line-height: 30px;
      text-align: end;
      span {
        font-size: 15px;
      }
    }
  }
}
</style>
