<style scoped>
.line-chart-section {
  padding: 32px;
}
</style>

<template>
  <section class="line-chart-section">
    <canvas id="lineChart"></canvas>
  </section>
</template>

<script setup>
import { onMounted, ref, watchEffect, inject, computed, nextTick } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
const myLineChart = ref(null);
const ctx = ref(null);
const successData = inject("successData");
const feesData = inject("feesData");

onMounted(() => {
  ctx.value = document.getElementById("lineChart");
});

watchEffect(() => {
  if (
    Object.entries(successData.value).length === 0 ||
    Object.entries(feesData.value).length === 0
  ) {
    return;
  }
  // await nextTick(() => {
  // ctx.value = document.getElementById("lineChart");
  // });

  console.log(successData.value, feesData.value);

  if (!ctx.value) return;
  // if (!lineChart.value) return;
  // if (myLineChart.value) myLineChart.value.destroy();
  if (!successData.value || !feesData.value) return;
  const { completeSuccessData, completeFeesData } = getCompleteData(
    successData.value,
    feesData.value
  );
  console.log(completeSuccessData, completeFeesData);
  const labels = Object.keys(completeSuccessData);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "累计成交单数",
        data: Object.values(completeSuccessData),
        borderColor: "rgba(40, 175, 176, 1)",
        backgroundColor: "rgba(40, 175, 176, 0.2)",
        yAxisID: "y",
      },
      {
        label: "中介费金额（元）",
        data: Object.values(completeFeesData),
        borderColor: "rgba(182, 36, 79, 1)",
        backgroundColor: "rgba(182, 36, 79, 0.2)",
        yAxisID: "y1",
      },
    ],
  };
  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: "累计成交单数及中介费金额趋势",
        },
      },
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
          min: 0,
          suggestedMax: 20,
          ticks: {
            stepSize: 2,
          },
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          min: 0,
          suggestedMax: 50,
          // ticks: {
          //   stepSize: 4,
          // },

          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      },
    },
  };
  // await nextTick(() => {

  // });
  if (myLineChart.value) {
    console.log(myLineChart.value);
    myLineChart.value.destroy();
  }
  ctx.value = document.getElementById("lineChart");
  myLineChart.value = new Chart(ctx.value, config);
  // console.log(myLineChart.value);
  // myLineChart.value.destroy()
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
