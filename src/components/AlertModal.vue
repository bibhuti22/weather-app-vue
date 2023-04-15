<template>
  <div
    class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
  >
    <div v-if="showModal" class="p-4 bg-white self-start mt-32 max-w-screen-md">
      <slot name="header"></slot>
      <slot name="info"></slot>

      <button
        class="bg-weather-primary py-2 px-6 text-white"
        @click="$emit('on-close-modal')"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
});
</script>
