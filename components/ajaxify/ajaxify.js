(function(){

	// Usage:
	// <a ln-ajax-target="divId">ajax load</a>
	// <div id="divId"></div>

	// if lnAjaxify is already defined, return
	if (window.lnAjaxify != undefined || window.lnAjaxify != null) {
		return;
	}

	const DOM_ATTRIBUTE = 'ln';
	
	function _domObserver() {
		let observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (mutation.type == 'childList') {
					document.querySelectorAll('[ln-ajax-target]').forEach(function(item) {
						window.lnAjaxify(item);
					})

				}
			});
		});

		observer.observe(document.body, {
			childList: true
		});
	}

	_domObserver();

	const events = {
		'lnLinkClicked': {

		},
		'lnXhrStarted': {

		},
		'lnXhrEnded': {

		},
		'lnXhrOK': {

		}
	}

	function lnAjaxify(link) {
		var existing = link[DOM_ATTRIBUTE];
		if (!existing) {
			var lnComponent = new _constructor(link);
			link[DOM_ATTRIBUTE] = lnComponent;
		}
	}

	function _constructor(link) {
		link.onclick = function() {
			let thiz = this;
			dispatchEvent.call(this, 'lnLinkClicked');

			let xhr = new XMLHttpRequest();

			xhr.onload = function () {
				// Process our return data
				dispatchEvent.call(thiz, 'lnXhrStarted');

				if (xhr.status >= 200 && xhr.status < 300) {
					// What do when the request is successful
					dispatchEvent.call(thiz, 'lnXhrOK');

					document.getElementById(link.getAttribute('ln-ajax-target')).outerHTML = xhr.response;
					document.title = decodeURI(xhr.getResponseHeader('X-LN-Title'));
					history.pushState(null, 'title', link.href);
					// lnAjaxify(document.getElementById(link.getAttribute('ln-ajax-target')));

				} else {
					// What do when the request fails
					// console.log('The request failed!');
				}
				// Code that should run regardless of the request status
				// console.log('This always runs...');
				dispatchEvent.call(thiz, 'lnXhrEnded');
			}

			// if the clicked link is equal to current page, do nothing
			if (link.href !== window.location.href) {
				xhr.open('GET', this.href);
				xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
				xhr.send();
			}

			return false;
		}
		return this;
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

	window.lnAjaxify = lnAjaxify;

})();

lnAjaxify(document.body);
