<template>
  <div
    @click="$emit('on-click-card')"
    class="flex py-6 px-3 mb-2 bg-weather-card rounded-md shadow-md cursor-pointer text-white"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.country }}</h3>
    </div>

    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">{{ Math.round(city.main.temp) }}&deg;</p>
      <div class="flex gap-2">
        <span class="text-xs">
          H:
          {{ Math.round(city.main.temp_max) }}&deg;
        </span>
        <span class="text-xs">
          L:
          {{ Math.round(city.main.temp_min) }}&deg;
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});

defineEmits(["on-click-card"]);
</script>
