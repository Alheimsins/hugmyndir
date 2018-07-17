const html = require('choo/html')

module.exports = cell => {
  return html`
    <div class="black-30 mb3">
      Ideagrid ${cell}
    </div>
  `
}
