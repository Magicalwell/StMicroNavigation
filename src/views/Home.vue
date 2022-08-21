<template>
  <div class="main-home-container">
    <div class="container-header">
      <n-grid
        :x-gap="0"
        :y-gap="8"
        :cols="2"
        responsive="screen"
        item-responsive
      >
        <n-grid-item span="0 m:1">
          <div class="grid-left layoutbox" />
        </n-grid-item>
        <n-grid-item span="2 m:1">
          <div class="grid-right layoutbox">
            <!-- <h1 style="font-size: 36px; margin-bottom: 0">你好，我是三石</h1> -->
            <h1 style="font-size: 42px; text-indent: 2em">
              认识世界的角度和感受世界的方式可能有千万种，就像每一条路每个选择其实都没有对错，它们都有其意义，而找到这个意义并为之付出时间和生命，那就是前进。
            </h1>
            <p>你好，我是三石，很高兴认识你。</p>
            <p>
              感谢您在百忙之中访问我的个人网站。这是我从入职现在的公司到目前利用空闲时间所做的东西，并用其升级了我的个人博客，一些皆由您所见。它们可能并不完善，但我一直在一点一点的试图去完成它们。
            </p>
            <p>非常抱歉的是，有些问题可能需要您注意一下：</p>
            <ol>
              <li>由于服务器没有配置代理，所以刷新页面会导致404。</li>
              <li>
                由于缺少后台代码，各个应用之间的数据还未打通，主应用与子应用，子应用与子应用。管理系统目前还无法控制整个网站的权限。
              </li>
              <li>正在适配移动端。</li>
              <li>所有项目都暂时没有后台，不能持久化保存数据。</li>
            </ol>
            <span class="line"></span>
          </div>
        </n-grid-item>
      </n-grid>
    </div>
    <div class="container-body">
      <h3 class="body-title">作品简介</h3>
      <n-grid
        :x-gap="12"
        :y-gap="8"
        :cols="3"
        item-responsive
        responsive="screen"
      >
        <!-- 后面用v-for刷出来 -->
        <n-grid-item span="3 m:1" @click="pageTo('blog-control')">
          <div style="background-color: #000" class="card-item control-system">
            <h2 class="title">网站后台管理系统</h2>
            <div style="padding: 0 24px 20px" class="content">
              这是用于管理整个个人网站的后台系统,主要使用了vue全家桶(vue2)，通过从后台根据角色动态获取路由、以及按钮权限来进行权限控制。
              <br />
            </div>
          </div>
        </n-grid-item>
        <n-grid-item span="3 m:1" @click="pageTo('planner-generation')">
          <div style="background-color: #000" class="card-item low-code-notes">
            <h2 class="title">可视化笔记(仿notion)</h2>
            <div style="padding: 0 24px 20px" class="content">
              因为我有做笔记的习惯，而这个低代码笔记就是仿的一款我经常使用的软件——notion。做这个的原因一方面是好奇notion背后的实现逻辑，且对低代码比较好奇，另一方面则是担心notion是国外的，哪天万一被墙了或公司倒闭笔记会全部丢失0.0
              <br />
              基本上实现了notion的部分主要功能，而目前呢同样是因为后台代码支持不到位，数据暂时只能存在内存里面。等后续完善了后台代码，计划实现多人协作编辑和实时保存功能。
            </div>
          </div>
        </n-grid-item>
        <n-grid-item span="3 m:1" @click="pageTo('planner-generation')">
          <div style="background-color: #000" class="card-item picture-edit">
            <h2 class="title">图片编辑器</h2>
            <div style="padding: 0 24px 20px" class="content">
              最初的目标是实现一个在线版本的简易photoshop，但现在我想把它从可视化笔记中拆出来，做成稿定设计那样的。
              <br />
              实现了canvas的图片编辑抠图，自由绘画，图层功能，以及导出jpg格式的图片。只完成了基础的功能，很多地方还没有优化。同样的，它也没有后台代码支持。
            </div>
          </div>
        </n-grid-item>
        <n-grid-item span="3 m:1" @click="pageTo('heart-of-stone')">
          <div style="background-color: #000" class="card-item heart-of-stone">
            <h2 class="title">RPG游戏——石之心</h2>
            <div style="padding: 0 24px 20px" class="content">
              关于爱玩游戏的程序员，开发游戏的初尝试，不过目前只是demo版本。
            </div>
          </div>
        </n-grid-item>
        <n-grid-item span="3 m:1" @click="pageTo('ease-page-creator')">
          <div style="background-color: #000" class="card-item">
            <h2 class="title">低代码页面生成器</h2>
            <div style="padding: 0 24px 20px" class="content">
              (这个暂时没有截图哈)
              <br />
              实现了目前市面上比较常见的低代码平台功能，能够进行表单、普通页面、h5页面的设计、预览以及导出代码的功能。借鉴了百度爱速搭以及lowcode-engine，正在完善中，感谢巨人。
            </div>
          </div>
        </n-grid-item>
        <n-grid-item span="3 m:1">
          <div style="background-color: #000" class="card-item">
            <h2 class="title">等待接入</h2>
            <div style="padding: 0 24px 20px" class="content">暂时没有喽！</div>
          </div>
        </n-grid-item>
      </n-grid>
    </div>
    <div class="container-body">
      <h3 class="body-title">博客文章</h3>
    </div>
    <div class="container-body">
      <h3 class="body-title">留言板</h3>
    </div>
    <div class="container-body" style="margin-bottom: 200px">
      <h3 class="body-title">开发进度</h3>
      <!-- 左侧为代办、右侧是时间线 -->
    </div>
    <div class="container-footer">
      <n-grid :cols="2" item-responsive responsive="screen">
        <n-grid-item span="2 m:1">
          <div style="color: #fff; text-align: left">联系方式：暂无</div>
        </n-grid-item>
        <n-grid-item span="2 m:1">
          <a
            href="http://beian.miit.gov.cn/"
            target="_blank"
            style="height: 30px; display: inline-block; line-height: 30px"
            >鄂ICP备2021015726号</a
          >
          <a
            target="_blank"
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42011102004602"
            style="
              display: flex;
              text-decoration: none;
              height: 20px;
              line-height: 20px;
              justify-content: center;
            "
            ><img src="img/备案图标.png" />
            <p
              style="
                float: left;
                height: 20px;
                line-height: 20px;
                margin: 0px 0px 0px 5px;
                color: #fff;
              "
            >
              鄂公网安备 42011102004602号
            </p>
          </a>
        </n-grid-item>
      </n-grid>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NGrid, NGridItem } from 'naive-ui'
