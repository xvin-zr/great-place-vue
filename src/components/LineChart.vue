<script setup>
import { applyPureReactInVue } from "veaury";
import { inject } from "vue";
import LineChartReact from "../react_app/line-chart-react.jsx";

const LineChart = applyPureReactInVue(LineChartReact);

const successData = inject("successData");
const feesData = inject("feesData");
</script>

<template>
  <LineChart :successData="successData" :feesData="feesData" />
</template>
