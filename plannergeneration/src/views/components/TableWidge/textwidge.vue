<template>
  <bubble-menu
    :editor="editor"
    :tippy-options="{ duration: 300 }"
    v-if="editor"
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
  </bubble-menu>
  <editor-content :editor="editor" class="rich-editor-input" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import {
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  GithubOutlined
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
    GithubOutlined
  },
  setup(props, { emit }) {
    console.log(props.modelValue)

    const editor = new Editor({
      extensions: [StarterKit],
      content: props.modelValue,
      onUpdate: () => {
        // HTML
        emit('update:modelValue', editor.getHTML())

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      }
    })

    return { editor }
  }
})
</script>

<style lang="scss" scoped>
.float-utils {
  background-color: #fff;
  outline: none;
  border: none;
}
.rich-editor-input {
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
}
</style>
