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
            <p class="text-black mb-8 font-bold text-lg">
              Welcome to the Weather Tracking App! This app allows you to stay
              updated on the weather conditions for cities across the globe.
              Here's how it works:
            </p>
            <div>
              <ul class="text-black list-disc ml-4 mb-5 italic">
                <li>
                  Search for a city: Use the search feature to find the city
                  you're interested in.
                </li>
                <li>
                  Select city from search results: Once you find the desired
                  city in the search results, click on it to select it.
                </li>
                <li>
                  Add city to tracking list: By clicking on the "+" sign, you
                  can add the selected city to your tracking list.
                </li>
                <li>
                  Delete tracking city: If you want to remove a city from your
                  tracking list, simply open the city's details and select the
                  delete button.
                </li>
              </ul>
            </div>
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

<style scoped>
li {
  margin-bottom: 5px;
}
</style>
