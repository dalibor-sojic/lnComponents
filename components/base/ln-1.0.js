document.body.addEventListener('click', function(e) {
	console.log(e);

	if (e.target.hasAttribute('ln-showDialog')) {
		dialog.init(e.target.getAttribute('ln-showDialog'));
	}
});


var ln = {
	DOM_ATTRIBUTE: "ln",
};


// primer

let pero = document.getElementById("pero");
pero.tekst = "Bla bla";

let pero1 = document.getElementById("pero");
console.log(pero1.tekst);


