import dom from "./dom";

(function (dom) {
  // Get highest z-index
  function getHighestZindex() {
    let zIndex = 9999;
    dom(".modal").each(function () {
      if (
        dom(this).css("z-index") !== "auto" &&
        dom(this).css("z-index") > zIndex
      ) {
        zIndex = parseInt(dom(this).css("z-index"));
      }
    });

    return zIndex;
  }

  // Get scrollbar width
  function getScrollbarWidth(el) {
    return window.innerWidth - dom(el)[0].clientWidth;
  }

  // Show modal with z-index
  function show(el) {
    if (!dom("[data-modal-replacer='" + dom(el).attr("id") + "']").length) {
      // Move modal element to body
      dom(
        '<div data-modal-replacer="' + dom(el).attr("id") + '"></div>'
      ).insertAfter(el);
      dom(el).css({
        "margin-top": 0,
        "margin-left": 0,
      });
      dom(el).attr("aria-hidden", false).appendTo("body");

      // Show modal by highest z-index
      setTimeout(() => {
        dom(el)
          .addClass("show")
          .css("z-index", getHighestZindex() + 1);

        // Trigger "shown.tw.modal" callback function
        const event = new Event("shown.tw.modal");
        dom(el)[0].dispatchEvent(event);
      }, 200);

      // Setting up modal scroll
      dom("body")
        .css(
          "padding-right",
          parseInt(dom("body").css("padding-right")) +
            getScrollbarWidth("html") +
            "px"
        )
        .addClass("overflow-y-hidden");
      dom(".modal").removeClass("overflow-y-auto").css("padding-left", "0px");
      dom(el)
        .addClass("overflow-y-auto")
        .css("padding-left", getScrollbarWidth(el) + "px")
        .addClass(dom(".modal.show").length ? "modal-overlap" : "");

      // Trigger "show.tw.modal" callback function
      const event = new Event("show.tw.modal");
      dom(el)[0].dispatchEvent(event);
    }
  }

  // Hide modal & remove modal scroll
  function hide(el) {
    if (dom(el).hasClass("modal") && dom(el).hasClass("show")) {
      let transitionDuration =
        parseFloat(dom(el).css("transition-duration").split(",")[1]) * 1000;
      dom(el).attr("aria-hidden", true).removeClass("show");

      setTimeout(() => {
        dom(el)
          .removeAttr("style")
          .removeClass("modal-overlap")
          .removeClass("overflow-y-auto");

        // Add scroll to highest z-index modal if exist
        dom(".modal").each(function () {
          if (parseInt(dom(this).css("z-index")) === getHighestZindex()) {
            dom(this)
              .addClass("overflow-y-auto")
              .css("padding-left", getScrollbarWidth(this) + "px");
          }
        });

        // Return back scroll to body if no more modal showed up
        if (getHighestZindex() == 9999) {
          dom("body").removeClass("overflow-y-hidden").css("padding-right", "");
        }

        // Return back modal element to it's first place
        dom('[data-modal-replacer="' + dom(el).attr("id") + '"]').replaceWith(
          el
        );

        // Trigger "hidden.tw.modal" callback function
        const event = new Event("hidden.tw.modal");
        dom(el)[0].dispatchEvent(event);
      }, transitionDuration);

      // Trigger "hide.tw.modal" callback function
      const event = new Event("hide.tw.modal");
      dom(el)[0].dispatchEvent(event);
    }
  }

  // Toggle modal
  function toggle(el) {
    if (dom(el).hasClass("modal") && dom(el).hasClass("show")) {
      hide(el);
    } else {
      show(el);
    }
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

  // Show modal
  dom("body").on("click", '[data-tw-toggle="modal"]', function () {
    show(dom(this).attr("data-tw-target"));
  });

  // Hide modal
  dom("body").on("click", (event) => {
    if (
      dom(event.target).hasClass("modal") &&
      dom(event.target).hasClass("show")
    ) {
      // Check if modal backdrop is not static
      if (dom(event.target).data("tw-backdrop") !== "static") {
        hide(event.target);
      } else {
        dom(event.target).addClass("modal-static");
        setTimeout(() => {
          dom(event.target).removeClass("modal-static");
        }, 600);
      }
    }
  });

  // Dismiss modal by link
  dom("body").on("click", '[data-tw-dismiss="modal"]', function () {
    let modal = dom(this).closest(".modal")[0];
    hide(modal);
  });

  // Keyboard event
  document.addEventListener("keydown", (event) => {
    if (event.code == "Escape") {
      let el = dom(".modal.show").last();
      if (
        dom(el).hasClass("modal") &&
        dom(el).hasClass("show") &&
        (dom(el).data("tw-keyboard") === undefined ||
          dom(el).data("tw-keyboard") !== "false")
      ) {
        // Check if modal backdrop is not static
        if (dom(el).data("tw-backdrop") !== "static") {
          hide(el);
        } else {
          dom(el).addClass("modal-static");
          setTimeout(() => {
            dom(el).removeClass("modal-static");
          }, 600);
        }
      }
    }
  });

  // Register instance
  (function init() {
    dom(".modal").each(function () {
      this["__modal"] = createInstance(this);
    });

    if (window.tailwind === undefined) window.tailwind = {};
    window.tailwind.Modal = {
      getInstance(el) {
        return el.__modal;
      },
      getOrCreateInstance(el) {
        return el.__modal === undefined ? createInstance(el) : el.__modal;
      },
    };
  })();
})(dom);
