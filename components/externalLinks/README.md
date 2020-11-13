# LiveNetworks External Links Component

Plain Javascript Component. Not needed any additional libraries, frameworks.

- Speed up your web site by loading non blocking javascript with defer atrribute;
- You're not sure if you missed or mistyped the 'rel' or 'target' attribute on your website or application?
- Want to make sure all links leading out of your website or web app open in a new browser window?
- It works even with dynamically (javascript/ajax) generated elements;
- Not needed to write single line of javascript to initialize it;

## Usage

### Create obfuscated string

Load script into .html

Initial:

```html
<div>
  <a href="https://www.google.com/" rel="noreferrer" rel="noopener noreferrer"
    >google</a
  >
  <a href="https://twitter.com/">twitter</a>
  <a href="https://www.facebook.com/">facebook</a>
</div>

<a href="https://www.amazingradios.com/">facebook</a>

<script src="ln-external-links.js" defer></script>
```

After:

```html
<div>
  <a href="https://www.google.com/" rel="noopener noreferrer" target="_blank"
    >google</a
  >
  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"
    >twitter</a
  >
  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"
    >facebook</a
  >
</div>

<a
  href="https://www.amazingradios.com/"
  target="_blank"
  rel="noopener noreferrer"
  >facebook</a
>

<script src="ln-external-links.js" defer></script>
```
