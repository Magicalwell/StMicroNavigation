<template>
  <div class="plannerarea" @contextmenu="handleContextMenu">
    <Grid />
    <canvas id="plannerarea" width="1200" height="900"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { fabric } from 'fabric'
import Grid from './grid.vue'

export default defineComponent({
  name: 'planner',
  components: {
    Grid
  },
  setup() {
    function init() {
      const plannerCanvas = new fabric.Canvas('plannerarea')
      var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20
      })
      plannerCanvas.add(rect)
    }
    function handleContextMenu() {
      console.log(11)
    }
    onMounted(() => {
      init()
    })

    return { handleContextMenu }
  }
})
</script>

<style lang="scss" scoped>
.plannerarea {
  position: relative;
  background: #fff;
  margin: auto;
  height: 100%;
  .lock {
    &:hover {
      cursor: not-allowed;
    }
  }
}
</style>
