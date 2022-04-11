<template>
  <a-collapse ghost>
    <!-- <template #expandIcon="{ isActive }">
      <caret-right-outlined :rotate="isActive ? 90 : 0" />
    </template> -->
    <a-collapse-panel>
      <template #header>
        <a-textarea auto-size :bordered="false"></a-textarea>
      </template>
      <!-- <stone-Dragbox
        v-if="editorItem.children && editorItem.children.length > 0"
        :child-component-list="editorItem.children"
        :drag-options="dragOptions"
        :form-data="formData"
      >
      </stone-Dragbox> -->
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'st-collapse',
  props: {
    editorItem: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    console.log(props.editorItem)
  }
})
</script>
