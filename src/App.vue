<template>
  <div
    class="flex flex-col min-h-screen font-Roboto bg-weather-primary bg-gradient-to-r from-weather-primary to-weather-secondary"
  >
    <TopBar
      :show-modal="showModal"
      @on-open-modal="onChangeModal"
      @on-click-add="onClickAdd"
    />
    <RouterView />
    <AlertModal
      v-if="showModalOnAddCity"
      :show-modal="showModalOnAddCity"
      @on-close-modal="onChangeNotifyModal"
    >
      <template #header>
        <h1 class="text-2xl">Notify</h1>
      </template>
      <template #info>
        <p class="text-black">You have successfully added the city !!!</p>
      </template>
    </AlertModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import TopBar from "./components/TopBar.vue";
import AlertModal from "./components/AlertModal.vue";
import { useCacheStore } from "./stores/cacheStore";

const showModal = ref(false);
const showModalOnAddCity = ref(false);
const route = useRoute();
const router = useRouter();
const cacheStorage = useCacheStore();

function onClickAdd() {
  const geoData = {
    lat: route.query.lat,
    lon: route.query.lon,
    city: route.params.city,
    country: route.params.country,
  };

  const payload = {
    key: route.params.city + route.params.country,
    value: geoData,
  };

  cacheStorage.addCacheCity(payload);
  showModalOnAddCity.value = true;
}

function onChangeModal() {
  showModal.value = !showModal.value;
}

function onChangeNotifyModal() {
  showModalOnAddCity.value = !showModalOnAddCity.value;
  router.replace({
    name: "CityView",
    params: {
      country: route.params.country,
      city: route.params.city,
    },
    query: {
      lat: route.query.lat,
      lon: route.query.lon,
      preview: false,
    },
  });
}
</script>

<style lang="scss"></style>
