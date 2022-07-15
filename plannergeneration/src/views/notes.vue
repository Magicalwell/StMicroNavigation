<template>
  <div class="generation-body">
    <SettingBar />
    <tool-Box></tool-Box>
    <setting-Box></setting-Box>
    <app-Main></app-Main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import appMain from './layout/components/appMain/appMain.vue'
import toolBox from './layout/components/toolBox/toolBox.vue'
import settingBox from './layout/components/settingBox/settingBox.vue'
import SettingBar from './layout/components/settingBar/index.vue'
export default defineComponent({
  name: 'Home',
  components: {
    appMain,
    toolBox,
    settingBox,
    SettingBar
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
