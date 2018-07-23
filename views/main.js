const html = require('choo/html')
const ideas = require('../templates/ideas')
const grid = require('../templates/grid')

const TITLE = 'hugmyndir - share your ideas'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body>
      <main class="pa3 tc f3">
        <h1>Hugmyndir</h1>
        <form class="black" onsubmit=${handleSubmit}>
          <label for="idea" class="white">Share your idea...</label>
          <textarea id="idea" name="idea" rows="3" class="w-100 h-3 f-subheadline bn tc" placeholder="Share your idea..."></textarea>
          <button type="submit" class="shadow-3 pa3 mb3 mt3 bg-white w-50 pointer">Share</button>
        </form>
        ${ideas(state.ideas)}
        <hr>
        ${grid(state.cell)}
      </main>
      ${focusInput()}
    </body>
  `
  function handleSubmit (e) {
    e.preventDefault()
    const ideaField = document.getElementById('idea')
    const idea = ideaField.value
    emit('ideas:add', idea)
    ideaField.value = ''
  }

  function focusInput () {
    if (typeof window !== 'undefined') {
      document.getElementById('idea').focus()
    }
  }
}
