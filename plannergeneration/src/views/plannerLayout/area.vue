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
import { defineComponent, onMounted, computed, watch, ref, reactive } from 'vue'
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
  watch: {
    plannerCanvas() {
      console.log('new')
    }
  },
  setup() {
    const store = useStore()
    const canvasStyleData = computed(
      () => store.state.plannerVuex.canvasStyleData
    )
    const saveFlag = computed(() => store.state.plannerVuex.saveFlag)
    const ImgFlag = computed(() => store.state.plannerVuex.addImageData)
    // fabric配置属性
    const option = {
      width: canvasStyleData.value.planerWidth, // 画布宽度
      height: canvasStyleData.value.planerHeight, // 画布高度
      backgroundColor: '#fff', // 设置画布背景色
      fireRightClick: true, // 启用右键，button的数字为3
      stopContextMenu: false, // 禁止默认右键菜单
      fireMiddleClick: true,
      altSelectionKey: 'altKey',
      preserveObjectStacking: true
    }
    let plannerCanvas = reactive(null) // canvas实例
    let chooseList = [] // 选中的元素list
    const areaMoving = ref(false) // 拖动的标志位
    function exportImg() {
      plannerCanvas.setZoom(1)
      plannerCanvas.absolutePan({ x: 0, y: 0 })
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
      var canvasJsonData = JSON.stringify(plannerCanvas.toJSON())
      if (opt.button === 2) {
        areaMoving.value = true
        plannerCanvas.selection = false
      }
      if (
        opt.button === 1 &&
        store.state.plannerVuex.toolBox.currentType === 'text-input'
      ) {
        const text = new fabric.Textbox('', {
          selectionColor: 'rgba(0,0,0,0.5)',
          width: 100,
          left: opt.pointer.x,
          top: opt.pointer.y,
          fontSize: 16,
          lineHeight: 1,
          lockScalingFlip: true, // 禁止负值反转
          splitByGrapheme: true // 拆分中文，可以实现自动换行
        })

        // Render the Textbox in canvas
        plannerCanvas.add(text)
        text.enterEditing()
        text.hiddenTextarea.focus()
      }
      const chooseList = plannerCanvas.getActiveObjects()
      if (opt.button === 3) {
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
    const canvasChangeCallback = (e) => {
      console.log('it changed!!!')
    }
    const middleDbclick = ref(null)

    watch(
      () => saveFlag.value.saveStatus,
      (item) => {
        if (item) {
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
    // _objects
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
          chooseList.forEach((val) => {
            plannerCanvas[item](val)
          })
        }
      },
      { deep: true }
    )
    onMounted(() => {
      // init()
      fabric.Object.prototype.cornerStyle = 'circle'
      fabric.Object.prototype.cornerColor = 'dodgerblue'
      fabric.Object.prototype.transparentCorners = false
      fabric.Object.prototype.controls.mtr.cursorStyle = 'crosshair'
      fabric.Canvas.prototype.orderObjects = function (compare) {
        // this._objects.sort(compare)
        console.log(this._objects)
        // this.renderAll()
        return this._objects
      }
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
      plannerCanvas.on('mouse:up', function (e) {
        if (e.button === 1) {
          store.commit('plannerVuex/changeToolCurrentType', '') // 重置工具栏的选中状态
        }
        if (e.button === 2) {
          plannerCanvas.defaultCursor = 'default'
          areaMoving.value = false
          plannerCanvas.selection = true
          if (middleDbclick.value) {
            // 通过定时器实现鼠标中键双击
            clearTimeout(middleDbclick.value)
            middleDbclick.value = null
            plannerCanvas.setZoom(1)
            plannerCanvas.absolutePan({ x: 0, y: 0 })
            plannerCanvas.renderAll()
          }

          middleDbclick.value = setTimeout(() => {
            clearTimeout(middleDbclick.value)
            middleDbclick.value = null
          }, 200)
        }
      })
      // 移动画布事件
      plannerCanvas.on('mouse:move', function (e) {
        if (areaMoving.value && e && e.e) {
          plannerCanvas.defaultCursor = 'move'
          console.log(999)
          var delta = new fabric.Point(e.e.movementX, e.e.movementY)
          plannerCanvas.relativePan(delta)
        }
      })
      plannerCanvas.on('object:added', function () {
        const tempList = plannerCanvas.getObjects()
        tempList.forEach((element, index) => {
          element.id = index
          element.layoutName = `图层${index}`
        })
        store.commit('plannerVuex/changeLayoutContainerArr', tempList)
      })
      plannerCanvas.on('object:removed', canvasChangeCallback)
      plannerCanvas.on('object:modified', canvasChangeCallback)
      // 鼠标滚动画布放大缩小 mouse:dblclick
      plannerCanvas.on('mouse:wheel', function (e) {
        var zoom = (e.e.deltaY > 0 ? -0.1 : 0.1) + plannerCanvas.getZoom()
        zoom = Math.max(0.1, zoom)
        zoom = Math.min(3, zoom)
        var zoomPoint = new fabric.Point(e.pointer.x, e.pointer.y)
        plannerCanvas.zoomToPoint(zoomPoint, zoom)
      })
    })

    return { handleContextMenu, canvasStyleData, plannerCanvas }
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
    overflow: hidden;
    transform: translate(-50%, -50%);
    // background: #fff;
    text-align: center;
  }
}
</style>
