<template>
  <div class="layout-control">
    <h4
      style="
        border-bottom: 1px solid #000;
        height: 28px;
        line-height: 28px;
        padding: 0 4px;
        font-size: 16px;
      "
    >
      图层管理器
    </h4>
    <draggable
      :list="childComponentList"
      v-bind="dragOptions"
      item-key="id"
      @sort="layoutMoved"
    >
      <template #item="{ element }">
        <div
          :class="{
            layer_active: selectIndex == element.id
          }"
          class="layout-item"
          @click="setAvtive(element.id)"
        >
          {{ element.layoutName }} {{ element.id }}
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import draggable from 'vuedraggable'

export default defineComponent({
  components: {
    draggable
  },
  props: {
    setActiveObj: {
      type: Function,
      default: () => ({})
    }
  },
  setup(props) {
    console.log(props)

    const store = useStore()
    const childComponentList = computed(
      () => store.state.plannerVuex.layoutContainer
    )
    const selectIndex = computed({
      get: () => {
        return store.state.plannerVuex.layoutId
      },
      set: (val) => {
        store.commit('plannerVuex/changeLayoutId', val)
      }
    })
    const dragOptions = {}
    const setAvtive = (idx) => {
      if (selectIndex.value !== idx) {
        selectIndex.value = idx
        console.log(idx)

        props.setActiveObj(idx)
        // console.log(props.setActiveObj)
      }
    }
    const layoutMoved = (arg) => {
      console.log(arg)

      store.commit('plannerVuex/layoutDrag', {
        newIndex: arg.newIndex,
        oldIndex: arg.oldIndex
      })
    }
    return {
      childComponentList,
      dragOptions,
      selectIndex,
      setAvtive,
      layoutMoved
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-control {
  border: 1px solid #000;
  min-height: 200px;
}
.layout-item {
  padding: 4px 8px;
}
.layer_active {
  background-color: #ccc;
}
</style>
