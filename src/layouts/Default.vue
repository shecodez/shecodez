<template>
  <div class="site flex bg-gray-800 text-gray-200">
    <SideMenu />

    <main class="relative w-full ml-auto md:w-11/12">
      <div class="bkmark fixed center top-0 right-0 z-50">
        <div class="triangle relative w-25 h-25">
          <a href="/src/assets/downloads/resume.pdf" class="absolute transform rotate-45 -top-5 -right-11 text-center">
            Résumé
          </a>
        </div>
      </div>

      <div class="center gap-2 fixed bottom-4 right-4 z-50 text-xs">
        <MusicPlayer />
        <ScrollToTop />
      </div>

      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import SideMenu from '@/components/SideMenu.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';

defineProps<{ title: string }>();
</script>

<style scoped>
a {
  @apply text-indigo-500;
}
a:hover {
  @apply underline;
}

.bkmark .triangle {
  border-left: 50px solid transparent;
  border-right: 50px solid rgba(0, 0, 0, 0.8);
  border-bottom: 50px solid transparent;
  border-top: 50px solid rgba(0, 0, 0, 0.8);
  display: inline-block;
  filter: drop-shadow(10px 10px 4px #000);
}
</style>
