<template>
  <component
    :key="outElement.id"
    :is="outElement.component"
    class="input-item"
    v-bind="outElement.propValue"
    v-model:value="innerValue"
    :placeholder="outElement.placeholder"
  >
    <template v-if="outElement.children">
      <template v-for="(item, index) in outElement.children" :key="index">
        <!-- <components-Item v-for="(item,index) in outElement.children" :key="index" :outElement="item" v-model:changeValue="innerValue"></components-Item> -->
        <components-Item
          :outElement="item"
          v-model:changeValue="item.value"
        ></components-Item>
      </template>
    </template>
  </component>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'componentsItem',
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
  },
  components: {}
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
