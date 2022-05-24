<template>
  <div>
    <h4>图层管理器</h4>
    <draggable :list="childComponentList" v-bind="dragOptions" item-key="id">
      <template #item="{ element }">
        <p>{{ element.layoutName }}</p>
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
  setup() {
    const store = useStore()
    const childComponentList = computed(
      () => store.state.plannerVuex.layoutContainer
    )
    console.log(childComponentList, 'childComponentList')

    const dragOptions = {}
    return { childComponentList, dragOptions }
  }
})
</script>
