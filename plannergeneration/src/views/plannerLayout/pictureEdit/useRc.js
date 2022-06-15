import { ref, watch, computed } from 'vue'
const useRc = ({ pictureData }) => {
  const canvas = document.querySelector('#editcanvas')
  let aimColor
  const context = canvas.getContext('2d')
  const img = document.createElement('img')
  img.src = pictureData
  img.onload = function () {
    canvas.height = img.height
    canvas.width = img.width
    context.drawImage(img, 0, 0)
    // cutout(canvas, [255, 255, 255], 0.2) // 对白色进行抠除，容差为0.2
  }
  //   canvas.onclick = function (e) {
  //     console.log('ddddd', e)
  //     console.log(context.getImageData(e.layerX, e.layerY, 1, 1).data)
  //   }
  function getAimRgb(e) {
    const colorList = context
      .getImageData(e.offsetX, e.offsetY, 1, 1)
      .data.slice(0, 3)
    console.log(colorList)
    cutout(canvas, [colorList[0], colorList[1], colorList[2]], 0.12)
  }
  function cutout(canvas, color, range = 0) {
    const context = canvas.getContext('2d')
    const imageInfo = context.getImageData(0, 0, canvas.width, canvas.height)
    // pixiArr是一个数组，每四个数组元素代表一个像素点，这四个数组元素分别对应一个像素的r，g，b，a值。
    const pixiArr = imageInfo.data
    for (let i = 0; i < pixiArr.length; i += 4) {
      // 匹配到目标像素就将目标像素的alpha设为0
      if (
        testColor([pixiArr[i], pixiArr[i + 1], pixiArr[i + 2]], color, range)
      ) {
        pixiArr[i + 3] = 0
      }
    }
    context.putImageData(imageInfo, 0, 0)
  }
  function testColor(current, target, range) {
    for (let i = 0; i < 3; i++) {
      if (
        !(
          (1 - range) * target[i] <= current[i] &&
          (1 + range) * target[i] >= current[i]
        )
      ) {
        return false
      }
    }
    return true
  }
  return {
    getAimRgb
  }
}
export default useRc
