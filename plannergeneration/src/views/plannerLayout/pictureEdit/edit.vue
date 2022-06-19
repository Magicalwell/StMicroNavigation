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
      <!-- 修改让画布始终铺满，缩放其中的图片 导出的时候还原图片-->
    </div>
    <p>
      左侧可缩放拖拽 拖动时右侧会有视野框 右侧提供预览
      切换画笔加载不同的逻辑/但要注意清除其他的方法
    </p>
    <div class="main-box">
      <div class="main-bar" style="margin-right: 12px">
        画布：
        <a-spin :spinning="spinning">
          <canvas
            class="matting-board"
            id="editcanvas"
            @click="canvasClick($event)"
          ></canvas>
        </a-spin>
      </div>
      <div class="main-bar" style="margin-left: 12px">
        预览：
        <canvas class="preview" id="preview"></canvas>
      </div>
      <!-- 参考:https://github.com/corleone113/my-matting     https://www.php.cn/ps-tutorial-351889.html -->
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted, watch, toRefs } from 'vue'
import { useStore } from 'vuex'
import useRc from './useRc'
import { useMatting, useMattingBoard } from './useMatting'
import { useEarse } from './useEarse'

export default defineComponent({
  props: {
    imgData: {
      type: String
    }
  },
  setup(props, { expose }) {
    const store = useStore()
    const editType = ref('mobang')
    const editCanvasBox = ref(null)
    const earseBox = ref(null)
    const spinning = ref(false)
    const penModal = ref('0')
    const { imgData: imgPlaceHolder } = toRefs(props) // 在此生成img便于获取宽高
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
    // const img = document.createElement('img')
    // img.src = imgPlaceHolder.value
    // console.log(img.width, 'img.widthimg.width')

    // const draw = () => {
    //   const contentWidth = document.getElementById('content').clientWidth
    //   canvas.width = contentWidth
    //   const { width } = canvas
    //   ctx.fillStyle = 'red'
    //   ctx.fillRect(0, 0, width, 50)
    // }
    // draw()
    // 窗口缩放事件
    // window.onresize = function () {
    //   draw()
    // }
    expose({ savePicture })

    onMounted(() => {
      const canvas = document.querySelector('#editcanvas')
      const canvasbox = document.querySelector('.ant-spin-container')
      const context = canvas.getContext('2d')
      const img = document.createElement('img')
      img.src = imgPlaceHolder.value
      img.onload = function () {
        canvas.height = img.height
        canvas.width = img.width
        context.drawImage(img, 0, 0, img.width, img.height)
        console.log(canvasbox)
        console.log(img.width, canvas.width, '------------------')
      }

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
            const { picFile, isErasing, radius, hardness } = useMatting()
            const {
              width,
              height,
              inputCtx,
              outputCtx,
              outputHiddenCtx,
              draggingInputBoard,
              initialized,
              mattingSources
            } = useMattingBoard({ picFile, isErasing, radius, hardness })
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
  height: calc(100% - 66px);
  display: flex;
  .main-bar {
    height: 100%;
    flex: 1 1;
    overflow-y: hidden;
  }
}
.matting-board {
  flex: 1 50%;
  border: 1px solid #c3c7c9;
  background: #e3e7e9;
  background-image: linear-gradient(45deg, #f6fafc 25%, transparent 0),
    linear-gradient(45deg, transparent 75%, #f6fafc 0),
    linear-gradient(45deg, #f6fafc 25%, transparent 0),
    linear-gradient(45deg, transparent 75%, #f6fafc 0);
  background-position: 0 0, 12px 12px, 12px 12px, 24px 24px;
  background-size: 24px 24px;
}
.matting-board,
.preview {
  height: 100%;
  width: 100%;
}
</style>
