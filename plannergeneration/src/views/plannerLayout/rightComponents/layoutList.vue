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
            layer_active: selectIndex == element.id,
            'drag-handle': !selectInputArr.includes(element.id)
          }"
          class="layout-item"
          @click="setAvtive(element.id)"
          @dblclick="setInput(element.id)"
        >
          <a-input
            v-model:value.lazy="element.layoutName"
            v-if="selectInputArr.includes(element.id)"
            @blur="resetArr(element.id)"
          ></a-input>
          <div v-else>
            {{ element.layoutName }}
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
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
    // childComponentList.value.reverse()
    const selectIndex = computed({
      get: () => {
        return store.state.plannerVuex.layoutId
      },
      set: (val) => {
        store.commit('plannerVuex/changeLayoutId', val)
      }
    })
    const dragOptions = {
      animation: 300,
      ghostClass: 'ghostItem',
      draggable: '.drag-handle',
      tag: 'div',
      // handle: '.mover',
      forceFallback: false,
      dragClass: 'dragClass'
    }
    const selectInputArr = ref([])
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
        newIndex: childComponentList.value.length - 1 - arg.newIndex,
        oldIndex: childComponentList.value.length - 1 - arg.oldIndex
      })
    }
    const setInput = (val: never) => {
      selectInputArr.value.push(val)
    }
    const resetArr = (val) => {
      selectInputArr.value = selectInputArr.value.filter((item) => item !== val)
    }
    return {
      childComponentList,
      dragOptions,
      selectIndex,
      setAvtive,
      layoutMoved,
      setInput,
      selectInputArr,
      resetArr
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
  ::v-deep(.ant-input) {
    padding: 0 !important;
    border: none;
  }
}
.layer_active {
  background-color: #ccc;
}
</style>
