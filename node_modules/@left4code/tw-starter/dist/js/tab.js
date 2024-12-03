import dom from "./dom";

(function (dom) {
  "use strict";

  // Show tab content
  dom("body").on("click", "[role='tab']", function () {
    show(this);
  });

  function show(el) {
    dom(el)
      .closest("[role='tablist']")
      .find("[role='tab']")
      .each(function () {
        // Trigger "hide.tw.tab" callback function
        if (dom(this).hasClass("active") && this !== el) {
          const event = new Event("hide.tw.tab");
          dom(this)[0].dispatchEvent(event);
        }

        // Trigger "show.tw.tab" callback function
        if (!dom(this).hasClass("active") && this === el) {
          const event = new Event("show.tw.tab");
          dom(this)[0].dispatchEvent(event);
        }
      });

    // Set active tab nav
    dom(el)
      .closest("[role='tablist']")
      .find("[role='tab']")
      .removeClass("active")
      .attr("aria-selected", false);
    dom(el).addClass("active").attr("aria-selected", true);

    // Set active tab content
    let elementId = dom(el).attr("data-tw-target");
    let tabContentWidth = dom(elementId).closest(".tab-content").width();
    dom(elementId)
      .closest(".tab-content")
      .children(".tab-pane")
      .removeAttr("style")
      .removeClass("active");
    dom(elementId)
      .css("width", tabContentWidth + "px")
      .addClass("active");
  }

  // On window resized
  (function onResized(el) {
    addEventListener("resize", (event) => {
      dom("[role='tabpanel']").each(function () {
        if (dom(this).hasClass("active")) {
          let tabContentWidth = dom(this).closest(".tab-content").width();
          dom(this).css("width", tabContentWidth + "px");
        }
      });
    });
  })();

  // Create instance
  function createInstance(el) {
    return {
      show() {
        show(el);
      },
    };
  }

  // Register instance
  (function init() {
    dom("[role='tab']").each(function () {
      this["__tab"] = createInstance(this);
    });

    if (window.tailwind === undefined) window.tailwind = {};
    window.tailwind.Tab = {
      getInstance(el) {
        return el.__tab;
      },
      getOrCreateInstance(el) {
        return el.__tab === undefined ? createInstance(el) : el.__tab;
      },
    };
  })();
})(dom);
