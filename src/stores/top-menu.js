import { defineStore } from "pinia";

export const useTopMenuStore = defineStore("topMenu", {
  state: () => ({
    menu: [
      {
        icon: "HomeIcon",
        pageName: "top-menu-home",
        title: "Home",
      },
      {
        icon: "HomeIcon",
        pageName: "top-menu-page-1",
        title: "Page 1",
      },
      {
        icon: "HomeIcon",
        pageName: "top-menu-page-2",
        title: "Page 2",
      },
    ],
  }),
});
