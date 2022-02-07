<template>
  <div class="tags-container">
    <el-scrollbar
      class="scroll-container"
      :vertical="false"
      @wheel.native.prevent="handleScroll"
      ref="scrollContainer"
    >
      <router-link
        v-show="item.meta.showTag"
        v-for="(item, index) in visitedViews"
        :to="item.path"
        :key="index"
        class="tags-view-item"
        :class="isActive(item) ? 'active' : ''"
        >{{ item.meta.title }}
        <span
          v-if="isCanDelete(item)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(item)"
        ></span>
      </router-link>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  mounted() {
    this.initTags();
    this.addTags();
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      const $scrollWrapper = this.scrollWrapper;
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft - eventDelta / 4;
    },
    initTags() {
      const fixedTags = this.fliterFixedTags(this.routes);
      for (const tag of fixedTags) {
        // Must have tag name
        this.$store.dispatch("tags/addTags", tag);
      }
    },
    addTags() {
      const { meta } = this.$route;
      if (meta.title) {
        this.$store.dispatch("tags/addTags", this.$route);
      }
    },
    isActive(tag) {
      return tag.path == this.$route.path;
    },
    isCanDelete(tag) {
      return tag.meta && tag.meta.canDelete && tag.meta.canDelete != false;
    },
    fliterFixedTags(routes) {
      let addtags = [];
      routes.forEach((element) => {
        if (element.meta && element.meta.fixed) {
          addtags.push(element);
        }
        if (element.children && element.children.length > 0) {
          const tempTags = this.fliterFixedTags(element.children);
          if (tempTags.length > 0) {
            addtags = [...addtags, ...tempTags];
          }
        }
      });
      return addtags;
    },
    closeSelectedTag(item) {
      this.$store.dispatch("tags/delView", item).then((res) => {
        if (this.isActive(item)) {
          this.toAnotherTags(res);
        }
      });
    },
    toAnotherTags(tags) {
      const lastTag = tags.splice(-1)[0];
      if (lastTag) {
        this.$router.push(lastTag.fullPath || lastTag.path);
      }
    },
  },
  computed: {
    visitedViews() {
      return this.$store.state.tags.visitedViews;
    },
    routes() {
      return this.$store.getters.routes;
    },
    scrollWrapper() {
      return this.$refs.scrollContainer.$refs.wrap;
    },
  },
  watch: {
    $route: {
      handler() {
        console.log(this.$route.meta.title);
        this.addTags();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.tags-container {
  height: 34px;
  width: 100%;
  line-height: 34px;
  border-bottom: 1px solid #d8dce5;
}
.tags-view-item {
  font-size: 12px;
  padding: 0 8px;
  border: 1px solid #d8dce5;
  margin-left: 5px;
  height: 26px;
  line-height: 26px;
  display: inline-block;
  color: #000;
  &:first-child {
    margin-left: 16px;
  }
  &.active {
    background-color: #409eff;
    color: #fff;
    border-color: #409eff;
  }
  .el-icon-close {
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    margin-left: 5px;
  }
}
.scroll-container {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  height: 100%;
  ::v-deep {
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}
</style>
