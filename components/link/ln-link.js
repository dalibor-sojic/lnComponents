// Usage:
// Add the tag "ln-link" on the container and clicking anywhere in the aforementioned container simulates a click event on the first anchor tag within that container

(function () {
  const DOM_SELECTOR = "ln-link";
  const DOM_ATTRIBUTE = "lnLink";

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

  // Listens for DOM changes
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
    let firstLink = this.dom.querySelector("a");
    // Simulates a click event on the first link within the ln-link container
    this.dom.addEventListener("click", () => {
      firstLink.click();
    });
  }

  // make lnLink globaly avaliable
  window[DOM_ATTRIBUTE] = constructor;
})();

window.lnLink(document.body);
