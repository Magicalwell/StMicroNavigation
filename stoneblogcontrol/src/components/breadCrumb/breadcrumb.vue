<template>
  <el-breadcrumb separator="/" class="breadcrumb-container">
    <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbList"
        :key="item.path"
      >
        <span :class="{ 'second-level': index >= breadcrumbList.length - 1 }">{{
          item.meta.title
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script>
export default {
  data() {
    return {
      breadcrumbList: null,
    };
  },
  watch: {
    $route: {
      handler() {
        this.getBreadcrumb();
      },
      immediate: true,
    },
  },
  methods: {
    getBreadcrumb() {
      let matchedGroup = this.$route.matched.filter((item) => item.meta.title);
      console.log(matchedGroup);
      if (
        matchedGroup[0].name !== "home" &&
        matchedGroup[0].name !== "layout"
      ) {
        matchedGroup = [{ path: "/home", meta: { title: "首页" } }].concat(
          matchedGroup
        );
      }
      this.breadcrumbList = matchedGroup;
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb-container {
  line-height: 50px;
  display: inline-block;
  margin-left: 10px;
}
.second-level {
  color: #97a8be;
}
</style>
