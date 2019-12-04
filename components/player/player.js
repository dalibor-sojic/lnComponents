// Usage:
// <TAG1 ln-player>
// 	<button ln-player-action="play">
// 	<button ln-player-action="pause">
// 	<div class="ln-viewport">
// 		<TAG2 ln-target>
// 			<TAG3>item 1</TAG3>
// 		</TAG2>
// 	</div>
// </TAG1>

(function(){ 
	const DOM_ATTRIBUTE = 'ln';

	// if lnDialog is already defined, return
	if (window.lnPlayer != undefined || window.lnPlayer != null) {
		return;
	}

	function lnPlayer(dom) {
		var existing = dom[DOM_ATTRIBUTE];
		if (existing) {
			return existing;
		}	

		var lnComponent = new _constructor(dom);
		dom[DOM_ATTRIBUTE] = lnComponent;
		return lnComponent;
	}

	function _setObserver() {
		let thiz = this;
		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (mutation.type == "attributes") {
					_getOptions.apply(thiz);
				}
			});
		});

		observer.observe(this.dom, {
			attributes: true //configure it to listen to attribute changes
		});
	}

	function _constructor(dom) {
		this.dom = dom;
		// _init.call(this);

		_setObserver.call(this);

		_getOptions.call(this);

		_setListeners.call(this);

		return this;
	}

	function _init() {
		// If multiple players on page/domain, get intance name in order to use it in local storage
		this.instanceName = this.dom.getAttribute('ln-player') || 'main';

		this.audio = this.dom.getElementsByTagName('audio')[0];
		// this.audio.load();
		this.audio.play();

		this.ls = {};
		this.ls.volume = this.instanceName + '.volume';


		this._eventDetails = {
			player: this.instanceName
		}

		return this;
	}


	function _setListeners() {
		var thiz = this;
		// add event listeners for actions
		this.btn = {};

		this.btn = this.dom.querySelectorAll('[ln-player-action]');
		this.btn.forEach(function(button) {

			button.addEventListener('click', function(){
				let action = button.getAttribute('ln-player-action');
				thiz[action].call(thiz, this);
			}, {passive: true});
		});

		this.volumeSlider = this.dom.querySelectorAll('[ln-player-volume]')[0];
		this.volumeSlider.addEventListener('input', function(){
			thiz.setVolume(this.value / 100);
		});

		this.setVolume(localStorage.getItem(this.ls.volume) || 0.2);

		this.volumeControll = this.dom.addEventListener("wheel", function(event) {
			event = event || window.event;

			if (x.deltaY > 0) {
				thiz.setVolume(thiz.audio.volume + 0.05);
			}
			else {
				thiz.setVolume(thiz.audio.volume - 0.05);
			}
			
			if(event.preventDefault){
				event.preventDefault();
			}
			if (event.stopPropagation) {
				event.stopPropagation();
			}
			return false;
		}, {passive: true});


		this.audio.addEventListener('volumechange', function(x) {
			console.log(x);
		})


	}

	function _getOptions() {
		this.options = {};
		_init.apply(this);
	}


	function play() {
		this.audio.play();
	}
	function pause() {
		this.audio.pause();
	}
	function stop() {
		this.audio.pause();
	}

	function mute() {
		this.audio.muted = true;
	}
	function unmute() {
		this.audio.muted = false;
	}
	function setVolume(value) {
		this.audio.volume = value;
		this.volumeSlider.value = value * 100;
		localStorage.setItem(this.ls.volume, value);
	}


	function _dispatchEvent() {
		lnEvent =  new CustomEvent('lnPlayer', {detail: this._eventDetails});
		document.dispatchEvent(lnEvent);
	}

	// https://stackoverflow.com/questions/5999998/check-if-a-variable-is-of-function-type
	function isFunction(functionToCheck) {
		return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
	}

	// make lnScroller globaly avaliable
	window.lnPlayer = lnPlayer;
	_constructor.prototype.play 	= play;
	_constructor.prototype.pause 	= pause;
	_constructor.prototype.stop 	= stop;
	_constructor.prototype.mute 	= mute;
	_constructor.prototype.unmute 	= unmute;
	_constructor.prototype.setVolume = setVolume;

})();

document.querySelectorAll('[ln-player]').forEach(function(item) {
	window.lnPlayer(item);
})
