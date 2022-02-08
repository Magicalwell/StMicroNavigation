<template>
  <div class="main-navbar" :class="{ show: navbarStatus }">
    <!-- <div class="navbar-btn" @click="navbarStatus = !navbarStatus"></div> -->
    <main-Navbar></main-Navbar>
    <n-icon size="40" class="navbar-btn" @click="navbarStatus = !navbarStatus">
      <Arrow-Down-Circle-Sharp></Arrow-Down-Circle-Sharp>
    </n-icon>
  </div>
  <app-Main></app-Main>
</template>

<script lang="ts">
import { ArrowDownCircleSharp } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import appMain from './appMain/appMain.vue'
import mainNavbar from '@/components/navbar/navbar.vue'
export default {
  data() {
    return {
      navbarStatus: false
    }
  },
  components: {
    NIcon,
    appMain,
    ArrowDownCircleSharp,
    mainNavbar
  }
}
</script>

<style lang="scss" scoped>
.main-navbar {
  z-index: 999999999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.1);
  transform: translateY(-100%);
  transition: all 0.3s ease-in-out;
  background-color: #fff;
  text-align: center;
  &.show {
    transform: translateY(0);
  }
  ::v-deep .n-menu-item,
  n-submenu {
    line-height: 50px !important;
    height: 50px;
  }
  ::v-deep .n-menu-item-content {
    line-height: 50px !important;
    height: 50px;
  }
}
.navbar-btn {
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: -40px;
  left: 20px;
  z-index: 999999999;
  // background-color: aquamarine;
}
// .main-navbar {
//   line-height: 50px;
// }
</style>
