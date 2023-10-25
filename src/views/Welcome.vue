<script setup>
import { onMounted } from 'vue';
import PlaceDetail from '../components/PlaceDetail.vue';
import './find-welcome.css';

onMounted(() => {
    document.title = '好去处｜欢迎来';
});

</script>


<template>
<main>
    <section class="search-section">
      <h2 class="heading-secondary center-text">来吧走起</h2>
      <div class="search-container">
        <select id="place"></select>
        <input type="text" placeholder="搜索寻去处" />
        <button class="btn--search">Search</button>
      </div>
    </section>

    <section class="place-section">
      <div class="place-lists">
        <ul class="places">
          <li>
            <div class="place">
              <h2 class="place-title">Place</h2>
              <p class="place-description">钓鱼</p>
            </div>
          </li>
          <li>
            <div class="place">
              <h2 class="place-title">Place</h2>
              <p class="place-description">老少咸宜</p>
            </div>
          </li>
          <li>
            <div class="place">
              <h2 class="place-title">Place</h2>
              <p class="place-description">农家院</p>
            </div>
          </li>
          <li>
            <div class="place">
              <h2 class="place-title">Place</h2>
              <p class="place-description">农家院</p>
            </div>
          </li>
          <li>
            <div class="place">
              <h2 class="place-title">Place</h2>
              <p class="place-description">农家院</p>
            </div>
          </li>
        </ul>
      </div>

      <nav class="place-pagination">
        <button class="pagination-btn pagination-btn-left">
          <ion-icon class="icon" name="arrow-back-outline"></ion-icon>
        </button>
        <div class="page"><strong>1</strong> / 20</div>
        <button class="pagination-btn pagination-btn-right">
          <ion-icon class="icon" name="arrow-forward-outline"></ion-icon>
        </button>
      </nav>

      <PlaceDetail />
    </section>

    
  </main>

</template>


<style scoped>

</style>