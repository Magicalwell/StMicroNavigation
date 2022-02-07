<template>
  <div class="liner-chart-container"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: {
    chartdata: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initEcharts();
    });
  },
  methods: {
    initEcharts() {
      this.chart = echarts.init(this.$el);
      // 绘制图表
      this.chart.setOption({
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.liner-chart-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>
