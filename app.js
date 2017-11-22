import React, { Component } from 'react'
import { Image, Linking, StyleSheet, Platform, View, AppRegistry, TextInput, Switch, Text as Texter } from 'react-native'
import { Container, Button, Text, Content, Badge } from 'native-base'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { Jiro } from 'react-native-textinput-effects'
import Icon from 'react-native-vector-icons/FontAwesome'
import SafariView from 'react-native-safari-view'
import Brakes from './components/Brakes'
import Chains from './components/Chains'
import Tires from './components/Tires'
import Ternary from './components/Ternary'
styles = require('./assets/stylesheet/Styles')

import Login from './components/Login'
import Header from './components/Header'
import Maintenance from './components/Maintenance'
import UserInterface from './components/UserInterface'
import Bikes from './components/Bikes'
let fetchThis = 'https://roads.googleapis.com/v1/snapToRoads?path='

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state= {
      user: null,
      name: '',
      total_mileage: '',
      tires: '',
      chain: '',
      brake_pads: '',
      locations: [],
      holder: [],
      waiter: [],
      responser: [],
      distanceAppender: '',
      appResponse: [],
      addMiles: '',
      addMilesState: '',
      truthy: true,
      truthStop: false,
      ternary: true,
      flicker: true,
      fetchThis: 'https://roads.googleapis.com/v1/snapToRoads?path='
     }
     this.getLocation = this.getLocation.bind(this)
  }

  showPosition = (position) => {
    this.setState({
      holder: [this.state.holder] + '|' + [position.coords.latitude, position.coords.longitude]
    })
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition)
    } else {
      console.log('broken')
    }
  }

  // Set up Linking
  componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener('url', this.handleOpenURL)
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url })
      }
    })
  }

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL)
  }

  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/)
    this.setState({
      // Decode the user string and parse it into JSON
      user: JSON.parse( decodeURI(user_string) )
    })
    if (Platform.OS === 'ios') {
      SafariView.dismiss()
    }
  }

  // Handle Login with Google button tap
  loginWithGoogle = () => this.openURL('https://my-bike.herokuapp.com/auth/google')

  // Open URL in a browser
  openURL = (url) => {
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      })
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url)
    }
  }

  updateTires = () => {
    fetch('https://my-bike.herokuapp.com/components/tires', {
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify( { email: this.state.user })
        }).then(response => response.json())
          .then(responseJson => {
      console.log(responseJson)
      this.setState({ tires: responseJson })
      })
  }

  updateChains = () => {
    console.log('chain')
    fetch('https://my-bike.herokuapp.com/components/chain', {
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     method: 'PATCH',
     body: JSON.stringify( { email: this.state.user })
    }).then( response => response.json() )
      .then( responseJson => {
    console.log(responseJson)
    this.setState({ chain: responseJson })
    })
  }

  updateBrakes = () => {
    console.log('brakes')
    fetch('https://my-bike.herokuapp.com/components/brakes', {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify( { email: this.state.user })
    }).then( response => response.json() )
      .then( responseJson => {
    console.log(responseJson)
    this.setState({ brake_pads: responseJson })
      })
  }

  newBike=(name, mileage, sinceRepair) => {
    console.log('name:', name)
    console.log('mileage:', mileage)
    fetch('https://my-bike.herokuapp.com/bikes/add', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify( {name: name, total_mileage: mileage, sinceRepair: sinceRepair})
        }).then((response) => response.json())
          .then((responseJson) => {
              console.log(responseJson)
              this.setState({
                name: responseJson[0]['name'],
                total_mileage: responseJson[0]['total_mileage'],
                tires: responseJson[1]['tires'],
                chain: responseJson[1]['chain'],
                brake_pads: responseJson[1]['brake_pads'],
                ternary:true
              })

    })
  }

  render() {
    const { user } = this.state
    fetch('https://my-bike.herokuapp.com/bikes', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify( { email: this.state.user })
        }).then((response) => response.json())
          .then((responseJson) => {

            if(responseJson[0]==='created') {
              this.setState({ternary: false})
            } else if(responseJson!=='created') {
              this.setState({
                name: responseJson[0]['name'],
                total_mileage: responseJson[0]['total_mileage'],
                tires: responseJson[1]['tires'],
                chain: responseJson[1]['chain'],
                brake_pads: responseJson[1]['brake_pads']
              })
            }
    })

    let fetching

    let parentRender = () => {
      renderTime()
      responser()
    }

    let parentRenderTwo = () => {
      renderTimeTwo()
      responserTwo()
    }

    let renderTime = () => {
      let inceptionArray = this.state.holder.slice(1, this.state.holder.length)
      fetching = `${ fetchThis }` + inceptionArray + `&interpolate=true&key=AIzaSyBQSSqtL6ZXfausABmganfrNw6M6vZlXb0`
      this.setState({ waiter: fetching })
    }

    let renderTimeTwo = () => {
      let inceptionArray = this.state.holder.slice(1, this.state.holder.length)
      fetching = `${ fetchThis }` + inceptionArray + `&interpolate=true&key=AIzaSyBQSSqtL6ZXfausABmganfrNw6M6vZlXb0`
      this.setState({ waiter: fetching })
    }

    // called for Stop
    let responser = async () => {
      return await fetch(`${ fetching }`)
      .then( async response => await response.json() )
      .then( responseJson => {
        console.log(responseJson)
        this.setState({ responser: responseJson })
        // let lat1 = this.state.responser.snappedPoints[0].location.latitude
        // let lon1 = this.state.responser.snappedPoints[0].location.longitude // -122.233
        // let lat2 = this.state.responser.snappedPoints[this.state.responser.snappedPoints.length - 1].location.latitude
        // let lon2 = this.state.responser.snappedPoints[this.state.responser.snappedPoints.length - 1].location.longitude

        // hard coded values for demo
        let lat1 = 37.60374389
        let lon1 = -122.42740357
        let lat2 = 37.60374389
        let lon2 = -122.52740357

        getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2)
      } )
      .catch((error) => {
        console.error(error)
      })
    }

    // called for addMiles
    let responserTwo = async () => {
      return await fetch(`${ fetching }`).then(async(response) => await response.json()).then(responseJson => {
        this.setState({ responser: responseJson })
        let lat1 = 0
        let lon1 = 0
        let lat2 = 0
        let lon2 = 0
        getDistanceFromLatLonInKmTwo(lat1, lon1, lat2, lon2)
      }).catch(error => {
        console.error(error)
      })
    }

    let theMagicHappen = async () => {
      await fetch('https://my-bike.herokuapp.com/components', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify( { email: this.state.user, mileage: Math.round(this.state.distanceAppender) })
      }).then(async(response) => await response.json())
          .then( responseJson => {
            this.setState({
              appResponse: responseJson
            } )
         console.log(responseJson)
        })
        .catch( err => console.log(err) )
    }

    let addMiles = async () => {
      this.setState({ flicker: true })
      await fetch('https://my-bike.herokuapp.com/components', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify( { email: this.state.user, mileage: Math.round(this.state.addMilesState) })
    }).then(async(response) => await response.json())
        .then( responseJson => {
          this.setState({
            addMiles: responseJson
          })
        console.log(responseJson)
        } )
      }
      var updateMiles = async (text) => {
        await this.setState({addMilesState: text, flicker: false})
        await console.log(this.state.addMilesState)
        await addMiles()
        await this.textInput.clear()
      }

      // Haversine Formula
      let getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        var R = 6371 // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1) // deg2rad below
        var dLon = deg2rad(lon2 - lon1)
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        var d = R * c // Distance in km
        var mileCount = ( d * 0.621371) // conversion to Miles
        console.log(mileCount)
        this.setState({ distanceAppender: mileCount })
        theMagicHappen()
      }

      let getDistanceFromLatLonInKmTwo = (lat1, lon1, lat2, lon2) => {
        var R = 6371 // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1) // deg2rad below
        var dLon = deg2rad(lon2 - lon1)
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        var d = R * c // Distance in km
        var mileCount = ( d * 0.621371) // conversion to Miles

        this.setState({ addMiles: mileCount })
        addMiles()
      }

      let deg2rad = (deg) => deg * (Math.PI / 180)

      let stoppingWaterfall = () => {
        setTimeout(this.getLocation, 100)
        parentRender()
        falsify()
      }

      let stoppingWaterfallTwo = () => {
        setTimeout(this.getLocation, 100)
        parentRenderTwo()
      }

      let timeInitiate = () => {
        setTimeout(this.getLocation, 100)
        trueOrNot()
        trueTwo()
      }

      let trueOrNot = () => {
        this.setState({
          truthy: false
        })
      }

      let falsify = () => {
        this.setState({
          truthStop: !this.state.truthStop,
          truthy: !this.state.truthy
        })
      }

      let trueTwo = () => {
        this.setState({
          truthStop: !this.state.truthStop
        })
      }

    console.disableYellowBox = true

    return (
      <View>
        {this.state.ternary
          ?
          <View>
            <UserInterface
              name={ this.state.name }
              total_mileage={ this.state.total_mileage }
              tires={ this.state.tires }
              chain={ this.state.chain }
              brake_pads={ this.state.brake_pads }
              timeInitiate={ timeInitiate }
              stoppingWaterfall={ stoppingWaterfall }
              stoppingWaterfallTwo={ stoppingWaterfallTwo }
              updateChains={ this.updateChains }
              updateBrakes={ this.updateBrakes }
              updateTires={ this.updateTires }
              user={ this.state.user }
              loginWithGoogle={ this.loginWithGoogle.bind(this) }
              truthStop={ this.state.truthStop }
              truthy={ this.state.truthy }
              updateMiles={updateMiles}
              flicker={this.state.flicker}
            />
        </View>
          :
          <Ternary newBike={ this.newBike }/>
        }
        </View>
    )
  }
}
