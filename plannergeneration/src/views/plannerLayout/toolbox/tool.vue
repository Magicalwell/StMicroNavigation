<template>
  <div
    class="toolbox"
    :style="{ top: barPosition.top, left: barPosition.left }"
    :class="{ 'fold-tool': foldTool }"
  >
    <div
      class="coll-btn"
      @click="foldTool = !foldTool"
      @mousedown="changeDragFlag($event, 0)"
      @mousemove="moveDrag"
      @mouseup="changeDragFlag($event, 1)"
    >
      <!-- <SearchOutlined /> -->
      <compress-outlined />
    </div>

    <div class="planner-setting">
      <div class="cal-area">
        <a-input
          v-model:value.lazy="canvasStyleData.planerWidth"
          placeholder="Basic"
          class="area-input"
        />
        x
        <a-input
          v-model:value.lazy="canvasStyleData.planerHeight"
          placeholder="Basic"
          class="area-input"
          :maxlength="4"
        />
      </div>
    </div>
    <a-tooltip placement="topLeft">
      <template #title>
        <span>缩放画布</span>
      </template>
      <a-button type="primary" shape="circle" class="opt-btn" @click="showdata">
        <template #icon><SearchOutlined /></template>
      </a-button>
    </a-tooltip>
    <a-tooltip placement="topLeft">
      <template #title>
        <span>删除元素</span>
      </template>
      <a-button type="primary" shape="circle" class="opt-btn">
        <template #icon><delete-outlined /></template>
      </a-button>
    </a-tooltip>
    <a-tooltip placement="topLeft">
      <template #title>
        <span>撤销</span>
      </template>
      <a-button type="primary" shape="circle" class="opt-btn">
        <template #icon><undo-outlined /></template>
      </a-button>
    </a-tooltip>
    <a-tooltip placement="topLeft">
      <template #title>
        <span>前进</span>
      </template>
      <a-button type="primary" shape="circle" class="opt-btn">
        <template #icon><redo-outlined /></template>
      </a-button>
    </a-tooltip>

    <a-tooltip placement="topLeft">
      <template #title>
        <span>保存</span>
      </template>
      <a-button type="primary" shape="circle" class="opt-btn">
        <template #icon> <save-outlined /></template>
      </a-button>
    </a-tooltip>

    <a-tooltip placement="topLeft">
      <template #title>
        <span>预览</span>
      </template>
      <a-button type="primary" shape="circle" class="opt-btn">
        <template #icon><eye-outlined /></template>
      </a-button>
    </a-tooltip>

    <a-dropdown class="opt-btn">
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item :key="1">导出为jpg</a-menu-item>
          <a-menu-item :key="2">导出为pdf</a-menu-item>
        </a-menu>
      </template>
      <a-button type="primary">
        导出
        <DownOutlined />
      </a-button>
    </a-dropdown>
  </div>
</template>

<script>
import { defineComponent, ref, nextTick } from 'vue'
import { useStore } from 'vuex'
import {
  SearchOutlined,
  DeleteOutlined,
  UndoOutlined,
  RedoOutlined,
  SaveOutlined,
  EyeOutlined,
  DownOutlined,
  CompressOutlined
} from '@ant-design/icons-vue'
export default defineComponent({
  props: {
    toolY: {
      type: String,
      default: '20px'
    }
  },
  name: 'tool',
  components: {
    SearchOutlined,
    DeleteOutlined,
    RedoOutlined,
    EyeOutlined,
    UndoOutlined,
    SaveOutlined,
    DownOutlined,
    CompressOutlined
  },
  setup() {
    // 595×842
    const store = useStore()
    const dragFlag = ref(false)
    const barPosition = ref({ top: '20px', left: '46%' })
    const canvasStyleData = ref(store.state.plannerVuex.canvasStyleData)
    const foldTool = ref(false)
    function handleMenuClick(item) {
      store.commit('plannerVuex/changeSaveFlag', item.key)
      nextTick(() => {
        store.commit('plannerVuex/resetSaveFlag')
      })
    }
    const showdata = () => {
      console.log(store.state.plannerVuex.planerWidth)
    }
    const changeDragFlag = (event, type) => {
      console.log(event)
      if (type) {
        dragFlag.value = false
      } else {
        dragFlag.value = true
      }
    }
    const moveDrag = (event) => {
      if (dragFlag.value) {
        console.log(event.clientX)
        barPosition.value.left = event.screenX + 300 + 'px'
        barPosition.value.top = event.clientY - 69 + 'px'
      }
    }
    return {
      handleMenuClick,
      showdata,
      canvasStyleData,
      foldTool,
      changeDragFlag,
      moveDrag,
      barPosition
    }
  }
})
</script>

<style lang="scss" scoped>
.toolbox {
  &.fold-tool {
    width: 44px;
    overflow: hidden;
    border-radius: 44px;
    padding-left: 12px;
    .coll-btn {
      left: 22px;
      transform: translate(-50%, -50%);
      z-index: 100;
      transition: width 0.5s ease;
    }
    .planner-setting {
      margin-left: 44px;
    }
  }
  width: 650px;
  position: absolute;
  word-wrap: none;
  white-space: nowrap;
  height: 44px;
  left: 46%;
  transform: translate(-50%, 0);
  z-index: 999;
  background-color: #fff;
  padding: 6px 12px;
  padding-left: 44px;
  border-radius: 16px;
  transition: border-radius, width 0.5s ease;
  box-shadow: 0 2px 6px rgba($color: #000000, $alpha: 0.1);
  .opt-btn {
    margin: 0 6px;
  }
  .planner-setting {
    display: inline-block;
    margin: 0 10px;
    .area-input {
      width: 100px;
    }
  }
  .coll-btn {
    position: absolute;
    left: 22px;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    font-size: 22px;
    display: flex;
    transition: all 0.5s ease;
  }
}
</style>
