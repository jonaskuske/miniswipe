(function (global, indexFn) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? module.exports = indexFn
    : global.Miniswipe = indexFn
})(this,

  /**
   * Create a swipe handler for a given DOM Node.
   * @typedef {Object} Options
   * @property {boolean} debug If set to true, miniswipe will log every registered swipe gesture.
   * @property {boolean} allowClick If set to true, miniswipe will also handle mouse gestures.
   * @param {string|HTMLElement} element A CSS selector or a DOM Node.
   * @param {Options} options Additional options.
   */
  function (element, options) {

    const error = err => { throw new Error(`[miniswipe] ${err}`) }
    const log = msg => console.log(`[miniswipe] ${msg}`)
    const validateFn = fn => typeof fn !== 'function' && error('Passed element is not of type "Function".')

    const this$ = {
      xDown: null,
      yDown: null,
      actions: { right: [], left: [], up: [], down: [] },
      handleTouchMove(e) {
        const dir = this$.getSwipeDirection(e)

        if (!dir) return
        if (this$.config.debug) log(`
          swipe direction: ${dir}, calling ${this$.actions[dir].length} method(s):
          ${this$.actions[dir].join('\n')}`
        )

        this$.actions[dir].forEach(fn => fn.call(this$.element, e))
      },
      getSwipeDirection(evt) {
        if (!this$.xDown || !this$.yDown) return

        const xUp = evt.clientX || evt.touches && evt.touches[0] && evt.touches[0].clientX
        const yUp = evt.clientY || evt.touches && evt.touches[0] && evt.touches[0].clientY
        const xDiff = this$.xDown - xUp
        const yDiff = this$.yDown - yUp
        this$.xDown = null
        this$.yDown = null

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          return xDiff > 0
            ? 'left'
            : 'right'
        }
        else if (Math.abs(xDiff) < Math.abs(yDiff)) {
          return yDiff > 0
            ? 'up'
            : 'down'
        }
      }
    }


    class SwipeHandler {

      constructor(element, options) {
        this.active = false
        this$.config = options || {}
        this$.element = typeof element === 'string' ? document.querySelector(element) : element
        this$.element.addEventListener('touchstart', e => {
          this$.xDown = e.touches && e.touches[0] && e.touches[0].clientX
          this$.yDown = e.touches && e.touches[0] && e.touches[0].clientY
        })
        this$.element.addEventListener('mousedown', e => {
          this$.xDown = e.clientX
          this$.yDown = e.clientY
        })
      }

      /**
       * Start listening for touch gestures
       */
      start() {
        if (this.active) error('Can\'t start swipeHandler - it is running already.')

        this$.element.addEventListener('touchmove', this$.handleTouchMove)
        const { allowClick } = this$.config
        allowClick && this$.element.addEventListener('mouseup', this$.handleTouchMove)
        this.active = true

        return this
      }

      /**
       * Stop listening for touch gestures
       */
      stop() {
        if (!this.active) error('Can\'t stop swipeHandler - it is inactive already.')

        this$.element.removeEventListener('mouseup', this$.handleTouchMove)
        this$.element.removeEventListener('touchmove', this$.handleTouchMove)
        this.active = false

        return this
      }

      /**
       * Takes a function and runs it everytime a leftwards swipe is registered.
       * @param {function} callback The function to be executed.
       */
      left(callback) {
        validateFn(callback)
        this$.actions.left.push(callback)
        return this
      }

      /**
       * Takes a function and runs it everytime a rightwards swipe is registered.
       * @param {function} callback The function to be executed.
       */
      right(callback) {
        validateFn(callback)
        this$.actions.right.push(callback)
        return this
      }

      /**
       * Takes a function and runs it everytime an upwards swipe is registered.
       * @param {function} callback The function to be executed.
       */
      up(callback) {
        validateFn(callback)
        this$.actions.up.push(callback)
        return this
      }

      /**
       * Takes a function and runs it everytime a downwards swipe is registered.
       * @param {function} callback The function to be executed.
       */
      down(callback) {
        validateFn(callback)
        this$.actions.down.push(callback)
        return this
      }

    }

    return new SwipeHandler(element, options)

  })