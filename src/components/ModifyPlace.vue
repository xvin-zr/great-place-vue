<script setup>
import "../views/find-welcome.css";
import placeTypeList from "../data/place-type";
import { getToday } from "../methods/date";
import { cities } from "../data/area-city";
import { computed, inject, ref, watchEffect } from "vue";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const isModifing = inject("isModifing");
const place = inject("place");

const province = ref("北京市");
const cityList = computed(() => {
  return cities.find((item) => item.name === province.value).districts;
});
const city = ref("北京市");
const cityCode = computed(() => {
  return cityList.value.find((item) => item.name === city.value)?.adcode;
});

const placeType = ref("");
const topicName = ref("");
const description = ref("");
const maxPrice = ref(1);
const endTime = ref(getToday());
const file = ref(null);
const filePath = ref("");

watchEffect(() => {
  if (!place.value) return;
  placeType.value = place.value.placeType;
  topicName.value = place.value.topicName;
  description.value = place.value.description;
  maxPrice.value = place.value.maxPrice;
  endTime.value = getToday(place.value.endTime);
  filePath.value = place.value.filePath;
});

async function onModifyPlace() {
  if (!confirm("确认修改?")) {
    return;
  }
  if (file.value) {
    filePath.value = await uploadFile(file.value);
  }
  try {
    const bodyObj = {
      id: place.value.id,
      placeType: placeType.value,
      topicName: topicName.value,
      description: description.value,
      filePath: filePath.value,
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
    console.log("modifyPlace", bodyObj);
    const res = await fetch(`${BASE_URL}/xqc/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(bodyObj),
      redirect: "follow",
    });
    const data = await res.json();
    console.log("modifyPlace", data);
    if (data.flag === 1) {
      alert("修改成功");
      isModifing.value = false;
      location.reload();
    } else alert("修改失败：" + data.msg);
    // showPublish.value = false;
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
</script>

<template>
  <section v-if="isModifing" class="section-find-place">
    <div class="find-place">
      <form action="#" class="find-place-form">
        <header class="find-place-header">
          <h3 class="header-heading">修改「寻去处」</h3>
          <button class="header-btn" @click.prevent="isModifing = false">
            &times;
          </button>
        </header>

        <div class="form-group">
          <label for="type">去处类型:</label>
          <select v-model="placeType" name="" id="type" required>
            <option value="" disabled>请选择</option>
            <option v-for="(val, key) in placeTypeList" :value="key">
              {{ val }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="title">主题名称:</label>
          <input
            v-model="topicName"
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
            @change="file = $event.target.files[0]"
            type="file"
            id="fileUpload"
            name="fileUpload"
          />
        </div>

        <button @click.prevent="onModifyPlace" class="upload-btn">
          完成修改
        </button>
      </form>
    </div>
  </section>
</template>
