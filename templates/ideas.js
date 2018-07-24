const html = require('choo/html')
const idea = require('./idea')

module.exports = ideas => {
  return html`
    <div class="flex flex-column">
      ${ideas.map(idea)}
    </div>
  `
}
