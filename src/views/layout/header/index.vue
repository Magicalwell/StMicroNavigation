<template>
  <div class="top-bar">
    <Slide v-if="navSwitch" />
    <!-- <div v-else @click="drawerActive = !drawerActive">icon</div> -->
    <n-icon size="40" v-else>
      <MenuOutline @click="drawerActive = !drawerActive" />
    </n-icon>
    <div class="nav-right">
      <n-button ghost color="#8a2be2" @click="handleClick" v-if="true">
        登录
      </n-button>
      <Avatar v-else />
    </div>
  </div>
  <n-drawer v-model:show="drawerActive" :width="260" placement="left">
    <n-drawer-content>
      <Slide v-if="!navSwitch" :menuModel="menuModel" />
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Slide from '../../../components/navbar/navbar.vue'
import Avatar from '../avatar/index.vue'
import { useRouter } from 'vue-router'
import { NButton, NDrawer, NDrawerContent, NIcon } from 'naive-ui'
import { MenuOutline } from '@vicons/ionicons5'
import { useWindowSizeFn } from '../../../utils/useWindowSizeFn'
export default defineComponent({
  components: {
    Slide,
    Avatar,
    NButton,
    NDrawer,
    NDrawerContent,
    MenuOutline,
    NIcon
  },
  setup() {
    const router = useRouter()
    const menuModel = ref('vertical') // horizontal或vertical
    const drawerActive = ref(false)
    const navSwitch = ref(true)
    const responsiveSwitch = () => {
      const windowWidth = document.documentElement.clientWidth
      if (windowWidth > 600) {
        navSwitch.value = true
      } else {
        navSwitch.value = false
      }
    }

    const handleClick = () => {
      router.push('/login')
    }
    responsiveSwitch()
    useWindowSizeFn(responsiveSwitch, 150, { immediate: true })
    return { handleClick, menuModel, drawerActive, navSwitch }
  }
})
</script>

<style lang="scss" scoped>
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 8px;
  box-sizing: border-box;
  z-index: 11;
  background-color: #fff;
}
.nav-right {
  position: absolute;
  right: 8px;
  z-index: 334;
}
</style>
