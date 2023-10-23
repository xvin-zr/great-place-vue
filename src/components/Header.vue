<script setup>
</script>

<template>
  <header class="header">
    <a href="#">
      <ion-icon class="icon--header" name="compass-outline"></ion-icon>
      <!-- <h2>好去处</h2> -->
    </a>
    <!-- <span>好去处</span> -->
    <nav class="main-nav">
      <ul class="main-nav-list">
        <li>
          <RouterLink to="/find-place/profile" class="main-nav-link" href="#"
            >个人信息</RouterLink
          >
        </li>
        <li><a class="main-nav-link" href="#">Meals</a></li>
        <li><a class="main-nav-link" href="#">Testimonials</a></li>
        <li><a class="main-nav-link" href="#">欢迎来</a></li>
        <li>
          <a class="main-nav-link nav-cta" href="#" onclick="handleNewPlace()"
            >寻去处</a
          >
        </li>
      </ul>
    </nav>
  </header>
  <RouterView></RouterView>
</template>

<style scoped></style>
