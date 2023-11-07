<script setup>
import { computed, provide, ref, watch, watchEffect } from "vue";
import myHeaders from "../data/headers";
import { getYearMonth } from "../methos/date";
import placeTypeList from "../data/place-type";
import "./find-welcome.css";
import { cities } from "../data/area-city";
import LineChart from "../components/LineChart.vue";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const DEFAULT_OFFSET = -3;

const beginTime = ref(getYearMonth(DEFAULT_OFFSET));
const endTime = ref(getYearMonth());
const province = ref("北京市");
const cityList = computed(() => {
  return cities.find((item) => item.name === province.value).districts;
});
const city = ref("北京市");
const cityCode = computed(() => {
  return cityList.value.find((item) => item.name === city.value)?.adcode;
});

const invoices = ref([]);

const successData = computed(() => {
  return invoices.value.reduce((acc, cur) => {
    acc[cur.monthStringToInt] =
      (acc[cur.monthStringToInt] || 0) + cur.successTotal;
    return acc;
  }, {});
});

const feesData = computed(() => {
  return invoices.value.reduce((acc, cur) => {
    acc[cur.monthStringToInt] =
      (acc[cur.monthStringToInt] || 0) + cur.intermediaryFees;
    return acc;
  }, {});
});

provide("successData", successData);
provide("feesData", feesData);

watchEffect(() => {
  getInvoiceDetails();
});

async function getInvoiceDetails() {
  if (!cityCode.value) {
    return;
  }
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
    if (!data.data) {
      invoices.value = [];
      alert("没有数据");
    }
    invoices.value = [...data.data].sort((a, b) => {
      return a.monthStringToInt - b.monthStringToInt;
    });
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <section class="search-section">
    <div class="search-container">
      <div>
        <label for="beginTime"> 开始月份：</label>
        <input type="month" id="beginTime" v-model="beginTime" />

        <label for="endTime">结束月份：</label>
        <input
          type="month"
          id="endTime"
          v-model="endTime"
          max="getYearMonth()"
        />
      </div>
      <div>
        <label for="province">省份：</label>
        <select
          v-model="province"
          name="province"
          id="province"
          @change="
            city = cities
              .find((item) => item.name === province)
              .districts.at(0).name
          "
        >
          <option v-for="cityInfo in cities" :value="cityInfo.name">
            {{ cityInfo.name }}
          </option>
        </select>

        <label for="city">城市：</label>
        <select v-model="city" name="city" id="city">
          <option v-for="city in cityList" :value="city.name">
            {{ city.name }}
          </option>
        </select>
      </div>
      <!-- <button class="btn--search">Search</button> -->
    </div>
  </section>

  <section class="table-section">
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
  </section>

  <LineChart></LineChart>
</template>

<style scoped>
.table-section {
  margin-top: 32px;
  max-height: 80vh;
  overflow: scroll;
  padding-bottom: 32px;
}
table {
  /* display: block; */
  margin-top: 24px;
  border-collapse: collapse;
  /* border: 1px solid #e67e22; */
  border: none;
  margin: 0 auto;
  font-size: 2rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  border-radius: 9px;
  width: 70%;
}

td,
th {
  border-top: 1px solid #ddd;
  /* border-bottom: 1px solid #ddd; */
  padding: 12px;
}

table th {
  background-color: #e67e22;
  color: #fdf2e9;
  font-weight: bold;
  text-align: left;
  padding: 16px;
}

table tr:nth-child(even) {
  background-color: #fdf2e9;
}

table tr:nth-child(odd) {
  background-color: #fff;
}

table tr:hover {
  background-color: #f8d8bd;
}

table td {
  color: #444;
}

label {
  font-size: 1.6rem;
  margin-right: -16px;
}

tr:first-child th:first-child {
  border-top-left-radius: 9px;
}
tr:first-child th:last-child {
  border-top-right-radius: 9px;
}

tr:last-child td:first-child {
  border-bottom-left-radius: 9px;
}
tr:last-child td:last-child {
  border-bottom-right-radius: 9px;
}

/* tr:first-child td { border-top-style: solid; }*/
/* tr td:first-child { border-left-style: solid; }  */

.search-container {
  display: flex;
  flex-direction: column;
}

.search-container div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  gap: 24px;
}
</style>