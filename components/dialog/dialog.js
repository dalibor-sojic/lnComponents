var dialogsButtons = document.querySelectorAll('[ln-showDialog]');

dialogsButtons.forEach(function(dialogButton) {
	dialogButton.addEventListener("click", function(event){

		let target = dialogButton.getAttribute('ln-showDialog');
		let targetDialog = document.getElementById(target);

		targetDialog.classList.remove('hidden');


		targetDialog.disableEvents = function() {
			targetDialog.querySelectorAll('[ln-close]').forEach(function(button) {
				button.removeEventListener('click', targetDialog.closeEvent);
			});

			targetDialog.querySelectorAll('[ln-submit]').forEach(function(button) {
				button.removeEventListener('click', targetDialog.submitEvent);
			});
		}


		// Close
		targetDialog.close = function() {
			targetDialog.classList.add('hidden');
			targetDialog.disableEvents();

		}

		targetDialog.closeEvent = function() {
			targetDialog.close();
			// Event Dispetch 'lnDialogClosed'
			let ev = new CustomEvent('lnDialogClosed', {
					bubbles: true,
					// detail: {
					// 	// form: serialize(targetDialog)
					// }
				});

			targetDialog.dispatchEvent(ev);

			event.preventDefault();
		}

		targetDialog.querySelectorAll('[ln-close]').forEach(function(button) {
			button.addEventListener('click', targetDialog.closeEvent);

		});


		// Handle Submit button
		targetDialog.submitEvent = function() {
			targetDialog.close();
			// Event Dispetch 'lnDialogClosed'
			let ev = new CustomEvent('lnDialogSubmit', {
					bubbles: true,
					// detail: {
					// 	// form: serialize(targetDialog)
					// }
				});

			targetDialog.dispatchEvent(ev);

			event.preventDefault();
		}

		targetDialog.querySelectorAll('[ln-submit]').forEach(function(button) {
			button.addEventListener('click', targetDialog.submitEvent);

		});
		event.preventDefault();
	});

});