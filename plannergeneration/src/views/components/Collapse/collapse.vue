<template>
  <a-collapse>
    <!-- <template #expandIcon="{ isActive }">
      <caret-right-outlined :rotate="isActive ? 90 : 0" />
    </template> -->
    <slot></slot>
  </a-collapse>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'st-collapse',
  props: {
    outElement: {
      type: Object,
      default: null
    }
  }
})
</script>
