<template>
  <slot name="popmain"> </slot>
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
    element="div"
  >
    <template #item="item">
      <div :class="{ 'item-drag': true }" :data-componentid="item.element.id">
        <slot name="item" v-bind="item"> </slot>
      </div>
    </template>
  </draggable>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import draggable from 'vuedraggable'
import * as generateBlock from '../../../utils/generateBlock'
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
    onMounted(() => {
      console.log(generateBlock.default.generateBlockType())
    })
    const store = useStore()
    const list = reactive(store.state.textContainer)
    function test() {
      console.log('ceshi')
      console.log(list)
    }
    function getdata() {
      console.log('跑了')
    }
    function updateDatadragEnd() {
      console.log(111)
    }
    return { test, getdata, updateDatadragEnd, list }
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
