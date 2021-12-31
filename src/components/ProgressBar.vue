<template>
  <label for="progress" class="text-xs font-bold">{{ label }}:</label>
  <progress id="progress" max="100" :value="value" class="h-0.5 w-full" :class="css">
    {{ `${value}%` }}
  </progress>
</template>

<script setup lang="ts">
defineProps<{ value: number; label: string; css: string }>();
</script>

<style scoped>
/* background: */
/* progress::-webkit-progress-bar {
  @apply bg-transparent w-full;
}
progress {
  @apply bg-transparent;
} */

/* value: */
progress::-webkit-progress-value {
  @apply bg-indigo-500;
}
progress::-moz-progress-bar {
  @apply bg-indigo-500;
}
progress {
  @apply text-indigo-500;
}
</style>
