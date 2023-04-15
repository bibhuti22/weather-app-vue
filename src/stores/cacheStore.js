import { defineStore } from "pinia";

export const useCacheStore = defineStore("cacheStore", () => {
  function addCacheCity(payload) {
    const { key, value } = payload;

    localStorage.setItem(key, JSON.stringify(value));
  }

  function getCacheCity(key) {
    const value = localStorage.getItem(key);

    return JSON.parse(value);
  }

  function removeCacheCity(key) {
    localStorage.removeItem(key);
  }

  return { addCacheCity, getCacheCity, removeCacheCity };
});
