import React, { Component } from 'react';
import { Image, Linking, StyleSheet, Platform, View } from 'react-native';
import { Router, Scene, navBar } from 'react-native-router-flux';
import { Container, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
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
       test: 'test',
       locations: [],
       holder: [],
       waiter: [],
       responser: [],
       distanceAppender: '',
       appResponse: [],
       fetchThis: 'https://roads.googleapis.com/v1/snapToRoads?path='
     };
     this.getLocation = this.getLocation.bind(this)
  }

  // state = {
  //   user: undefined, // user has not logged in yet
  // };

  showPosition = (position) => {
  this.setState({
    holder: [this.state.holder] + '|' + [position.coords.latitude, position.coords.longitude]
  });
}

getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
      // console.log("success!");
    } else {
      console.log('broken')
    }
  };

  state = {
    user: undefined, // user has not logged in yet
  };

  // Set up Linking
  componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  };

  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  };

  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    this.setState({
      // Decode the user string and parse it into JSON
      user: JSON.parse(decodeURI(user_string))
    });
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
    console.log('this.state.user', this.state.user)
  };

  // Handle Login with Facebook button tap
  loginWithFacebook = () => this.openURL('http://localhost:3000/auth/facebook');

  // Handle Login with Google button tap
  loginWithGoogle = () => this.openURL('https://my-bike.herokuapp.com/auth/google');

  // Open URL in a browser
  openURL = (url) => {
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
  };

  render() {
    const { user } = this.state;

      fetch('https://my-bike.herokuapp.com/bikes', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify( {email: 'sean.lemberg@gmail.com'})
      }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({name: responseJson[0]['name'], total_mileage: responseJson[0]['total_mileage'], tires: responseJson[1]['tires'], chain: responseJson[1]['chain'], brake_pads: responseJson[1]['brake_pads']})
      })

          let fetching;

          let parentRender = () => {
              renderTime();
              responser();
            }

            let renderTime = () => {
              let inceptionArray = this.state.holder.slice(1, this.state.holder.length);
              fetching = `${fetchThis}` + inceptionArray + `&interpolate=true&key=AIzaSyBQSSqtL6ZXfausABmganfrNw6M6vZlXb0`
              this.setState({waiter: fetching})
            }

            let responser = () => {
              return fetch(`${fetching}`).then((response) => response.json()).then((responseJson) => {
                this.setState({responser: responseJson})
                let lat1 = this.state.responser.snappedPoints[0].location.latitude
                let lon1 = -122.233// this.state.responser.snappedPoints[0].location.longitude
                let lat2 = this.state.responser.snappedPoints[this.state.responser.snappedPoints.length - 1].location.latitude
                let lon2 = this.state.responser.snappedPoints[this.state.responser.snappedPoints.length - 1].location.longitude
                getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2)
              }).catch((error) => {
                console.error(error);
              });
            }
            let theMagicHappen = () => {
              console.log(typeof Math.round(this.state.distanceAppender))


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
            // Haversine Formula
            // console.log("before distance", this.state.distanceAppender)
      let getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
          var R = 6371; // Radius of the earth in km
          var dLat = deg2rad(lat2 - lat1); // deg2rad below
          var dLon = deg2rad(lon2 - lon1);
          var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          var d = R * c; // Distance in km
          var mileCount = ( d * 0.621371) // conversion to Miles

          this.setState({distanceAppender: mileCount})
          theMagicHappen()
          //console.log(this.state.distanceAppender)
          // console.log("TARGET", this.state.distanceAppender);
      }
        // console.log("after distance", this.state.distanceAppender)

      //console.log(this.state.distanceAppender)

      let deg2rad = (deg) => deg * (Math.PI / 180)

      let stoppingWaterfall = () => {
        setTimeout(this.getLocation, 100)
        parentRender();
        // theMagicHappen();
      }

      let timeInitiate = () => {
        setTimeout(this.getLocation, 100)
      }

      // console.log('before magic', this.state.distanceAppender)

        // console.log('after magic', this.state.distanceAppender)
        // move function above the other
        // see if this alters stateful scope



    return (
      <View>
        { user
          ? // Show user info if already logged in
            <View style={ styles.background }>
              <Header />
              <Text>Awesome Blossom { this.state.user }</Text>
              <Text>name { this.state.name }</Text>
              <Text>mileage { this.state.total_mileage }</Text>
              <Text>tires { this.state.tires }</Text>
              <Text>chain { this.state.chain }</Text>
              <Text>brakes { this.state.brake_pads }</Text>
              {/* <Text>{this.state.user}</Text> */}
              {/* <Text>{this.state.holder}</Text> */}
              <Text>{this.state.distanceAppender}</Text>
              {/* <Text>{this.responseJson}</Text> */}
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
