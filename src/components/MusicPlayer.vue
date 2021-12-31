<template>
  <div class="relative">
    <button @click="togglePlaying" class="music-player bg-black bg-opacity-80 py-1 px-2">
      <div class="center gap-1">
        <div class="relative">
          <small v-if="playing" class="now-playing absolute -top-6 -ml-2.5 whitespace-nowrap flex items-center gap-1">
            Now Playing: The Big O OST
            <a href="https://youtu.be/96ouCiqGCNE" target="_blank"><YouTubeIcon /></a>
          </small>
          <AlbumIcon :class="playing ? 'album-icon animate-spin text-indigo-500' : 'text-gray-500'" />
        </div>
        <span>Music</span>
        <span class="font-extralight" :class="playing ? 'text-indigo-500' : 'text-gray-500'">
          {{ playing ? 'ON' : 'OFF' }}
        </span>
      </div>
    </button>

    <audio ref="player">
      <source src="/src/assets/audio/TheBigO-OST.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import AlbumIcon from './icons/AlbumIcon.vue';
import YouTubeIcon from './icons/YouTubeIcon.vue';

const player = ref();
const playing = ref(false);

function togglePlaying() {
  if (playing.value) {
    player.value.pause();
    playing.value = false;
  } else {
    player.value.play();
    playing.value = true;
  }
}
</script>

<style scoped>
.music-player {
  min-width: 98px;
}
</style>
