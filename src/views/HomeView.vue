<template>
  <main class="container text-black">
    <div class="pt-4 mb-8">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city or state"
        class="py-2 px-2 w-full bg-trasparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul
        v-if="searchResults"
        class="text-white py-2 px-2 bg-weather-secondary"
      >
        <p v-if="isServiceError">Service Unavailable.</p>
        <p v-else-if="!isServiceError && searchResults.length === 0">
          No results found.
        </p>
        <template v-else>
          <li
            v-for="searchResult in searchResults"
            :key="searchResult.id"
            class="border-solid py-1 cursor-pointer"
            @click="onSelectCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
    <p v-if="!requestsData.length" class="text-white italic">
      There are no locations added. To start tracking weather please search and
      add +.
    </p>
    <div v-else v-for="requestData in requestsData" :key="requestData.dt">
      <CityCard
        :city="requestData"
        @on-click-card="onClickCard(requestData.value)"
      />
    </div>
  </main>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityCard from "../components/CityCard.vue";
import { useCacheStore } from "../stores/cacheStore";

const searchQuery = ref("");
const searchTimeout = ref(null);
const accessToken =
  "pk.eyJ1IjoiYmJodXNhbnNpbmdoIiwiYSI6ImNsZmo2dHZpODF6cmMzcnFzdGRkcG5zNDYifQ.seUPya_MNLaNUkfhSZFneQ";
const searchResults = ref(null);
const isServiceError = ref(false);
const router = useRouter();
const cacheStorage = useCacheStore();
const requestsData = reactive([]);

const getSearchResults = () => {
  clearTimeout(searchTimeout.value);
  searchTimeout.value = setTimeout(async () => {
    if (searchQuery.value) {
      try {
        const results = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${accessToken}&types=place`
        );
        searchResults.value = results.data.features;
        return;
      } catch {
        isServiceError.value = true;
        return;
      }
    }
  }, 300);

  searchResults.value = null;
};

function onClickCard(payload) {
  const { lat, lon, city, country } = payload;

  router.push({
    name: "CityView",
    params: {
      country: country,
      city: city,
    },
    query: {
      lat,
      lon,
      preview: false,
    },
  });
}

function onSelectCity(searchResult) {
  const [city, state, country = ""] = searchResult.place_name.split(",");

  const countryParam = country.length ? country.trim() : state.trim();
  const isPreview = localStorage.getItem(city.trim() + countryParam)
    ? false
    : true;

  router.push({
    name: "CityView",
    params: {
      country: countryParam,
      city: city.trim(),
    },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lon: searchResult.geometry.coordinates[0],
      preview: isPreview,
    },
  });
}

onMounted(() => {
  const apiKey = "75f3931054f378262a72b9a2e2e99598";
  Object.keys(localStorage).forEach(async (key) => {
    const value = cacheStorage.getCacheCity(key);
    const { lat, lon, city, country } = value;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      response.data.value = value;
      response.data.city = city;
      response.data.country = country;
      requestsData.push(response.data);
    } catch (error) {
      console.log(error);
    }
  });
});
</script>
