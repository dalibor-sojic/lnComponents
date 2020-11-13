// Usage: just import it in your html file and all 'a' or 'area' tags that are for external domains will have the target="_blank" attribute added

(function () {

	const DOM_ATTRIBUTE = 'lnExternalLinks';

	if (window.lnExternalLinks != undefined || window.lnExternalLinks != null) {
		return;
	}

	function constructor(domRoot) {
		_findElements(domRoot);
	}

	function _findElements(domRoot) {
		if (domRoot.TEXT_NODE && domRoot.childNodes.length == 0) {
			return;
		}
		function processLinks(links, target = '_blank') {
			// go through all links and correct the target
			for (let i = 0, linksLength = links.length; i < linksLength; i++) {

				if (links[i].hostname != window.location.hostname) {
					console.log("ATTRIBUTES", links[i].attributes)
					links[i].target = target;
					if (links[i].rel !== "noopener noreferrer" || links[i].rel !== "noreferrer noopener") {
						links[i].rel = "noopener noreferrer"
					}
				}
			}
		}
		processLinks(document.links);
	}

	function _domObserver() {
		const observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				if (mutation.type == 'childList') {
					mutation.addedNodes.forEach(function (item) {
						if (item.nodeType !== item.TEXT_NODE) {
							mutation.addedNodes.forEach(function () {
								_findElements();
							});
						}
					})
				}
			})
		})

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		})
	}

	_domObserver();

	// make lnExternalLinks globaly avaliable
	window[DOM_ATTRIBUTE] = constructor;

})()

window.lnExternalLinks(document.body);