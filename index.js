
export default class Swipe {


  constructor({ element, click, passive }) {

    this.ـxDown = null;
    this.ـyDown = null;
    this.ـactions = { r: [], l: [], u: [], d: [] };
    this.ـelement = typeof element === 'string' ? document.querySelector(element) : element;

    this.ـelement.addEventListener('touchstart', e => {
      this.ـxDown = e.touches[0].clientX;
      this.ـyDown = e.touches[0].clientY;
    }, { passive: true });
    this.ـelement.addEventListener('touchmove', e => {
      const dir = this.ـhandleTouchMove(e);
      this.ـactions[dir].forEach(fn => fn());
    }, { passive: true });
  }

  left(callback) {
    this.ـl = callback;
    return this;
  }

  right(callback) {
    this.ـr = callback;
    return this;
  }

  up(callback) {
    this.ـu = callback;
    return this;
  }

  down(callback) {
    this.ـd = callback;
    return this;
  }

  ـhandleTouchMove(evt) {
    if (!this.ـxDown || !this.ـyDown) return;

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;
    const xDiff = this.ـxDown - xUp;
    const yDiff = this.ـyDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      xDiff > 0
        ? 'l'
        : 'r';
    }
    else {
      yDiff > 0
        ? 'u'
        : 'd';
    }
    this.ـxDown = null;
    this.ـyDown = null;
  }

}