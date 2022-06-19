export function createContext2D(createConfig = {}) {
  const { targetSize, cloneCanvas } = createConfig
  const canvas = document.createElement('canvas')
  const context2D = canvas.getContext('2d')
  if (targetSize) {
    canvas.width = targetSize.width
    canvas.height = targetSize.height
  }
  if (cloneCanvas) {
    domHelpers.copyImageInCanvas(context2D, cloneCanvas)
  }
  return context2D
}
function copyImageInCanvas(hiddenContext, cloneCanvas) {
  hiddenContext.canvas.width = cloneCanvas.width
  hiddenContext.canvas.height = cloneCanvas.height
  hiddenContext.drawImage(cloneCanvas, 0, 0)
}
export function resizeCanvas(config) {
  const {
    ctx,
    targetWidth,
    targetHeight,
    hiddenCtx,
    transformConfig,
    withBorder = false
  } = config
  const { positionRange, scaleRatio } = transformConfig
  ctx.canvas.width = targetWidth
  ctx.canvas.height = targetHeight
  ctx.imageSmoothingEnabled = false
  // transformedDrawImage({
  //   ctx,
  //   hiddenCtx,
  //   positionRange,
  //   scaleRatio,
  //   withBorder,
  //   clearOld: false
  // })
}
export const domHelpers = {
  copyImageInCanvas
}
