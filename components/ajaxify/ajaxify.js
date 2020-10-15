(function(){

	// Usage:
	// <a ln-ajax-target="divId" href="page.html">ajax load</a>
	// <div id="divId"></div>

	const DOM_SELECTOR = "ln-ajax-target";
	const DOM_ATTRIBUTE = "lnAjaxify";

	// if the component is already defined, return
	if (window[DOM_ATTRIBUTE] != undefined || window[DOM_ATTRIBUTE] != null) {
		return;
	}

	function constructor(domRoot) {
		_findElements(domRoot);
	}

	function _findElements(domRoot) {
		if(domRoot.TEXT_NODE && domRoot.childNodes.length == 0) {
			return;
		}
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
		this.dom.onclick = function() {
			let thiz = this;
			dispatchEvent.call(this, 'lnLinkClicked');

			let xhr = new XMLHttpRequest();

			xhr.onload = function () {
				let thiz = this;
				dispatchEvent.call(this, "lnLinkClicked");

				let xhr = new XMLHttpRequest();

				xhr.onload = function () {
					//	process our return data
					dispatchEvent.call(thiz, "lnXhrStarted");
					if (xhr.status >= 200 && xhr.status < 300) {
						// What to do when the request is successful
						dispatchEvent.call(thiz, "lnXhrOK");

						document.getElementById(
							link.getAttribute(DOM_SELECTOR)
						).outerHTML = xhr.response;
						history.pushState(null, "title", link.href);
					} else {
						// What to do when the request fails
						dispatchEvent.call(thiz, "lnXhrFailed")
						console.log("The request failed");
					}
					// Code that should run regardless of the request status
					// console.log('This always runs...');
					dispatchEvent.call(thiz, "lnXhrEnded");
				};

				// if the clicked link is equal to current page, do nothing

				if (link.href !== window.location.href) {
					xhr.open("GET", this.href);
					xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
					xhr.send();
				}
				return false;
			}
		}
	}


	const events = {
		'lnLinkClicked': {

		},
		'lnXhrStarted': {

		},
		'lnXhrEnded': {

		},
		'lnXhrOK': {

		},
		'lnXhrFailed': {

		}
	}

	function dispatchEvent(eventName) {

		let detail = {};
		detail[eventName] = events[eventName];

		let ev = new CustomEvent(eventName, {
			bubbles: true,
			detail
		});

		this.dispatchEvent(ev);
	}

	// make lnAjaxify globaly avaliable
	window[DOM_ATTRIBUTE] = constructor;

})();

window.lnAjaxify(document.body);
