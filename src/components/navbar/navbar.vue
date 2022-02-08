<template>
  <n-menu
    v-model:value="activeId"
    mode="horizontal"
    :options="menuOptions"
    dropdown-placement="top"
    class="top-nav-main"
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
                path: '/blogcontrol'
              }
            },
            { default: () => '博客后台管理系统' }
          ),
        key: '/blog-control',
        icon: renderIcon(WineIcon)
      },
      {
        label: '组件库',
        disabled: true,
        key: 'stoneUi'
      },
      {
        label: '弹幕学习室',
        disabled: true,
        key: 'danmuStudy'
      },
      {
        label: '加点three.js?',
        disabled: true,
        key: 'danmuStudy'
      },
      {
        label: '低代码',
        key: 'food',
        disabled: true,
        children: [
          {
            label: '三明治',
            key: 'sandwich'
          }
        ]
      },
      {
        label: '笔记或手账?随你',
        key: 'Eshouzhang',
        disabled: true
      },
      {
        label: '一些游戏',
        disabled: true,
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
