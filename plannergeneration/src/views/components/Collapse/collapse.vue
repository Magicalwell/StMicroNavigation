<template>
  <a-collapse>
    <!-- <a-collapse-panel>
      <template #header v-if="true">
        <div>cccccc</div>
      </template>
      <slot></slot>
    </a-collapse-panel> -->
    <slot></slot>
  </a-collapse>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'st-collapse'
})
</script>
