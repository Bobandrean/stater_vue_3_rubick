import { defineStore } from "pinia";
import { reactive, ref, computed } from "vue";

export const useModalStore = defineStore("modal", () => {
  const isModal = reactive({ id: "", show: false, size: "", data: "" });

  const setModal = ({ id = "", show = false, size = "md", data = "" }) => {
    isModal.id = id;
    isModal.show = show;
    isModal.size = size;
    isModal.data = data;
  };

  return { isModal, setModal };
});
