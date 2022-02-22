<template>
  <component
    :key="outElement.id"
    :is="outElement.component"
    class="input-item"
    v-bind="outElement.propValue"
    v-model:value="innerValue"
    :placeholder="outElement.placeholder"
  >
  </component>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import stCollapse from '@/views/components/Collapse/collapse.vue'
import stCollapsePanel from '@/views/components/collapsePanel/collapsePanel.vue'
export default defineComponent({
  name: 'componentsItem',
  components: {
    stCollapse,
    stCollapsePanel
  },
  props: {
    outElement: {
      type: Object,
      default: null
    },
    index: { type: Number, default: null }
  },
  computed: {
    innerValue: {
      get() {
        return this.outElement.value
      },
      set(newValue: any) {
        this.$emit('update:changeValue', newValue) // 修改值会互相影响的问题出在这里，应该是emit了同一个changeValue
      }
    }
  },
  methods: {
    showAddPanel() {
      console.log('我出来啦')
    }
  }
  // setup(props, { emit }) {

  // },
})
</script>

<style lang="scss" scoped>
.input-item {
  border-color: transparent !important;
  margin-top: 1px;
  margin-bottom: 1px;
  line-height: 28px;
  padding-top: 0px;
  padding-bottom: 0px;
  min-height: 28px;
}
.control-label {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
