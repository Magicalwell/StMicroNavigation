<template>
  <div class="generation-container">
    <top-Head class="generation-head"></top-Head>
    <div class="generation-body">
      <tool-Box></tool-Box>
      <setting-Box></setting-Box>
      <app-Main></app-Main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import appMain from './layout/components/appMain/appMain.vue'
import toolBox from './layout/components/toolBox/toolBox.vue'
import settingBox from './layout/components/settingBox/settingBox.vue'
import topHead from './layout/components/topHead/topHead.vue'
export default defineComponent({
  name: 'Home',
  components: {
    appMain,
    toolBox,
    settingBox,
    topHead
  }
})
</script>

<style lang="scss" scoped>
.generation-container {
  height: 100vh;
}
.generation-head {
  position: relative;
  z-index: 3;
}
.generation-body {
  position: relative;
  width: 100%;
  height: calc(100vh - 50px);
  padding-left: 270px;
  padding-right: 350px;
}
</style>
