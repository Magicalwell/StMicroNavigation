<template>
  <div
    class="plannerarea"
    @contextmenu="handleContextMenu"
    style="width: 1200px"
  >
    <div class="area-container">
      <Grid
        :width="parseInt(canvasStyleData.planerWidth)"
        :height="parseInt(canvasStyleData.planerHeight)"
      />
      <canvas
        id="plannerarea"
        :width="canvasStyleData.planerWidth"
        :height="canvasStyleData.planerHeight"
        :style="{
          width: canvasStyleData.planerWidth + 'px',
          height: canvasStyleData.planerHeight + 'px'
        }"
        class="area"
      ></canvas>
    </div>

    <!-- https://blog.csdn.net/weixin_31222161/article/details/117763012   抠图 -->
    <!-- https://woai3c.github.io/visual-drag-demo/#/  参考 -->
    <!-- https://blog.csdn.net/daicooper/article/details/79800718 -->
    <!-- 由于图片比较大，转为base64的时候需要事件，此间不能点击 -->
    <!-- 考虑将拖拽加入home中 -->
    <ContextMenu />
  </div>
</template>

<script>
import { defineComponent, onMounted, computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { fabric } from 'fabric'
import Grid from './grid.vue'
import ContextMenu from './editor/contentText.vue'
export default defineComponent({
  name: 'planner',
  components: {
    Grid,
    ContextMenu
  },
  setup() {
    const store = useStore()
    const canvasStyleData = computed(
      () => store.state.plannerVuex.canvasStyleData
    )
    const saveFlag = computed(() => store.state.plannerVuex.saveFlag)
    const ImgFlag = computed(() => store.state.plannerVuex.addImageData)
    const option = {
      width: canvasStyleData.value.planerWidth, // 画布宽度
      height: canvasStyleData.value.planerHeight, // 画布高度
      backgroundColor: '#fff', // 设置画布背景色
      fireRightClick: true, // 启用右键，button的数字为3
      stopContextMenu: false // 禁止默认右键菜单
    }
    let plannerCanvas = null
    let chooseList = []
    const areaMoving = ref(false)
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
    const handleContextMenu = (e) => {
      e.stopPropagation()
      e.preventDefault()
      console.log('handleContextMenu')
      chooseList = plannerCanvas.getActiveObjects()
      // 计算菜单相对于编辑器的位移
      let target = e.target
      let top = e.offsetY
      let left = e.offsetX

      while (!target.className.includes('area-container')) {
        if (target.parentNode.className.includes('area-container')) break
        target = target.parentNode
      }
      while (!target.className.includes('area-container')) {
        left += target.offsetLeft
        top += target.offsetTop
        target = target.parentNode
      }
      if (chooseList.length > 0) {
        store.commit('plannerVuex/showContextMenu', { top, left })
      }
    }
    const canvasOnMouseDown = (opt) => {
      // canvas的事件要优先于plannerarea的contextmenu事件
      // 鼠标事件触发的顺序：优先是mouse系列的事件，接着才是具体的click，或contextmenu
      console.log(opt.target)
      if (!opt.target) {
        areaMoving.value = true
        plannerCanvas.selection = false
      }

      // console.log(plannerCanvas.getZoom())
      // plannerCanvas.setZoom(0.5)
      // plannerCanvas.setWidth(
      //   canvasStyleData.value.planerWidth * plannerCanvas.getZoom()
      // )
      // plannerCanvas.setHeight(
      //   canvasStyleData.value.planerHeight * plannerCanvas.getZoom()
      // )
      const chooseList = plannerCanvas.getActiveObjects()
      if (opt.button === 3) {
        console.log(chooseList)
        if (chooseList.length === 0 && opt.target) {
          plannerCanvas.setActiveObject(opt.target)
        }
        if (chooseList.length === 1 && opt.target) {
          plannerCanvas.discardActiveObject()
          plannerCanvas.setActiveObject(opt.target)
        }
        plannerCanvas.renderAll()
        // plannerCanvas.setActiveObject(opt.target, true)
      }
    }
    const addToCanvasByUrl = (canvas, data) => {
      fabric.Image.fromURL(data, (img) => {
        // img.set(Image.defaultImage(canvas, img))
        canvas.add(img)
        img.center()
        img.sendBackwards()
      })
    }
    const canvasChangeCallback = () => {
      console.log('it changed!!!')
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
    watch(
      () => canvasStyleData.value,
      (item) => {
        plannerCanvas.setHeight(item.planerHeight)
        plannerCanvas.setWidth(item.planerWidth)
      },
      { deep: true }
    )
    watch(
      () => store.state.plannerVuex.canvasEvent.type,
      (item) => {
        if (item) {
          console.log(chooseList)
          chooseList.forEach((val) => {
            plannerCanvas[item](val)
          })
        }
      },
      { deep: true }
    )
    onMounted(() => {
      // init()
      plannerCanvas = new fabric.Canvas('plannerarea', option)
      var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20
      })
      plannerCanvas.add(rect)
      plannerCanvas.on('mouse:down', canvasOnMouseDown)
      plannerCanvas.on('mouse:up', function () {
        areaMoving.value = false
        plannerCanvas.selection = true
      })
      // 移动画布事件
      plannerCanvas.on('mouse:move', function (e) {
        if (areaMoving.value && e && e.e) {
          var delta = new fabric.Point(e.e.movementX, e.e.movementY)
          plannerCanvas.relativePan(delta)
        }
      })
      plannerCanvas.on('object:added', canvasChangeCallback)
      plannerCanvas.on('object:removed', canvasChangeCallback)
      plannerCanvas.on('object:modified', canvasChangeCallback)
      // 鼠标滚动画布放大缩小
      plannerCanvas.on('mouse:wheel', function (e) {
        var zoom = (e.deltaY > 0 ? -0.1 : 0.1) + plannerCanvas.getZoom()
        zoom = Math.max(0.1, zoom)
        zoom = Math.min(3, zoom)
        var zoomPoint = new fabric.Point(e.pointer.x, e.pointer.y)
        console.log(zoomPoint)
        plannerCanvas.zoomToPoint(zoomPoint, zoom)
      })
    })

    return { handleContextMenu, canvasStyleData }
  }
})
</script>

<style lang="scss" scoped>
.plannerarea {
  position: relative;
  margin: 0 auto;
  height: 100%;
  overflow-y: auto;
  .lock {
    &:hover {
      cursor: not-allowed;
    }
  }
  ::v-deep(.canvas-container) {
    margin: 0 auto;
  }
  .area-container {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    transform: translate(-50%, -50%);
    // background: #fff;
    text-align: center;
  }
}
</style>
