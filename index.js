function SwipeHandler() {

  const internal = {
    xDown: null,
    yDown: null,
    actions: { right: [], left: [], up: [], down: [] },
    handleTouchMove(evt) {
      if (!internal.xDown || !internal.yDown) return;
  
      const xUp = evt.touches[0].clientX;
      const yUp = evt.touches[0].clientY;
      const xDiff = internal.xDown - xUp;
      const yDiff = internal.yDown - yUp;
      internal.xDown = null;
      internal.yDown = null;
  
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        return xDiff > 0
          ? 'l'
          : 'r';
      }
      else {
        return yDiff > 0
          ? 'u'
          : 'd';
      }
    }
  };
  
  const validateFn = fn => { if (typeof fn !== 'function') throw new Error('Passed element is not of type "Function".') };

  class Swipe {
  
    constructor({ element, click, passive }) {
      internal.element = typeof element === 'string' ? document.querySelector(element) : element;
  
      internal.element.addEventListener('touchstart', e => {
        internal.xDown = e && e.touches && e.touches[0] && e.touches[0].clientX;
        internal.yDown = e && e.touches && e.touches[0] && e.touches[0].clientY;
      });

      internal.element.addEventListener('touchmove', e => {
        const dir = internal.handleTouchMove(e);
        if (!dir) return;
  
        internal.actions[dir].forEach(fn => fn());
      });
    }
  
    left(callback) {
      validateFn(callback);
      internal.left = callback;
      return this;
    }
  
    right(callback) {
      validateFn(callback);
      internal.right = callback;
      return this;
    }
  
    up(callback) {
      validateFn(callback);
      internal.up = callback;
      return this;
    }
  
    down(callback) {
      validateFn(callback);
      internal.down = callback;
      return this;
    }
  
  }
  
  return new Swipe(...arguments);

}

export default SwipeHandler;