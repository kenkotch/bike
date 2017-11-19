import React, { Component } from 'react';
import { Image, Linking, StyleSheet, Platform, View } from 'react-native';
import { Router, Scene, navBar } from 'react-native-router-flux';
import { Container, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';


class Brakes extends React.Component{
  render(){
    return(
      <View>
        <Text>
          Brakes: service in {this.props.brake_pads} miles
        </Text>
        <Button block full dark onPress={this.props.updateBrakes}>
      <Text >update brakes</Text>
    </Button>
      </View>
    )
  }
}

export default Brakes
