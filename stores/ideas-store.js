const sloppyRound = require('../lib/sloppy-round')
const DEFAULT_CELL = '49.465x08.987'
const Gun = require('gun/gun')
require('gun/lib/open.js')

module.exports = (state, emitter) => {
  state.ideas = !state.ideas ? [] : state.ideas
  state.cell = !state.cell ? false : state.cell
  state.message = ''

  emitter.on('DOMContentLoaded', function () {
    const gun = Gun('https://gundb.alheimsins.net/gun')

    emitter.on('message:update', message => {
      state.message = message
      emitter.emit(state.events.RENDER)
    })

    emitter.on('ideas:add', idea => {
      state.ideas.push(idea)
      emitter.emit(state.events.RENDER)
      gun.get('hugmyndir').get(state.cell).set(idea)
    })

    emitter.on('ideas:listen', cell => {
      gun.get('hugmyndir').get(cell).open(data => {
        emitter.emit('ideas:update', data)
      })
    })

    emitter.on('ideas:update', data => {
      const ideas = Object.values(data).filter(idea => idea)
      if (ideas.toString() !== state.ideas.toString()) {
        state.ideas = ideas
        emitter.emit(state.events.RENDER)
      }
    })

    emitter.on('cell:update', cell => {
      if (state.cell !== cell) {
        state.cell = cell
        emitter.emit('ideas:update', {})
        emitter.emit('ideas:listen', cell)
      }
    })

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    function geoLocationSuccess ({ coords = false }) {
      const { latitude, longitude } = coords
      const cell = `${sloppyRound(latitude)}x${sloppyRound(longitude)}`
      if (state.cell !== cell) {
        emitter.emit('cell:update', cell)
      }
    }

    function geoLocationError (error) {
      console.error(error)
      if (error.code === 1) {
        emitter.emit('message:update', 'You cannot enter the grid without sharing your location')
      } else if (error.code === 3) {
        emitter.emit('cell:update', DEFAULT_CELL)
      }
    }

    function getLocation () {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.watchPosition(geoLocationSuccess, geoLocationError, geoOptions)
      }
    }

    emitter.on('locate', () => {
      emitter.emit('message:update', '')
      getLocation()
    })
  })
}
