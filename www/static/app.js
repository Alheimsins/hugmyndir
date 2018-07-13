localStorage.clear()

const gun = Gun('https://gundb.alheimsins.net/gun')
let cell = '49.465x08.987'

function init () {
  addListener(document.getElementById('ideaForm'), 'submit', addIdea)
  showGrid()
  getLocation()
}

function addListener (element, type, func) {
  element.removeEventListener(type, func)
  element.addEventListener(type, func)
}

function sloppyRound (data) {
  const list = data.toString().split('.')
  return `${list[0]}.${list[1].substr(0, 3)}`
}

function geoLocationError (error) {
  console.error(error)
  gun.get('hugmyndir').get(cell).open(data => {
    showIdeas(data)
  })
}

async function geoLocationSuccess ({ coords = false }) {
  if (!coords) return
  const { latitude, longitude } = coords
  try {
    cell = `${sloppyRound(latitude)}x${sloppyRound(longitude)}`
    gun.get('hugmyndir').get(cell).open(data => {
      showIdeas(data)
    })
  } catch (error) {
    console.error(error)
    gun.get('hugmyndir').get(cell).open(data => {
      showIdeas(data)
    })
  }
}

function getLocation () {
  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geoLocationSuccess, geoLocationError, { timeout: 5000 })
  } else {
    gun.get('hugmyndir').get(cell).open(data => {
      showIdeas(data)
    })
  }
}

function addIdea (e) {
  e.preventDefault()
  const field = document.getElementById('ideatext')
  gun.get('hugmyndir').get(cell).set(field.value)
  field.value = ''
  field.focus()
}

function createDiv (data) {
  const div = document.createElement('div')
  div.classList.add('wrapper')
  div.innerHTML = data
  return div
}

function showIdea (wrapper, idea) {
  const div = createDiv(idea)
  wrapper.appendChild(div)
}

function showGrid () {
  const grid = document.getElementById('cellGrid')
  grid.innerHTML = `Ideagrid ${cell}`
}

function showIdeas (ideas) {
  const wrapper = document.getElementById('ideasWrapper')
  wrapper.innerHTML = ''
  Object.values(ideas).filter(idea => idea).map(idea => showIdea(wrapper, idea))
  showGrid()
}

function ready (fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

ready(init)
