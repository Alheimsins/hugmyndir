const html = require('choo/html')

module.exports = cell => {
  return html`
    <div class="black">
      Grid - ${cell}
    </div>
  `
}
