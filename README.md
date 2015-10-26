# Autoactive Menu Class

## Usage

Use the plugin as follows:

```js
$('#nav a').autoactive({
	class: 'active',// active class name
	diff: 70,		// differece added in calcs
	interval: 200,	// timeout
	clickSleep:1500,// sleep a time after menu click (fix changing classes when page scroll by click)
});
```

Or just do:

```js
$('#nav a').autoactive();
```
