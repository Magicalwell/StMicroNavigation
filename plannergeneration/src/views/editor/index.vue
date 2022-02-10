<template>
  <div id="editor-container" @click.self="generationNewInput">
    暂时先做表单生成部分，手账生成换到下期计划
    <a-textarea
      v-model:value="value"
      placeholder="Autosize height based on content lines"
      auto-size
      class="input-item"
    />
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
    /> -->
    <component
      :ref="divs"
      v-for="item in valueList"
      :key="item.id"
      :is="item.component"
      class="input-item"
      auto-size
      v-model:value="item.value"
      :placeholder="item.label"
    />
    <div class="control-label" id="controllabel">
      <transition-group name="fade-btn-label">
        <div
          style="position: absolute; left: 20px"
          v-for="item in hoverContainer"
          :key="item.id"
          :style="{ top: item.positionY + 'px' }"
        >
          <plus-outlined class="add-new-element" />
          <bars-outlined class="move-new-element" />
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
import { useStore } from 'vuex'
import { PlusOutlined, BarsOutlined } from '@ant-design/icons-vue'
import draggable from 'vuedraggable'

export default defineComponent({
  setup () {
    const hoverContainer = ref([])
    const value = ref<string>('')
    const mainRef = ref([])
    const store = useStore()
    const divs = (el: HTMLElement) => {
      (mainRef.value as Array<HTMLElement>).push(el)
    }
    function generationNewInput () {
      // 检测最后一个元素是否为空，是则focus该元素。否则新增一个空的input放在后面并focus
      console.log(store.state.textContainer)
      if (store.state.textContainer.length === 0 || checkLastElement) {
        store.commit('ADD_NEW_DEFAULT_INPUT')
      } else {
        console.log(mainRef.value.length)
      }
    }
    // const throttle = function (func, delay) {
    //   var prev = Date.now()
    //   return function () {
    //     var context = this
    //     var args = arguments
    //     var now = Date.now()
    //     if (now - prev >= delay) {
    //       func.apply(context, args)
    //       prev = Date.now()
    //     }
    //   }
    // }
    function checkLastElement () {
      if (mainRef.value[mainRef.value.length - 1] !== '') { // 还是要换成检测数据的方式，用dom的话不能检测很多复杂组件的value
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
        positionY: e.target.offsetTop + 4
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
    return {
      mainRef,
      divs,
      value,
      generationNewInput,
      insertControlBtn,
      deleteControlBtn,
      testMouseMove,
      checkLastElement,
      hoverContainer,
      valueList: ref(store.state.textContainer)
    }
  },
  components: {
    PlusOutlined,
    BarsOutlined,
    draggable
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
  overflow-y: auto;
  padding-bottom: 40px;
}
.input-item {
  border-color: transparent !important;
  margin-top: 1px;
  margin-bottom: 1px;
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
