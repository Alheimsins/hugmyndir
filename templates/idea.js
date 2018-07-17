const html = require('choo/html')

module.exports = idea => {
  return html`
    <div class="shadow-5 pa3 mb3 tl">
      ${idea}
    </div>
  `
}
