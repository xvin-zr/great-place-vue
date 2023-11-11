<script setup>
import { computed, inject, provide, ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import myHeaders from "../data/headers";
import { getNormalDate } from "../methods/date";
import placeTypeList from "../data/place-type";
import statusList from "../data/status";
import ModifyPlace from "./ModifyPlace.vue";

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

// 修改寻去处 modify
const isModifing = ref(false);
provide("isModifing", isModifing);
provide("place", place);

// 处理上传图片视频
const isImg = computed(() => {
  if (!place.value) return false;
  if (!place?.value.filePath) return false;
  const [fileName, fileType] = place.value.filePath.split(".");
  // const fileType =place.value.filePath.split(".").at(-1);
  if (!fileType) return false;
  return ["jpg", "png", "jpeg"].includes(fileType.toLowerCase());
});

const isVideo = computed(() => {
  if (!place.value) return false;
  if (!place?.value.filePath) return false;
  const [fileName, fileType] = place.value.filePath.split(".");
  if (!fileType) return false;
  return ["mp4", "avi", "mkv", "webm"].includes(fileType.toLowerCase());
});

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
  if (!confirm("确认删除?")) {
    return;
  }
  try {
    const res = await fetch(`${BASE_URL}/xqc/delete/${id.value}`, {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    });
    const data = await res.json();
    console.log("delete", data);
    if (data.flag === 1) {
      alert("删除成功");
      location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}

// 文件上传和读取
const imgUrl = ref(null);
async function getImgVideo(filePath = "") {
  try {
    const res = await fetch("http://localhost:3000/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filePath: filePath,
      }),
      redirect: "follow",
    });
    const blob = await res.blob();
    imgUrl.value = URL.createObjectURL(blob);
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div class="place-detail">
    <h2 v-if="!place" class="place-detail-title">👈 选择一个去处</h2>
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

    <img v-if="isImg" :src="`${place.filePath}`" alt="a wonderful place" />
    <video v-if="isVideo" controls :src="place.filePath" type="video" autoplay></video>

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
      <button v-if="atFindPage && !welcomeObj" class="action-btn" @click="isModifing = true">修改</button>
      <button
        v-if="atFindPage && !welcomeObj"
        class="action-btn"
        @click.prevent="onDeletePlace"
      >
        删除
      </button>
      <!-- 有响应之后 -->
      <button v-if="atFindPage && welcomeObj" class="action-btn">接受</button>
      <button v-if="atFindPage && welcomeObj" class="action-btn">拒绝</button>
      <button v-if="!atFindPage" class="action-btn">欢迎来</button>
    </div>
  </div>
  <ModifyPlace />
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

img {
  max-width: 100%;
  max-height: 200px;
  margin: 0 auto;
}

video {
  max-width: 100%;
  max-height: 200px;
  margin: 0 auto; 
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
