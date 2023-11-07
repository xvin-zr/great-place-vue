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
  if (lineChart.value)
    lineChart.value.destroy();
  const labels = Object.keys(successData.value);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "累计成交单数",
        data: Object.values(successData.value),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        yAxisID: "y",
      },
      {
        label: "中介费金额",
        data: Object.values(feesData.value),
        borderColor: "rgba(192, 75, 192, 1)",
        backgroundColor: "rgba(192, 75, 192, 0.2)",
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
          text: "Chart.js Line Chart - Multi Axis",
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
</script>
