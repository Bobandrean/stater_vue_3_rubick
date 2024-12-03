import replaceElement from './replaceElement';
import * as allIcons from './icons';
/**
 * Replaces all elements with matching nameAttr with the defined icons
 * @param {{ icons?: object, nameAttr?: string, attrs?: object }} options
 */

var createIcons = function createIcons(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$icons = _ref.icons,
      icons = _ref$icons === void 0 ? {} : _ref$icons,
      _ref$nameAttr = _ref.nameAttr,
      nameAttr = _ref$nameAttr === void 0 ? 'icon-name' : _ref$nameAttr,
      _ref$attrs = _ref.attrs,
      attrs = _ref$attrs === void 0 ? {} : _ref$attrs;

  if (!Object.values(icons).length) {
    throw new Error("Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`");
  }

  if (typeof document === 'undefined') {
    throw new Error('`createIcons()` only works in a browser environment.');
  }

  var elementsToReplace = document.querySelectorAll("[" + nameAttr + "]");
  Array.from(elementsToReplace).forEach(function (element) {
    return replaceElement(element, {
      nameAttr: nameAttr,
      icons: icons,
      attrs: attrs
    });
  });
};

export { createIcons };
/*
  Create Element function export.
*/

export { default as createElement } from './createElement';
/*
 Icons exports.
*/

export { allIcons as icons };
export * from './icons';