<template>
  <div class="appMain" @drop="drogitem" @dragover="dragOveritem($event)">
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
  },
  methods: {
    dragOveritem (e:any) {
      console.log(1232131)
    },
    drogitem () {
      console.log(9931231)
    }
  }
})
</script>

<style lang="scss" scoped>
.appMain {
  height: 100%;
  padding: 20px;
}
</style>
