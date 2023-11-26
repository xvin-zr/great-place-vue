<script setup>
import { onMounted,ref,watchEffect,inject,computed } from 'vue';
import PlaceDetail from '../components/PlaceDetail.vue';
import './find-welcome.css';
import placeTypeList from "../data/place-type";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = sessionStorage.getItem("token");
const currPage = ref(1);
const placeList = ref([]);
const pageSize = 5;
const listLen = ref(1);
const placeType = ref("");
const topicName = ref("");
const selectedPlaceId = ref(null);
const totalPageSize = computed(() => {
  return Math.ceil(listLen.value / pageSize);
});

onMounted(async () => {
    document.title = '好去处｜欢迎来';
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
    placeList.value = data.data.list;
    listLen.value = data.data.rows;

  } catch (error) {
    console.log(error);
  }
});

</script>


<template>
<main>
    <section class="search-section">
      <h2 class="heading-secondary center-text">来吧走起</h2>
      <div class="search-container">
        <select v-model="placeType" id="place" @change="currPage = 1">
          <option value="" :key="0">所有类型</option>
          <option
            v-for="(val, key) in placeTypeList"
            :key="key"
            :value="key"
          >
            {{ val }}
          </option>
        </select>
        <input type="text" v-model="topicName" placeholder="搜索寻去处" />
        
      </div>
    </section>

    <section class="place-section">
      <div class="place-lists">
        <ul class="places">
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
          <strong>{{ totalPageSize === 0 ? 0 : currPage }}</strong> / {{ totalPageSize }}
        </div>
        <button
          @click.prevent="currPage < totalPageSize ? currPage++ : currPage"
          class="pagination-btn pagination-btn-right"
        >
          <ion-icon class="icon" name="arrow-forward-outline"></ion-icon>
        </button>
      </nav>

      <PlaceDetail :selectedPlaceId="selectedPlaceId" />
    </section>

    
  </main>

</template>


<style scoped>

</style>