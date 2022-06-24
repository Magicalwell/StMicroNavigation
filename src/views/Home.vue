<template>
  <div class="main-home-container">
    <div class="container-header">
      <n-grid :x-gap="0" :y-gap="8" :cols="2" responsive="screen">
        <n-grid-item>
          <div class="grid-left layoutbox" />
        </n-grid-item>
        <n-grid-item>
          <div class="grid-right layoutbox">
            <h3>我是home</h3>
            <p>目前微导航系统仅接入了几个项目，数据还未互通！</p>
            <p>可能会出现的问题：(也可能不会出现)</p>
            <ol>
              <li>打包后history模式路由刷新出现404</li>
              <li>
                各个应用之间的数据还未打通，主应用与子应用，子应用与子应用
              </li>
              <li>
                主应用为hash模式。子应用为history模式的时候，会改变url地址
              </li>
            </ol>
            <small>其实也可以没有内容</small>
            <span class="line"></span>
          </div>
        </n-grid-item>
      </n-grid>
    </div>
    <div class="container-body">
      <n-grid :x-gap="12" :y-gap="8" :cols="3">
        <n-grid-item>
          <n-card title="卡片" class="card-item" hoverable> 卡片内容 </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="卡片" class="card-item" hoverable> 卡片内容 </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="卡片" class="card-item" hoverable> 卡片内容 </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="卡片" class="card-item" hoverable> 卡片内容 </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card title="卡片" class="card-item" hoverable> 卡片内容 </n-card>
        </n-grid-item>
      </n-grid>
    </div>
    <div class="container-footer">
      <a href="http://beian.miit.gov.cn/" target="_blank"
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
            color:#fff
          "
        >
          鄂公网安备 42011102004602号
        </p>
      </a>
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
}
.container-header {
  min-height: 600px;
}
.layoutbox {
  box-sizing: border-box;
  overflow: hidden;
  padding: 20px;
  font-size: 16px;
}
.grid-left {
  height: 90vh;
}
.grid-right {
  padding-top: 180px;
  height: 90vh;
}
.line {
  display: block;
  height: 5px;
  width: 40px;
  background-color: #000;
}
.card-item {
  height: 300px;
}
.container-footer {
  text-align: center;
  height: 200px;
  background-color: #000;
  a {
    text-decoration: none;
    color: #fff;
  }
}
</style>
