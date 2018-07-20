const sloppyRound = require('./sloppy-round')

module.exports = (state, emitter) => {
  function geoLocationSuccess ({ coords = false }) {
    const { latitude, longitude } = coords
    const cell = `${sloppyRound(latitude)}x${sloppyRound(longitude)}`
    if (cell !== state.cell) {
      emitter.emit('cell:update', cell)
    }
  }

  function geoLocationError (error) {
    console.error(error)
    emitter.emit('cell:update', state.cell)
  }

  function getLocation () {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.watchPosition(geoLocationSuccess, geoLocationError, {timeout: 10000, maximumAge: 0})
    } else {
      emitter.emit('cell:update', state.cell)
    }
  }

  emitter.on('locate', () => {
    getLocation()
  })
}
