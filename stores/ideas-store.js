const Gun = require('gun/gun')
require('gun/lib/open.js')

module.exports = (state, emitter) => {
  state.ideas = {}
  state.cell = 'alheimsins'

  emitter.on('DOMContentLoaded', function () {
    const gun = Gun('https://gundb.alheimsins.net/gun')
    emitter.emit('locate')

    emitter.on('ideas:add', idea => {
      gun.get('hugmyndir').get(state.cell).set(idea)
    })

    emitter.on('ideas:update', ideas => {
      state.ideas = ideas
      emitter.emit(state.events.RENDER)
    })

    emitter.on('cell:update', cell => {
      if (state.cell !== cell) {
        state.cell = cell
        gun.get('hugmyndir').get(cell).open(data => {
          emitter.emit('ideas:update', data)
        })
        emitter.emit(state.events.RENDER)
      }
    })
  })
}
