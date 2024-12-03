<template>
  <!-- BEGIN: Modal Content -->
  <Modal
    :show="isActive"
    :size="`modal-${isModal.size}`"
    @hidden="handleHidden"
    backdrop="static"
  >
    <ModalHeader>
      <div class="flex justify-content-between">
        <h1 class="text-2xl font-medium">Modal</h1>
        <a
          @click="isActive = false"
          class="absolute top-0 right-0 mt-3 mr-3"
          href="javascript:;"
        >
          <XIcon class="w-8 h-8 text-red-400" />
        </a>
      </div>
    </ModalHeader>
    <ModalBody class="p-10 text-center">
      <slot></slot>
    </ModalBody>
    <ModalFooter>
      <slot name="footer"></slot>
    </ModalFooter>
  </Modal>
  <!-- END: Modal Content -->
</template>
<script setup>
import { computed, ref, watchEffect } from "vue";
import { useModalStore } from "@/stores/modal";

const modalStore = useModalStore();
const isModal = computed(() => modalStore.isModal);
const isActive = ref(false);

watchEffect(() => {
  isActive.value = isModal.value.show;
});

const handleHidden = () => {
  modalStore.setModal({ show: false });
};
</script>
