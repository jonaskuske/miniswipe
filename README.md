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
const swipeHandler = new Miniswipe(document.body, { debug: false, allowClick: true })
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
  swipeHandler
    .left(() => console.log('User swiped left!'))
    .right(() => console.log('User swiped right!'))
    .up(() => console.log('User swiped up!'))
    .down(() => console.log('User swiped down!'))
```
The functions you pass to `left`, `right`, `up` or `down` have the swipe handler's target element bound as their `this` context (unless lexically scoped) and receive the event that completed the swipe ('touchmove', 'mouseup' or 'mouseleave' if `{ allowMouseLeave: true }` in options) as their first argument. Example:
```javascript
  swipeHandler.up(function(event) {
    console.log(this === event.currentTarget) // > true
  })
```
### `start`
#### Start listening for touch events
```javascript
  swipeHandler.start()
```
### `stop`
#### Stop listening for touch events
```javascript
  swipeHandler.stop()
```
### `active`
#### Set to `true` or `false` depending on whether the handler is started or stopped
```javascript
  if (swipeHandler.active) swipeHandler.stop()
```
## Roadmap

Planned features include:  
- define a threshold for minimum swipe length  
- multi-finger support (e.g. two-finger swipe up)  
- more supported gestures (e.g. pinch-to-zoom, tap, long-tap)  
- swipe distance tracking
