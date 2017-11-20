import React, { Component } from 'react';
import { Image, Linking, StyleSheet, Platform, View } from 'react-native';
import { Router, Scene, navBar } from 'react-native-router-flux';
import { Container, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';

// onPress={onPressLearnMore}

class Tires extends React.Component{
  render() {
    return(
      <View>
        <Text>Tires service in {this.props.tires} miles</Text>
        <Button block full dark onPress={this.props.updateTires}>
          <Text >update tires</Text>
        </Button>
      </View>
    )
  }
}

export default Tires
