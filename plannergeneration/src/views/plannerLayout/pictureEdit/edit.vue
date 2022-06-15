<template>
  <div class="edit-container">
    <div class="tools-bar">
      <div>
        模式:
        <a-select
          ref="select"
          v-model:value="editType"
          style="width: 120px"
          @change="handleChange"
        >
          <a-select-option value="mobang">魔棒</a-select-option>
          <a-select-option value="cachupen">擦除画笔</a-select-option>
          <a-select-option value="xiufupen">修复画笔</a-select-option>
        </a-select>
      </div>
    </div>
    <div class="main-box">
      <div style="height: 100%; flex: 1; overflow-y: auto">
        <canvas
          class="left-edit"
          id="editcanvas"
          @click="editCanvasBox.getAimRgb($event)"
        ></canvas>
      </div>
      <div style="height: 100%; flex: 1">
        <!-- <canvas class="preview"></canvas> -->
        暂无预览
      </div>
      <!-- 参考:https://github.com/corleone113/my-matting     https://www.php.cn/ps-tutorial-351889.html -->
    </div>
    <!-- <img style="width: 100%" :src="imgData" /> -->
  </div>
</template>
<script>
import { PlusOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import useRc from './useRc'

export default defineComponent({
  props: {
    imgData: {
      type: String
    }
  },
  setup(props) {
    const store = useStore()
    const editType = ref('mobang')
    const editCanvasBox = ref(null)
    const handleChange = () => {
      console.log(111)
    }
    onMounted(() => {
      watch(
        () => editType.value,
        (val) => {
          if (val === 'mobang') {
            editCanvasBox.value = useRc({ pictureData: props.imgData })
          }
        },
        { immediate: true }
      )
    })

    return { editType, handleChange, editCanvasBox }
  }
})
</script>

<style lang="scss" scoped>
.edit-container {
  height: 100%;
  .tools-bar {
    margin-bottom: 12px;
  }
}
.main-box {
  height: calc(100% - 32px);
  display: flex;
}
</style>
