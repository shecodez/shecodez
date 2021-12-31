<template>
  <div class="flex flex-col gap-6 lg:gap-10">
    <template v-for="post in posts" :key="post.id">
      <article class="flex flex-col">
        <div class="text-xs flex gap-2">
          <h5 class="secondary-h5">{{ post.label }}</h5>
          <span>{{ post.date }}</span>
        </div>
        <h3 class="primary-h3 font-normal">
          <a :href="post.href" target="_blank">{{ post.title }}</a>
        </h3>
        <p class="mb-4">
          {{ post.excerpt }}
        </p>
        <a class="text-xs font-bold uppercase text-indigo-500" :href="post.href" target="_blank">Read More...</a>
      </article>
    </template>
  </div>
  <div class="text-right font-bold mt-10">
    More posts on <a href="https://dev.to/shecodez" target="_blank" class="secondary-h5">Dev.to</a>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

//defineProps<{ limit: number }>();

const posts = ref([
  {
    id: 3,
    label: 'Introduction',
    title: '00 Intro | Building 🚧 Dock-UI: Custom Tailwind CSS components for H010SPACE',
    href: 'https://dev.to/shecodez/building-dock-ui-custom-tailwind-css-components-for-h010space-intro-3kj4',
    date: 'Nov 16 2021',
    excerpt:
      'Every since I was introduced to Tailwind CSS - A utility-first CSS framework - I have wanted to build my own flavor of custom UI components with it.',
  },
  {
    id: 2,
    label: 'Series',
    title: '01 Text Field | Building 🚧 Dock-UI: Custom Tailwind CSS components for H010SPACE',
    href: 'https://dev.to/shecodez/building-dock-ui-custom-tailwind-css-components-for-h010space-1-text-fields-28dj',
    date: 'Nov 20 2021',
    excerpt:
      "Of all the frameworks and libraries I've seen so far, my favorite style for <input /> is by Material Design. Today we'll build the Material Design Filled Text field with Tailwind CSS.",
  },
  {
    id: 1,
    label: 'Discuss',
    title: 'TypeScript used to be on my 💩 list',
    href: 'https://dev.to/shecodez/typescript-used-to-be-on-my-list-42l9',
    date: 'Dec 1 2021',
    excerpt:
      "So I started learning TypeScript. Not gonna lie it was so painful in the beginning. I hadn't been working with JS long enough, understand JS well enough, or become annoyed enough by all the silly JS errors / browser compatibility issues to appreciate something like TS.",
  },
  {
    id: 4,
    label: 'Series',
    title: '02 Waffles (Toasts) | Building 🚧 Dock-UI: Custom Tailwind CSS components for H010SPACE',
    href: 'https://dev.to/shecodez/02-waffles-building-dock-ui-custom-tailwind-css-components-for-h010space-2eae',
    date: 'Nov 30 2021',
    excerpt:
      "Question: so what the duck 🦆 are waffles? Answer: waffles are fancy toast. I hope with this post you'll see that we're building more than just plain old toasts so I dub thee fancy toast sir d-waffles.",
  },
]);
</script>

<style>
.primary-h3 {
  @apply text-2xl lg:text-3xl font-semibold text-indigo-500 mb-2;
}
.secondary-h5 {
  @apply uppercase text-cyan-500 font-black mb-2;
}
</style>
