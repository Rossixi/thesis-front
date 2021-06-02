<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style lang="less">
@import "./styles/variables.less";
@import "./styles/element-ui.less";
@import "./styles/common.less";
@import "./styles/scrollBar";
</style>