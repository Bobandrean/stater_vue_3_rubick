<template>
  <router-view />

  <ModalRegister />

  <teleport to="body">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <Loading />
    </div>
  </teleport>
</template>
<script setup>
import ModalRegister from "@/layouts/modal/Main.vue";
import Loading from "@/components/base/loading/Main.vue";

import { useLoadingStore } from "@/stores/loading";

import { computed } from "vue";

const loadingStore = useLoadingStore();

const isLoading = computed(() => loadingStore.isLoading);
</script>
