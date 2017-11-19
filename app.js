import React, { Component } from 'react';
import { Image, Linking, StyleSheet, Platform, View } from 'react-native';
import { Router, Scene, navBar } from 'react-native-router-flux';
import { Container, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
styles = require('./assets/stylesheet/Styles')

let fetchThis = 'https://roads.googleapis.com/v1/snapToRoads?path='

import Header from './components/Header'
// import StartButton from './components/StartButton'
// import StopButton from './components/StopButton'
// import Magic from './components/Magic'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      test: 'test',
      locations: [],
      holder: [],
      waiter: [],
      responser: [],
      distanceAppender: [],
      appResponse: [],
      fetchThis: 'https://roads.googleapis.com/v1/snapToRoads?path='
    };
    this.getLocation = this.getLocation.bind(this);
  }

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

        // Haversine Formula
  let getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    var mileCount = ( d * 0.621371) // conversion to Miles

    this.setState({distanceAppender: d})
    // console.log(this.state.distanceAppender);


  }

let deg2rad = (deg) => deg * (Math.PI / 180)

// Set Time Below
      // 5000 = 5 seconds
      // 10000 = 10 seconds
      // 60000 = 1 minute

      // setTimeout(this.getLocation, 5000)

      let stoppingWaterfall = () => {
        setTimeout(this.getLocation, 100)
        parentRender();
        theMagicHappen();
      }

      let timeInitiate = () => {
        setTimeout(this.getLocation, 100)
      }

      let theMagicHappen = () => {
        fetch('https://my-bike.herokuapp.com/components', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify( {email: 'sean.lemberg@gmail.com', mileage: 20})
          }).then((response) => response.json())
         .then((responseJson) => {
           this.state({
             appResponse: responseJson
           })
           console.log(responseJson)
         })
          }



    console.log("STATE: DISTANCE APPENDER: -----> ", this.state.distanceAppender);
    console.log("app response", this.state.appResponse);

    return (
    <View>
      <Header />
      <Icon.Button
        name="google"
        backgroundColor="#DD4B39"
        onPress={this.loginWithGoogle}
        >
        Google
      </Icon.Button>
        <Text>{this.state.user}</Text>
      <Text>{this.state.holder}</Text>
      <Text>{this.state.distanceAppender}</Text>
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

    )
  }
}
