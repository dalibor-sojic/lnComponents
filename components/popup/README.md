# LiveNetworks Popup Component

Plain Javascript Component. Not needed any additional libraries, frameworks.

- Speed up your web site by loading non blocking javascript with defer atrribute;
- Facebook share button, without loading heavy, blocking facebook SDK;
- It works even with dynamically (javascript/ajax) generated elements;
- Not needed to write single line of javascript to initialize it;

## Usage
```html
<a href="#"
	ln-popup="width=300,height=300,scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no"
	target="windowName"
>
	Link Text
</a>

<script src="ln-popup.js" defer></script>
```

## Examples
```html
<a 
	href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40livenetworks%2Fpopup"
	ln-popup="width=555,height=745,scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no">Facebook</a>
```
