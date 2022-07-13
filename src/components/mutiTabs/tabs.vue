<template>
  <div class="tag-container">
    <span class="operation-btn left" @click="toLeft">1</span>
    <span class="operation-btn right">2</span>
    <div class="scroll-container" id="scroll-container">
      <n-tag
        round
        closable
        :bordered="false"
        type="success"
        class="tag-item"
        v-for="item in tabsBox"
        :key="item.id"
        :ref="setTabList"
        :id="item.id + 'get'"
      >
        {{ item.label }}
      </n-tag>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { NTabs, NTab, NTag } from 'naive-ui'
export default defineComponent({
  setup() {
    const tabsBox = reactive([
      {
        label: '首页',
        id: 1
      },
      {
        label: '文档',
        id: 2
      },
      {
        label: '首页',
        id: 3
      },
      {
        label: '文档',
        id: 4
      },
      {
        label: '首页',
        id: 5
      },
      {
        label: '文档',
        id: 6
      },
      {
        label: '首页',
        id: 7
      },
      {
        label: '文档',
        id: 8
      },
      {
        label: '首页',
        id: 9
      },
      {
        label: '文档',
        id: 10
      },
      {
        label: '首页',
        id: 11
      },
      {
        label: '文档',
        id: 12
      },
      {
        label: '首页',
        id: 13
      },
      {
        label: '文档',
        id: 14
      },
      {
        label: '首页',
        id: 15
      },
      {
        label: '文档',
        id: 16
      },
      {
        label: '首页',
        id: 17
      },
      {
        label: '文档',
        id: 18
      },
      {
        label: '首页',
        id: 19
      },
      {
        label: '文档',
        id: 20
      },
      {
        label: '首页',
        id: 21
      },
      {
        label: '文档',
        id: 22
      },
      {
        label: '首页',
        id: 23
      },
      {
        label: '文档',
        id: 24
      },
      {
        label: '首页',
        id: 25
      },
      {
        label: '文档',
        id: 26
      },
      {
        label: '首页',
        id: 27
      },
      {
        label: '文档',
        id: 28
      },
      {
        label: '首页',
        id: 29
      },
      {
        label: '文档',
        id: 30
      }
    ])
    const activeId = ref(0)
    const tabList: any = ref([])
    const setTabList = (el) => {
      if (el) {
        tabList.value.push(el)
      }
    }
    const toLeft = () => {
      activeId.value++
      var ele = document.getElementById(activeId.value + 'get')

      if (ele && ele.scrollIntoView) {
        ele.scrollIntoView(false)
      }
    }
    return { tabsBox, setTabList, toLeft }
  },
  components: { NTag }
})
</script>

<style lang="scss" scoped>
.tag-container {
  position: relative;
  height: 36px;
  line-height: 36px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.tag-item {
  margin-right: 12px;
}
.operation-btn {
  display: inline-block;
  height: 36px;
  width: 20px;
  background-color: red;
  position: absolute;
  &.left {
    top: 0;
    left: 0;
    z-index: 100;
  }
  &.right {
    top: 0;
    right: 0;
    z-index: 100;
  }
}
.scroll-container {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  height: 40px;
  align-items: center;
}
</style>
