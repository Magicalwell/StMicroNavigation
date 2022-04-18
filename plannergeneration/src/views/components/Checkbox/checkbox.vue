<template>
  <a-checkbox
    v-model:checked="selfData.checkbox.checked"
    class="checkbox-widget"
  >
    <a-textarea
      v-model:value="selfData.checkbox.rich_text"
      auto-size
      :bordered="false"
      style="width: 100%"
    />
  </a-checkbox>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, onMounted } from 'vue'
// import NestedEditor from '../../editor/elementBox/NestedEditor.vue'
export default defineComponent({
  inheritAttrs: false,
  name: 'st-checkbox',
  props: {
    editorItem: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    onMounted(() => {
      console.log('我重新渲染了')
    })
    const activeKey = ref([])
    console.log(
      props.editorItem.collapse,
      'editorItemeditorItemeditorItemeditorItem'
    )
    const { editorItem: selfData } = toRefs(props)
    console.log(props.editorItem, 'selfDataselfDataselfDataselfData')

    // const activeKey = selfData.id
    const changeActivekey = (key: string) => {
      console.log(key, 'keykeykeykeykeykey')
    }
    return {
      activeKey,
      selfData,
      changeActivekey,
      checked: ref(false)
    }
  }
})
</script>

<style lang="scss" scoped>
.checkbox-widget {
  width: 100%;
  ::v-deep .ant-checkbox + span {
    width: 100%;
  }
  ::v-deep .ant-checkbox {
    top: 0;
  }
}
.reset-padding {
  ::v-deep .ant-collapse-header {
    padding: 0 16px 0 11px !important;
  }
}
::v-deep .ant-collapse-header {
  align-items: center !important;
}
</style>
