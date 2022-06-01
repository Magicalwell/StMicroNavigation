import { ref, watch } from 'vue'
import { fabric } from 'fabric'
import { useStore } from 'vuex'
const usePainting = ({ plannerCanvas }) => {
  const store = useStore()
  const addNum = ref(0)
  const hLinePatternBrush = new fabric.PencilBrush(plannerCanvas)
  hLinePatternBrush.getPatternSrc = function () {
    var patternCanvas = fabric.document.createElement('canvas')
    // patternCanvas.width = patternCanvas.height = 10
    var ctx = patternCanvas.getContext('2d')

    ctx.strokeStyle = this.color
    ctx.lineWidth = 50
    ctx.beginPath()
    ctx.moveTo(5, 0)
    ctx.lineTo(5, 10)
    ctx.closePath()
    ctx.stroke()

    return patternCanvas
  }
  plannerCanvas.freeDrawingBrush = hLinePatternBrush
  const brush = plannerCanvas.freeDrawingBrush
  if (brush.getPatternSrc) {
    brush.source = brush.getPatternSrc()
  }
  brush.width = 15
  brush.color = 'rgba(0,0,0)'
  console.log(plannerCanvas, '我是hooks')

  watch(
    () => store.state.plannerVuex.canvasModel,
    (item) => {
      if (item === 'pencil') {
        plannerCanvas.isDrawingMode = true
      }
    },
    { immediate: true }
  )
  return {
    addNum
  }
}
export default usePainting
