<script setup>
import { provide, ref } from 'vue';
import Header from './Header.vue';

const showPublish = ref(false)

provide("showPublish", showPublish);

</script>



<template>
    <Header></Header>
    <RouterView></RouterView>
</template>