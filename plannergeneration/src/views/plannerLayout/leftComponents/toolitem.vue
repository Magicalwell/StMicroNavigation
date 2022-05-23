<script lang="ts">
import { defineComponent, h, resolveComponent } from 'vue'
import { FontSizeOutlined, FormatPainterOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: { FontSizeOutlined, FormatPainterOutlined },
  setup() {
    const store = useStore()
    const toolList = [
      {
        id: 1,
        name: '文字',
        type: 'text-input',
        icon: 'font-size-outlined'
      },
      {
        id: 1,
        name: '背景颜色',
        type: 'bgcolor-input',
        icon: 'format-painter-outlined'
      }
    ]
    return () =>
      toolList.map((item) => {
        return h(
          resolveComponent('a-button'),
          {
            type:
              item.type === store.state.plannerVuex.toolBox.currentType
                ? 'primary'
                : '',
            class: {
              'tool-btn-item': true
            },
            onClick: () => {
              store.commit('plannerVuex/changeToolCurrentType', item.type)
            }
          },
          () => [h(resolveComponent(item.icon))]
        )
      })
  }
})
</script>
<style lang="scss" scoped>
.tool-btn-item {
  margin: 0 4px;
}
</style>
>
