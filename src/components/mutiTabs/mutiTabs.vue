<template>
  <!-- <div :style="getPlaceholderDomStyle" v-if="getIsShowPlaceholderDom"></div> -->
  <div>
    <!-- <LayoutHeader v-if="getShowInsetHeaderRef" /> -->
    <!-- <MultipleTabs v-if="getShowTabs" /> -->
    <MultipleTabs />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import LayoutHeader from '../navbar/navbar.vue'
import MultipleTabs from './tabs.vue'
export default defineComponent({
  components: {
    MultipleTabs
  }
})
</script>
