// Usage:
// <a href="#" ln-popup="POPUPOPTIONS">
// POPUPOPTIONS = "width=300,height=300,scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no"
// (https://javascript.info/popup-windows)

(function(){ 
	const DOM_ATTRIBUTE = 'ln';

	// if lnDialog is already defined, return
	if (window.lnPopup != undefined || window.lnPopup != null) {
		return;
	}

	function lnPopup(dom) {
		var existing = dom[DOM_ATTRIBUTE];
		if (existing) {
			return existing;
		}

		var lnComponent = new _constructor(dom);
		dom[DOM_ATTRIBUTE] = lnComponent;
		return lnComponent;
	}

	function _constructor(dom) {
		this.dom = dom;
		_domObserver.call(this);
		_getOptions.call(this);
		return this;
	}

	function _domObserver() {
		let thiz = this;
		let observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (mutation.type == 'childList') {
					document.querySelectorAll('[ln-popup]').forEach(function(item) {
						window.lnPopup(item);
					})

				}
			});
		});

		observer.observe(document.body, {
			childList: true
		});
	}

	function _init() {
		let thiz = this;
		this.dom.onclick = function(event) {
			event = event || window.event;
			event.preventDefault();
			window.open(event.target.href, event.target.target, thiz.options);
			return false;
		};
		return this;
	}

	function _getOptions() {
		this.options = this.dom.getAttribute('ln-popup');
		_init.call(this);
	}


	// https://stackoverflow.com/questions/5999998/check-if-a-variable-is-of-function-type
	function isFunction(functionToCheck) {
		return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
	}

	// make lnPopup globaly avaliable
	window.lnPopup = lnPopup;

})();

document.querySelectorAll('[ln-popup]').forEach(function(item) {
	window.lnPopup(item);
})
