<template>
  <SchemaField v-bind="attrs"></SchemaField>
  <stoneDragBox
    v-if="editorItem.children && editorItem.children.length > 0"
    :child-component-list="editorItem.children"
    :drag-options="dragOptions"
    :form-data="formData"
  >
  </stoneDragBox>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'
import stoneDragBox from './elementBox.vue'
import SchemaField from '../components/SchemaField.js'
export default defineComponent({
  name: 'componentsItem',
  components: {
    SchemaField,
    stoneDragBox
  },
  props: {
    editorItem: {
      type: Object,
      default: () => ({})
    },
    dragOptions: {
      type: Object,
      default: () => ({})
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    formProps: {
      type: null,
      default: null
    }
  },
  setup(props) {
    const { editorItem } = toRefs(props)
    console.log(editorItem)

    const attrs = computed(() => {
      return {
        editorItem: props.editorItem
      }
    })
    return {
      attrs
    }
  }
})
</script>

<style lang="scss" scoped>
.control-label {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
