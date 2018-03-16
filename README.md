## Introduction

Height Matcher is a very simple, lightweight, dependency-free library for creating equal-height areas of content, for use in column layouts not using flexbox or CSS grids.

## Usage

```javascript
var elems = document.querySelectorAll('.elem');

matchHeight(elems);

window.addEventListener('resize', function () {
  matchHeight(elems);
});
```

By default, elements are resized to match height on a row-by-row basis. If you want to force all the elements to have the same height regardless of row, you can pass `true` as an optional second parameter.


```javascript
var elems = document.querySelectorAll('.elem');

matchHeight(elems, true);

window.addEventListener('resize', function () {
  matchHeight(elems, true);
});
```

To stop matching an elements' height, you can use `matchHeight.restore`:

```javascript
matchHeight.restore(elems);
```

## Example

https://codepen.io/jamiemlaw/pen/weqoZz