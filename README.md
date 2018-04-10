# miniswipe

A tiny library designed to handle swipe gestures on touchscreens.
Written in ES2015+, use Babel for cross-browser support.
> Warning:
If you look for a polished, production-grade and feature-rich library for handling touch events, please continue your search.
This library is in a **very early** state and built mostly for educational purposes.

## Installation

### NPM

````bash
  npm install miniswipe --save
````
### Manual
>`Miniswipe` will be added to window as a global.
````html
<script type="text/javascript" src="index.js"></script>
````

## Usage

### `Miniswipe`: Create a new handler for touch events

```javascript
const newHandler = new Miniswipe(document.body, {debug: true})
```
##### Arguments:
`{string | HTMLElement} The element on which the handler listens for touch gestures`
`{Object} Additional options. As of now, only debug is supported. When set to true, miniswipe logs registered swipes and the subsequently executed functions`

#### Associate methods with swipe gestures

```javascript
  newHandler
    .left(() => console.log('User swiped left!'))
    .right(() => console.log('User swiped right!'))
    .up(() => console.log('User swiped up!'))
    .down(() => console.log('User swiped down!'))
```

#### Start listening for touch events

```javascript
  newHandler.start()
```
#### Stop listening for touch events
```javascript
  newHandler.stop()
```