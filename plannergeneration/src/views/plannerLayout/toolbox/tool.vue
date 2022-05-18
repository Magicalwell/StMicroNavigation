<template>
  <div class="toolbox" :style="{ top: toolY }">
    <div class="planner-setting">
      <div class="cal-area">
        <a-input
          v-model:value="areaWidth"
          placeholder="Basic"
          class="area-input"
        />
        x
        <a-input
          v-model:value="areaHeight"
          placeholder="Basic"
          class="area-input"
        />
      </div>
    </div>
    <a-button type="primary" shape="circle" class="opt-btn">
      <template #icon><SearchOutlined /></template>
    </a-button>
    <a-button type="primary" shape="circle" class="opt-btn">
      <template #icon><delete-outlined /></template>
    </a-button>

    <a-button type="primary" shape="circle" class="opt-btn">
      <template #icon><undo-outlined /></template>
    </a-button>
    <a-button type="primary" shape="circle" class="opt-btn">
      <template #icon><redo-outlined /></template>
    </a-button>

    <a-button type="primary" shape="circle" class="opt-btn">
      <template #icon> <save-outlined /></template>
    </a-button>
    <a-button type="primary" shape="circle" class="opt-btn">
      <template #icon><eye-outlined /></template>
    </a-button>
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
  DownOutlined
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
    DownOutlined
  },
  setup() {
    // 595×842
    const store = useStore()
    const areaWidth = ref(595)
    const areaHeight = ref(842)
    function handleMenuClick(item) {
      store.commit('plannerVuex/changeSaveFlag', item.key)
      nextTick(() => {
        store.commit('plannerVuex/resetSaveFlag')
      })
    }
    return { areaWidth, areaHeight, handleMenuClick }
  }
})
</script>

<style lang="scss" scoped>
.toolbox {
  position: absolute;
  //   top: 20px;
  left: 46%;
  transform: translate(-50%, 0);
  z-index: 999;
  background-color: #fff;
  padding: 6px 12px;
  border-radius: 16px;
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
}
</style>
