import { ref, watch, computed } from 'vue'
import { fabric } from 'fabric'
import { useStore } from 'vuex'
const usePainting = ({ plannerCanvas }) => {
  const store = useStore()
  const addNum = ref(0)
  const layoutContainer = computed(
    () => store.state.plannerVuex.layoutContainer
  )
  const selectIndex = computed(() => store.state.plannerVuex.paintAimedLayout)
  console.log(plannerCanvas.getActiveObjects())
  const hLinePatternBrush = new fabric.PencilBrush(plannerCanvas)
  // hLinePatternBrush.getPatternSrc = function () {
  //   var patternCanvas = fabric.document.createElement('canvas')
  //   // patternCanvas.width = patternCanvas.height = 10
  //   var ctx = patternCanvas.getContext('2d')

  //   ctx.strokeStyle = this.color
  //   ctx.lineWidth = 50
  //   ctx.beginPath()
  //   ctx.moveTo(5, 0)
  //   ctx.lineTo(5, 10)
  //   ctx.closePath()
  //   ctx.stroke()

  //   return patternCanvas
  // }
  plannerCanvas.freeDrawingBrush = hLinePatternBrush
  const brush = plannerCanvas.freeDrawingBrush
  // if (brush.getPatternSrc) {
  //   brush.source = brush.getPatternSrc()
  // }
  plannerCanvas.freeDrawingBrush.width = 1
  brush.color = 'rgba(0,0,0)'

  plannerCanvas.on('path:created', function (e) {
    e.path.canvasBypaint = true
    if (
      Object.keys(store.state.plannerVuex.canvasByPaintList).length > 0 ||
      selectIndex
    ) {
      const matchArr = plannerCanvas.getObjects()
      const objs = matchArr.filter((e) => {
        return e && e.canvasBypaint
      })
      const group = new fabric.Group([...objs], {
        canvasBypaint: true,
        layoutName: objs[0].layoutName
      })
      objs.forEach((item) => {
        plannerCanvas.remove(item)
      })
      plannerCanvas.add(group)
      plannerCanvas.moveTo(group, selectIndex.value)
      store.commit(
        'plannerVuex/updateLayoutContainerArr',
        plannerCanvas.getObjects()
      )
    } else {
      store.commit('plannerVuex/addCanvasByPaint', e)
    }
  })
  watch(
    () => store.state.plannerVuex.toolBox.currentType,
    (item) => {
      if (item === 'pencil-input') {
        plannerCanvas.isDrawingMode = true
      } else {
        plannerCanvas.isDrawingMode = false
        plannerCanvas.forEachObject((item) => {
          item.canvasBypaint = false
        })
        store.commit('plannerVuex/addCanvasByPaint', {})
      }
    },
    { immediate: true }
  )
  watch(
    () => store.state.plannerVuex.toolsFeature['pencil-input'],
    (item) => {
      plannerCanvas.freeDrawingBrush.width = item.size
    },
    { deep: true }
  )
  return {
    addNum
  }
}
export default usePainting
