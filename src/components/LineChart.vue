<script setup>
import { applyPureReactInVue, applyReactInVue } from "veaury";
import LineChartReact from "../react_app/line-chart-react.jsx";
import { inject } from "vue";

const LineChart = applyReactInVue(LineChartReact);

const successData = inject("successData");
const feesData = inject("feesData");
</script>

<template>
  <LineChart :successData="successData" :feesData="feesData" />
</template>
