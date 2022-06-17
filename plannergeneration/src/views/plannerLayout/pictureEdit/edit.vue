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
          <a-select-option value="earse">橡皮</a-select-option>
        </a-select>
      </div>
      <a-button
        type="primary"
        danger
        ghost
        style="font-size: 12px"
        class="bar-item"
        @click="resetCanvas"
        >重置图片</a-button
      >
      <div class="bar-item" v-if="editType == 'cachupen'">
        修复画笔功能：
        <a-radio-group v-model:value="penModal">
          <a-radio value="1">选中</a-radio>
          <a-radio value="2">擦除</a-radio>
        </a-radio-group>
      </div>
    </div>
    <div class="main-box">
      <div class="main-bar">
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
import { useMatting } from './useMatting'
import { useEarse } from './useEarse'

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
    const earseBox = ref(null)
    const spinning = ref(false)
    const penModal = ref('0')
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

    const resetCanvas = () => {
      if (editType.value === 'mobang') {
        useRc({ pictureData: props.imgData }, sendDuring)
      }
    }
    expose({ savePicture })

    onMounted(() => {
      editCanvasBox.value = useRc(
        {
          pictureData: props.imgData
        },
        sendDuring
      )
      watch(
        () => editType.value,
        (val) => {
          if (val === 'mobang') {
            console.log('set魔棒')
            if (earseBox.value) {
              earseBox.value()
            }
          }
          if (val === 'cachupen') {
            useMatting({ pictureData: props.imgData })
            if (earseBox.value) {
              earseBox.value()
            }
          }
          if (val === 'earse') {
            const { removeEarseListener } = useEarse()
            earseBox.value = removeEarseListener
          }
        },
        { immediate: true }
      )
    })

    return {
      editType,
      earseBox,
      handleChange,
      editCanvasBox,
      spinning,
      canvasClick,
      resetCanvas,
      penModal
    }
  }
})
</script>

<style lang="scss" scoped>
.edit-container {
  height: 100%;
  .tools-bar {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    .bar-item {
      margin-left: 10px;
    }
  }
}
.main-box {
  height: calc(100% - 32px);
  display: flex;
  .main-bar {
    height: 100%;
    flex: 1;
    overflow-y: auto;
  }
}
</style>
