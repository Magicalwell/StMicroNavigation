<template>
  <div class="project-show">
    <h3
      style="
        line-height: 1.5;
        border-bottom: 2px solid #000;
        margin-bottom: 30px;
      "
    >
      项目展示
    </h3>

    <div class="project-container">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="container-items">
            <div class="items-img">
              <img :src="require('@/assets/images/1.jpg')" alt="" />
            </div>
            <div class="items-info">
              <h3>后台管理系统</h3>
              <small>项目简介：</small>
              <p>
                这是嘻嘻嘻嘻啊士大夫你那里期间这是嘻嘻嘻嘻啊士大夫你那里期间这是嘻嘻嘻嘻啊士大夫你那里期间这是嘻嘻嘻嘻啊士大夫你那里期间这是嘻嘻嘻嘻啊士大夫你那里期间这是嘻嘻嘻嘻啊士大夫你那里期间
              </p>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="container-items">
            <div class="items-img">
              <img :src="require('@/assets/images/2.jpg')" alt="" />
            </div>
            <div class="items-info"></div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="container-items">
            <div class="items-img">
              <img :src="require('@/assets/images/1.jpg')" alt="" />
            </div>
            <div class="items-info"></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="project-show-footer" style="text-align: center">
      <el-pagination background layout="prev, pager, next" :total="50">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
h3 {
  line-height: 1.25;
  margin-bottom: 10px;
}
p {
  text-overflow: hidden;
}
.project-show {
  padding: 30px 45px 20px 50px;
}
.container-items {
  border: 1px solid #ebeef5;
  cursor: pointer;
  margin-bottom: 20px;
  height: 300px;
  display: flex;
  transition: all 0.3s ease;
  position: relative;
  // &::before { // hover动效待完善
  //   content: "";
  //   display: inline-block;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  //   transition: all 0.3s ease;
  //   background-color: rgba($color: #000000, $alpha: 0.55);
  // }
  &:hover {
    //   &::before {
    //     background-color: rgba($color: #000000, $alpha: 0.1);
    //   }
    transform: translateX(-1px) translateY(-1px);
    box-shadow: 0 4px 12px rgba($color: #000000, $alpha: 0.2);
  }
  .items-img {
    width: 30%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .items-info {
    padding: 20px;
    flex: 1;
  }
}
</style>
