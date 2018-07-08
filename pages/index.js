import React from 'react'
import Gun from 'gun/gun'
import 'gun/lib/open'
import Layout from '../components/Layout'
import Ideas from '../components/Ideas'
const gun = Gun('https://gundb.alheimsins.net/gun')

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cell: '49.465x08.987',
      ideas: false
    }
    this.addIdea = this.addIdea.bind(this)
    this.getLocation = this.getLocation.bind(this)
    this.geoLocationSuccess = this.geoLocationSuccess.bind(this)
    this.geoLocationError = this.geoLocationError.bind(this)
  }

  async componentDidMount () {
    this.getLocation()
  }

  addIdea () {
    const cell = this.state.cell
    const ideaField = document.getElementById('ideatext')
    const idea = ideaField.value
    gun.get('hugmyndir').get(cell).set(idea)
    ideaField.value = ''
  }

  geoLocationError () {
    this.setState({ gps: false, results: { error: 'No nearby places found.' }, state: false })
  }

  async geoLocationSuccess ({ coords = false }) {
    if (!coords) return
    const { latitude, longitude } = coords
    try {
      const cell = `${latitude.toFixed(3)}x${longitude.toFixed(3)}`
      this.setState({ latitude, longitude, cell: cell, state: false })
      gun.get('hugmyndir').get(cell).open(data => {
        this.setState({ideas: data})
      })
    } catch (error) {
      console.log(error)
      gun.get('hugmyndir').get(this.state.cell).open(data => {
        this.setState({ideas: data})
      })
    }
  }

  getLocation () {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.geoLocationSuccess, this.geoLocationError, { enableHighAccuracy: true, timeout: 5000 })
    }
  }

  render () {
    return (
      <Layout>
        <div>
          <h1>Hugmyndir</h1>
          <textarea name='idea' id='ideatext' placeholder='Share your idea with the world..' rows='5' autoFocus />
          <div>
            <button onClick={this.addIdea}>Share</button>
          </div>
          <div className='cellGrid'>
            Ideagrid {this.state.cell}
          </div>
          { this.state.ideas ? <Ideas ideas={this.state.ideas} /> : false }
        </div>
        <style jsx>
          {`
            button {
              background-color: white;
              border-radius: 2px;
              color: black;
              padding: 15px 32px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              width: 150px;
              margin: 10px;
              cursor: pointer;
            }
            button:focus {
              outline:0;
            }
            button:active {
              outline: 0;
            }
            textarea {
              font-size: 2em;
              width: 90%;
            }
            textarea:active {
              outline: 0;
            }
            .cellGrid {
              color: #cecece;
            }
          `}
        </style>
      </Layout>
    )
  }
}
