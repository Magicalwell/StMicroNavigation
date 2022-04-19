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
  <editor-content :editor="editor" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import {
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  GithubOutlined
} from '@ant-design/icons-vue'
// import NestedEditor from '../../editor/elementBox/NestedEditor.vue'
export default defineComponent({
  name: 'st-text',
  props: {
    editorItem: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    EditorContent,
    BubbleMenu,
    BoldOutlined,
    ItalicOutlined,
    StrikethroughOutlined,
    GithubOutlined
  },
  setup() {
    const editor = useEditor({
      content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
      extensions: [StarterKit]
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
</style>
