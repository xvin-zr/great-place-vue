<script setup>
import { inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const showPublish = inject("showPublish");
function handleClickFindPlace() {
  if (route.path === '/find-place')  {
    showPublish.value = true;
  } else {
    router.push('/find-place');
  }

}

</script>

<template>
  <header class="header">
    <a href="#">
      <ion-icon class="icon--header" name="compass-outline"></ion-icon>
      <!-- <h2>好去处</h2> -->
    </a>
    <span class="header-name">欢迎，xxx</span>
    <nav class="main-nav">
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
          <a active-class="active-link" class="main-nav-link" href="#">Meals</a>
        </li>
        <li>
          <a active-class="active-link" class="main-nav-link" href="#"
            >Testimonials</a
          >
        </li>
        <li>
          <RouterLink to="/find-place/welcome" active-class="active-link" class="main-nav-link" href="#"
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
