import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";

export const useBreadcrumbStore = defineStore("breadcrumb", () => {
  const breadcrumbs = ref([
    {
      name: "Page 2",
      link: "/page-1",
    },
  ]);

  const setBreadcrumbs = (data) => {
    breadcrumbs.value = data;
  };

  return { breadcrumbs, setBreadcrumbs };
});
