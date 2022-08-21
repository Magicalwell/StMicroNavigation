<template>
  <div :class="{ 'top-nav-main': menuModel === 'horizontal' }">
    <n-menu
      v-model:value="activeId"
      :mode="menuModel"
      :options="menuOptions"
      dropdown-placement="top"
    />
  </div>
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
                path: '/blogcontrol'
              }
            },
            { default: () => '博客后台管理系统' }
          ),
        key: '/blog-control',
        icon: renderIcon(WineIcon)
      },
      {
        label: '组件库(待接入)',
        disabled: true,
        key: 'stoneUi'
      },
      {
        label: '弹幕学习室(待接入)',
        disabled: true,
        key: 'danmuStudy'
      },
      {
        key: 'lowcode',
        children: [
          {
            key: '/easePageCreator',
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    path: '/easePageCreator'
                  }
                },
                { default: () => '页面生成器' }
              ),
            icon: renderIcon(WineIcon)
          },
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    path: '/plannergeneration'
                  }
                },
                { default: () => '可视化笔记' }
              ),
            key: '/plannergeneration',
            icon: renderIcon(WineIcon)
          }
        ],
        label: '低代码'
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/heartofstone'
              }
            },
            { default: () => '石之心V1.0(开发中)' }
          ),
        key: 'heartofstone'
      }
    ]
  }
]
export default defineComponent({
  props: {
    menuModel: {
      type: String,
      default: 'horizontal'
    }
  },
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

<style lang="scss" scoped>
.top-nav-main {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 333;
  background-color: #fff;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  box-shadow: 1px 4px 12px rgba($color: #000000, $alpha: 0.1);
  ::v-deep(.n-menu-item) {
    height: 100%;
  }
  ::v-deep(.n-menu-item-content) {
    height: 100%;
  }
}
</style>
