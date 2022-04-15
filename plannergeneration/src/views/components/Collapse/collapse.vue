<template>
  <a-collapse
    ghost
    @change="changeActivekey"
    v-model:activeKey="selfData.collapse"
    class="reset-padding"
  >
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
      <p
        v-if="!selfData.children || !selfData.children.length > 0"
        @click="addChildrenTo(selfData.children)"
        style="margin-bottom:0px;padding:0 11px;color:#ccc"
      >
        暂时没有子模块哦，请点击新增或拖拽一个模块~
      </p>
      <NestedEditor
        v-if="selfData.children"
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
      props.editorItem.collapse,
      'editorItemeditorItemeditorItemeditorItem'
    )
    const { editorItem: selfData } = toRefs(props)
    console.log(props.editorItem, 'selfDataselfDataselfDataselfData')

    // const activeKey = selfData.id
    const changeActivekey = (key: string) => {
      console.log(key, 'keykeykeykeykeykey')
    }
    function addChildrenTo(value) {
      value.push({
        object: 'block',
        id: 1231512321,
        created_time: '12321312312',
        created_by: {
          object: 'user'
          // id: 'cb38e95d-00cf-4e7e-adce-974f4a44a547' 暂时不做多人编辑 只显示谁编辑了
        },
        last_edited_time: '12321312312',
        last_edited_by: {
          object: 'user'
          // id: 'e79a0b74-3aba-4149-9f74-0bb5791a6ee6' 暂时不做多人编辑 只显示谁编辑了
        },
        has_children: false,
        type: 'paragraph',
        archived: false,
        paragraph: {
          rich_text: 'Lacinato kal2312321312e',
          checked: false,
          color: 'default'
        }
      })
    }
    return {
      activeKey,
      selfData,
      changeActivekey,
      addChildrenTo
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

<style lang="scss" scoped>
.reset-padding {
  ::v-deep .ant-collapse-header {
    padding: 0 16px 0 11px !important;
  }
}
::v-deep .ant-collapse-header {
  align-items: center !important;
}
</style>
