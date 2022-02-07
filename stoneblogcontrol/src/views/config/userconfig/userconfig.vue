<template>
  <div class="userconfig">
    <h3
      style="
        line-height: 1.5;
        border-bottom: 2px solid #000;
        margin-bottom: 30px;
      "
    >
      个人中心
    </h3>
    <div class="userconfig-container">
      <el-row :gutter="12">
        <el-col :xs="24" :sm="8" :lg="8">
          <el-card shadow="always">
            <h3>三石大魔王</h3>
            <p>这是一段测试个性签名</p>

            <ul class="info">
              <li><i class="el-icon-user"></i> 三石</li>
              <li><i class="el-icon-camera"></i> 1997</li>
              <li><i class="el-icon-camera"></i> 男</li>
              <li><i class="el-icon-office-building"></i> 江南皮革厂副厂长</li>
              <li><i class="el-icon-place"></i> 浙江温州</li>
              <li>
                <i class="el-icon-camera"></i> JavaScript、HTML、CSS、Vue、Node
              </li>
            </ul>
            <div class="selftag">3</div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="16" :lg="16">
          <el-card shadow="always"> 功能暂时未开放 </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.userconfig {
  padding: 30px 45px 20px 50px;
  font-size: 14px;
}
</style>
