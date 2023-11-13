<script setup>
import { computed, inject, provide, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const showPublish = inject("showPublish");
function handleClickFindPlace() {
  if (route.path === "/find-place") {
    showPublish.value = true;
  } else {
    router.push("/find-place");
  }
}

console.log(route.path);
const isAdmin = computed(() => route.path.includes("admin"));

const username = sessionStorage.getItem("username");
</script>

<template>
  <header class="header">
    <a href="/find-place">
      <ion-icon class="icon--header" name="compass-outline"></ion-icon>
      <!-- <h2>好去处</h2> -->
    </a>
    <span class="header-name"
      >欢迎{{ username ? `，${username.toUpperCase()}` : "" }}</span
    >
    <nav v-if="!isAdmin" class="main-nav">
      <ul class="main-nav-list">
        <li>
          <RouterLink
            to="/find-place/profile"
            active-class="active-link"
            class="main-nav-link"
            href="#"
            >个人信息</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/find-place/welcome"
            active-class="active-link"
            class="main-nav-link"
            href="#"
            >欢迎来</RouterLink
          >
        </li>
        <li>
          <a
            active-class="active-link"
            class="main-nav-link nav-cta"
            href="#"
            @click.prevent="handleClickFindPlace"
            >寻去处</a
          >
        </li>
      </ul>
    </nav>
    <nav v-else>
      <ul class="main-nav-list">
        <li>
          <RouterLink
            to="/admin/userinfo"
            active-class="active-link"
            class="main-nav-link"
          >
            用户信息
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/admin/statistics"
            active-class="active-link"
            class="main-nav-link"
          >
            数据统计
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.active-link {
  color: #e67e22;
  font-weight: 600;
}

.header-name {
  margin-right: auto;
  margin-left: 3.2rem;
  font-size: 1.8rem;
}
</style>
