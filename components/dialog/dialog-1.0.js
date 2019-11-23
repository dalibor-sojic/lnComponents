dialog = {
	init: function(target) {
		dialog.targetDialog = document.getElementById(target);

		// dialog.targetDialog.classList.remove('hidden');
		let attr = document.createAttribute("open");
		dialog.targetDialog.setAttributeNode(attr);

		dialog.targetDialog.querySelectorAll('[ln-close]').forEach(function(button) {
			button.addEventListener('click', dialog.closeEvent);
		});

		dialog.targetDialog.querySelectorAll('[ln-submit]').forEach(function(button) {
			button.addEventListener('click', dialog.submitEvent);

		});

		// event.preventDefault();

	},


	// Close
	close: function() {
		// dialog.targetDialog.classList.add('hidden');
		dialog.targetDialog.removeAttribute('open');

		dialog.disableEvents();
	},

	closeEvent: function() {
		dialog.close();
		// Event Dispetch 'lnDialogClosed'
		let ev = new CustomEvent('lnDialogClosed', {
				bubbles: true,
				// detail: {
				// 	// form: serialize(targetDialog)
				// }
			});

		dialog.targetDialog.dispatchEvent(ev);
		// event.preventDefault();
	},

	disableEvents: function() {
		dialog.targetDialog.querySelectorAll('[ln-close]').forEach(function(button) {
			button.removeEventListener('click', dialog.closeEvent);
		});

		dialog.targetDialog.querySelectorAll('[ln-submit]').forEach(function(button) {
			button.removeEventListener('click', dialog.submitEvent);
		});
	},

	// Handle Submit button
	submitEvent: function() {
		dialog.close();
		// Event Dispetch 'lnDialogClosed'
		let ev = new CustomEvent('lnDialogSubmit', {
				bubbles: true,
				// detail: {
				// 	// form: serialize(targetDialog)
				// }
			});

		dialog.targetDialog.dispatchEvent(ev);
		// event.preventDefault();
	}
}


