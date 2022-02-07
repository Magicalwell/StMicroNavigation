<template>
  <div class="navbar-container">
    <slot name="switchbtn"></slot>
    <bread-Crumb></bread-Crumb>
    <div class="navbar-right">
      <template>
        <div class="navbar-right-item"></div>
        <div class="navbar-right-item"></div>
        <div class="navbar-right-item"></div>
        <div class="navbar-right-item"></div>
      </template>
      <el-dropdown class="user-zone navbar-right-item" trigger="click">
        <div class="el-dropdown-link">
          <el-avatar
            shape="square"
            size="large"
            src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
          ></el-avatar>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>首页</el-dropdown-item>
          <el-dropdown-item>联系作者</el-dropdown-item>
          <el-dropdown-item divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import breadCrumb from "@/components/breadCrumb/breadcrumb.vue";
export default {
  components: {
    breadCrumb,
  },
};
</script>

<style lang="scss" scoped>
.navbar-container {
  height: 50px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.navbar-right {
  float: right;
  height: 100%;
  line-height: 50px;
}
.user-zone {
  // padding-right: 20px;
  display: inline-block;
  margin-right: 20px;
  height: 100%;
  cursor: pointer;
  .el-dropdown-link {
    // line-height: 50px;
    outline: none;
    margin-top: 5px;
    ::v-deep.el-icon-arrow-down {
      font-size: 12px;
    }
  }
}
.navbar-right-item {
  display: inline-block;
  padding: 0 8px;
  height: 100%;
  font-size: 18px;
  color: #5a5e66;
  vertical-align: text-bottom;
}
</style>
