<template>
  <div class="toolbox" :style="{ top: toolY }">
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
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import {
  SearchOutlined,
  DeleteOutlined,
  UndoOutlined,
  RedoOutlined,
  SaveOutlined,
  EyeOutlined
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
    SaveOutlined
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
}
</style>
