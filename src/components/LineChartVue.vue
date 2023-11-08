<script setup>
import { inject, onMounted, ref, render, watchEffect } from "vue";
import * as echarts from "echarts";

const successData = inject("successData");
const feesData = inject("feesData");
const lineChart = ref(null);

onMounted(() => {
  lineChart.value = echarts.init(document.getElementById("lineChart"), null, {
    render: "svg",
  });
});

watchEffect(() => {
  if (!lineChart.value) return;
  const [completeSuccessData, completeFeesData] = [
    successData.value,
    feesData.value,
  ];
  const option = {
    title: {
      text: "成交单数与中介费",
    },
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        // Access the data associated with the hovered element
        return params.seriesName + ": " + params.data;
      },
    },
    legend: {
      data: ["成交单数", "中介费金额"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      name: "月份",
      boundaryGap: false,
      data: Object.keys(completeSuccessData),
    },
    yAxis: [
      {
        type: "value",
        name: "成交单数",
        min: 0,
        position: "left",
        interval: 1,
        axisLabel: {
          formatter: "{value}",
        },
      },
      {
        type: "value",
        name: "中介费金额",
        min: 0,
        position: "right",
        axisLabel: {
          formatter: "{value} 元",
        },
      },
    ],
    series: [
      {
        name: "成交单数",
        type: "line",
        yAxisIndex: 0,
        data: Object.values(completeSuccessData),
      },
      {
        name: "中介费金额",
        type: "line",
        yAxisIndex: 1,
        smooth: true,
        data: Object.values(completeFeesData),
      },
    ],
  };
  option && lineChart.value.setOption(option);
});

function getCompleteData(successData, feesData) {
  // console.log(successData, feesData);
  const minMonth = Math.min(...Object.keys(successData));
  const maxMonth = Math.max(...Object.keys(successData));

  const months = [];
  for (let i = minMonth; i <= maxMonth; i++) {
    months.push(i);
  }

  const completeSuccessData = {};
  const completeFeesData = {};

  months.forEach((month) => {
    completeSuccessData[month] = successData[month] || 0;
    completeFeesData[month] = feesData[month] || 0;
  });

  return { completeSuccessData, completeFeesData };
}
</script>

<template>
  <section class="line-chart-section">
    <div id="lineChart"></div>
  </section>
</template>

<style scoped>
.line-chart-section {
  height: 100vh;
  padding: 32px;
}

.line-chart-section div {
  height: 100%;
  width: 90%;
  margin: 0 auto;
}
</style>
