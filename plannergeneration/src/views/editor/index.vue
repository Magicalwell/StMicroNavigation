<template>
  <div
    id="editor-container"
    @click.self="generationNewInput"
    @drop="drogitem"
    @dragover="dragOveritem($event)"
  >
    暂时先做表单生成部分，手账生成换到下期计划/已完成多层组件渲染，但组件中嵌套的插槽部分无法实现，需要重新封装组件
    <stoneDragBox :child-component-list="valueList"> </stoneDragBox>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, nextTick, reactive } from 'vue'
import { useStore } from 'vuex'
// import { PlusOutlined, SelectOutlined } from '@ant-design/icons-vue'
import stoneDragBox from './elementBox/elementBox.vue'
import { generatePage } from '../../utils/generateBlock'
export default defineComponent({
  setup() {
    const pageContainer = generatePage()

    const hoverContainer = ref([])
    const mainRef = ref([])
    const store = useStore()
    const defaultData = reactive(store.state.defaultComponents)
    const type = reactive(store.getters.returnComponentType)
    // const Modelvisible = ref<boolean>(false)
    const divs = (el: HTMLElement) => {
      (mainRef.value as Array<HTMLElement>).push(el)
    }
    const lastElement = store.state.textContainer
    function generationNewInput() {
      // 检测最后一个元素是否为空，是则focus该元素。否则新增一个空的input放在后面并focus
      console.log(store.state.textContainer)

      console.log(store.state.textContainer)
      if (store.state.textContainer.length === 0 || checkLastElement()) {
        console.log(checkLastElement())
        store.commit('ADD_NEW_DEFAULT_INPUT')
      }
    }
    function checkLastElement() {
      if (lastElement[lastElement.length - 1].value !== '') {
        // 还是要换成检测数据的方式，用dom的话不能检测很多复杂组件的value
        return true
      } else {
        return false
      }
    }
    function insertControlBtn(item: any, e: any) {
      // 根据数据驱动hover之后显示对应的按钮
      if (hoverContainer.value.some((val: any) => val.id === item.id)) return
      hoverContainer.value.push({
        ...item,
        positionY: reactive(e.target.offsetTop) + 3
      } as never)
    }
    function deleteControlBtn(item: any) {
      nextTick(() => {
        hoverContainer.value.splice(
          hoverContainer.value.findIndex((val: any) => val.id === item.id),
          1
        )
      })
    }
    function dragStartItem(e: any) {
      e.preventDefault()
      console.log(e)
    }
    function dragOveritem(e: any) {
      e.preventDefault()
      // console.log('在拖拽中')
      // console.log(e.target)
    }
    function drogitem(e: any) {
      if (e.target.id) {
        // console.log(defaultData[type.type])
        // console.log(defaultData)
        // console.log(type)
        const objString = JSON.stringify(defaultData[type.type])
        const obj2 = JSON.parse(objString)
        console.log(store.state.textContainer.length + 1)
        store.state.textContainer.push({
          ...obj2,
          id: store.state.textContainer.length + 1
        })
      }
      console.log(e.target)
      console.log(e)
    }
    function showAddPanel() {
      console.log('我出来啦')
    }
    return {
      mainRef,
      divs, // 列表dom
      generationNewInput, // 点击空白新增空列表
      insertControlBtn, // 根据hover对象动态添加btn，是把操作按钮独立出来的做法，暂时不用
      deleteControlBtn, // 同上，为删除
      checkLastElement, // 检测最后一个dom是否为空的
      hoverContainer, // 用于接收hover了哪个dom
      dragStartItem, // h5拖拽事件，没用到
      dragOveritem, // h5拖拽事件，没用到
      drogitem, // h5拖拽事件，没用到
      showAddPanel,
      pageContainer,
      valueList: ref(store.state.textContainer),
      componentsList: reactive(store.getters.componentsValueList)
    }
  },
  components: {
    stoneDragBox
    // PlusOutlined,
    // SelectOutlined,
    // componentsItem
  },
  directives: {}
})
</script>

<style lang="scss" scoped>
.fade-btn-label-enter-active,
.fade-btn-label-leave-active {
  transition: all 0.3s ease;
}
.fade-btn-label-enter-from,
.fade-btn-label-leave-to {
  opacity: 0;
}
.fade-btn-label-enter-to,
.fade-btn-label-leave-from {
  opacity: 1;
}
#editor-container {
  position: relative;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 80px;
}
.control-label {
  position: absolute;
  top: 0;
  left: 0;
}
.add-new-element {
  display: flex;
  align-items: center;
  justify-content: center;
  fill: rgba(55, 53, 47, 0.3);
  position: absolute;
  top: 4px;
  left: 0px;
  width: 24px;
  height: 24px;
}
.move-new-element {
  width: 18px;
  height: 24px;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
  fill: rgba(55, 53, 47, 0.3);
  left: 24px;
  top: 4px;
  position: absolute;
}
.pop-inner-list-item {
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: rgba(55, 53, 47, 0.08);
  }
}
</style>
