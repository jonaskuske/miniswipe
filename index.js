(function (global, indexFn) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? module.exports = indexFn
    : global.Miniswipe = indexFn
})(this, function () {

  const error = err => { throw new Error(`[miniswipe] ${err}`) }
  const log = msg => console.log(`[miniswipe] ${msg}`)
  const validateFn = fn => typeof fn !== 'function' && error('Passed element is not of type "Function".')

  const this$ = {
    xDown: null,
    yDown: null,
    active: false,
    actions: { right: [], left: [], up: [], down: [] },
    handleTouchMove(e) {
      const dir = this$.getSwipeDirection(e)

      if (!dir) return
      if (this$.config.debug) log(`
      swipe direction: ${dir}, calling ${this$.actions[dir].length} method(s):
      ${this$.actions[dir].join('\n')}`
      )

      this$.actions[dir].forEach(fn => fn.call(this))
    },
    getSwipeDirection(evt) {
      if (!this$.xDown || !this$.yDown) return

      const xUp = evt.touches && evt.touches[0] && evt.touches[0].clientX
      const yUp = evt.touches && evt.touches[0] && evt.touches[0].clientY
      const xDiff = this$.xDown - xUp
      const yDiff = this$.yDown - yUp
      this$.xDown = null
      this$.yDown = null

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        return xDiff > 0
          ? 'left'
          : 'right'
      }
      else {
        return yDiff > 0
          ? 'up'
          : 'down'
      }
    }
  }


  class SwipeHandler {

    constructor(element, config) {
      this$.config = config || {}
      this$.element = typeof element === 'string' ? document.querySelector(element) : element
      this$.element.addEventListener('touchstart', e => {
        this$.xDown = e && e.touches && e.touches[0] && e.touches[0].clientX
        this$.yDown = e && e.touches && e.touches[0] && e.touches[0].clientY
      })
    }

    start() {
      if (this$.active) error('Can\'t start swipeHandler - it is running already.')
      this$.element.addEventListener('touchmove', this$.handleTouchMove)
      this$.active = true
    }

    stop() {
      if (!this$.active) error('Can\'t stop swipeHandler - it is inactive already.')
      this$.element.removeEventListener('touchmove', this$.handleTouchMove)
      this$.active = false
    }

    left(callback) {
      validateFn(callback)
      this$.actions.left.push(callback)
      return this
    }

    right(callback) {
      validateFn(callback)
      this$.actions.right.push(callback)
      return this
    }

    up(callback) {
      validateFn(callback)
      this$.actions.up.push(callback)
      return this
    }

    down(callback) {
      validateFn(callback)
      this$.actions.down.push(callback)
      return this
    }

  }

  return new SwipeHandler(...arguments)

})