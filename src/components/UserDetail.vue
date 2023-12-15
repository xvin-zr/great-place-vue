<script setup>
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

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
const publishUser = computed(() => place.value?.user);

console.log("user detail", publishUser.value);



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


// 用户信息
async function getUserInfo() {
  try {
    const res = await fetch(`${BASE_URL}/getUserDetails/userId`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      redirect: "follow",
    });
    const data = await res.json();
    console.log("profile", data);
    curUser.value = data.data;
    userBriefly.value = curUser.value.userBriefly ?? "";
    phoneNumber.value = curUser.value.phoneNumber;
  } catch (error) {
    console.log(error);
  }
}




</script>

<template>
  <div class="place-detail">
    <h2 v-if="!place" class="place-detail-title">👈 选择一个去处<br/>查看用户信息</h2>
    <h2 v-if="place" class="place-detail-title">{{ place?.topicName }}</h2>
    <h2 v-if="place" class="text-5xl">寻去处发布用户：{{ publishUser?.name }}</h2>
    <p v-if="place" class="text-4xl ml-10">用户注册城市：{{ publishUser?.registeredCityName }}</p>
    <p v-if="place" class="text-4xl font-mono ml-10">用户手机号：{{ publishUser?.phoneNumber }}</p>

    <!-- <p v-if="place" class="place-detail-status">
      状态：{{ statusList[place?.status] }}
    </p>
    <p v-if="place" class="place-detail-status">
      最高单价：¥{{ place?.maxPrice }} | 结束时间：{{
        getNormalDate(place?.endTime)
      }}
    </p>
    <blockquote>
      <p class="place-detail-text">{{ place?.description }}</p>
    </blockquote> -->

    

    <hr v-if="welcomeObj" />

    <div v-if="welcomeObj">
      <h2 class="place-detail-title">欢迎来响应用户 ID：{{ welcomeObj.responseUserId }}</h2>
      <!-- <br />
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
      </blockquote> -->
    </div>
  </div>
</template>

<style scoped>
.place-detail-title {
  font-size: 4.4rem;
  line-height: 1.5;
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
