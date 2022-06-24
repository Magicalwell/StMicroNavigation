<template>
  <div>
    <micro-app
      name="blogcontrol"
      :url="url"
      baseroute="/main-app/blogcontrol"
      @created="handleCreate"
      @beforemount="handleBeforeMount"
      @mounted="handleMount"
      @unmount="handleUnmount"
      @error="handleError"
      @datachange="handleDataChange"
    ></micro-app>
  </div>
</template>

<script lang="ts">
import config from '../../config'

export default {
  name: 'blogControl',
  data() {
    return {
      url: `${config.blogControl}/child/blogcontrol/`
    }
  },
  methods: {
    handleCreate(): void {
      console.log('child-vue3 创建了')
    },

    handleBeforeMount(): void {
      console.log('child-vue3 即将被渲染')
    },

    handleMount(): void {
      console.log('child-vue3 已经渲染完成')
    },

    handleUnmount(): void {
      console.log('child-vue3 卸载了')
    },

    handleError(): void {
      console.log('child-vue3 加载出错了')
    },

    handleDataChange(e: CustomEvent): void {
      console.log('来自子应用 child-vue3 的数据:', e.detail.data)
    }
  }
}
</script>

<style></style>
