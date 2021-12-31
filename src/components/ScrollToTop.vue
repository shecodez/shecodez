<template>
  <button @click="scrollTop" v-show="show" class="scroll-top bg-black bg-opacity-80 py-1 px-2">
    <BackToTopIcon />
  </button>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import BackToTopIcon from '../components/icons/BackToTopIcon.vue';

const show = ref(false);

function scrollTop() {
  const intervalId = setInterval(() => {
    if (window.pageYOffset === 0) {
      clearInterval(intervalId);
    }
    window.scroll(0, window.pageYOffset - 50);
  }, 20);
}
function handleScroll() {
  show.value = window.scrollY > 150;
}

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>
