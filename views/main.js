const html = require('choo/html')
const ideas = require('../templates/ideas')
const grid = require('../templates/grid')

const TITLE = 'hugmyndir - share your ideas'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  if (state.cell !== false) {
    return html`
    <body class="sans-serif">
      <main class="pa3 tc f3">
        <h1>Hugmyndir</h1>
        <form class="black" onsubmit=${handleSubmit}>
          <label for="idea" class="white">Share your idea...</label>
          <textarea id="idea" name="idea" rows="3" class="w-100 h-3 f-subheadline bn tc" placeholder="Share your idea..." autofocus></textarea>
          <button type="submit" class="shadow-3 pa3 mb3 mt3 bg-white w-50 pointer">Share</button>
        </form>
        ${ideas(state.ideas)}
        <hr>
        ${grid(state.cell)}
      </main>
    </body>
  `
  } else {
    return html`
    <body class="sans-serif">
      <main class="pa3 tc f3">
        <h1>Hugmyndir</h1>
        <p>To share your ideas you must enter the grid to connect your mind to the physical world</p>
        <div class="red">${state.message}</p>
        <button class="bg-white shadow-3 pa3 mb3 mt3 w-50 pointer opacity:0" onclick=${handleLocate}>Enter</button>
      </main>
    </body>
  `
  }

  function handleSubmit (e) {
    e.preventDefault()
    const ideaField = document.getElementById('idea')
    const idea = ideaField.value
    emit('ideas:add', idea)
    ideaField.value = ''
  }

  function handleLocate () {
    emit('locate')
    emit('message:update', 'Entering grid... please wait')
  }
}
