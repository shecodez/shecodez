<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template lang="pug">
h1 {{ msg }}
p Recommended IDE setup:
  a(href="https://code.visualstudio.com/" target="_blank")
    | VSCode
  | +
  a(href="https://github.com/johnsoncodehk/volar" target="_blank")
    | Volar
p See
  code README.md
  | for more information.
p
  a(href="https://vitejs.dev/guide/features.html" target="_blank")
    | Vite Docs
  | |
  a(href="https://v3.vuejs.org/" target="_blank")
    | Vue 3 Docs
button(type="button" @click="count++")
  | count is: {{ count }}
p Edit
  code components/HelloWorld.vue
  | to test hot module replacement.
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
