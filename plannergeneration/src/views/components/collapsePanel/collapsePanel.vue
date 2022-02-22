<template>
  <a-collapse-panel>
    <template #header v-if="outElement.slot">
      <div>666666</div>
    </template>
    <slot></slot>
  </a-collapse-panel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'st-collapse-panel',
  props: {
    outElement: {
      type: Object
    }
  }
})
</script>
