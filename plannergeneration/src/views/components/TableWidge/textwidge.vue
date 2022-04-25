<template>
  <bubble-menu
    :editor="editor"
    :tippy-options="{ duration: 300 }"
    v-if="editor"
    class="bubble-menu"
  >
    <button
      @click="editor.chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
      class="float-utils"
    >
      <bold-outlined />
    </button>
    <button
      @click="editor.chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
      class="float-utils"
    >
      <italic-outlined />
    </button>
    <button
      @click="editor.chain().focus().toggleStrike().run()"
      :class="{ 'is-active': editor.isActive('strike') }"
      class="float-utils"
    >
      <strikethrough-outlined />
    </button>
    <button
      @click="editor.chain().focus().toggleCode().run()"
      :class="{ 'is-active': editor.isActive('strike') }"
      class="float-utils"
    >
      <github-outlined />
    </button>
    <a-popover
      title="高亮标记"
      trigger="click"
      v-model:visible="popoverVisible"
      :destroyTooltipOnHide="true"
      overlayClassName="popover-box"
      :getPopupContainer="
        (triggerNode) => {
          return triggerNode.parentNode
        }
      "
    >
      <template #content>
        <div
          class="mark-item"
          v-for="(item, index) in markData"
          :key="index"
          @click="
            editor
              .chain()
              .focus()
              .toggleHighlight({ color: item.colorCode })
              .run()
          "
        >
          <font-colors-outlined
            class="item-icon"
            :style="{ color: item.colorCode }"
          />
          <div style="flex: 1">{{ item.label }}</div>
        </div>
      </template>
      <button class="float-utils">
        <highlight-outlined />
      </button>
    </a-popover>
  </bubble-menu>
  <editor-content :editor="editor" class="rich-editor-input" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import {
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  GithubOutlined,
  HighlightOutlined,
  FontColorsOutlined
} from '@ant-design/icons-vue'
// import NestedEditor from '../../editor/elementBox/NestedEditor.vue'
export default defineComponent({
  inheritAttrs: false,
  name: 'st-text',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  components: {
    EditorContent,
    BubbleMenu,
    BoldOutlined,
    ItalicOutlined,
    StrikethroughOutlined,
    GithubOutlined,
    HighlightOutlined,
    FontColorsOutlined
  },
  setup(props, { emit }) {
    console.log(props.modelValue)
    const popoverVisible = ref(false)
    // 这个配置需要抽离出来，因为是可以被设置的
    const markData = ref([
      { label: 'hightLight', colorCode: null },
      { label: 'orange', colorCode: '#ffc078' },
      { label: 'green', colorCode: '#8ce99a' },
      { label: 'blue', colorCode: '#74c0fc' },
      { label: 'purple', colorCode: '#b197fc' },
      { label: 'red', colorCode: 'red' },
      { label: 'pinkRed', colorCode: '#ffa8a8' }
    ])
    const editor = new Editor({
      extensions: [
        StarterKit,
        Document,
        Paragraph,
        Text,
        Highlight.configure({ multicolor: true })
      ],
      content: props.modelValue,
      onUpdate: () => {
        // HTML
        emit('update:modelValue', editor.getHTML())

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      }
    })

    return { editor, popoverVisible, markData }
  }
})
</script>

<style lang="scss" scoped>
.float-utils {
  background-color: #fff;
  outline: none;
  border: none;
  padding: 0 8px;
  &:hover {
    background-color: #f2f5fa;
  }
  height: 100%;
}
.rich-editor-input {
  width: 100%;
  min-height: 30px;
  ::v-deep(.ProseMirror) {
    outline: none;
  }
  ::v-deep(p) {
    min-height: 30px;
    line-height: 30px;
    margin-bottom: 0;
    word-break: normal;
    white-space: normal;
    word-wrap: break-word;
  }
  ::v-deep(mark) {
    padding: 2px 0;
    border-radius: 6px;
  }
}
.bubble-menu {
  box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;
  border-radius: 6px;
  overflow: hidden;
  height: 32px;
  ::v-deep(.ant-popover-inner-content) {
    padding: 0 4px;
  }
}
.mark-item {
  display: flex;
  align-items: center;
  min-height: 28px;
  padding: 0 8px;
  cursor: pointer;
  .item-icon {
    font-size: 18px;
    margin-right: 12px;
  }
  &:hover {
    background-color: #f2f5fa;
  }
}
</style>
