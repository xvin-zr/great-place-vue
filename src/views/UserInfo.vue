<script setup>
import "./find-welcome.css";
import {
  computed,
  inject,
  onMounted,
  provide,
  reactive,
  ref,
  watchEffect,
} from "vue";
import UserDetail from "../components/UserDetail.vue";
import placeTypeList from "../data/place-type";
import statusList from "../data/status";
import { getToday } from "../methods/date";
import { cities } from "../data/area-city";
import myHeaders from "../data/headers";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = sessionStorage.getItem("token");
const showPublish = inject("showPublish");
const currPage = ref(1);
const placeList = ref([]);
const pageSize = 5;
const listLen = ref(1);
const totalPageSize = computed(() => {
  return Math.ceil(listLen.value / pageSize);
});
const placeType = ref("");
const topicName = ref("");
const status = ref("");

const selectedPlaceId = ref(null);

onMounted(() => {
  document.title = "好去处｜用户信息";
});

watchEffect(async function () {
  try {
    const res = await fetch(
      `${BASE_URL}/xqc/list?pageNum=${currPage.value}&pageSize=${pageSize}&placeType=${placeType.value}&topicName=${topicName.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        redirect: "follow",
      }
    );
    const data = await res.json();
    console.log(data);
    const placesData = data.data;
    placeList.value = placesData.list;
    listLen.value = placesData.rows;
    console.log(placeList.value);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <main>
    <section class="search-section">
      <h2 class="heading-secondary center-text">用户信息</h2>
      <div class="search-container">
        <select v-model="placeType" id="place" @change="currPage = 1">
          <option value="" :key="0">所有类型</option>
          <option v-for="(val, key) in placeTypeList" :key="key" :value="key">
            {{ val }}
          </option>
        </select>

        <!-- <select v-model="status" name="status" id="status">
            <option value="" :key="0">所有状态</option>
            <option v-for="[key, val] of Object.entries(statusList)" :key="key" :value="val" >{{ val }}</option>
        </select> -->

        <input v-model="topicName" type="text" placeholder="搜索好去处" />
        <!-- <button class="btn--search">Search</button> -->
      </div>
    </section>

    <section class="place-section">
      <div class="place-lists">
        <ul class="places">
          <!-- <li>
            <div class="place">
              <h2 class="place-title">Place</h2>
              <p class="place-description">钓鱼</p>
            </div>
          </li> -->
          <li
            @click="selectedPlaceId = place.id"
            v-for="place in placeList"
            :key="place.id"
          >
            <div class="place">
              <h2 class="place-title">{{ place.topicName }}</h2>
              <p class="place-description">
                {{ placeTypeList[place.placeType] }} | {{ place.createTime }}
              </p>
            </div>
          </li>
          <li v-for="i in pageSize - placeList.length" :key="`empty${i}`">
            <div class="place"></div>
          </li>
        </ul>
      </div>

      <nav class="place-pagination">
        <button
          @click.prevent="currPage > 1 ? currPage-- : currPage"
          class="pagination-btn pagination-btn-left"
        >
          <ion-icon class="icon" name="arrow-back-outline"></ion-icon>
        </button>
        <div class="page">
          <strong>{{ totalPageSize === 0 ? 0 : currPage }}</strong> /
          {{ totalPageSize }}
        </div>
        <button
          @click.prevent="currPage < totalPageSize ? currPage++ : currPage"
          class="pagination-btn pagination-btn-right"
        >
          <ion-icon class="icon" name="arrow-forward-outline"></ion-icon>
        </button>
      </nav>

      <UserDetail :selectedPlaceId="selectedPlaceId" />
    </section>

  </main>
</template>
