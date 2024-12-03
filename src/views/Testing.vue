<template>
  <div class="testing">
    <h3 class="p-3">Modal</h3>
    <button @click="showModal" class="btn btn-primary">Modal</button>
    <h3 class="p-3">Loading</h3>
    <button @click="onClickLoading" class="btn btn-primary">Loading</button>

     <!-- Render DonutChart here -->
     <DonutChart :width="300" :height="300" />
  </div>
  
</template>
<script setup>
import { useFetchStore } from "@/stores/modules/fetch";
import { useModalStore } from "@/stores/modal";
import { useLoadingStore } from "@/stores/loading";
import { computed, onMounted, ref } from "vue";
import DonutChart from "@/components/donut-chart/Main.vue";


const modalStore = useModalStore();
const loadingStore = useLoadingStore();

const isModal = computed(() => modalStore.isModal);
const buttonModalPreview = ref(false);

const showModal = () => {
  const propertyModal = {
    id: "modal-first",
    show: true,
    size: "lg",
    data: "test",
  };

  modalStore.setModal(propertyModal);
};

const showModal2 = () => {
  const propertyModal = {
    id: "modal-two",
    show: true,
    size: "xl",
    data: "test 2",
  };

  modalStore.setModal(propertyModal);
};

onMounted(async () => {
  await useFetchStore().getFetch();
});

const onClickLoading = () => {
  loadingStore.toggleLoading();

  setTimeout(() => {
    loadingStore.toggleLoading();
  }, 3000);
};
</script>

<style scoped>
.testing {
  background-color: white;
  height: 100vh;
  padding: 1rem;
}
</style>
