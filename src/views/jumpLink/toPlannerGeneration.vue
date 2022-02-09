<template>
  <div>
    <micro-app
      name="plannergeneration"
      :url="url"
      baseroute="/plannergeneration"
      @created="handleCreate"
      @beforemount="handleBeforeMount"
      @mounted="handleMount"
      @unmount="handleUnmount"
      @error="handleError"
      @datachange="handleDataChange"
      class="micro-container"
    ></micro-app>
  </div>
</template>

<script lang="ts">
import config from '../../config'

export default {
  name: 'plannergeneration',
  data() {
    return {
      url: `${config.plannergeneration}/`
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
  height: 100%;
}
</style>
