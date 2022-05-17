<template>
  <div class="planner-box">
    <div class="home">
      <Toolbar />
      <main>
        <section class="left">
          左侧工具栏
          <!-- <ComponentList /> -->
        </section>
        <section class="center">
          <div
            class="content"
            @drop="handleDrop"
            @dragover="handleDragOver"
            @mousedown="handleMouseDown"
            @mouseup="deselectCurComponent"
          >
            <planner-area></planner-area>
          </div>
        </section>
        <section class="right">
          右侧的属性
          <!-- <el-tabs v-model="activeName">
            <el-tab-pane label="属性" name="attr">
              <AttrList v-if="curComponent" />
              <p v-else class="placeholder">请选择组件</p>
            </el-tab-pane>
            <el-tab-pane label="动画" name="animation">
              <AnimationList v-if="curComponent" />
              <p v-else class="placeholder">请选择组件</p>
            </el-tab-pane>
            <el-tab-pane label="事件" name="events">
              <EventList v-if="curComponent" />
              <p v-else class="placeholder">请选择组件</p>
            </el-tab-pane>
          </el-tabs> -->
        </section>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import plannerArea from './plannerLayout/area.vue'
import Toolbar from './plannerLayout/toolbox/tool.vue'

export default defineComponent({
  name: 'planner',
  components: { plannerArea, Toolbar },
  setup() {
    function handleDrop() {
      console.log(11)
    }
    function handleDragOver() {
      console.log(11)
    }
    function handleMouseDown() {
      console.log(11)
    }
    function deselectCurComponent() {
      console.log(11)
    }
    return {
      handleDrop,
      handleDragOver,
      handleMouseDown,
      deselectCurComponent
    }
  }
})
</script>

<style lang="scss" scoped>
.planner-box {
  position: relative;
}
.home {
  height: calc(100vh - 50px);
  background: #fff;

  main {
    height: 100%;
    position: relative;

    .left {
      position: absolute;
      height: 100%;
      width: 200px;
      left: 0;
      top: 0;
      padding-top: 10px;
    }

    .right {
      position: absolute;
      height: 100%;
      width: 262px;
      right: 0;
      top: 0;
    }

    .center {
      margin-left: 200px;
      margin-right: 262px;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;
      padding: 20px;

      .content {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }

  .placeholder {
    text-align: center;
    color: #333;
  }
}
</style>
