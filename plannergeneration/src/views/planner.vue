<template>
  <div class="planner-box">
    <div class="home">
      <Toolbar />
      <main>
        <section class="left">
          <a-collapse
            v-model:activeKey="activeKey"
            :expand-icon-position="expandIconPosition"
          >
            <a-collapse-panel key="1" header="工具栏">
              <SlideBar />
              <template #extra><setting-outlined /></template>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="图片上传">
              <ComponentList />
              <template #extra><setting-outlined /></template>
            </a-collapse-panel>
            <!-- <a-collapse-panel key="3" header="This is panel header 3">
              <p>{{ text }}</p>
              <template #extra><setting-outlined /></template>
            </a-collapse-panel> -->
          </a-collapse>
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
          <ul>
            <li>1.待完善滚轮缩放和页面长度过长时滚动条的冲突问题</li>
            <li>2.重叠元素的选中问题</li>
            <li>3.文字模糊</li>
          </ul>
          <!-- <AttrList v-if="curComponent" />
          <AnimationList v-if="curComponent" /> -->

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
    <a-modal
      ref="modalRef"
      v-model:visible="firstVisible"
      :wrap-style="{ overflow: 'hidden' }"
    >
      <div style="max-height: 300px; overflow-y: auto">
        <p>浮动的工具栏目前除了调整画布和导出之外，暂时都不能使用哦！</p>
        <p>操作记录最多保留最近的20条！</p>
        <p>...</p>
      </div>
      <template #title>
        <div ref="modalTitleRef" style="width: 100%; cursor: move">
          使用提示
        </div>
      </template>
      <template #footer>
        <a-button key="back" @click="firstVisible = false">知道了！</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ComponentList from './plannerLayout/leftComponents/left.vue' // 左侧列表组件
import plannerArea from './plannerLayout/area.vue'
import Toolbar from './plannerLayout/toolbox/tool.vue'
import SlideBar from './plannerLayout/leftComponents/toolitem.vue'
import type { CollapseProps } from 'ant-design-vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'planner',
  components: {
    plannerArea,
    Toolbar,
    ComponentList,
    SettingOutlined,
    SlideBar
  },
  setup() {
    const store = useStore()
    const firstVisible = ref(true)
    const activeKey = ref(['1'])
    const expandIconPosition = ref<CollapseProps['expandIconPosition']>('right')
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
      console.log('deselectCurComponent')
      store.commit('plannerVuex/changeToolCurrentType', '')
      store.commit('plannerVuex/hideContextMenu')
    }
    return {
      handleDrop,
      handleDragOver,
      handleMouseDown,
      deselectCurComponent,
      firstVisible,
      activeKey,
      expandIconPosition
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
      width: 226px;
      left: 0;
      top: 0;
      padding-top: 10px;
      ::v-deep(.ant-collapse-header) {
        padding: 6px 40px 6px 10px !important;
      }
      ::v-deep(.ant-collapse-content-box) {
        padding: 6px !important;
      }
    }

    .right {
      position: absolute;
      height: 100%;
      width: 262px;
      right: 0;
      top: 0;
    }

    .center {
      margin-left: 224px;
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
