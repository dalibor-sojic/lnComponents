// Usage:
// <TAG1 ln-scroller
	// ln-scroller-speed="500"
	// ln-scroller-interval="5000"
	// ln-scroller-direction="vertical"
	// ln-scroller-="500"

// >
// 	<button ln-prev>
// 	<button ln-next>
// 	<div class="ln-viewport">
// 		<TAG2 ln-target>
// 			<TAG3>item 1</TAG3>
// 		</TAG2>
// 	</div>
// </TAG1>

(function(){ 
	const DOM_SELECTOR = '[ln-scroller]';
	const DOM_ATTRIBUTE = 'lnScroller';

	// if lnDialog is already defined, return
	if (window[DOM_ATTRIBUTE] != undefined || window[DOM_ATTRIBUTE] != null) {
		return;
	}

	function constructor(dom) {
		var existing = dom[DOM_ATTRIBUTE];
		if (existing) {
			return existing;
		}	

		var lnComponent = new _constructor(dom);
		dom[DOM_ATTRIBUTE] = lnComponent;
		return lnComponent;
	}

	function _findElements(domRoot) {

	}

	function _setObserver() {
		let thiz = this;

		// http://help.dottoro.com/ljdchxcl.php
		// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Mutation_events


		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (mutation.type == "attributes") {
					_getOptions.call(thiz);
				}
			});
		});

		observer.observe(this.dom, {
			attributes: true //configure it to listen to attribute changes
		});
	}

	function _constructor(dom) {
		this.dom = dom;
		// capture 'this'
		let thiz = this;

		_setObserver.apply(this);

		this.currentItem = 0;
		this.target = this.dom.querySelectorAll('[ln-scroller-target]')[0];

		_getOptions.call(this);

		_setListeners.call(this);

		return this;
	}


	function _setListeners() {
		var thiz = this;

		// add event listeners for next
		this.btn = {};

		this.btn.next = this.dom.querySelectorAll('[ln-scroller-next]');
		this.btn.next.forEach(function(button) {
			button.addEventListener('click', function(){
				thiz.next();
			});
		});

		// add event listeners for prev
		this.btn.prev = this.dom.querySelectorAll('[ln-scroller-prev]');
		this.btn.prev.forEach(function(button) {
			// button.addEventListener('click', function(){
			// });

			button.onclick = () => {
				thiz.prev();
				
			}

		});


		// this.dom.addEventListener("wheel", function(x) {
		// 	x.preventDefault();
		// 	if (x.deltaY > 0) {
		// 		thiz.next();
		// 	}
		// 	else {
		// 		thiz.prev();
		// 	}
		// 	return false;
		// }, {passive: true});


		this.dom.onwheel = (x) => {
			x.preventDefault();
			if (x.deltaY > 0) {
				thiz.next();
			}
			else {
				thiz.prev();
			}
		}


	}


	function _getOptions() {
		console.log(this.dom);
		this.options = {};
		this.options.speed = this.dom.getAttribute('ln-scroller-speed') || 500;
		this.options.interval = this.dom.getAttribute('ln-scroller-interval') || 5000;
		this.options.orientation = this.dom.getAttribute('ln-scroller-direction') || 'horizontal';

		_init.apply(this);
	}

	function _init() {
		this.target.style.transitionProperty = 'margin';
		this.target.style.transitionDuration = this.options.speed + 'ms';

		this.maxItems = this.target.childElementCount;

		// set moving direction based on orientation in variables, so you will skip "if" statements later
		this._margin = (this.options.orientation === 'horizontal') ? 'marginLeft' : 'marginTop';
		this._childOffset = (this.options.orientation === 'horizontal') ? 'offsetLeft' : 'offsetTop';

		_createSteps.apply(this);

		return this;
	}

	function _createSteps() {
		this.step = [];
		for(let item of this.target.children) {
			if(this.step.indexOf(item[this._childOffset]) === -1) {
				this.step.push(item[this._childOffset]);
			}
		}
	}


	function next() {
		(this.currentItem === this.step.length) ? this.currentItem = this.step.length : this.currentItem++;
		_scroll.apply(this);
	}
	function prev() {
		(this.currentItem === 0) ? this.currentItem = 0 : this.currentItem--;
		_scroll.apply(this);
	}

	function _scroll() {
		console.log(this.currentItem);
		this.target.style[this._margin] = this.step[this.currentItem] * -1 + 'px';
	}


	// https://stackoverflow.com/questions/5999998/check-if-a-variable-is-of-function-type
	function isFunction(functionToCheck) {
		return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
	}

	// make lnScroller globaly avaliable
	window[DOM_ATTRIBUTE] = constructor;
	_constructor.prototype.next = next;
	_constructor.prototype.prev = prev;

})();

document.querySelectorAll('[ln-scroller]').forEach(function(item) {
	window.lnScroller(item);
})
