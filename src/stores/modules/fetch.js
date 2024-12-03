import FetchServices from "@/services/fetch";
import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useFetchStore = defineStore("fetch", () => {
  const fetch = ref([]);

  const isFetch = computed(() => fetch.value);

  async function getFetch(url) {
    const res = await FetchServices.get(url);
    console.log("STORE FETCH", res);

    fetch.value = res;
    return res;
  }

  return { getFetch, isFetch };
});
