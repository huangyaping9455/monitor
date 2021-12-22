<style lang="scss" scoped>
.home-header {
  height: 9vmin;
  padding: 0 2vmin 1vmin;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("~@/assets/img/bg_21.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  position: relative;
  .title {
    font-size: 2rem;
    flex: 1;
    margin: 0;
    color: #01f8ff;
    text-align: center;
    font-weight: normal;
  }
}
</style>

<template>
  <div class="home-header">
    <h1 class="title">OBD数据分析大屏</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
