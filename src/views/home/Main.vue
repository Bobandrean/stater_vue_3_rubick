<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Dashboard</h2>
  </div>
  <!-- BEGIN: Page Layout -->
  <div class="p-5 mt-5 intro-y box">Welcome to dashboard</div>
  <!-- END: Page Layout -->
</template>
<script setup>
import { useBreadcrumbStore } from "../../stores/breadcrumb";
const breadcrumbStore = useBreadcrumbStore();

const propertyBreadcrumbs = [];

breadcrumbStore.setBreadcrumbs(propertyBreadcrumbs);
</script>
