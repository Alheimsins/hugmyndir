const Gun = require('gun/gun')
require('gun/lib/open.js')

module.exports = (state, emitter) => {
  state.ideas = []
  state.cell = 'alheimsins'

  emitter.on('DOMContentLoaded', function () {
    const gun = Gun('https://gundb.alheimsins.net/gun')
    emitter.emit('locate')

    emitter.on('ideas:add', idea => {
      gun.get('hugmyndir').get(state.cell).set(idea)
    })

    emitter.on('ideas:listen', cell => {
      gun.get('hugmyndir').get(cell).open(data => {
        emitter.emit('ideas:update', data)
      })
    })

    emitter.on('ideas:update', data => {
      state.ideas = Object.values(data).filter(idea => idea)
      emitter.emit(state.events.RENDER)
    })

    emitter.on('cell:update', cell => {
      if (state.cell !== cell) {
        state.cell = cell
        emitter.emit('ideas:update', {})
        emitter.emit('ideas:listen', cell)
      }
    })
  })
}
