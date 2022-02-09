<template>
  <div class="appMain">
    <!-- <component :is=""></component> -->
    <app-Editor></app-Editor>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import appEditor from '../../../editor/index.vue'
export default defineComponent({
  components: {
    appEditor
  }
})
</script>

<style lang="scss" scoped>
.appMain {
  height: 100%;
  padding: 20px;
}
</style>
