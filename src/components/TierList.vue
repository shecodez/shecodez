<template>
  <div class="dnd-tier-list relative w-full z-10">
    <ul class="grid grid-rows-5 gap-1">
      <template v-for="lane in lanes" :key="lane.id">
        <li class="flex items-center gap-1">
          <div class="label center" :class="lane.color">
            <h4 class="text-xl text-black font-normal">{{ lane.id }}</h4>
          </div>
          <div class="lane drop-zone" @drop="onDrop($event, lane.id)" @dragover.prevent @dragenter.prevent>
            <template v-for="i in lane.items" :key="i.id">
              <div draggable @dragstart="startDrag($event, i)" class="drag-el p-4">
                <img :src="i.icon" class="grabbable" />
              </div>
            </template>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const baseSrc = '/src/assets/images/';

const items = ref([
  { id: 1, list: 'S', icon: `${baseSrc}/LogosVue.svg` },
  { id: 1, list: 'S', icon: `${baseSrc}/LogosVisualStudioCode.svg` },
  { id: 2, list: 'S', icon: `${baseSrc}/LogosPython.svg` },
  { id: 3, list: 'S', icon: `${baseSrc}/LogosJavascript.svg` },
  { id: 4, list: 'S', icon: `${baseSrc}/LogosNetlify.svg` },
  { id: 5, list: 'S', icon: `${baseSrc}/LogosVitejs.svg` },
  { id: 6, list: 'S', icon: `${baseSrc}/LogosStackoverflowIcon.svg` },
  { id: 7, list: 'A', icon: `${baseSrc}/VscodeIconsCsharp.svg` },
  { id: 8, list: 'A', icon: `${baseSrc}/LogosTypescriptIcon.svg` },
  { id: 9, list: 'A', icon: `${baseSrc}/LogosPostgresql.svg` },
  { id: 10, list: 'A', icon: `${baseSrc}/LogosSass.svg` },
  { id: 11, list: 'A', icon: `${baseSrc}/SimpleIconsSupabase.svg` },
  { id: 12, list: 'A', icon: `${baseSrc}/LogosUnity.svg` },
  { id: 13, list: 'B', icon: `${baseSrc}/LogosJava.svg` },
  { id: 14, list: 'B', icon: `${baseSrc}/LogosTailwindcssIcon.svg` },
  { id: 15, list: 'B', icon: `${baseSrc}/LogosReact.svg` },
  { id: 16, list: 'B', icon: `${baseSrc}/LogosFirebase.svg` },
  { id: 17, list: 'B', icon: `${baseSrc}/LogosNuxtIcon.svg` },
  { id: 18, list: 'B', icon: `${baseSrc}/LogosWebrtc.svg` },
  { id: 19, list: 'C', icon: `${baseSrc}/LogosVisualStudio.svg` },
  { id: 20, list: 'C', icon: `${baseSrc}/LogosAngularIcon.svg` },
  { id: 21, list: 'C', icon: `${baseSrc}/LogosGrunt.svg` },
  { id: 28, list: 'C', icon: `${baseSrc}/VscodeIconsCpp.svg` },
  { id: 22, list: 'D', icon: `${baseSrc}/LogosBootstrap.svg` },
  { id: 23, list: 'D', icon: `${baseSrc}/LogosAzureIcon.svg` },
  { id: 24, list: '💩', icon: `${baseSrc}/SimpleIconsMSteams.svg` },
  { id: 25, list: '💩', icon: `${baseSrc}/LogosProgress.svg` },
  { id: 26, list: '💩', icon: `${baseSrc}/BrandicoWordpress.svg` },
  { id: 27, list: '💩', icon: `${baseSrc}/SimpleIconsBlazor.svg` },
]);
const lanes = ref([
  {
    id: 'S',
    color: 'bg-red-500',
    items: computed(() => items.value.filter((i) => i.list === 'S')),
  },
  {
    id: 'A',
    color: 'bg-orange-400',
    items: computed(() => items.value.filter((i) => i.list === 'A')),
  },
  {
    id: 'B',
    color: 'bg-amber-500',
    items: computed(() => items.value.filter((i) => i.list === 'B')),
  },
  {
    id: 'C',
    color: 'bg-yellow-300',
    items: computed(() => items.value.filter((i) => i.list === 'C')),
  },
  { id: 'D', color: 'bg-green-400', items: computed(() => items.value.filter((i) => i.list === 'D')) },
  {
    id: '💩',
    color: 'bg-blue-400',
    items: computed(() => items.value.filter((i) => i.list === '💩')),
  },
]);

function startDrag(evt: DragEvent, item: any) {
  evt.dataTransfer!.dropEffect = 'move';
  evt.dataTransfer!.effectAllowed = 'move';
  evt.dataTransfer?.setData('itemID', item.id);
}

function onDrop(evt: DragEvent, list: any) {
  const itemID = evt.dataTransfer?.getData('itemID');
  const item = items.value.find((item) => item.id.toString() == itemID);
  if (item) item.list = list;
}
</script>

<style scoped>
.label {
  @apply w-20 h-20 flex-shrink-0;
}
.lane {
  @apply flex-1 bg-black bg-opacity-80 w-full h-full flex items-center overflow-x-auto;
}
.drag-el {
  @apply flex-shrink-0;
}

.grabbable {
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
}

/* (Optional) Apply a "closed-hand" cursor during drag operation. */
.grabbable:active {
  cursor: grabbing;
  cursor: -moz-grabbing;
  cursor: -webkit-grabbing;
}
</style>
