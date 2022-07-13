<template>
  <div class="slidebar-container" id="slidebarContainer">
    <el-scrollbar style="width: 100%" wrap-class="scrollbar-wrapper">
      <el-menu
        style="border-right: 0px"
        :collapse="isCollapse"
        collapse-transition
        class="el-menu-vertical-demo"
        :router="true"
        unique-opened
        :default-active="activeMenu"
      >
        <el-submenu index="1" key="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">首页</span>
          </template>
          <el-menu-item index="/home">
            <span slot="title">主控台</span>
          </el-menu-item>
          <el-menu-item index="/globelicon">
            <span slot="title">全局功能视图</span>
          </el-menu-item>
        </el-submenu>
        <template v-for="group in menuList">
          <el-submenu v-if="group.children" :key="group.id" :index="group.id">
            <template slot="title">
              <i :class="group.meta.icon" v-if="group.meta.icon"></i>
              <span slot="title">{{ group.meta.title }}</span>
            </template>
            <el-menu-item
              :index="subitem.path"
              v-for="(subitem, index) in group.children"
              :key="index"
              >{{ subitem.meta.title }}</el-menu-item
            >
          </el-submenu>
          <el-menu-item v-else :key="group.id" :index="group.path">{{
            group.meta.title
          }}</el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  watch: {
    collapse(val) {
      // this.isCollapse =
      this.isCollapse = val;
    },
    isCollapse(val) {
      this.$emit("update:collapse", val);
    },
  },
  computed: {
    ...mapGetters(["menuList"]),
    activeMenu() {
      return this.$route.path.replace(/\/details$/, "");
    },
  },
};
</script>

<style lang="scss" scoped>
.slidebar-container {
  position: fixed;
  height: 100%;
  background-color: #fff;
  box-shadow: 6px 0px 12px rgba($color: #000000, $alpha: 0.1);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210px;
}
</style>
