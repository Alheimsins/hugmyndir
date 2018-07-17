const sloppyRound = require('./sloppy-round')

module.exports = (state, emitter) => {
  function geoLocationSuccess ({ coords = false }) {
    if (!coords) return
    const { latitude, longitude } = coords
    try {
      const cell = `${sloppyRound(latitude)}x${sloppyRound(longitude)}`
      emitter.emit('cell:update', cell)
    } catch (error) {
      console.error(error)
      emitter.emit('cell:update', state.cell)
    }
  }

  function geoLocationError (error) {
    console.error(error)
    emitter.emit('cell:update', state.cell)
  }

  function getLocation () {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoLocationSuccess, geoLocationError, { timeout: 10000 })
    } else {
      emitter.emit('cell:update', state.cell)
    }
  }

  emitter.on('locate', () => {
    getLocation()
  })
}
