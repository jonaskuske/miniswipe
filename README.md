# miniswipe

A tiny library designed to handle swipe gestures on touchscreens.
Written in ES2015+, use Babel for cross-browser support.
> Warning:
If you look for a polished, production-grade and feature-rich library for handling touch events, please continue your search.
This library is in an **early state**, built mostly for educational purposes and not tested thoroughly yet.

## Installation
### NPM
````bash
  npm install miniswipe --save
````
### Manual
>`Miniswipe` will be added to window as a global.
````html
<script type="text/javascript" src="https://unpkg.com/miniswipe"></script>
````
## Usage
### `Miniswipe`
#### Create a new handler for touch events
```javascript
const newHandler = new Miniswipe(document.body, { debug: false, allowClick: true })
```
##### Arguments:
`{string | HTMLElement} The element on which the handler listens for touch gestures`  
`{Object} Options`  
###### Options  
`{Options.allowClick} If true: miniswipe will handle not only touch events but mouse gestures as well`  
`{Options.allowMouseLeave} If true: allow swipes to end with a mouseleave event rather than just mouseup`  
`{Options.debug} If true: miniswipe will log every registered swipe and the subsequently executed functions`  
### `left`,`right`,`up`,`down`
#### Associate methods with swipe gestures
```javascript
  newHandler
    .left(() => console.log('User swiped left!'))
    .right(() => console.log('User swiped right!'))
    .up(() => console.log('User swiped up!'))
    .down(() => console.log('User swiped down!'))
```
### `start`
#### Start listening for touch events
```javascript
  newHandler.start()
```
### `stop`
#### Stop listening for touch events
```javascript
  newHandler.stop()
```
### `active`
#### Set to `true` or `false` depending on whether the handler is started or stopped
```javascript
  if (newHandler.active) newHandler.stop()
```
