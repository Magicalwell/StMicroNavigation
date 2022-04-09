<template>
  <div class="draggableItem">
    <span class="operation-btn">
      <plus-outlined />
      <bars-outlined class="mover" />
    </span>
    <SchemaField v-bind="attrs"></SchemaField>
    <stoneDragBox
      v-if="editorItem.children && editorItem.children.length > 0"
      :child-component-list="editorItem.children"
      :drag-options="dragOptions"
      :form-data="formData"
    >
    </stoneDragBox>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'
import stoneDragBox from './elementBox.vue'
import SchemaField from '../components/SchemaField.js'
import { editorItem2SchemaFieldProps } from '../../../utils/editorData'
import { PlusOutlined, BarsOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  name: 'componentsItem',
  components: {
    SchemaField,
    stoneDragBox,
    PlusOutlined,
    BarsOutlined
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
    },
    globalOptions: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const attrs = computed(() => {
      return {
        // 这里是需要一个全局的配置，用于设置用户之前配置的信息，例如标题的字号，颜色
        editorItem: props.editorItem,
        ...editorItem2SchemaFieldProps(props.editorItem, props.globalOptions)
        // 这里考虑自己实现一下，可以看一下参考vue3的代码，editordata是对于vue2进行封装的
      }
    })
    return {
      attrs
    }
  }
})
</script>

<style lang="scss" scoped>
.draggableItem {
  position: relative;
  padding-left: 50px;
}
.operation-btn {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}
</style>
