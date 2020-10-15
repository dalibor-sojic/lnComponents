# LiveNetworks Obfuscator Component

Plain Javascript Component. Not needed any additional libraries, frameworks.

- Speed up your web site by loading non blocking javascript with defer atrribute;
- Keep your e-mail, telephone number, address... any other personal data from spam crawlers;
- It works even with dynamically (javascript/ajax) generated elements;
- Not needed to write single line of javascript to initialize it;

## Usage
### Create obfuscated string
Load script into .html
```html
<script src="ln-obfuscator.js" defer></script>
```
In the console:
```javascript
window.lnObfuscator.obfuscate(10, '<a href="mailto:protect@me.com">protect@me.com</a>');
```
Result:
```html
<k rbop="wksvdy:zbydomd@wo.myw">zbydomd@wo.myw</k>
```
Your final html markup
```html
<span ln-obfuscator="10">
	<k rbop="wksvdy:zbydomd@wo.myw">zbydomd@wo.myw</k>
</span>
<script src="ln-obfuscator.js" defer></script>
```
