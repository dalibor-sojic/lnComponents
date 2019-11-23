// create isolated scope
(function(){ 
	const DOM_ATTRIBUTE = 'ln';

	// if lnDialog is already defined, return
	if (window.lnDialog != undefined || window.lnDialog != null) {
		return;
	}

	function lnDialog(dom) {
		var existingDialog = dom[DOM_ATTRIBUTE];
		if (existingDialog) {
			return existingDialog;
		}	

		var dialog = new _constructor(dom);
		dom[DOM_ATTRIBUTE] = dialog;
		return dialog;
	}

	function lnDialog(dom) {
		var existingDialog = dom[DOM_ATTRIBUTE];
		if (existingDialog) {
			return existingDialog;
		}	

		var dialog = new _constructor(dom);
		dom[DOM_ATTRIBUTE] = dialog;
		return dialog;
	}


	function _constructor(dom) {
		this.dom = dom;

		// capture 'this'
		let thiz = this;

		// add event listeners for close
		this.dom.querySelectorAll('[ln-close]').forEach(function(button) {
			button.addEventListener('click', function(){
				thiz.close()
			});
		});

		// add event listeners for submit
		this.dom.querySelectorAll('[ln-submit]').forEach(function(button) {
			button.addEventListener('click', function(){
				thiz.submit()
			});

		});

		return this;
	}

	function open() {
		this.dom.classList.add('show');

		// check if onSibmt exists and is a function
		if (this.onOpen != undefined 
			&& this.onOpen != null 
			&& isFunction(this.onOpen)) {
			// execute the function asynchronously, on the next tick
			setTimeout(this.onOpen, 0);
		}
	}

	function close() {
		this.dom.classList.remove('show');

		// check if onSibmt exists and is a function
		if (this.onClose != undefined 
			&& this.onClose != null 
			&& isFunction(this.onClose)) {
			// execute the function asynchronously, on the next tick
			setTimeout(this.onClose, 0);
		}
	}

	function submit() {
		this.close();

		// check if onSibmt exists and is a function
		if (this.onSubmit != undefined 
			&& this.onSubmit != null 
			&& isFunction(this.onSubmit)) {
			// execute the function asynchronously, on the next tick
			setTimeout(this.onSubmit, 0);
		}
	}

	// https://stackoverflow.com/questions/5999998/check-if-a-variable-is-of-function-type
	function isFunction(functionToCheck) {
	 return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
	}

	// make lnDialog globaly avaliable
	window.lnDialog = lnDialog;
	_constructor.prototype.open = open;
	_constructor.prototype.close = close;
	_constructor.prototype.submit = submit;

})();
