<template>
  <div class="tool-box">
    <!-- <div style="padding: 10px">
      <div
        class="tool-item"
        v-for="item in defaultComponents"
        :key="item.id"
        :draggable="true"
        @dragstart="saveDragType(item)"
      >
        <p>{{ item.value }}</p>
      </div>
    </div> -->
    <draggable
      v-model="defaultComponents"
      v-bind="dragOptions"
      item-key="id"
      @end="addWidgetByDrag"
      :clone="cloneWidget"
      :options="{
        group: { name: 'listComponentsGroup', pull: 'clone' },
        sort: true
      }"
    >
      <template #item="{ element }">
        <div class="tool-item">
          <span>{{ element.value }}</span>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import draggable from 'vuedraggable'
import blockItemMap from '../../../../utils/index'
import { generateBlockType } from '../../../../utils/generateBlock'
export default defineComponent({
  components: {
    draggable
  },
  setup() {
    const store = useStore()
    console.log([...blockItemMap.entries()])
    const dragOptions = computed(() => {
      return {
        group: { name: 'listComponentsGroup', pull: 'clone' },
        tag: 'div',
        sort: false,
        animation: 300,
        ghostClass: 'ghostItem',
        draggable: '.tool-item',
        swapThreshold: 0.3,
        forceFallback: true,
        dragClass: 'toolDragClass'
      }
    })
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
    function addWidgetByDrag(e) {
      console.log(123)
    }
    function cloneWidget(origin) {
      return generateBlockType(origin.id)
    }
    return {
      defaultComponents,
      saveDragType,
      dragOptions,
      addWidgetByDrag,
      cloneWidget
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
  display: inline-block;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 6px 0 0 6px;
}
.ghostItem {
  opacity: 0.8 !important;
  border: 0;
  font-size: 16px;
  background-color: #f2f5fa;
  padding: 4px 20px;
  margin-left: 50px;
}
.toolDragClass {
  border: 0;
}
</style>
