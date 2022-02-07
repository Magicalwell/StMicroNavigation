<template>
  <div class="daskplace">
    <h3
      style="
        line-height: 1.5;
        border-bottom: 2px solid rgb(0, 0, 0);
        margin-bottom: 20px;
      "
    >
      主控台
    </h3>
    <el-row :gutter="20">
      <el-col :xs="12" :sm="12" :lg="6"
        ><div class="card-panel">
          <div class="card-panel-left">
            <i class="el-icon-user" style="font-size: 48px"></i>
          </div>
          <div class="card-panel-right">
            <div class="panel-title">访客数量：</div>
            <countTo
              :startVal="0"
              :endVal="20000"
              :duration="2000"
              class="panel-num"
            ></countTo>
            <!-- <div class="panel-num">20000</div> -->
          </div>
        </div></el-col
      >
      <el-col :xs="12" :sm="12" :lg="6"
        ><div class="card-panel">
          <div class="card-panel-left">
            <i class="el-icon-chat-line-square" style="font-size: 48px"></i>
          </div>
          <div class="card-panel-right">
            <div class="panel-title">留言数量：</div>
            <countTo
              :startVal="0"
              :endVal="15000"
              :duration="2000"
              class="panel-num"
            ></countTo>
          </div></div
      ></el-col>
      <el-col :xs="12" :sm="12" :lg="6"
        ><div class="card-panel">
          <div class="card-panel-left">
            <i class="el-icon-trophy" style="font-size: 48px"></i>
          </div>
          <div class="card-panel-right">
            <div class="panel-title">项目数量：</div>
            <countTo
              :startVal="0"
              :endVal="15"
              :duration="2000"
              class="panel-num"
            ></countTo>
          </div></div
      ></el-col>
      <el-col :xs="12" :sm="12" :lg="6"
        ><div class="card-panel">
          <div class="card-panel-left">
            <i class="el-icon-notebook-1" style="font-size: 48px"></i>
          </div>
          <div class="card-panel-right">
            <div class="panel-title">文章数量：</div>
            <countTo
              :startVal="0"
              :endVal="20000"
              :duration="2000"
              class="panel-num"
            ></countTo>
          </div></div
      ></el-col>
    </el-row>
    <el-row style="height: 500px; width: 100%">
      <liner-Chart :chartdata="lineChartData"></liner-Chart>
    </el-row>
    <el-row :gutter="8" style="margin-bottom: 20px">
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 24 }"
        :md="{ span: 24 }"
        :lg="{ span: 12 }"
        :xl="{ span: 12 }"
      >
        <el-calendar class="calendar-container">
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template slot="dateCell" slot-scope="{ data }">
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split("-").slice(1).join("-") }}
              {{ data.isSelected ? "✔️" : "" }}
            </p>
          </template>
        </el-calendar>
      </el-col>
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 6 }"
        :xl="{ span: 6 }"
        >待办</el-col
      >
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 6 }"
        :xl="{ span: 6 }"
        >进度表</el-col
      >
    </el-row>
  </div>
</template>

<script>
import linerChart from "./components/linerChart/liner.vue";
import countTo from "vue-count-to";
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
};
export default {
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
    };
  },
  components: {
    linerChart,
    countTo,
  },
};
</script>

<style lang="scss" scoped>
.daskplace {
  padding: 32px;
  // background-color: #f2f5f7;
}
.card-panel {
  border: 1px solid #000;
  height: 108px;
  background-color: #fff;
  display: flex;
  border-radius: 19px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  .card-panel-left {
    margin-left: 20px;
    padding: 10px;
  }
  .card-panel-right {
    margin-right: 26px;
  }
}
.is-selected {
  color: #1989fa;
}
.calendar-container {
  border: 1px solid #ccc;
  border-radius: 10px;
  ::v-deep tbody .el-calendar-table__row {
    td {
      border-color: #ccc;
    }
  }
}
</style>
