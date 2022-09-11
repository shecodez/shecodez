<template>
  <div class="site flex bg-gray-800 text-gray-200 overflow-x-hidden">
    <SideMenu />

    <main class="relative w-full md:ml-auto md:w-11/12">
      <div class="bkmark fixed center top-0 right-0 z-50">
        <div class="triangle relative w-25 h-25">
          <a href="/downloads/ResumeNJN.pdf" class="absolute transform rotate-45 -top-5 -right-11 text-center"
            >Résumé</a
          >
        </div>
      </div>

      <div class="center gap-2 fixed bottom-4 right-4 z-50 text-xs">
        <MusicPlayer />
        <ScrollToTop />
      </div>

      <div class="intro section flex items-center overflow-hidden">
        <div class="intro text flex flex-col gap-6">
          <h1>
            Hello, <span class="emoji">🌎</span>!<br />
            I'm Nicole,<br />
            <span class="tracking-wide">A <span class="emoji">👩🏽‍💻</span> dev.</span>
          </h1>
          <span class="hidden">🎉 congratz! you survived 2020 🧻 & 2021 🦠</span>
          <p class="tracking-wide">It's {{ new Date().getFullYear() }}, and you need a new website...</p>
          <a href="/#contact" class="primary-button">Let me help!</a>
        </div>
        <h2 class="background-h2 top-20">shecodez</h2>
      </div>
      <section id="workz" class="portfilio">
        <div class="portfolio">
          <h2 class="background-h2 top-18 lg:right-20">sheworkz</h2>
          <div class="text">
            <h2 class="primary-h2">Portfolio</h2>
            <p>
              Hi there! I'm Nicole and I'm a web developer currently
              <del>stuck</del> based in Georgia, 🍑 state USA.<br />
              I 💗 moonlight, sushi, building UI/UX to help people get things done, and
              <a href="https://www.imdb.com/title/tt0280240/" target="_blank">Big O</a> ...umm
              <a href="https://agenk.medium.com/big-o-notation-30b5c37c67b9" target="_blank"> notation</a>. 🤖😅<br />
              I also 💗 that there's always something new to learn, and problems to solve, and people to work with.
            </p>
          </div>
          <div class="works grid grid-col-2 lg:grid-cols-5 -mx-10 lg:-mx-20 my-10">
            <div class="bg-indigo-500">
              <a href="https://student-manager.netlify.app/" target="_blank">
                <img src="/src/assets/projects/SMApp-logo.png" alt="SMApp-logo" />
              </a>
            </div>
            <div class="center p-8">
              <blockquote class="relative">
                <h2 class="background-h2 top-3"><LeftQuoteIcon /></h2>
                <div class="relative z-10">
                  <h2 class="lg:text-3xl font-black text-right">
                    If you fail to plan, you are planning to fail! ― Benjamin Franklin
                  </h2>
                </div>
              </blockquote>
            </div>
            <div class="center p-8">
              <a href="https://github.com/shecodez/ispeak" target="_blank">
                <img src="/src/assets/projects/iKanban-logo.png" alt="iKanban-logo" />
              </a>
            </div>
            <div class="bg-yellow-500" />
            <div class="center p-8 bg-white">
              <a href="https://www.micronovations.com/" target="_blank">
                <img src="/src/assets/projects/microNovations-logo.png" alt="microNovations-logo" />
              </a>
            </div>
            <div class="center">
              <a href="https://github.com/shecodez/h010space" target="_blank">
                <img src="/src/assets/projects/h010space-logo.png" alt="holospace-logo" />
              </a>
            </div>
            <div class="portals-pong relative center bg-gradient-to-r from-blue-500 to-orange-500">
              <PortalsPong :width="512" :height="256" />
              <small class="absolute bottom-1">*Note: playable, but has bugs. 🚧 WIP 👷🏽‍♀️</small>
            </div>
            <div class="center p-8">
              <blockquote>
                <div class="relative z-10">
                  <h2 class="lg:text-5xl font-black text-right">
                    I <span class="emoji">💗</span> moonlight,
                    <a href="https://codepen.io/shecodez/pen/wveYKxX" class="outline js-hover-sushi">sushi</a>, and
                    giant robots.
                  </h2>
                </div>
              </blockquote>
            </div>
            <div class="bg-red-500" />
          </div>
        </div>
      </section>
      <section id="skillz" class="skills lg:flex gap-10">
        <div class="text flex flex-col w-full lg:w-5/12">
          <h2 class="primary-h2">To pay the billz</h2>
          <p>
            I work mostly with the front-end, and I enjoy it, but that doesn't mean that's all I can or will to do.
            Let's just say I like to wear many hats.<br /><br />
            I've gone from a tech support intern doing general pc trouble shooting, fixing printers, and dropping VoIP
            lines (from the ceilings), to freelance web developer, to full time in the office setting, a cubial warrior
            so to speak. It's all part of the journey that I hope continues for a long time to come.<br /><br />
            I currenly work full-time as a programmer analysist for an insurance company, but I'm always down for
            exciting new opportunities.
          </p>
          <div class="mt-10 flex flex-col gap-4">
            <template v-for="exp in state.experience" :key="exp.label">
              <ProgressBar :label="exp.label" :value="exp.progress" :css="exp.css" />
            </template>
          </div>
        </div>
        <div class="relative w-full lg:w-7/12 mt-12">
          <h2 class="background-h2 top-0 right-20">Skillz</h2>
          <TierList />
          <p class="text-right pt-2">
            What's yours? Tell <a href="mailto:me@shecodez.com">me@shecodez.com</a>. <br />
            <small class="italic">
              Note: with time and experience my tier list changes, i.e.
              <a
                href="https://dev.to/shecodez/typescript-used-to-be-on-my-list-42l9"
                target="_blank"
                style="color: inherit"
              >
                <img src="/images/LogosTypescriptIcon.svg" alt="TypeScript logo" class="inline" /> used to be on my
                <span class="not-italic">💩</span> list.
              </a>
            </small>
          </p>
        </div>
      </section>
      <section id="blog" class="blog mt-10 lg:mt-0">
        <h2 class="background-h2">sheblogz</h2>
        <div class="blog text mx-auto w-4/5">
          <PostList />
        </div>
      </section>
      <section id="contact" class="contact relative flex items-center">
        <div id="map-container" class="absolute inset-0 bg-gray-800">
          <iframe
            width="100%"
            height="100%"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            title="map"
            scrolling="no"
            src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=Hachi%C5%8Dji+(shecodez)&amp;ie=UTF8&amp;t=&amp;z=15&amp;iwloc=B&amp;output=embed"
            style="filter: grayscale(1) contrast(1.2) opacity(0.4)"
          />
        </div>

        <div class="card px-5 py-24 mx-auto flex flex-col">
          <h2 class="primary-h2">Get in Touch</h2>
          <p>
            Have a question 🤔? Want to give me some feedback? Report a bug 🐞? et cetera. You can use this form or send
            an email to
            <a href="mailto:me@shecodez.com">me@shecodez.com</a>. 🥰
          </p>
          <ContactForm />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import PortalsPong from '@/components/PortalsPong.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import SideMenu from '@/components/SideMenu.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';
