import React, { Component } from 'react';
import { Image, Linking, StyleSheet, Platform, View, AppRegistry, TextInput, Switch } from 'react-native';
import { Router, Scene, navBar } from 'react-native-router-flux';
import { Container, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
import Brakes from './components/Brakes'
import Chains from './components/Chains'
import Tires from './components/Tires'
styles = require('./assets/stylesheet/Styles')

import Login from './components/Login'
import Header from './components/Header'
import Maintenance from './components/Maintenance'
import Bikes from './components/Bikes'

let fetchThis = 'https://roads.googleapis.com/v1/snapToRoads?path='

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      user:undefined,
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
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log('broken')
    }
  }

  // Set up Linking
  componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url })
      }
    })
  }

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    this.setState({
      // Decode the user string and parse it into JSON
      user: JSON.parse(decodeURI(user_string))
    })
    if (Platform.OS === 'ios') {
      SafariView.dismiss()
    }
    console.log('this.state.user', this.state.user)
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
    console.log('tires')
    fetch('https://my-bike.herokuapp.com/components/tires', {
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify( {email: 'sean.lemberg@gmail.com'})
        }).then((response) => response.json())
          .then((responseJson) => {
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
     body: JSON.stringify( {email: 'sean.lemberg@gmail.com'})
    }).then((response) => response.json())
      .then((responseJson) => {
    console.log(responseJson)
    this.setState({chain: responseJson})
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
    body: JSON.stringify( { email: 'sean.lemberg@gmail.com' })
    }).then((response) => response.json())
      .then((responseJson) => {
    console.log(responseJson)
    this.setState({brake_pads: responseJson})
      })
  }

  render() {
    const { user } = this.state;
    // look at line 161 for hard code man
    fetch('https://my-bike.herokuapp.com/bikes', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify( {email: 'sean.lemberg@gmail.com'})
        }).then((response) => response.json())
          .then((responseJson) => {
      this.setState({
        name: responseJson[0]['name'],
        total_mileage: responseJson[0]['total_mileage'],
        tires: responseJson[1]['tires'],
        chain: responseJson[1]['chain'],
        brake_pads: responseJson[1]['brake_pads']
      })
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
      let inceptionArray = this.state.holder.slice(1, this.state.holder.length);
      fetching = `${fetchThis}` + inceptionArray + `&interpolate=true&key=AIzaSyBQSSqtL6ZXfausABmganfrNw6M6vZlXb0`
      this.setState({waiter: fetching})
    }

    let renderTimeTwo = () => {
      let inceptionArray = this.state.holder.slice(1, this.state.holder.length);
      fetching = `${fetchThis}` + inceptionArray + `&interpolate=true&key=AIzaSyBQSSqtL6ZXfausABmganfrNw6M6vZlXb0`
      this.setState({waiter: fetching})
    }

    let responser = () => {
      return fetch(`${fetching}`).then((response) => response.json()).then((responseJson) => {
        this.setState({responser: responseJson})
        let lat1 = this.state.responser.snappedPoints[0].location.latitude
        let lon1 = -122.233 // this.state.responser.snappedPoints[0].location.longitude
        let lat2 = this.state.responser.snappedPoints[this.state.responser.snappedPoints.length - 1].location.latitude
        let lon2 = this.state.responser.snappedPoints[this.state.responser.snappedPoints.length - 1].location.longitude
        getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2)
      }).catch((error) => {
        console.error(error)
      })
    }

    let responserTwo = () => {
      return fetch(`${fetching}`).then((response) => response.json()).then((responseJson) => {
        this.setState({responser: responseJson})
        let lat1 = 0 //this.state.responser.snappedPoints[0].location.latitude
        let lon1 = 0 // this.state.responser.snappedPoints[0].location.longitude
        let lat2 = 0 //this.state.responser.snappedPoints[this.state.responser.snappedPoints.length - 1].location.latitude
        let lon2 = 0 //this.state.responser.snappedPoints[this.state.responser.snappedPoints.length - 1].location.longitude
        getDistanceFromLatLonInKmTwo(lat1, lon1, lat2, lon2)
      }).catch((error) => {
        console.error(error)
      })
    }

    // more hared coding on line 231
    let theMagicHappen = () => {
      // console.log(typeof Math.round(this.state.distanceAppender))
      fetch('https://my-bike.herokuapp.com/components', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify( {email: 'sean.lemberg@gmail.com', mileage: Math.round(this.state.distanceAppender)})
        }).then((response) => response.json())
          .then((responseJson) => {
            this.state({
              appResponse: responseJson
            })
         console.log(responseJson)
        })
    }

    let addMiles = () => {
    fetch('https://my-bike.herokuapp.com/components', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify( {email: 'sean.lemberg@gmail.com', mileage: Math.round(this.state.addMilesState)})
      }).then((response) => response.json())
        .then((responseJson) => {
          this.state({
            addMiles: responseJson
          })
        console.log(responseJson)
        })
      }

      // Haversine Formula
      // console.log("before distance", this.state.distanceAppender)
      let getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1) // deg2rad below
        var dLon = deg2rad(lon2 - lon1)
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        var d = R * c // Distance in km
        var mileCount = ( d * 0.621371) // conversion to Miles

        this.setState({ distanceAppender: mileCount })
        theMagicHappen()
        // console.log(this.state.distanceAppender)
        // console.log("TARGET", this.state.distanceAppender);
      }

      let getDistanceFromLatLonInKmTwo = (lat1, lon1, lat2, lon2) => {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1); // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        var mileCount = ( d * 0.621371) // conversion to Miles

        this.setState({ addMiles: mileCount })
        addMiles()
        //console.log(this.state.distanceAppender)
        // console.log("TARGET", this.state.distanceAppender);
      }

      // console.log("after distance", this.state.distanceAppender)
      // console.log(this.state.distanceAppender)

      let deg2rad = (deg) => deg * (Math.PI / 180)

      let stoppingWaterfall = () => {
        setTimeout(this.getLocation, 100)
        parentRender()
        // theMagicHappen();
      }

      let stoppingWaterfallTwo = () => {
        setTimeout(this.getLocation, 100)
        parentRenderTwo()
        this.textInput.clear()
      }

      let timeInitiate = () => {
        setTimeout(this.getLocation, 100)
      }

      // console.log(this.state.addMilesState);
      // setTimeout(this.getLocation)
      // this.getLocation()

    console.disableYellowBox = true

    return (
      <View>
        { user
          ? // Show user info if already logged in
            <View style={ styles.background }>
              <Header />
              <Text>name { this.state.name }</Text>
              <Text>mileage { this.state.total_mileage }</Text>
              <Text>tires { this.state.tires }</Text>
              <Text>chain { this.state.chain }</Text>
              <Text>brakes { this.state.brake_pads }</Text>

              <Button block full dark
                onPress={timeInitiate}
                style={styles.startButtonStyle}
              >
                <Text style={{fontFamily: 'Muli-Light'}}>S T A R T</Text>
              </Button>
              <Button block full dark
                onPress={stoppingWaterfall}
                style={styles.stopButtonStyle}
              >
                <Text style={{fontFamily: 'Muli-Light'}}>S T O P</Text>
              </Button>

              <TextInput
                ref={input => { this.textInput = input }}
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({addMilesState: text})}
                value={this.state.text}
              />
              <Button block full dark
                onPress={stoppingWaterfallTwo}
              >
                <Text style={{fontFamily: 'Muli-Light'}}>ADD MILES</Text>
              </Button>

              <Maintenance
                updateBrakes={this.updateBrakes}
                brake_pads={this.state.brake_pads}
                updateChains={this.updateChains}
                chain={this.state.chain}
                updateTires={this.updateTires}
                tires={this.state.tires}
              />

            </View>
          : // Show log in message if not
            <View>
              <Login
                loginWithGoogle={ this.loginWithGoogle.bind(this) }
              />
            </View>
        }
      </View>
    )

  }
}
