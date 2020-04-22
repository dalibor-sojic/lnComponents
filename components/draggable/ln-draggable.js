// Usage:
// <div ln-draggable>

(function(){
	const DOM_SELECTOR = 'ln-draggable';
	const DOM_ATTRIBUTE = 'lnDraggable';


	// if the component is already defined, return
	if (window[DOM_ATTRIBUTE] != undefined || window[DOM_ATTRIBUTE] != null) {
		return;
	}

	function constructor(domRoot) {
		_findElements(domRoot);
	}

	function _findElements(domRoot) {
		let items = domRoot.querySelectorAll('[' + DOM_SELECTOR + ']') || [];

		console.log(typeof(items));

		if (domRoot.hasAttribute(DOM_SELECTOR)) {
			items.push(domRoot);
		}

		items.forEach(function(item) {
			if (!item[DOM_ATTRIBUTE]) {
				item[DOM_ATTRIBUTE] = new _constructor(item);
			}
		})
	}

	function _constructor(dom) {
		this.dom = dom;
		_init.call(this);
		return this;
	}

	function _domObserver() {
		let observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (mutation.type == 'childList') {
					console.log(mutation.addedNodes);
					mutation.addedNodes.forEach(function(item) {
						_findElements(item);
					})
				}
			});
		});

		observer.observe(document.body, {
			childList: true
		});
	}

	_domObserver();

	
	// Edit Below

	function _init() {
		let thiz = this;
		this.pos1 = 0, this.pos2 = 0, this.pos3 = 0, this.pos4 = 0;
		if (this.dom.querySelectorAll("header")) {
			console.log('Ima heder');
			// if present, the header is where you move the DIV from:
			target = this.dom.querySelectorAll("header")[0];
		} else {
			// otherwise, move the DIV from anywhere inside the DIV:
			target = this.dom;
		}
		target.onmousedown = function (e) {
			console.log('asdf');
			e = e || window.event;
			e.preventDefault();
			// get the mouse cursor position at startup:
			this.pos3 = e.clientX;
			this.pos4 = e.clientY;
			console.log(this.pos1, this.pos2, this.pos3, this.pos4);
			document.onmouseup = function(e) {
				document.onmouseup = null;
				document.onmousemove = null;
			}
			// call a function whenever the cursor moves:
			document.onmousemove = function(e) {

				e = e || window.event;
				e.preventDefault();
				// calculate the new cursor position:
				this.pos1 = this.pos3 - e.clientX;
				this.pos2 = this.pos4 - e.clientY;
				this.pos3 = e.clientX;
				this.pos4 = e.clientY;
				console.log(this.pos1, this.pos2, this.pos3, this.pos4);
				// set the element's new position:
				thiz.dom.style.top = (thiz.dom.offsetTop - this.pos2) + "px";
				thiz.dom.style.left = (thiz.dom.offsetLeft - this.pos1) + "px";
			}
			return false;
		}
		return this;
	}

	function _closeDragElement() {
	// stop moving when mouse button is released:
	}

	// make lnDraggable globaly avaliable
	window[DOM_ATTRIBUTE] = constructor;

})();

window.lnDraggable(document.body);
