<template>
  <div
    id="editor-container"
    @click.self="generationNewInput"
    @drop="drogitem"
    @dragover="dragOveritem($event)"
  >
    暂时先做表单生成部分，手账生成换到下期计划/已完成多层组件渲染，但组件中嵌套的插槽部分无法实现，需要重新封装组件;待办：1.回车会另外新加入一行，并接在输入行之后，自动focus。
    2.优化组件的点击、拖拽生成逻辑;3.左侧的工具栏计划也用vuedraggable组件;4.修改绑定字段，不一定每一个都是rich_text 5.优化hover的方法 6.从toggle内部移出会重置状态和输入的值(已解决) 7.当两个group
    拖拽时，会重新渲染组件的状态
    <NestedEditor
      :child-component-list="valueList.children"
    >
    </NestedEditor>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import NestedEditor from './elementBox/NestedEditor.vue'
export default defineComponent({
  setup() {
    const hoverContainer = ref([])
    const mainRef = ref([])
    const store = useStore()
    // const Modelvisible = ref<boolean>(false)
    if (!store.state.pageBox.children) {
      console.log(77777)

      store.commit('SET_DEFAULT_PAGE')
    }
    function generationNewInput() {
      // 检测最后一个元素是否为空，是则focus该元素。否则新增一个空的input放在后面并focus
      console.log(store.state.pageBox)

      if (store.state.pageBox.children.length === 0 || checkLastElement()) {
        store.commit('ADD_NEW_DEFAULT_INPUT')
      }
    }
    function checkLastElement() {
      const lastElement =
        store.state.pageBox.children[store.state.pageBox.children.length - 1]
      if (lastElement[lastElement.type].rich_text !== '') {
        // 还是要换成检测数据的方式，用dom的话不能检测很多复杂组件的value
        return true
      } else {
        return false
      }
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
      store.commit('ADD_NEW_DEFAULT_INPUT', store.state.dargActiveItem.id)
      console.log(e.target, '一拐枣')
    }
    function showAddPanel() {
      console.log('我出来啦')
    }
    return {
      mainRef,
      generationNewInput, // 点击空白新增空列表
      checkLastElement, // 检测最后一个dom是否为空的
      hoverContainer, // 用于接收hover了哪个dom
      dragStartItem, // h5拖拽事件，没用到
      dragOveritem, // h5拖拽事件，没用到
      drogitem, // h5拖拽事件，没用到
      showAddPanel,
      valueList: reactive(store.state.pageBox),
      userGlobalOptions: ref(store.state.userGlobalOptions),
      componentsList: reactive(store.getters.componentsValueList)
    }
  },
  components: {
    NestedEditor
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
