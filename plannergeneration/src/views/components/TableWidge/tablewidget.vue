<template>
  <text-widget />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TextWidget from './textwidge.vue'
// import NestedEditor from '../../editor/elementBox/NestedEditor.vue'
export default defineComponent({
  name: 'st-text',
  props: {
    editorItem: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    TextWidget
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped></style>
