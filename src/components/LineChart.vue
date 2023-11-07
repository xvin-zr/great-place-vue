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
import { onMounted, ref, watchEffect, inject, computed } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
const lineChart = ref(null);
const ctx = ref(null);
const successData = inject("successData");
const feesData = inject("feesData");

onMounted(() => {
  ctx.value = document.getElementById("lineChart");
});

watchEffect(() => {
  console.log(successData.value, feesData.value);
  if (!ctx.value) return;
  // if (!lineChart.value) return;
  if (lineChart.value) lineChart.value.destroy();
  if (!successData.value || !feesData.value) return;
  const { completeSuccessData, completeFeesData } = getCompleteData(
    successData.value,
    feesData.value
  );
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
  lineChart.value = new Chart(ctx.value, config);
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
