<template>
  <TestModalFirst v-if="isModal?.id === 'modal-first'" :data="isModal.data" />
  <TestModalTwo v-if="isModal?.id === 'modal-two'" :data="isModal.data" />
</template>
<script setup>
import TestModalFirst from "@/components/features/testing/ModalFirst.vue";
import TestModalTwo from "@/components/features/testing/ModalTwo.vue";
import { useModalStore } from "@/stores/modal";
import { computed } from "vue";

const modalStore = useModalStore();

const isModal = computed(() => modalStore.isModal);
</script>
