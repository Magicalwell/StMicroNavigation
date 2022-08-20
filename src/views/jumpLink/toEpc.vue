<template>
    <micro-app
      name="easePageCreator"
      :url="url"
      baseroute="/main-app/easePageCreator"
      @created="handleCreate"
      @beforemount="handleBeforeMount"
      @mounted="handleMount"
      @unmount="handleUnmount"
      @error="handleError"
      @datachange="handleDataChange"
      class="micro-container"
      keep-alive
    ></micro-app>
</template>

<script lang="ts">
import config from '../../config'

export default {
  name: 'easePageCreator',
  data() {
    return {
      url: `${config.lowCodeEpc}/child/easePageCreator/`
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

<style lang="scss" scoped>
.micro-container {
  width: 100%;
  height: calc(100% - 50px);
}
</style>
