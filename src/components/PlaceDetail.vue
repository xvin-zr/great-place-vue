<script setup>
import { computed, inject, ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import myHeaders from "../data/headers";
import { getNormalDate } from "../methos/date";
import placeTypeList from "../data/place-type";
import statusList from "../data/status";

const route = useRoute();
const BASE_URL = import.meta.env.VITE_BASE_URL;

const selectedPlace = true;
const atFindPage = computed(() => {
  return route.path === "/find-place";
});

const props = defineProps(["selectedPlaceId"]);
const id = computed(() => props.selectedPlaceId);
const place = ref(null);
const welcomeObj = computed(() => place.value?.hyl);

watchEffect(async () => {
  if (!id.value) return;
  console.log(id.value);
  try {
    const res = await fetch(`${BASE_URL}/xqc/details/${id.value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      redirect: "follow",
    });
    const data = await res.json();
    console.log(data);
    place.value = data.data;
  } catch (error) {
    console.log(error);
  }
});

async function onDeletePlace() {
  try {
    const res = await fetch(`${BASE_URL}/xqc/delete/${id.value}`, {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    });
    const data = await res.json();
    console.log("delete", data);
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="place-detail">
    <h2 v-if="!place" class="place-detail-title">选择一个去处</h2>
    <h2 class="place-detail-title">{{ place?.topicName }}</h2>
    <p v-if="place" class="place-detail-status">
      状态：{{ statusList[place?.status] }}
    </p>
    <p v-if="place" class="place-detail-status">
      最高单价：¥{{ place?.maxPrice }} | 结束时间：{{
        getNormalDate(place?.endTime)
      }}
    </p>
    <blockquote>
      <p class="place-detail-text">{{ place?.description }}</p>
    </blockquote>

    <hr v-if="welcomeObj" />

    <div v-if="welcomeObj">
      <h2 class="place-detail-title">欢迎来响应</h2>
      <br />
      <p class="place-detail-status">
        {{
          welcomeObj.updateTime
            ? getNormalDate(welcomeObj.updateTime)
            : getNormalDate(welcomeObj.createTime)
        }}
      </p>
      <br />

      <blockquote>
        <p class="place-detail-text">{{ welcomeObj.description }}</p>
      </blockquote>
    </div>

    <div v-if="place && place?.status === '2'" class="place-detail-actions">
      <!-- 没有响应 -->
      <button v-if="atFindPage && !welcomeObj" class="action-btn">修改</button>
      <button v-if="atFindPage && !welcomeObj" class="action-btn" @click.prevent="onDeletePlace">删除</button>
      <!-- 有响应之后 -->
      <button v-if="atFindPage && welcomeObj" class="action-btn">接受</button>
      <button v-if="atFindPage && welcomeObj" class="action-btn">拒绝</button>
      <button v-if="!atFindPage" class="action-btn">欢迎来</button>
    </div>
  </div>
</template>

<style scoped>
.place-detail-title {
  font-size: 4.4rem;
  word-wrap: normal;
  overflow-wrap: break-word;
  overflow-block: break-word;
  /* margin-bottom: 2.4rem; */
}

.place-detail-status {
  font-size: 1.8rem;
  font-weight: 500;
}

.place-detail-text {
  font-size: 1.8rem;
  line-height: 1.4;
}

.place-detail-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  gap: 16px;
  /* align-self: flex-end; */
  margin-top: auto;
}

.action-btn {
  font-size: 1.8rem;
  border: none;
  border-radius: 9px;
  padding: 0.8rem 2.4rem;
  cursor: pointer;
  background-color: #e67e22;
  color: #fff;
  transition: all 0.3s;
}

hr {
  border: none;
  border-top: solid 1px #ccc;
  width: 100%;
}

.action-btn:hover {
  background-color: #cf711f;
}
</style>
