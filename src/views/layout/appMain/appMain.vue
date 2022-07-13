<template>
  <div>
    <LayoutMultipleHeader />
    <PageLayout />
    <div id="content" class="app-view-box"></div>
    <!-- 预留微前端挂载 -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageLayout from './page.vue'
import LayoutMultipleHeader from '@/components/mutiTabs/mutiTabs.vue'
export default defineComponent({
  components: {
    PageLayout,
    LayoutMultipleHeader
  },
  setup() {
    return {}
  }
})
</script>
