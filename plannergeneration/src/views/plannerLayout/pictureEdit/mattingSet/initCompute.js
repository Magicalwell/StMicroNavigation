export function computeBoardRectSize(inputBoardRect, domRect) {
  const { width, height, left: boardLeft, top: boardTop } = inputBoardRect
  const { left: domLeft, top: domTop } = domRect
  const left = boardLeft - domLeft
  const top = boardTop - domTop
  return { left, top, width, height }
}
export function computeBoardRect(canvas) {
  const inputBoardRect = canvas.getBoundingClientRect()
  const domRect = document.documentElement.getBoundingClientRect()
  return computeBoardRectSize(inputBoardRect, domRect)
}

export const computeHelpers = {
  computeBoardRect
}
