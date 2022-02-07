<template>
  <div class="app-content">
    <slide-bar :collapse.sync="collapseStatus"></slide-bar>
    <div class="main-content" :class="{ slideHide: collapseStatus }">
      <div class="main-head">
        <nav-Bar>
          <i
            class="switchbtn"
            @click="collapseStatus = !collapseStatus"
            slot="switchbtn"
            :class="collapseStatus ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          >
          </i>
        </nav-Bar>
        <tags-Bar></tags-Bar>
      </div>
      <app-Main></app-Main>
    </div>
    <!-- <div class="fill-screen" v-if="show == 1"></div> -->
  </div>
</template>

<script>
import slideBar from "./components/slidebar";
import navBar from "./components/navbar";
import appMain from "./components/main/appMain.vue";
import tagsBar from "./components/tagsbar/tags.vue";
export default {
  data() {
    return {
      collapseStatus: false,
    };
  },
  computed: {
    show() {
      return this.$route.query.id;
    },
  },
  components: {
    appMain,
    slideBar,
    navBar,
    tagsBar,
  },
};
</script>

<style lang="scss" scoped>
.app-content {
  position: relative;
  background-color: #fff;
  width: 100%;
  height: 100%;
}
.left {
  width: 25%;
  background-color: brown;
  height: 100%;
}
.main-content {
  margin-left: 210px;
  min-height: 100%;
  transition: margin-left 0.3s ease-in-out;
  box-shadow: 0 4px 16px rgba($color: #000000, $alpha: 0.1);
  &.slideHide {
    margin-left: 64px;
  }
  .switchbtn {
    font-size: 22px;
    width: 50px;
    line-height: 50px;
    float: left;
    text-align: center;
    cursor: pointer;
  }
}
.fill-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: aqua;
}
</style>
