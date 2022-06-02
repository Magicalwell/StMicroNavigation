<template>
  <div class="feature-box">
    <h4>属性</h4>
    <div v-if="toolsType">
      <a-input
        v-for="(item, index) in valueList[toolsType]"
        :key="index"
      ></a-input>
      <!-- 此处引入一个js的render文件，在里面绑定值，类似于SchemaField.js -->
    </div>
    <div v-else>暂无相关属性</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const toolsType = computed(
      () => store.state.plannerVuex.toolBox.currentType
    )
    return {
      toolsType,
      valueList: reactive(store.state.plannerVuex.toolsFeature)
    }
  }
})
</script>

<style lang="scss" scoped>
.feature-box {
  border: 1px solid #000;
  margin: 5px 0;
  padding: 4px;
}
</style>
