<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Page 1</h2>
  </div>
  <!-- BEGIN: Page Layout -->
  <div class="p-5 mt-5 intro-y box">Example page 1</div>
  <!-- END: Page Layout -->

  <button @click="onClickLoading" class="btn btn-primary">Loading</button>
</template>
<script setup>
import { useBreadcrumbStore } from "../../stores/breadcrumb";
const breadcrumbStore = useBreadcrumbStore();

const propertyBreadcrumbs = [
  {
    name: "Page 1",
    link: "/page-1",
  },
];

breadcrumbStore.setBreadcrumbs(propertyBreadcrumbs);
</script>
