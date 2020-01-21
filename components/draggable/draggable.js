// Usage:
// <div ln-draggable>

(function(){ 
	const DOM_ATTRIBUTE = 'ln';

	// if lnDraggable is already defined, return
	if (window.lnDraggable != undefined || window.lnDraggable != null) {
		return;
	}
	
	function _domObserver() {
		let observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (mutation.type == 'childList') {
					mutation.addedNodes.forEach(function(node) {
						window.lnDraggable(node);
					});
				}
			});
		});

		observer.observe(document.body, {
			childList: true
		});
	}

	_domObserver();
	
	function lnDraggable(dom) {
		let items = dom.querySelectorAll('[ln-draggable]');

		if (items.length == 0) {
			items = [];
		}
		if (dom.hasAttribute('ln-draggable')) {
			items.push(dom);
		}
		items.forEach(function(item) {
			var existing = item[DOM_ATTRIBUTE];
			if (!existing) {
				var lnComponent = new _constructor(item);
				item[DOM_ATTRIBUTE] = lnComponent;
			}
		})
	}

	function _constructor(dom) {
		this.dom = dom;
		_init.call(this);
		return this;
	}

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

	// https://stackoverflow.com/questions/5999998/check-if-a-variable-is-of-function-type
	function isFunction(functionToCheck) {
		return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
	}

	// make lnDraggable globaly avaliable
	window.lnDraggable = lnDraggable;

})();

window.lnDraggable(document.body);