export default defineComponent({
  components: {
    NGrid,
    NGridItem
    // NTag
  },
  methods: {
    pageTo(item) {
      this.$router.push({ name: item })
    }
  }
})
</script>

<style lang="scss" scoped>
.container-body {
  padding: 0 20px 20px 20px;
  background-color: #fff;
  &:last-of-type {
    margin-bottom: 200px;
  }
  .body-title {
    padding-left: 20px;
    margin-top: 0;
  }
}
.container-header {
  min-height: 600px;
  background-color: #fff;
  padding-bottom: 30px;
}
.layoutbox {
  box-sizing: border-box;
  overflow: hidden;
  padding: 20px;
  font-size: 16px;
}
.grid-left {
  min-height: 90vh;
}
.grid-right {
  padding-top: 180px;
  min-height: 90vh;
}
.line {
  display: block;
  height: 5px;
  width: 40px;
  background-color: #000;
}
.card-item {
  height: 300px;
  position: relative;
  color: #fff;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  border-radius: 12px;
  cursor: pointer;
  &.control-system {
    background: url('../assets/20220629215630.png');
  }
  &.low-code-notes {
    background: url('../assets/20220629225420.png') left center;
    background-size: 150%;
  }
  &.picture-edit {
    background: url('../assets/20220629234149.png') center center;
    background-size: 100%;
  }
  &.heart-of-stone {
    background: url('../assets/20220629234223.png') center center;
    background-size: 100%;
  }
  &:hover {
    box-shadow: 1px 6px 12px rgba($color: #000000, $alpha: 0.3);
  }
  // &::before {
  //   content: '';
  //   width: 100%;
  //   height: 100%;
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  //   // background-color: rgba($color: #000000, $alpha: 0.6);
  //   z-index: 1;
  // }
  ::v-deep(.n-card-header__main) {
    font-weight: 700;
    font-size: 24px;
    color: #fff;
  }
  ::v-deep(.n-card-header) {
    z-index: 2;
  }
  ::v-deep(.n-card__content) {
    z-index: 2;
  }
  p {
    margin: 0;
    text-indent: 2em;
  }
  .title {
    margin: 0;
    padding: 24px 20px;
    background-color: rgba($color: #000000, $alpha: 0.6);
  }
  .content {
    flex: 1;
    background-color: rgba($color: #000000, $alpha: 0.6);
  }
}
.container-footer {
  box-sizing: border-box;
  padding: 30px 40px;
  position: fixed;
  bottom: 0;
  text-align: center;
  height: 200px;
  width: 100%;
  z-index: -1;
  background-color: #000;
  a {
    text-decoration: none;
    color: #fff;
  }
}
</style>