import TierList from '@/components/TierList.vue';
import PostList from '@/components/blog/PostList.vue';
import LeftQuoteIcon from '../components/icons/LeftQuoteIcon.vue';
import ContactForm from '@/components/ContactForm.vue';

//defineProps<{ msg: string }>();

onMounted(() => {
  let externalScript = document.createElement('script');
  externalScript.setAttribute('src', 'https://smtpjs.com/v3/smtp.js');
  document.head.appendChild(externalScript);
});

const state = reactive({
  experience: [
    { label: 'Front-end', progress: 80, css: 'text-indigo-500' },
    { label: 'Back-end', progress: 42, css: 'text-cyan-500' },
    { label: 'Vue3', progress: 74, css: 'text-green-500' },
    { label: 'ReactJS', progress: 66, css: 'text-yellow-500' },
  ],

  email: '',
  message: '',
  name: '',
  subject: '',

  sent: false,
});

function sendEmail() {
  //console.log('Send Email', state.message);

  (<any>window).Email.send({
    SecureToken: '0dac960d-5504-49bc-a9f0-f27653200a52',
    To: 'me@shecodez.com',
    From: state.email,
    Subject: `${state.subject} from ${state.name}`,
    Body: state.message,
  }).then((state.sent = true));
}
</script>

<style scoped>
a {
  @apply text-indigo-500;
}
a:hover {
  @apply underline;
}

.l-eye {
  @apply text-indigo-500;
}
.r-eye {
  @apply text-cyan-500;
}

section,
.section {
  @apply relative min-h-screen p-10 lg:p-20;
}

.primary-button {
  @apply w-max px-8 py-3 text-sm border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-gray-800;
  transition: all 600ms cubic-bezier(0.23, 1, 0.32, 1);
}

.text {
  @apply relative z-10;
}
.primary-h2 {
  @apply text-3xl lg:text-5xl font-extrabold text-indigo-500 mb-8;
}
.secondary-h3 {
  @apply text-xl lg:text-3xl font-semibold text-cyan-500;
}
.background-h2 {
  @apply absolute text-6xl lg:text-11xl -mt-23 lg:-mt-25 lg:-mt-30 font-black text-gray-700;
}

.bkmark .triangle {
  border-left: 50px solid transparent;
  border-right: 50px solid rgba(0, 0, 0, 0.8);
  border-bottom: 50px solid transparent;
  border-top: 50px solid rgba(0, 0, 0, 0.8);
  display: inline-block;
  filter: drop-shadow(10px 10px 4px #000);
}

.intro h1 {
  @apply text-4xl lg:text-7xl font-black;
}
.intro p {
  @apply text-sm lg:text-xl text-gray-500;
}

.works {
  grid-auto-rows: 1fr;
}
.works > div {
  /* aspect-ratio: 1; */
  grid-column: span 1;
  overflow: hidden;
}
.works > div:hover {
  transform: scale(1.1);
  transition: 1s ease-out;
}

.works .portals-pong {
  transform: none !important;
  grid-column: span 2;
}

.outline {
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: white;
  color: transparent;
  transition: 2.5s ease-out;
}
.outline:hover {
  color: white;
  -webkit-text-stroke-width: 0;
}

.js-hover-sushi span {
  position: absolute;
  font-size: 2rem;
  top: 50%;
  left: 50%;
  opacity: 0;
  pointer-events: none;
  z-index: 1;
}

.contact input,
textarea {
  @apply bg-gray-700 p-3 w-full;
}
.contact .card {
  @apply lg:w-1/3 md:w-1/2 bg-gray-800 p-8 relative z-10 shadow-md lg:mr-10;
}
.success-alert {
  @apply border-l-4 border-green-500 bg-green-400 bg-opacity-30 text-green-500;
}

.emoji {
  @apply font-normal;
}
</style>
