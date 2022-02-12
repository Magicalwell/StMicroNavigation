<template>
  <draggable
    :list="list"
    :group="group"
    :item-key="itemKey"
    @start="isDrag = true"
    @end="test"
    :sort="true"
    dragable="true"
    :move="getdata"
    @update="updateDatadragEnd"
    animation="300"
  >
    <template #item="item">
      <div :class="{ 'item-drag': true }" :data-componentid="item.element.id">
        <slot name="item" v-bind="item"> </slot>
      </div>
    </template>
  </draggable>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import draggable from 'vuedraggable'
export default defineComponent({
  props: {
    drag: {
      type: Boolean,
      default: false
    },
    itemKey: {
      type: String,
      default: '_vid'
    },
    group: {
      type: Object,
      default: () => ({ name: 'components' })
    }
  },
  components: {
    draggable
  },
  setup() {
    const store = useStore()
    const list = reactive(store.state.textContainer)
    const textContainer = reactive([
      {
        component: 'a-textarea',
        label: '请输入内容',
        value: '这是一段测试的文本',
        id: 1
      },
      {
        component: 'a-textarea',
        label: '请输入内容',
        value: '这是一段测试的文本2',
        id: 2
      },
      {
        component: 'a-textarea',
        label: '请输入内容',
        value: '这是一段测试的文本3',
        id: 3
      }
    ])
    function test() {
      console.log('ceshi')
      console.log(list)
    }
    function getdata() {
      console.log('跑了')
    }
    function updateDatadragEnd() {
      console.log(textContainer)
    }
    return { textContainer, test, getdata, updateDatadragEnd, list }
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
</style>
