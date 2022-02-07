<template>
  <n-menu
    v-model:value="activeId"
    mode="horizontal"
    :options="menuOptions"
    dropdown-placement="top-start"
  />
</template>

<script lang="ts">
import { defineComponent, h, ref } from 'vue'
import { NIcon, NMenu } from 'naive-ui'
import { RouterLink } from 'vue-router'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon
} from '@vicons/ionicons5'
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const menuOptions = [
  {
    // label: () =>
    //   h(
    //     'RouterLink',
    //     {
    //       to: {
    //         path: '/home'
    //       }
    //     },
    //     { default: () => '首页' }
    //   ),
    // key: 'hear-the-wind-sing',
    // icon: renderIcon(BookIcon)
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/home'
          }
        },
        { default: () => '首页' }
      ),
    key: '/home',
    icon: renderIcon(BookIcon)
  },
  {
    label: '文档',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon)
  },
  {
    label: '留言区',
    key: 'a-wild-sheep-chase',
    icon: renderIcon(BookIcon)
  },
  {
    label: '作品列表',
    key: '/project',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/app-vue3'
              }
            },
            { default: () => '测试项目' }
          ),
        key: '/app-vue3',
        icon: renderIcon(PersonIcon)
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/blog-control'
              }
            },
            { default: () => '博客后台管理系统' }
          ),
        key: '/blog-control',
        icon: renderIcon(WineIcon)
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich'
          }
        ]
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes'
      }
    ]
  }
]
export default defineComponent({
  setup() {
    return {
      activeKey: ref(null),
      menuOptions
    }
  },
  data() {
    return {}
  },
  components: {
    NMenu
  },
  computed: {
    activeId() {
      return this.$route.path
    }
  }
})
</script>
