import dom from "./dom";

(function (dom) {
  "use strict";

  function init(el) {
    const targetEl = dom(el).clone().html("");
    const isShown = dom(dom("<div></div>").append(targetEl)).find(
      dom(targetEl).data("selector")
    ).length;

    if (dom(el).data("state") === undefined) {
      dom(el).data("state", !isShown ? "enter" : "leave");
      !isShown ? dom(el).hide() : dom(el).show();
    }

    if (isShown && dom(el).data("state") === "leave") {
      dom(el).data("state", "enter");
      dom(el).show();

      // Enter
      dom(el).addClass(dom(el).data("enter-from"));
      setTimeout(() => {
        dom(el).addClass(dom(el).data("enter"));
        dom(el).addClass(dom(el).data("enter-to"));
        dom(el).removeClass(dom(el).data("enter-from"));

        setTimeout(() => {
          dom(el).removeClass(dom(el).data("enter"));
        }, parseFloat(dom(el).css("transition-duration")) * 1000);
      });
    } else if (!isShown && dom(el).data("state") === "enter") {
      dom(el).data("state", "leave");

      // Leave
      dom(el).addClass(dom(el).data("leave-from"));
      setTimeout(() => {
        dom(el).addClass(dom(el).data("leave"));
        dom(el).addClass(dom(el).data("leave-to"));
        dom(el).removeClass(dom(el).data("leave-from"));

        setTimeout(() => {
          dom(el).removeClass(dom(el).data("leave"));
          dom(el).attr(
            "class",
            (dom(el).attr("class") !== undefined ? dom(el).attr("class") : "")
              .split(" ")
              .filter((value) => {
                return value.search("mt-") === -1;
              })
              .join(" ")
          );
          setTimeout(() => {
            dom(el).hide();
          }, 100);
        }, parseFloat(dom(el).css("transition-duration")) * 1000);
      });
    }
  }

  const observer = new MutationObserver((mutationList) => {
    mutationList.forEach(async function (mutation) {
      if (mutation.type === "attributes") {
        init(mutation.target);
      }
    });
  });

  dom("[data-transition]").each(function () {
    observer.observe(this, {
      attributes: true,
    });

    init(this);
  });
})(dom);
