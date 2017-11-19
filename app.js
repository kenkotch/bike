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
    return (
      <View>
        { user
          ? // Show user info if already logged in
            <View style={styles.containter}>
              <Header />
            </View>
          : // Show Please log in message if not
            <View>
              <Login
                loginWithGoogle={ this.loginWithGoogle.bind(this) }
              />
            </View>
        }
      </View>
    );

  }
}
//
// const iconStyles = {
//   borderRadius: 10,
//   iconStyle: { paddingVertical: 5 },
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF',
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: 20,
//   },
//   avatarImage: {
//     borderRadius: 50,
//     height: 100,
//     width: 100,
//   },
//   header: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   text: {
//     textAlign: 'center',
//     color: '#333',
//     marginBottom: 5,
//   },
//   buttons: {
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     margin: 20,
//     marginBottom: 30,
//   },
// });
