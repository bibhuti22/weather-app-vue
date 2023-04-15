<template>
  <div>
    <p v-if="!isFetchReady && !isFetchError">Loading....</p>
    <div v-else class="flex flex-col text-white items-center">
      <div
        v-if="isPreview === 'false' ? false : true"
        class="text-white p-4 bg-weather-secondary w-full text-center"
      >
        <p>
          You are currently previewing this city, click the "+" icon to start
          tracking this city.
        </p>
      </div>
      <p class="text-4xl mt-4 mb-2 text-center">
        {{ route.params.city + ", " + route.params.country }}
      </p>
      <p class="text-8xl font-bold mb-2 text-center">
        {{ Math.round(weatherData.main.temp) }}&deg;
      </p>
      <img
        class="w-[120px] h-auto"
        :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
        alt=""
      />
      <p class="text-lg">Feels like {{ weatherData.main.feels_like }}&deg;</p>
      <p class="text-lg capitalize">
        {{ weatherData.weather[0].description }}&deg;
      </p>
      <hr class="border-white border-opacity-10 w-full mt-4" />
      <div class="max-w-screen-md w-full py-12">
        <h1 class="text-white mb-4 text-lg font-bold">
          5 day / 3 hour Weather Forecast
        </h1>
        <div class="flex gap-10 overflow-x-auto">
          <div
            v-for="hourly in hourlyData.list"
            :key="hourly.dt"
            class="flex flex-col gap-4 items-center"
          >
            <p class="whitespace-nowrap text-md flex flex-col text-center">
              <span>
                {{
                  hourly.dt_txt.slice(8, 10) + "/" + hourly.dt_txt.slice(5, 7)
                }}
              </span>
              {{
                new Date(hourly.dt_txt).toLocaleTimeString("en-us", {
                  hour: "numeric",
                })
              }}
            </p>
            <img
              class="w-[auto] h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${hourly.weather[0].icon}@2x.png`"
            />
            <p class="text-xl">{{ Math.round(hourly.main.temp) }}&deg;</p>
          </div>
        </div>
      </div>
      <div
        class="flex items-center mb-4 gap-2 text-white cursor-pointer hover:text-red-500"
        @click="onRemoveCity"
      >
        <i class="fa-solid fa-trash"></i>
        <p>Delete Tracking City</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { useCacheStore } from "../stores/cacheStore";

const route = useRoute();
const router = useRouter();
const cacheStorage = useCacheStore();
const apiKey = "75f3931054f378262a72b9a2e2e99598";
const weatherData = ref(null);
const isFetchReady = ref(false);
const isFetchError = ref(false);
const hourlyData = ref([]);
const isPreview = computed(() => route.query.preview);

const getWeatherInfo = async () => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${route.query.lat}&lon=${route.query.lon}&appid=${apiKey}&units=metric`
    );

    const hourlyResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${route.query.lat}&lon=${route.query.lon}&appid=${apiKey}&units=metric`
    );

    hourlyData.value = hourlyResponse.data;
    weatherData.value = response.data;

    isFetchReady.value = true;
    isFetchError.value = false;
  } catch (error) {
    console.log(error);
    isFetchError.value = true;
    isFetchReady.value = true;
  }
};

function onRemoveCity() {
  cacheStorage.removeCacheCity(route.params.city + route.params.country);

  router.push({
    path: "/",
  });
}

onMounted(() => {
  getWeatherInfo();
});
</script>
