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

export default class App extends Component {

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
         body: JSON.stringify( {email: this.state.user})
       }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
      })

    return (
      <View>
        { user
          ? // Show user info if already logged in
            <View style={styles.containter}>
              <Header />
              <Text>Welcome { this.state.user }</Text>
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
