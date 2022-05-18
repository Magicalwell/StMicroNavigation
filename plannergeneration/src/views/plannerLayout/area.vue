<template>
  <div
    class="plannerarea"
    @contextmenu="handleContextMenu"
    style="width: 1200px"
  >
    <Grid />
    <canvas id="plannerarea" width="1200" height="900" class="area"></canvas>
    <!-- https://blog.csdn.net/weixin_31222161/article/details/117763012   抠图 -->
    <!-- https://woai3c.github.io/visual-drag-demo/#/  参考 -->
    <!-- https://blog.csdn.net/daicooper/article/details/79800718 -->
    <!-- 由于图片比较大，转为base64的时候需要事件，此间不能点击 -->
  </div>
</template>

<script>
import { defineComponent, onMounted, computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { fabric } from 'fabric'
import Grid from './grid.vue'

export default defineComponent({
  name: 'planner',
  components: {
    Grid
  },
  setup() {
    const store = useStore()
    const saveFlag = computed(() => store.state.plannerVuex.saveFlag)
    const ImgFlag = computed(() => store.state.plannerVuex.addImageData)
    let plannerCanvas = null
    // const init = () => {}
    function exportImg() {
      const dataURL = plannerCanvas.toDataURL({
        width: plannerCanvas.width,
        height: plannerCanvas.height,
        left: 0,
        top: 0,
        format: 'jpg',
        quality: 0.8
      })
      const link = document.createElement('a')
      link.download = 'canvas.jpg'
      link.href = dataURL
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    function handleContextMenu() {
      console.log(11)
    }
    const addToCanvasByUrl = (canvas, data) => {
      fabric.Image.fromURL(data, (img) => {
        // img.set(Image.defaultImage(canvas, img))
        canvas.add(img)
        img.center()
        img.sendBackwards()
      })
    }
    watch(
      () => saveFlag.value.saveStatus,
      (item) => {
        if (item) {
          console.log(plannerCanvas.width)
          exportImg()
        }
      }
    )
    watch(
      () => ImgFlag.value.flag,
      (item) => {
        if (item) {
          addToCanvasByUrl(plannerCanvas, ImgFlag.value.data)
          console.log(item, '监听了图片上传')
        }
      }
    )
    onMounted(() => {
      // init()
      plannerCanvas = new fabric.Canvas('plannerarea')
      var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20
      })
      console.log(rect)

      plannerCanvas.add(rect)
      console.log('saveFlag')
    })

    return { handleContextMenu }
  }
})
</script>

<style lang="scss" scoped>
.plannerarea {
  position: relative;
  background: #fff;
  margin: 0 auto;
  height: 100%;
  .lock {
    &:hover {
      cursor: not-allowed;
    }
  }
  ::v-deep(.canvas-container) {
    margin: 0 auto;
  }
}
</style>
