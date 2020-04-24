// Usage:
// Add the tag "ln-obfuscate" with the ROT number and all HTML inside will be obfuscated by the ROT amount

(function () {
  const DOM_SELECTOR = "ln-obfuscator";
  const DOM_ATTRIBUTE = "lnObfuscator";

  // if the component is already defined, return
  if (window[DOM_ATTRIBUTE] != undefined || window[DOM_ATTRIBUTE] != null) {
    return;
  }

  function constructor(domRoot) {
    _findElements(domRoot);
  }

  function _findElements(domRoot) {
    let items =
      Array.from(domRoot.querySelectorAll("[" + DOM_SELECTOR + "]")) || [];

    if (domRoot.hasAttribute(DOM_SELECTOR)) {
      items.push(domRoot);
    }

    items.forEach(function (item) {
      if (!item[DOM_ATTRIBUTE]) {
        item[DOM_ATTRIBUTE] = new _constructor(item);
      }
    });
  }

  function _constructor(dom) {
    this.dom = dom;
    _init.call(this);
    return this;
  }

  // Listenes for DOM changes
  function _domObserver() {
    let observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type == "childList") {
          mutation.addedNodes.forEach(function (item) {
            _findElements(item);
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
    });
  }

  _domObserver();

  function _init() {
    let obfuscationNum = _handleParam.call(this);
    this.dom.innerHTML = obfuscate(obfuscationNum, this.dom.innerHTML);
  }

  // Retrieves the ROT number
  function _handleParam() {
    return Number(this.dom.getAttribute(DOM_SELECTOR));
  }

  // Obfuscate algorithm
  function obfuscate(obfuscationNum, sourceContent) {
    return sourceContent.replace(/[a-zA-Z]/g, function (c) {
      return String.fromCharCode(
        (c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + obfuscationNum)
          ? c
          : c - 26
      );
    });
  }

  // make lnObfuscate globaly avaliable
  window[DOM_ATTRIBUTE] = constructor;
  // Ads an obfuscate method to lnObfuscate
  window[DOM_ATTRIBUTE].obfuscate = obfuscate;
})();

window.lnObfuscator(document.body);
