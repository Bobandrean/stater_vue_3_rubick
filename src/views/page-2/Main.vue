<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Page 2</h2>
  </div>
  <!-- BEGIN: Page Layout -->
  <div class="p-5 mt-5 intro-y box">Example page 2</div>
  <!-- END: Page Layout -->
</template>
<script setup>
import { useBreadcrumbStore } from "../../stores/breadcrumb";
const breadcrumbStore = useBreadcrumbStore();

const propertyBreadcrumbs = [
  {
    name: "Page 2",
    link: "/page-2",
  },
];

breadcrumbStore.setBreadcrumbs(propertyBreadcrumbs);
</script>
