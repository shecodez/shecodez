<template>
  <div>
    <div v-if="state.sent" class="p-4 flex items-center my-4" :class="state.error ? 'error-alert' : 'success-alert'">
      <span v-if="state.error">{{ state.error }}</span>
      <span v-else>✔️ Message sent. Thanks!</span>
    </div>
    <form v-else @submit.prevent="sendEmail" ref="form" class="flex flex-col gap-3 mt-6">
      <div class="flex gap-3">
        <input type="text" v-model="state.name" name="name" placeholder="Name" />
        <input type="email" v-model="state.email" name="email" placeholder="E-mail" required />
      </div>
      <input type="text" v-model="state.subject" name="subject" placeholder="Subject" />
      <textarea v-model="state.message" name="message" placeholder="Message" rows="4" required />
      <button type="submit" class="primary-button">Send Message</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import emailjs from 'emailjs-com';
import { reactive, ref } from 'vue';

const form = ref();

const state = reactive({
  email: '',
  message: '',
  name: '',
  subject: '',

  sent: false,
  error: null,
});

function sendEmail() {
  try {
    emailjs.sendForm(
      import.meta.env.VITE_EJS_SERVICE_ID as string,
      import.meta.env.VITE_EJS_TEMPLATE_ID as string,
      form.value,
      import.meta.env.VITE_EJS_USER_ID as string
    );
  } catch (error: any) {
    // console.log(error);
    state.error = error;
  } finally {
    state.sent = true;
  }

  // reset form
  state.email = '';
  state.message = '';
  state.name = '';
  state.subject = '';
}
</script>

<style scoped>
.contact input,
textarea {
  @apply bg-gray-700 p-3 w-full;
}
.contact .card {
  @apply lg:w-1/3 md:w-1/2 bg-gray-800 p-8 relative z-10 shadow-md lg:mr-10;
}
.primary-button {
  @apply w-max px-8 py-3 text-sm border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-gray-800;
  transition: all 600ms cubic-bezier(0.23, 1, 0.32, 1);
}
.success-alert {
  @apply border-l-4 border-green-500 bg-green-400 bg-opacity-30 text-green-500;
}
.error-alert {
  @apply border-l-4 border-red-500 bg-red-400 bg-opacity-30 text-red-500;
}
</style>
