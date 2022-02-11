<template>
  <div id="editor-container" @click.self="generationNewInput" @drop="drogitem">
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
    <!-- <component
      :ref="divs"
      v-for="item in valueList"
      :key="item.id"
      :is="item.component"
      class="input-item"
      auto-size
      v-model:value="item.value"
      :placeholder="item.label"
      @mouseenter="insertControlBtn(item, $event)"
    />-->
    <div class="control-label" id="controllabel" @dragstart="dragStartItem($event)" :draggable="true">
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
    </div>
    <editor draggable=".item-drag">
      <template #item="{ element: outElement }">
        <div class="list-group-item">
          <component
          :ref="divs"
      :key="outElement.id"
      :is="outElement.component"
      class="input-item"
      auto-size
      v-model:value="outElement.value"
      :placeholder="outElement.label"
      @mouseenter="insertControlBtn(outElement, $event)"
    />
        </div>
      </template>
    </editor>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, nextTick, reactive } from 'vue'
import { useStore } from 'vuex'
import { PlusOutlined, BarsOutlined } from '@ant-design/icons-vue'
import editor from './elementBox/elementBox.vue'
// import { throttle } from 'throttle-debounce-ts'
export default defineComponent({
  setup () {
    const hoverContainer = ref([])
    const mainRef = ref([])
    const store = useStore()
    const divs = (el: HTMLElement) => {
      (mainRef.value as Array<HTMLElement>).push(el)
    }
    const lastElement = store.state.textContainer
    function generationNewInput () {
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
    function checkLastElement () {
      if (lastElement[lastElement.length - 1].value !== '') {
        // 还是要换成检测数据的方式，用dom的话不能检测很多复杂组件的value
        return true
      } else {
        return false
      }
    }
    function insertControlBtn (item: any, e: any) {
      // 根据数据驱动hover之后显示对应的按钮
      if (hoverContainer.value.some((val: any) => val.id === item.id)) return
      hoverContainer.value.push({
        ...item,
        positionY: reactive(e.target.offsetTop) + 3
      } as never)
    }
    function deleteControlBtn (item: any) {
      nextTick(() => {
        hoverContainer.value.splice(
          hoverContainer.value.findIndex((val: any) => val.id === item.id),
          1
        )
      })
    }
    function testMouseMove () {
      console.log(99999999)
    }
    function dragStartItem (e:any) {
      e.preventDefault()
      console.log(e)
    }
    function dragOveritem (e:any) {
      e.preventDefault()
      console.log('在拖拽中')
      console.log(e.target)
    }
    function drogitem () {
      console.log('拖拽结束')
    }
    return {
      mainRef,
      divs,
      generationNewInput,
      insertControlBtn,
      deleteControlBtn,
      testMouseMove,
      checkLastElement,
      hoverContainer,
      dragStartItem,
      dragOveritem,
      drogitem,
      valueList: ref(store.state.textContainer)
    }
  },
  components: {
    editor,
    PlusOutlined,
    BarsOutlined
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
  padding-left: 3%;
  padding-right: 3%;
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
</style>

<style lang="scss" scoped>
.add-new-element {
  display: flex;
  align-items: center;
  justify-content: center;
  fill: rgba(55, 53, 47, 0.3);
  position: absolute;
  top: 0px;
  left: -24px;
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
  left: 0px;
  position: absolute;
}
</style>
