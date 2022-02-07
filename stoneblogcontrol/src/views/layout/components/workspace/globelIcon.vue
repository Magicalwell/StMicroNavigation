<template>
  <div class="globelIcon">
    <grid-layout
      :layout.sync="layout"
      :col-num="colNumConfig"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="false"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[8, 10]"
      :use-css-transforms="true"
      :responsive="true"
    >
      <grid-item
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        class="card-item"
      >
        <router-link :to="item.path" class="inner-router">
          {{ item.i }}
        </router-link>
        <i class="el-icon-rank drag-btn"></i>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      colNumConfig: 12,
      layout: [],
    };
  },
  created() {
    let filterMenulist = this.flatten(this.menuList).filter(
      (item) => item.path.split("/").length > 2
    );
    // console.log(this.flatten(this.menuList)[2].path.split("/"));
    this.layout = this.flatten(filterMenulist).map((item, index) => {
      console.log(index);
      return {
        x: (index % 6) * 2,
        y: 3 * parseInt(index / 6),
        w: 2,
        h: 3,
        i: item.meta.title,
        path: item.path,
      };
    });
    // console.log(temp);
  },
  methods: {
    flatten(tree, arr = []) {
      tree.forEach((item) => {
        const { children, ...props } = item;
        // 添加除了children的属性
        arr.push(props);
        if (children) {
          // 递归将所有节点加入到结果集中
          this.flatten(children, arr);
        }
      });
      return arr;
    },
  },
  computed: {
    ...mapGetters(["menuList"]),
    // dragItems() {

    //   return temp;
    // },
  },
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
};
</script>

<style lang="scss" scoped>
.globelIcon {
  min-height: 100vh;
  padding: 20px;
  ::v-deep.vue-grid-item.vue-grid-placeholder {
    background: #409eff !important;
  }
}
.card-item {
  position: relative;
  border: 1px solid #ebeef5;
  border-radius: 12px;
  font-size: 14px;
  overflow: hidden;
}
.drag-btn {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 10%;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ebeef5;
}
.inner-router {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
</style>
