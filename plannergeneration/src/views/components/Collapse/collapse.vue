<template>
  <a-collapse ghost @change="changeActivekey" v-model:activeKey="activeKey">
    <!-- <template #expandIcon="{ isActive }">
      <caret-right-outlined :rotate="isActive ? 90 : 0" />
    </template> -->
    <template #expandIcon="{ isActive }">
      <caret-right-outlined :rotate="isActive ? 90 : 0" />
    </template>
    <a-collapse-panel :key="selfData.id">
      <template #header>
        <a-textarea
          auto-size
          :bordered="false"
          v-model:value="selfData.toggle.rich_text"
        ></a-textarea>
      </template>
      <NestedEditor
        v-if="selfData.children && selfData.children.length > 0"
        :child-component-list="selfData.children"
      >
      </NestedEditor>
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  toRefs,
  defineAsyncComponent,
  onMounted
} from 'vue'
import { CaretRightOutlined } from '@ant-design/icons-vue'
// import NestedEditor from '../../editor/elementBox/NestedEditor.vue'
export default defineComponent({
  name: 'st-collapse',
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
      props.editorItem.children,
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
      changeActivekey
    }
  },
  components: {
    CaretRightOutlined,
    NestedEditor: defineAsyncComponent(
      () => import('../../editor/elementBox/NestedEditor.vue')
    )
  }
})
</script>
