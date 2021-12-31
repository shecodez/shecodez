<template>
  <menu class="fixed p-0 m-0 h-screen w-1/12 bg-gray-900 shadow-lg">
    <div class="flex flex-col items-center gap-10">
      <div class="logo w-full center flex-col h-36 bg-black p-4">
        <img src="/src/assets/logo.png" alt="N</>N logo" />
      </div>
      <nav>
        <ul class="flex flex-col text-center capitalize">
          <template v-for="li in nav" :key="li.name">
            <li class="py-2">
              <a :href="li.route">{{ li.name }}</a>
            </li>
          </template>
        </ul>
      </nav>
      <div class="social flex items-center text-lg gap-2">
        <a href="mailto:shecodez@gmail.com">
          <MailIcon />
        </a>
        <a href="https://github.com/shecodez">
          <GithubIcon />
        </a>
      </div>
    </div>
  </menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MailIcon from '@/components/icons/MailIcon.vue';
import GithubIcon from '@/components/icons/GithubIcon.vue';
//defineProps<{ nav: array }>();

const nav = ref([
  { name: 'about', route: '/' },
  { name: 'skillz', route: '/#skillz' },
  { name: 'workz', route: '/#workz' },
  { name: 'blog', route: '/#blog' },
  { name: 'contact', route: '/#contact' },
]);
</script>

<style scoped>
a {
  color: inherit;
  transition: all 600ms cubic-bezier(0.23, 1, 0.32, 1);
}
a:hover {
  @apply underline text-indigo-500;
}
</style>
