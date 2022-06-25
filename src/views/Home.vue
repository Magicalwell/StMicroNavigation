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
              <li>由于服务器没有配置代理，所以刷新页面会导致404。</li>
              <li>
                由于缺少后台代码，各个应用之间的数据还未打通，主应用与子应用，子应用与子应用。管理系统目前还无法控制整个网站的权限。
              </li>
              <li>暂时没有适配移动端。</li>
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
        <n-grid-item span="3 m:1">
          <n-card title="网站后台管理系统" class="card-item" hoverable>
            这是用于管理整个网站的后台系统
          </n-card>
        </n-grid-item>
        <n-grid-item span="3 m:1">
          <n-card title="低代码笔记" class="card-item" hoverable>
            卡片内容
          </n-card>
        </n-grid-item>
        <n-grid-item span="3 m:1">
          <n-card title="图片编辑器" class="card-item" hoverable>
            卡片内容
          </n-card>
        </n-grid-item>
        <n-grid-item span="3 m:1">
          <n-card title="游戏——石之心" class="card-item" hoverable>
            卡片内容
          </n-card>
        </n-grid-item>
        <n-grid-item span="3 m:1">
          <n-card title="卡片" class="card-item" hoverable> 卡片内容 </n-card>
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
          <div style="color: #fff;text-align:left">联系方式：暂无</div>
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
import { NGrid, NGridItem, NCard } from 'naive-ui'
export default {
  components: {
    NGrid,
    NGridItem,
    NCard
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
  ::v-deep(.n-card-header__main) {
    font-weight: 700;
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
