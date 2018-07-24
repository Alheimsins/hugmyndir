const sloppyRound = require('./sloppy-round')
const DEFAULT_CELL = '49.465x08.987'

module.exports = (state, emitter) => {
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
    if (state.cell !== DEFAULT_CELL) {
      emitter.emit('cell:update', DEFAULT_CELL)
    }
  }

  function getLocation () {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.watchPosition(geoLocationSuccess, geoLocationError, geoOptions)
    } else {
      if (state.cell !== DEFAULT_CELL) {
        emitter.emit('cell:update', DEFAULT_CELL)
      }
    }
  }

  emitter.on('locate', () => {
    getLocation()
  })
}
