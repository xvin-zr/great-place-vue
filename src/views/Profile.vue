<script setup>
import { computed, onMounted, ref } from "vue";
import { cities } from "../data/city.js";

onMounted(function () {
  document.title = "好去处｜个人信息";
});

const isLocked = ref(true);
const province = ref("");
const cityList = computed(() => {
  return cities.find((item) => item.province === province.value)?.cities;
});
const selectedCity = ref("");

function handleModify() {
  if (isLocked.value) {
    isLocked.value = false;
  } else {
    // 验证用户输入合法

    isLocked.value = true;
  }
}
</script>

<template>
  <main class="profile-main">
    <h2 class="profile-heading center-text">个人信息</h2>
    <section class="profile-info">
      <form action="#" class="profile-form">
        <dl class="form-group">
          <dt>
            <label for="username">用户名</label>
          </dt>
          <dd>
            <input
              type="text"
              id="username"
              value="Username"
              :disabled="isLocked"
            />
          </dd>
        </dl>

        <dl>
          <dt>
            <label for="name">用户姓名</label>
          </dt>
          <dd>
            <input type="text" id="name" value="Name" :disabled="isLocked" />
          </dd>
        </dl>
        <dl>
          <dt>
            <label for="license-type">证件类型</label>
          </dt>
          <dd>
            <!-- <input type= "text" id="license-type" value="身份证" disabled> -->
            <select name="" id="license-type" :disabled="isLocked">
              <option value="identity">身份证</option>
              <option value="passport">护照</option>
            </select>
          </dd>
        </dl>
        <dl>
          <dt>
            <label for="license-number">证件号</label>
          </dt>
          <dd>
            <input
              type="text"
              id="license-number"
              value="4123456789"
              :disabled="isLocked"
            />
          </dd>
        </dl>
        <dl>
          <dt>
            <label for="phone-number">手机号</label>
          </dt>
          <dd>
            <input
              type="number"
              id="phone-number"
              length="11"
              value="12312341234"
              :disabled="isLocked"
            />
          </dd>
        </dl>
        <dl>
          <dt>
            <label for="bio">简介</label>
          </dt>
          <dd>
            <textarea
              name=""
              id="bio"
              cols="20"
              rows="5"
              placeholder="Tell us a little bit about yourself"
              :disabled="isLocked"
            ></textarea>
          </dd>
        </dl>
        <dl>
          <dt>
            <label for="city">省份 & 城市</label>
          </dt>
          <dd>
            <select
              v-model="province"
              id="province"
              :disabled="isLocked"
              required
            >
              <option value="" disabled>请选择</option>
              <option
                v-for="{ province } in cities"
                :value="province"
                :key="province"
              >
                {{ province }}
              </option>
            </select>
            <select
              v-model="selectedCity"
              id="city"
              :disabled="isLocked"
              required
            >
              <option value="" disabled>请选择</option>
              <option
                v-if="cityList"
                v-for="city in cityList"
                :value="city"
                :key="city"
              >
                {{ city }}
              </option>
            </select>
            <!-- <input type="text" id="city" value="深圳市" :disabled="isLocked" /> -->
          </dd>
        </dl>

        <div class="buttons">
          <button @click.prevent="handleModify" class="modify-btn">
            {{ isLocked ? "修改" : "完成" }}
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<style scoped>
.main-nav-profile:link,
.main-nav-profile:visited {
  color: #e67e22;
}

.profile-main {
  height: auto;
  /* background-color: green; */
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto;
  margin-top: 24px;
  margin-bottom: 36px;
  padding-bottom: 24px;
  max-width: 50%;
  /* background-color: lightblue; */
  border-radius: 9px;
  border-top: 4px solid #e67e22;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.profile-heading {
  margin-top: 36px;
  font-size: 4.8rem;
}

.profile-lists {
  list-style: none;
}

.profile-form {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.profile-form label {
  display: inline-block;
  font-size: 1.8rem;
  margin-bottom: 9px;
}

.profile-form input,
.profile-form select,
.profile-form textarea {
  width: 100%;
  padding: 1.2rem;
  font-size: 1.8rem;
  font-weight: 500;
  font-family: inherit;
  color: inherit;
  border: none;
  background-color: #fdf2e9b9;
  /* background-color: #fff; */
  border-radius: 9px;
  /* box-shadow: 0 2px 5px rgba(230, 125, 34, 0.5); */
}

.profile-form textarea::placeholder {
  color: #bbb;
}

.profile-form input:disabled,
.profile-form select:disabled,
.profile-form textarea:disabled {
  background-color: #fdf2e9;
  color: #bbb;
  cursor: not-allowed;
}

#city {
  margin-top: 12px;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  padding-top: 10px;
}
</style>
