import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";

export const useConfigStore = defineStore("config", () => {
  const isConfiguration = reactive({
    name: "Starter",
    shortName: "str",
    version: "1.0.0",
  });

  const setState = (key, value) => {
    isConfiguration[key] = value;
  };

  return { isConfiguration, setState };
});
