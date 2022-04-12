<template>
  <a-collapse ghost>
    <!-- <template #expandIcon="{ isActive }">
      <caret-right-outlined :rotate="isActive ? 90 : 0" />
    </template> -->
    <template #expandIcon="{ isActive }">
      <caret-right-outlined :rotate="isActive ? 90 : 0" />
    </template>
    <a-collapse-panel>
      <template #header>
        <a-textarea auto-size :bordered="false"></a-textarea>
      </template>
      <stone-Dragbox
        v-if="editorItem.children && editorItem.children.length > 0"
        :child-component-list="editorItem.children"
      >
      </stone-Dragbox>
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CaretRightOutlined } from '@ant-design/icons-vue'
import stoneDragbox from '../../editor/elementBox/elementBox.vue'
export default defineComponent({
  name: 'st-collapse',
  props: {
    editorItem: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const activeKey = ref(false)
    console.log(
      props.editorItem.children,
      'editorItemeditorItemeditorItemeditorItem'
    )
    return {
      activeKey
    }
  },
  components: {
    CaretRightOutlined,
    stoneDragbox
  }
})
</script>
