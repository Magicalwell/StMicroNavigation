<template>
  <div id="editor-container" @click.self="generationNewInput">
    暂时先做表单生成部分，手账生成换到下期计划
    <a-textarea
      v-model:value="value"
      placeholder="Autosize height based on content lines"
      auto-size
      class="input-item"
    />
    <!-- <template v-for="item in valueList"> </template> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const value = ref<string>('')
    const store = useStore()
    const lastElement =
      store.state.textContainer[store.state.textContainer.length - 1]
    function generationNewInput () {
      console.log(store.state.textContainer)
      if (store.state.textContainer.length === 0 || checkLastElement) {
      }
    }
    function checkLastElement () {
      if (typeof lastElement === 'object') {
        //   if (isArray(lastElement)) {
        //   }
      }
    }
    return {
      value,
      generationNewInput,
      valueList: ref(store.state.textContainer)
    }
  }
})
</script>

<style lang="scss" scoped>
#editor-container {
  height: 100%;
}
.input-item {
  border-color: transparent !important;
}
</style>
