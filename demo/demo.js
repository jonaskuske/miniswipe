const output = document.querySelector('p')
let swipeHandler

function createMiniswipe(options) {
  const miniswipe = new Miniswipe(document.body, options)

  miniswipe
    .left(function (e) { this.style.background = 'green' })
    .right(function (e) { this.style.background = 'rebeccapurple' })
    .down(function (e) { this.style.background = 'darkblue' })
    .up(function (e) { this.style.background = 'darkred' })

  miniswipe
    .left((e) => output.textContent = 'LEFT')
    .right((e) => output.textContent = 'RIGHT')
    .down((e) => output.textContent = 'DOWN')
    .up((e) => output.textContent = 'UP')

  return miniswipe.start()
}

swipeHandler = createMiniswipe({ debug: true, allowClick: false })


/* Logic for toggling miniswipe options on the demo page */

const getLabel = ({ id, labels }) => labels && labels[0] || document.querySelector(`label[for=${id}]`)
const toggleMiniswipe = document.querySelector('#toggle-miniswipe')
const toggleMouse = document.querySelector('#toggle-mouse')
const toggleMouseLeave = document.querySelector('#toggle-mouseleave')

toggleMiniswipe.addEventListener('click', function () {
  swipeHandler.active ? swipeHandler.stop() : swipeHandler.start()

  getLabel(this).dataset.state = `miniswipe is ${this.checked ? 'active' : 'not active'}`
})
toggleMouse.addEventListener('click', function () {
  swipeHandler.active && swipeHandler.stop()
  swipeHandler = createMiniswipe({ debug: true, allowClick: this.checked })

  getLabel(this).dataset.state = `mouse detection is ${this.checked ? 'on' : 'off'}`
  getLabel(toggleMouseLeave).dataset.state = `mouseleave is not allowed`;
  getLabel(toggleMouseLeave).classList.toggle('hide')
  toggleMouseLeave.checked = false
})
toggleMouseLeave.addEventListener('click', function () {
  swipeHandler.active && swipeHandler.stop()
  swipeHandler = createMiniswipe({ debug: true, allowClick: true, allowMouseLeave: this.checked })

  getLabel(this).dataset.state = `mouseleave is ${this.checked ? '' : 'not'} allowed`
})