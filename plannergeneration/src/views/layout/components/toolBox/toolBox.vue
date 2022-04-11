<template>
  <div class="tool-box">
    <div style="padding: 10px">
      <div
        class="tool-item"
        v-for="item in defaultComponents"
        :key="item.id"
        :draggable="true"
        @dragstart="saveDragType(item)"
      >
        <p>{{ item.value }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import blockItemMap from '../../../../utils/index'
export default defineComponent({
  setup() {
    const store = useStore()
    console.log([...blockItemMap.entries()])
    const defaultComponents = [...blockItemMap.entries()].map(
      ([key, value]) => {
        return {
          id: key,
          value: value
        }
      }
    )
    function saveDragType(item) {
      store.commit('ADD_DARGACTIVEITEM', item)
      console.log(item)
    }
    console.log(defaultComponents)
    return {
      defaultComponents,
      saveDragType
    }
  }
})
</script>

<style lang="scss" scoped>
.tool-box {
  position: absolute;
  top: 0;
  bottom: 0;
  background: #fff;
  box-shadow: 2px 0px 12px rgba($color: #000000, $alpha: 0.12);
  width: 260px;
  left: 0;
}
.tool-item {
}
</style>
