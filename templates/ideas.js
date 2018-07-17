const html = require('choo/html')
const idea = require('./idea')

module.exports = ideas => {
  return html`
    <div class="flex flex-column">
      ${Object.values(ideas).filter(idea => idea).map(idea)}
    </div>
  `
}
