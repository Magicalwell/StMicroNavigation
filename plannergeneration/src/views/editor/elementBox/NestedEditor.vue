<template>
  <draggable
    :list="childComponentList"
    v-bind="dragOptions"
    item-key="id"

  >
    <template #item="{ element }">
      <components-Item
        :drag-options="dragOptions"
        :editor-item="element"
        :show-nested-editor="false"
        :globalOptions="globalOptions"
      >
      </components-Item>
    </template>
  </draggable>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import draggable from 'vuedraggable'
import { generateBlockType } from '../../../utils/generateBlock.js'
import componentsItem from './componentsItem.vue'
export default defineComponent({
  name: 'stoneDragbox',
  props: {
    childComponentList: {
      type: Array,
      default: () => []
    },
    globalOptions: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    draggable,
    componentsItem
  },
  setup(props) {
    onMounted(() => {
      console.log(generateBlockType())
    })

    function test() {
      console.log('ceshi')
    }
    const dragOptions = computed(() => {
      return {
        animation: 300,
        group: 'listComponentsGroup',
        ghostClass: 'ghostItem',
        draggable: '.draggableItem',
        tag: 'div',
        swapThreshold: 0.3,
        handle: '.mover',
        forceFallback: true,
        dragClass: 'dragClass',
        fallbackTolerance: 0
      }
    })
    function getdata() {
      console.log('跑了')
    }
    function updateDatadragEnd() {
      console.log(111)
    }
    console.log(props.childComponentList, 'propspropspropspropspropspropsprops')

    return { test, getdata, updateDatadragEnd, dragOptions }
  }
  // computed: {
  //   ...mapState(['textContainer'])
  // }
})
</script>

<style lang="scss" scoped>
.item-drag {
  position: relative;
  padding-left: 4%;
  padding-right: 3%;
}
.ghostItem {
  opacity: 0.6 !important;
  background-color: aquamarine !important;
}
.dragClass {
  background-color: cadetblue !important;
}
</style>
