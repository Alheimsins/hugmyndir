const Gun = require('gun/gun')
require('gun/lib/open.js')

module.exports = (state, emitter) => {
  state.ideas = {}
  state.cell = '49.465x08.987'

  emitter.on('DOMContentLoaded', function () {
    const gun = Gun('https://gundb.alheimsins.net/gun')
    emitter.emit('locate')

    emitter.on('ideas:add', idea => {
      gun.get('hugmyndir').get(state.cell).set(idea)
    })

    emitter.on('cell:update', cell => {
      state.cell = cell
      gun.get('hugmyndir').get(cell).open(data => {
        state.ideas = data
        emitter.emit(state.events.RENDER)
      })
    })
  })
}
