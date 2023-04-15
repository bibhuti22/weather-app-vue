<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3 flex-1">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">The Weather App</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary"
          @click="$emit('on-open-modal')"
        ></i>
        <i
          v-if="route.name === 'CityView'"
          class="fa-solid fa-plus top-2 text-xl hover:text-weather-secondary"
          @click="$emit('on-click-add')"
        ></i>
      </div>

      <div v-if="showModal">
        <AlertModal
          :show-modal="showModal"
          @on-close-modal="$emit('on-open-modal')"
        >
          <template #header>
            <h1 class="text-2xl">About</h1>
          </template>
          <template #info>
            <p class="text-black mb-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id
              inventore iure et aspernatur neque itaque vitae repellat ea
              similique ad excepturi odit asperiores quo facilis placeat
              voluptatibus, sunt cupiditate recusandae ratione, sit laborum iste
              labore! Porro ipsa facilis quod modi!
            </p>
          </template>
        </AlertModal>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, useRoute } from "vue-router";
import AlertModal from "./AlertModal.vue";

defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["on-open-modal", "on-click-add"]);

const route = useRoute();
</script>
