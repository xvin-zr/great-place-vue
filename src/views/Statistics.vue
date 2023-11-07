<script setup>
import { ref } from "vue";
import myHeaders from "../data/headers";
import { getYearMonth } from "../methos/date";
import placeTypeList from "../data/place-type";
import "./find-welcome.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const DEFAULT_OFFSET = -3;

const beginTime = ref(getYearMonth(DEFAULT_OFFSET));
const endTime = ref(getYearMonth());
const cityCode = ref("110100");

const invoices = ref([]);

console.log(beginTime.value, endTime.value);

async function getInvoiceDetails() {
  try {
    const res = await fetch(
      `${BASE_URL}/countIntermediaryEarnings/list?beginTime=${beginTime.value}&endTime=${endTime.value}&cityCode=${cityCode.value}`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    );
    const data = await res.json();
    console.log(data);
    invoices.value = [...data.data].sort((a, b) => {
      return a.monthStringToInt - b.monthStringToInt;
    });
  } catch (error) {
    console.log(error);
  }
}
getInvoiceDetails();
</script>

<template>
  <section class="search-section">
    <div class="search-container">
      <label for="beginTime"> 开始月份： </label>
      <input type="month" id="beginTime" v-model="beginTime" />

      <label for="endTime">结束月份：</label>
      <input type="month" id="endTime" v-model="endTime" />

      <label for="province"></label>
      <!-- <button class="btn--search">Search</button> -->
    </div>
  </section>
  <table>
    <thead>
      <tr>
        <th>月份</th>
        <th>类型</th>
        <th>成功数量</th>
        <th>中间费用</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in invoices">
        <td>{{ item.monthStringToInt }}</td>
        <td>{{ placeTypeList[item.placeType] }}</td>
        <td>{{ item.successTotal }}</td>
        <td>{{ item.intermediaryFees }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  border-collapse: collapse;
  margin: 0 auto;
}

td,
th {
  border: 1px solid #ddd;
  padding: 8px;
}
</style>
