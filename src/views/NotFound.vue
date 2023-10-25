<template>
  <h1>404 Not Found. 😅</h1>
  <h1 class="h1-2">
    Tired of searching places? <br />
    Let's listen to a song. 🎵
  </h1>
  <iframe
    allow="autoplay *; encrypted-media *;"
    frameborder="0"
    height="150"
    style="
      width: 100%;
      max-width: 660px;
      overflow: hidden;
      background: transparent;
    "
    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
    src="https://embed.music.apple.com/cn/album/%E6%88%91%E6%98%AF%E4%B8%80%E5%8F%AA%E5%B0%8F%E5%B0%8F%E9%B8%9F/1329432176?i=1329432678"
  ></iframe>
  
</template>

<style scoped>
h1 {
  text-align: center;
  font-size: 6.4rem;
  font-weight: 600;
  margin-top: 96px;
}
.h1-2 {
  margin-top: 24px;
  line-height: 1.2;
}

iframe {
  display: block;
  margin: 0 auto;
  margin-top: 48px;
}
</style>
