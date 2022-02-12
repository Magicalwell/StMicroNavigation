<template>
  <div
    id="editor-container"
    @click.self="generationNewInput"
    @drop="drogitem"
    @dragover="dragOveritem($event)"
  >
    暂时先做表单生成部分，手账生成换到下期计划
    <!-- <template v-for="item in valueList"> </template> -->
    <!-- <component
      v-for="item in valueList"
      :key="item.id"
      :is="item.component"
      class="input-item"
      auto-size
      v-model:value="item.value"
      @mouseenter="insertControlBtn(item, $event)"
      @mouseleave="deleteControlBtn(item)" 可能hover错了对象，导致鼠标无法挪到操作按钮上面
      ------------------------
      ------------------------
      暂时把按钮放在组件的item中去，因为无法解决节流，按钮跟随拖动移动
    /> -->
    <!-- <div class="control-label" id="controllabel" @dragstart="dragStartItem($event)" :draggable="true">
      <transition-group name="fade-btn-label">
        <div
          style="position: absolute; left: 20px"
          v-for="item in hoverContainer"
          :key="item.id"
          :style="{ top: item.positionY + 'px' }"

        >
          <plus-outlined class="add-new-element" />
          <bars-outlined class="move-new-element" :draggable="true"/>
        </div>
      </transition-group>
    </div> -->
    <a-popover title="组件列表" trigger="click" placement="topLeft" :overlayStyle="{width:'300px'}">
      <template #content>
        <a-list size="small" :data-source="componentsList" style="max-height:200px;overflow-y:auto;">
          <template #renderItem="{ item }">
            <a-list-item class="pop-inner-list-item">{{ item}}</a-list-item>
          </template>
        </a-list>
      </template>
      <editor draggable=".item-drag" handle=".move-new-element">
        <template #item="{ element: outElement }">
          <div class="list-group-item">
            <!-- <component
            :ref="divs"
            :key="outElement.id"
            :is="outElement.component"
            class="input-item"
            auto-size
            v-model:value="outElement.value"
            :placeholder="outElement.label"
            @mouseenter="insertControlBtn(outElement, $event)"
          /> -->
            <component
              :ref="divs"
              :key="outElement.id"
              :is="outElement.component"
              class="input-item"
              v-bind="outElement.propValue"
              v-model:value="outElement.value"
              :placeholder="outElement.placeholder"
            >
            <template v-if="outElement.children" >
              <component :is='item.component' v-for="(item,index) in outElement.children" :key="index"></component>
            </template>
            </component>
            <div class="control-label">
              <plus-outlined class="add-new-element" @click="showAddPanel" />
              <select-outlined class="move-new-element" />
            </div>
          </div>
        </template>
      </editor>
    </a-popover>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, nextTick, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { PlusOutlined, SelectOutlined } from '@ant-design/icons-vue'
import editor from './elementBox/elementBox.vue'
// import { throttle } from 'throttle-debounce-ts'
export default defineComponent({
  setup() {
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
      if (store.state.textContainer.length === 0 || checkLastElement()) {
        console.log(checkLastElement())
        store.commit('ADD_NEW_DEFAULT_INPUT')
      }
      // nextTick(() => {
      //   (mainRef.value[mainRef.value.length - 1] as any).focus()
      // })
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
        store.state.textContainer.push({
          ...defaultData[type.type],
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
      valueList: ref(store.state.textContainer),
      componentsList: reactive(store.getters.componentsValueList)
    }
  },
  components: {
    editor,
    PlusOutlined,
    SelectOutlined
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
.pop-inner-list-item{
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover{
    background-color: rgba(55, 53, 47, 0.08);
  }
}
</style>
