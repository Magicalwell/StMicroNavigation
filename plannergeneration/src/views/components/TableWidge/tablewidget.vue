<template>
  <div style="display: flex">
    <div style="position: relative">
      <table border="1" class="table-widgets-box" @mouseup="cancelDragCol()">
        <colgroup>
          <col
            v-for="(item, column) in selfData.children[0].children"
            :key="column"
            style="width: 100px"
            span="1"
          />
        </colgroup>
        <tr
          v-for="(out, index) in selfData.children"
          :key="index"
          class="cell-row"
        >
          <td
            v-for="(inner, index1) in out.children"
            :key="index1"
            class="cell"
            :class="{
              'col-hover': index1 === colNum,
              'cancel-border-right': index1 === out.children.length - 1
            }"
            style="max-width: 100px; min-width: 100px"
          >
            <div
              class="col-line"
              v-if="index1 !== out.children.length - 1"
              @mouseover="setHoverCol(index, index1, $event)"
              @mousedown="dragCol($event)"
              @mouseleave="resetHoverCol"
              @mousemove="moveCol($event)"
            ></div>

            <text-widget v-model="inner.rich_text" />
          </td>
          <div
            class="row-line"
            v-if="index !== selfData.children.length - 1"
          ></div>
        </tr>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, ref } from 'vue'
import TextWidget from './textwidge.vue'
// import NestedEditor from '../../editor/elementBox/NestedEditor.vue'
export default defineComponent({
  inheritAttrs: false,
  name: 'st-table',
  props: {
    editorItem: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    TextWidget
  },
  setup(props) {
    const { editorItem: selfData } = toRefs(props)
    // 列和行的数量可以添加到数据结构的data里面
    // let colList = computed(() => {
    //   // 计算属性初始化加10
    //   return selfData.children[0]
    // })
    // const colList = computed(() => {
    //   // 计算属性初始化加10
    //   return props.editorItem.children[0]
    // })
    const colNum = ref(-1)
    const rowNum = ref(-1)
    const dragStatus = ref(false)
    const itemRef: any = ref([])
    const returnColWidth = ref()
    const mousePosition = ref()
    const colRef = (el) => {
      itemRef.value.push(el)
    }

    function setHoverCol(val1, val2, event) {
      colNum.value = val2
    }
    function setHoverRow(val) {
      rowNum.value = val
    }
    function resetHoverCol() {
      colNum.value = -1
    }
    function resetHoverRow() {
      rowNum.value = -1
    }
    function dragCol(event) {
      mousePosition.value = event.clientX
      dragStatus.value = true
      console.log(
        parseInt(event.target.parentNode.style.maxWidth),
        'eventeventeventevent'
      )
      returnColWidth.value = parseInt(event.target.parentNode.style.maxWidth)
    }
    function cancelDragCol() {
      dragStatus.value = false
    }
    function moveCol(event) {
      if (dragStatus.value) {
        console.log(event)
        event.target.parentNode.style.maxWidth =
          returnColWidth.value + (event.pageX - mousePosition.value) + 'px'
      }
    }
    // return () =>
    //   h('table', { class: { 'table-widgets-box': true }, border: '1' }, [
    //     h('colgroup', null, [
    //       colList.value.children.map(() => {
    //         return h('col', { span: '1' })
    //       })
    //     ]),
    //     ...selfData.value.children.map((trlist) => {
    //       return h('tr', null, [
    //         h('div', { class: { 'row-line': true } }),
    //         ...trlist.children.map((colItem, index, arr) => {
    //           return h(
    //             'td',
    //             { class: { cell: true }, 'data-td-index': index },
    //             [
    //               index !== arr.length
    //                 ? h('div', {
    //                   class: { 'col-line': true },
    //                   onMouseover: (event) => testalr(event)
    //                 })
    //                 : null,
    //               h(resolveComponent('TextWidget'))
    //             ]
    //           )
    //         })
    //       ])
    //     })
    //   ])
    return {
      selfData,
      setHoverCol,
      colNum,
      resetHoverCol,
      rowNum,
      setHoverRow,
      resetHoverRow,
      dragCol,
      cancelDragCol,
      moveCol,
      dragStatus,
      colRef,
      returnColWidth
    }
  }
})
</script>

<style lang="scss" scoped>
.table-widgets-box {
  position: relative;
  table-layout: fixed;
  word-break: break-all;
}
.cell-row {
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: top;
  will-change: width, max-width;
  // .cancel-border-right {
  //   border-right: 0;
  // }
}
.row-line {
  height: 4px;
  position: absolute;
  bottom: -2px;
  left: -1px;
  width: calc(100% + 2px);
  background-color: transparent;
}
.cell {
  position: relative;
  padding: 7px 0;
  min-width: 30px;
}
.col-line {
  z-index: 999;
  width: 6px;
  height: calc(100% + 4px);
  position: absolute;
  right: -3px;
  top: 0;
  background-color: transparent;
  cursor: w-resize;
  padding: 0 1px;
  transition: all 0.2s ease;
  border-radius: 3px;
}
.col-hover .col-line {
  background-color: rgb(116, 182, 219);
}
.column1 {
  background-color: red;
}
</style>
