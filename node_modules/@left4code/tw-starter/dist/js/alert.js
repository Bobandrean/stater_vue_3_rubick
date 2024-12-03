import dom from "./dom";

(function (dom) {
  "use strict";

  // Close active alert
  dom("body").on("click", "[data-tw-dismiss='alert']", function () {
    hide(dom(this).closest(".alert"));
  });

  function show(el) {
    dom(el).fadeIn(300, function () {
      dom(this).addClass("show");

      // Trigger "shown.tw.alert" callback function
      const event = new Event("shown.tw.alert");
      dom(el)[0].dispatchEvent(event);
    });

    // Trigger "show.tw.alert" callback function
    const event = new Event("show.tw.alert");
    dom(el)[0].dispatchEvent(event);
  }

  function hide(el) {
    dom(el).fadeOut(300, function () {
      dom(this).removeClass("show");

      // Trigger "hidden.tw.alert" callback function
      const event = new Event("hidden.tw.alert");
      dom(el)[0].dispatchEvent(event);
    });

    // Trigger "hide.tw.alert" callback function
    const event = new Event("hide.tw.alert");
    dom(el)[0].dispatchEvent(event);
  }

  function toggle(el) {
    dom(el).hasClass("show") ? hide(el) : show(el);
  }

  // Create instance
  function createInstance(el) {
    return {
      show() {
        show(el);
      },
      hide() {
        hide(el);
      },
      toggle() {
        toggle(el);
      },
    };
  }

  // Register instance
  (function init() {
    dom(".alert").each(function () {
      this["__alert"] = createInstance(this);
    });

    if (window.tailwind === undefined) window.tailwind = {};
    window.tailwind.Alert = {
      getInstance(el) {
        return el.__alert;
      },
      getOrCreateInstance(el) {
        return el.__alert === undefined ? createInstance(el) : el.__alert;
      },
    };
  })();
})(dom);
