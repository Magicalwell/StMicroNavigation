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
            <h1 style="font-size: 42px">
              认识世界的角度和感受世界的方式可能有千万种，就像每一条路每个选择其实都没有对错，它们都有其意义，而找到这个意义并为之付出时间和生命，那就是前进。
            </h1>
            <p>你好，我是三石，很高兴认识你。</p>
            <p>
              感谢您在百忙之中访问我的个人网站。这是我从入职现在的公司到目前利用空闲时间所做的东西，并用其升级了我的个人博客，一些皆由您所见。它们可能并不完善，但我一直在一点一点的试图去完成它们。
            </p>
            <p>非常抱歉的是，有些问题可能需要您注意一下：</p>
            <ol>
              <li>主导航栏按钮在左上角！</li>
              <li>由于服务器没有配置代理，所以刷新页面会导致404。</li>
              <li>
                由于缺少后台代码，各个应用之间的数据还未打通，主应用与子应用，子应用与子应用。管理系统目前还无法控制整个网站的权限。
              </li>
              <li>暂时没有适配移动端。</li>
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
        <n-grid-item span="3 m:1">
          <n-card
            title="网站后台管理系统"
            class="card-item control-system"
            hoverable
          >
            <p>这是用于管理整个个人网站的后台系统</p>
            <p>
              主要使用了vue全家桶(vue2)，通过从后台根据角色动态获取路由、以及按钮权限来进行权限控制。
            </p>
            <p>
              做这个最初的想法是方便自己写博客或上传博客，然后对访问网站的用户进行一个权限的控制，打包上传自己的一些项目，另外就是对公司代码的理解做一些实践和运用。后来因为项目工作太忙且学习后端开发的成本又很高，就没有继续完善下去，只是实现了后台管理系统比较核心的一些东西。
            </p>
            <p>不过我计划在后面会去优先完成它。</p>
          </n-card>
        </n-grid-item>
        <n-grid-item span="3 m:1">
          <n-card
            title="低代码笔记(lowcode-notes)"
            class="card-item low-code-notes"
            hoverable
          >
            <!-- <n-tag type="success" size="small" round> 告别夜晚 等待天亮 </n-tag> -->
            <p>
              因为我有做笔记的习惯，而这个低代码笔记就是仿的一款我经常使用的软件——notion。做这个的原因一方面是好奇notion背后的实现逻辑，且对低代码比较好奇，另一方面则是担心notion是国外的，哪天万一被墙了或公司倒闭笔记会全部丢失0.0
            </p>
            <p>
              基本上实现了notion的部分主要功能，同样借鉴了jsonschema对数据格式进行规定，不同的是我新增了拖拽的功能，可以将想要的组件直接拖到任意的地方去，而不需要多几步操作。
            </p>
            <p>
              而目前呢同样是因为后台代码支持不到位，数据暂时只能存在内存里面。等后续完善了后台代码，计划实现多人协作编辑和实时保存功能。
            </p>
          </n-card>
        </n-grid-item>
        <n-grid-item span="3 m:1">
          <n-card title="图片编辑器" class="card-item picture-edit" hoverable>
            <p>
              我把他和笔记放在了一起，方便对图片进行编辑或生成jpg格式的手账，然后打印出来。
            </p>
            <p>
              实现了canvas的图片编辑抠图，自由绘画，图层功能，以及导出jpg格式的图片
            </p>
            <p>
              图片编辑器和低代码笔记两个项目是最近在开发的，只完成了基础的功能，很多地方还没有优化。同样的，它也没有后台代码支持。
            </p>
          </n-card>
        </n-grid-item>
        <n-grid-item span="3 m:1">
          <n-card
            title="RPG游戏——石之心"
            class="card-item heart-of-stone"
            hoverable
          >
            <p>关于爱玩游戏的程序员，开发游戏的初尝试！</p>
          </n-card>
        </n-grid-item>
        <n-grid-item span="3 m:1">
          <n-card title="等待接入" class="card-item" hoverable>
            暂时没有喽！
          </n-card>
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
import { NGrid, NGridItem, NCard, NTag } from 'naive-ui'
export default {
  components: {
    NGrid,
    NGridItem,
    NCard
    // NTag
  }
}
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
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba($color: #000000, $alpha: 0.6);
    z-index: 1;
  }
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
