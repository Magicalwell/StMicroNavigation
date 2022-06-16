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
          <a-select-option value="metalpen">钢笔</a-select-option>
          <a-select-option value="alibaba">阿里智能抠图</a-select-option>
        </a-select>
      </div>
    </div>
    <div class="main-box">
      <div style="height: 100%; flex: 1; overflow-y: auto">
        <a-spin :spinning="spinning">
          <canvas
            class="left-edit"
            id="editcanvas"
            @click="canvasClick($event)"
          ></canvas>
        </a-spin>
      </div>
      <div style="height: 100%; flex: 1">
        <canvas class="preview" v-if="editType == 'cachupen'"></canvas>
        <span v-else>暂无预览</span>
      </div>
      <!-- 参考:https://github.com/corleone113/my-matting     https://www.php.cn/ps-tutorial-351889.html -->
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
import useRc from './useRc'

export default defineComponent({
  props: {
    imgData: {
      type: String
    }
  },
  setup(props, { expose, emit }) {
    const store = useStore()
    const editType = ref('mobang')
    const editCanvasBox = ref(null)
    const spinning = ref(false)
    const handleChange = () => {
      console.log(111)
    }
    const savePicture = () => {
      const plannerCanvas = document.querySelector('#editcanvas')
      const dataURL = plannerCanvas.toDataURL({
        width: plannerCanvas.width,
        height: plannerCanvas.height,
        left: 0,
        top: 0,
        format: 'jpg',
        quality: 0.9
      })
    }
    const sendDuring = () => {
      console.log(102321)
      spinning.value = false
    }
    const canvasClick = (val) => {
      if (editType.value === 'mobang') {
        spinning.value = true
        setTimeout(() => {
          editCanvasBox.value.getAimRgb(val)
        }, 10)
        // nextTick(() => {
        //   editCanvasBox.value.getAimRgb(val)
        // })
      }
    }
    expose({ savePicture })
    onMounted(() => {
      watch(
        () => editType.value,
        (val) => {
          if (val === 'mobang') {
            editCanvasBox.value = useRc(
              {
                pictureData: props.imgData
              },
              sendDuring
            )
          }
          if (val === 'cachupen') {
            editCanvasBox.value = ''
          }
        },
        { immediate: true }
      )
    })

    return { editType, handleChange, editCanvasBox, spinning, canvasClick }
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
