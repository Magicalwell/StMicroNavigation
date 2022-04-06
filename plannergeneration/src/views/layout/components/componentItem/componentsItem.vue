<template>
  <!-- <SchemaField v-bind="attrs"> </SchemaField> -->
  <h1>1111</h1>
  <element-box
    v-if="true"
    :child-component-list="editorItem.children"
    :drag-options="dragOptions"
    :form-data="formData"
  >
  </element-box>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import elementBox from '../../../editor/elementBox/elementBox.vue'
export default defineComponent({
  name: 'componentsItem',
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
  computed: {
    attrs() {
      return {
        formProps: this.formProps
        // globalOptions,
        // ...editorItem2SchemaFieldProps(this.editorItem, this.formData)
      }
    }
  },
  methods: {
    showAddPanel() {
      console.log('我出来啦')
    }
  },
  components: {
    elementBox
  }
  // setup(props, { emit }) {

  // },
})
</script>

<style lang="scss" scoped>
.control-label {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
