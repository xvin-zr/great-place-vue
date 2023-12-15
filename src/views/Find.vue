<script setup>
import debounce from "lodash.debounce";
import { computed, inject, onMounted, ref, watchEffect } from "vue";
import PlaceDetail from "../components/PlaceDetail.vue";
import { cities } from "../data/area-city";
import placeTypeList from "../data/place-type";
import { getToday } from "../methods/date";
import "./find-welcome.css";

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

// 发布寻去处 publish
const publishPlaceType = ref("");
const publishTopicName = ref("");
const description = ref("");
const file = ref(null);
const maxPrice = ref(1);
const endTime = ref("");
const province = ref("北京市");
const cityList = computed(() => {
  return cities.find((item) => item.name === province.value).districts;
});
const city = ref("北京市");
const cityCode = computed(() => {
  return cityList.value.find((item) => item.name === city.value)?.adcode;
});

const selectedPlaceId = ref(null);

onMounted(() => {
  document.title = "好去处｜寻去处";
});

watchEffect(
  debounce(async function () {
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
  }, 800)
);

// 发布寻去处 publish
async function onPublishPlace() {
  let filePath = "";
  if (file.value) {
    filePath = await uploadFile(file.value);
  }
  try {
    const bodyObj = {
      placeType: publishPlaceType.value,
      topicName: publishTopicName.value,
      description: description.value,
      filePath: filePath,
      maxPrice: maxPrice.value.toString(),
      endTime: endTime.value,
      cityCode: cityCode.value,
    };
    for (const [key, value] of Object.entries(bodyObj)) {
      if ((value === "" || value === "0") && key !== "filePath") {
        alert("请填写完整");
        return;
      }
    }
    // console.log("publish", bodyObj);
    const res = await fetch(`${BASE_URL}/xqc/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(bodyObj),
      redirect: "follow",
    });
    const data = await res.json();
    console.log("publish", data);
    if (data.flag === 1) {
      alert("发布成功");
      showPublish.value = false;
      // location.reload();
    } else alert("发布失败");
    
  } catch (error) {
    console.error(error);
  }
}

async function uploadFile(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    console.log("file", file);
    const url = "http://localhost:3000/upload";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        type: "find",
      },
      body: formData,
      redirect: "follow",
    });
    const data = await res.json();
    console.log("uploadFile", data);
    return data.path;
  } catch (error) {
    console.error(error);
  }
}

function updateFile(e) {
  file.value = e.target.files[0];
}
</script>

<template>
  <main>
    <section class="search-section">
      <h2 class="heading-secondary center-text">发现好去处</h2>
      <div class="search-container">
        <select v-model="placeType" id="place" @change="currPage = 1">
          <option value="" :key="0">所有类型</option>
          <option v-for="(val, key) in placeTypeList" :key="key" :value="key">
            {{ val }}
          </option>
        </select>
        <input v-model="topicName" type="text" placeholder="搜索好去处" />
        <!-- <button class="btn--search">Search</button> -->
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

    <section v-if="showPublish" class="section-find-place">
      <div class="find-place">
        <form action="#" class="find-place-form">
          <header class="find-place-header">
            <h3 class="header-heading">发布「寻去处」</h3>
            <button class="header-btn" @click.prevent="showPublish = false">
              &times;
            </button>
          </header>

          <div class="form-group">
            <label for="type">去处类型:</label>
            <select v-model="publishPlaceType" name="" id="type" required>
              <option value="" disabled>请选择</option>
              <option v-for="(val, key) in placeTypeList" :value="key">
                {{ val }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="title">主题名称:</label>
            <input
              v-model="publishTopicName"
              id="title"
              type="text"
              placeholder="Great Places"
              class="cta-text-box"
              required
            />
          </div>

          <div class="form-group">
            <label for="requestDescription">请求描述:</label>
            <textarea
              v-model="description"
              type="text"
              id="requestDescription"
              name="requestDescription"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="maxPrice">最高单价:</label>
            <input
              v-model="maxPrice"
              type="number"
              id="maxPrice"
              name="maxPrice"
              min="1"
              required
            />
          </div>

          <div class="form-group">
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

          <div class="form-group">
            <label for="endTime">结束时间：</label>
            <input
              v-model="endTime"
              type="date"
              name="endTime"
              id="endTime"
              :min="getToday()"
              required
            />
          </div>

          <div class="form-group">
            <label for="fileUpload">介绍图片:</label>
            <input
              @change="updateFile"
              type="file"
              id="fileUpload"
              name="fileUpload"
            />
          </div>

          <button @click.prevent="onPublishPlace" class="upload-btn">
            发布
          </button>
        </form>
      </div>
    </section>
  </main>
</template>

<!-- <style scoped>
.search-section {
  background-color: #fdf2e9;
  padding-bottom: 3.2rem;
}

.search-section h2 {
  padding-top: 3.2rem;
  margin-bottom: 4.8rem;
}

.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: orchid; */
  gap: 10px;
}

.btn--search,
.btn--search:link,
.btn--search:visited {
  display: inline-block;
  background-color: #e67e22;
  padding: 1rem 1.6rem;
  border-radius: 9px;
  color: #fff;
  text-decoration: none;
  font-size: 1.8rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.btn--search:hover {
  background-color: #cf711f;
}

.search-container input,
.search-container select {
  width: 20%;
  padding: 1rem 2rem;
  font-size: 1.8rem;
  font-family: inherit;
  color: inherit;
  border: none;
  background-color: #fff;
  border-radius: 9px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.place-section {
  margin: 3.2rem;
  height: auto;
  display: grid;
  column-gap: 3rem;
  grid-template-columns: 1fr 1.5fr;
  grid-template-rows: 9fr 1fr;
}

.place-section .place-lists,
.place-section .place-detail {
  border-radius: 12px;
}

.place-section .place-lists {
  background-color: #e67e22;
  grid-column: 1 / 2;
}

.place-section .place-detail {
  /* background-color: lightcoral; */
  grid-column: 2 / -1;
  grid-row: 1 / -1;
}

.place-section .place-pagination {
  /* background-color: orange; */
}

/* .places {
  padding: 2.4rem 3.2rem;
  display: grid;
  grid-template-rows: auto, repeat(5, 1fr), auto;
  gap: 12px;
  list-style: none;
  align-items: center;
  justify-content: space-around;
}  
*/

.places {
  /* padding-left: 3.2rem; */
  height: 100%;
  padding: 2.4rem 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;
  align-items: center;
  justify-content: space-between;
}

.places li {
  width: 100%;
}

.place {
  width: 100%;
  background-color: #fff;
  padding: 2.2rem 3.2rem;
  border-radius: 8px;
  /* padding-left: 1.2rem; */
  transition: all 0.3s;
}

.place:hover {
  background-color: #fdf2e9;
  scale: 1.05;
}

.place:active {
  background-color: #fae5d3;
  scale: 1.01;
}

.place-title {
  font-weight: 600;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.place-description {
  color: #777;
  font-size: 1.4rem;
}

.place-pagination {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.pagination-btn {
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover {
  background-color: #e67e22;
}

.pagination-btn:hover .icon {
  color: #fff;
}

.page {
  font-size: 1.8rem;
}

.icon {
  width: 3.6rem;
  height: 3.6rem;
  color: #e67e22;
}

.place-detail {
  padding: 3.2rem 3.2rem 1.6rem 3.2rem;
  border: #fff solid 1px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: start;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
}

.place-detail:hover {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  scale: 1.01;
}




.section-find-place {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100% ;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  /* display: none; */
}
.find-place {
  /* display: none; */
  /* position: fixed;
    left: 50; */
  background-color: #fff;
  height: auto;
  max-width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  padding: 3.2rem 3.2rem 2.4rem 3.2rem;
  border: #e67e22 3px solid;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.find-place-form {
  /* background-color: orchid; */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 12px;
  font-size: 1.8rem;
}

.find-place-header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 24px;
}

.header-heading {
  font-size: 3.6rem;
}

.header-btn {
  margin-left: auto;
  background-color: #fff;
  background-color: none;
  border: none;
  cursor: pointer;
  width: auto;
  height: auto;
  font-size: 4.8rem;
  transition: all 0.15s;
}

.header-btn:hover {
  color: #e67e22;
}

.find-place-form input,
.find-place-form select,
.find-place-form textarea {
  width: 100%;
  padding: 1.2rem;
  font-size: 1.8rem;
  font-family: inherit;
  color: inherit;
  border: none;
  background-color: #fdf2e9;
  border-radius: 9px;
  /* box-shadow: 0 2px 5px rgba(230, 125, 34, 0.5); */
}

.find-place-form input:focus,
.find-place-form select:focus,
.find-place-form textarea:focus {
  background-color: #fff;
}
.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 6px;
}


</style> -->
