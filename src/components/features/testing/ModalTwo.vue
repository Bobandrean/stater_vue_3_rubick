<template>
  <BaseModal>
    <h1>Modal 2</h1>
    {{ data }}

    <template #footer>
      <button class="btn btn-primary" @click="isActive = false">Submit</button>
    </template>
  </BaseModal>
</template>
<script setup>
import BaseModal from "@/components/base/modal/Main.vue";

const props = defineProps({
  data: {
    type: [String, Number, Object, Array, Boolean],
    default: "",
  },
});
</script>
