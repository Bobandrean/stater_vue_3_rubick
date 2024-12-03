import * as Popper from "@popperjs/core";
import dom from "./dom";

(function (dom) {
  "use strict";

  // Hide dropdown
  function hide() {
    dom(".dropdown-menu").each(async function () {
      if (
        dom(this).attr("id") !== undefined &&
        dom('[data-dropdown-replacer="' + dom(this).attr("id") + '"]').length &&
        dom(this).data("dropdown-programmatically") === undefined
      ) {
        let randId = dom(this).attr("id");
        let dropdownToggle = dom('[data-dropdown-replacer="' + randId + '"]')
          .parent()
          .find("[data-tw-toggle='dropdown']");

        // Animate dropdown
        dom(this).removeClass("show");

        // Trigger "hide.tw.dropdown" callback function
        const event = new Event("hide.tw.dropdown");
        dom(dropdownToggle).parent()[0].dispatchEvent(event);

        await setTimeout(() => {
          // Move dropdown element to body
          dom('[data-dropdown-replacer="' + randId + '"]').replaceWith(this);

          // Reset attribute
          dom(this).removeAttr("style");
          dom(this).removeAttr("data-popper-placement");

          // Set aria-expanded to false
          dom(dropdownToggle).attr("aria-expanded", false);

          // Trigger "hidden.tw.dropdown" callback function
          const event = new Event("hidden.tw.dropdown");
          dom(dropdownToggle).parent()[0].dispatchEvent(event);
        }, 200);
      } else if (
        dom(this).attr("id") !== undefined &&
        !dom('[data-dropdown-replacer="' + dom(this).attr("id") + '"]')
          .length &&
        dom(this).hasClass("show") &&
        dom(this).data("dropdown-programmatically") === undefined
      ) {
        dom(this).remove();
      } else if (dom(this).data("dropdown-programmatically") == "initiate") {
        // Set programmatically attribute state
        dom(this).attr("data-dropdown-programmatically", "showed");
      } else if (dom(this).data("dropdown-programmatically") == "showed") {
        // Remove programmatically attribute state
        dom(this).removeAttr("data-dropdown-programmatically");

        // Hide dropdown
        hide();
      }
    });
  }

  // Find visible dropdown toggle
  function findVisibleDropdownToggle(dropdownToggle) {
    return dropdownToggle.filter((key, dropdownToggle) => {
      return dropdownToggle.offsetParent !== null;
    });
  }

  // Show dropdown
  async function show(dropdown) {
    let dropdownBox = dom(dropdown).find(".dropdown-menu").first();
    let dropdownToggle = findVisibleDropdownToggle(
      dom(dropdown).find("[data-tw-toggle='dropdown']")
    );
    let placement = dom(dropdown).data("tw-placement")
      ? dom(dropdown).data("tw-placement")
      : "bottom-end";
    let randId = "_" + Math.random().toString(36).substr(2, 9);

    // Hide dropdown
    hide();

    if (dom(dropdownBox).length) {
      // Set aria-expanded to true
      dom(dropdownToggle).attr("aria-expanded", true);

      // Set dropdown width
      dom(dropdown).css("position") == "static"
        ? dom(dropdown).css("position", "relative")
        : "";
      dom(dropdownBox).show();
      dom(dropdownBox).css("width", dom(dropdownBox).css("width"));

      // Move dropdown element to body
      dom('<div data-dropdown-replacer="' + randId + '"></div>').insertAfter(
        dropdownBox
      );
      dom(dropdownBox).attr("id", randId).appendTo("body");

      // Check if dropdown is used inside modal
      dom(".modal.show").each(function () {
        if (dom(this).find('[data-dropdown-replacer="' + randId + '"]')) {
          dom(dropdownBox).css("z-index", dom(this).css("z-index"));
        }
      });

      // Init popper
      Popper.createPopper(dropdownToggle[0], dropdownBox[0], {
        placement: placement,
      });

      // Show dropdown
      dom(dropdownBox).addClass("show");

      // Trigger "show.tw.dropdown" callback function
      const event = new Event("show.tw.dropdown");
      dom(dropdown)[0].dispatchEvent(event);

      await setTimeout(() => {
        // Trigger "shown.tw.dropdown" callback function
        const event = new Event("shown.tw.dropdown");
        dom(dropdown)[0].dispatchEvent(event);
      }, 200);
    }
  }

  // Toggle dropdown programmatically
  function toggleProgrammatically(dropdown) {
    let dropdownBox = dom(dropdown).find(".dropdown-menu").first();
    if (dom(dropdownBox).length) {
      showProgrammatically(dropdown);
    } else {
      hide();
    }
  }

  // Show dropdown programmatically
  function showProgrammatically(dropdown) {
    if (dom(dropdown).find(".dropdown-menu").length) {
      dom(dropdown)
        .find(".dropdown-menu")
        .attr("data-dropdown-programmatically", "initiate");
    } else {
      let randId = dom("[data-dropdown-replacer]").data("dropdown-replacer");
      dom("#" + randId).attr("data-dropdown-programmatically", "initiate");
    }

    show(dropdown);
  }

  // Create instance
  function createInstance(dropdownToggle) {
    const dropdown = dom(dropdownToggle).closest(".dropdown");
    return {
      show() {
        showProgrammatically(dropdown);
      },
      hide() {
        hide();
      },
      toggle() {
        toggleProgrammatically(dropdown);
      },
    };
  }

  // Dropdown event listener
  dom("body").on("click", function (event) {
    let dropdown = dom(event.target).closest(".dropdown");
    let dropdownToggle = dom(dropdown).find("[data-tw-toggle='dropdown']");
    let dropdownBox = dom(dropdown).find(".dropdown-menu").first();
    let activeDropdownBox = dom(event.target).closest(".dropdown-menu").first();
    let dismissButton = dom(event.target).data("tw-dismiss");

    if (
      (!dom(dropdown).length && !dom(activeDropdownBox).length) ||
      (dom(dropdownToggle).length && !dom(dropdownBox).length) ||
      dismissButton == "dropdown"
    ) {
      // Hide dropdown
      hide();
    } else if (!dom(activeDropdownBox).length) {
      // Show dropdown
      show(dropdown);
    }
  });

  // Keyboard event
  document.addEventListener("keydown", function (event) {
    if (event.code == "Escape") {
      hide();
    }
  });

  // Register instance
  (function init() {
    dom("[data-tw-toggle='dropdown']").each(function () {
      this["__dropdown"] = createInstance(this);
    });

    if (window.tailwind === undefined) window.tailwind = {};
    window.tailwind.Dropdown = {
      getInstance(el) {
        return el.__dropdown;
      },
      getOrCreateInstance(el) {
        return el.__dropdown === undefined ? createInstance(el) : el.__dropdown;
      },
    };
  })();
})(dom);
