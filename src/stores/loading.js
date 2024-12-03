import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";

export const useLoadingStore = defineStore("loading", () => {
  const isLoading = ref(false);

  const toggleLoading = () => {
    isLoading.value = !isLoading.value;
  };

  return { isLoading, toggleLoading };
});
