import React, { Component } from 'react';
import { Image, Linking, StyleSheet, Platform, View, AppRegistry, TextInput, Text as Texter,  Switch } from 'react-native';
import { Container, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
styles = require('../assets/stylesheet/Styles')

class Ternary extends React.Component {
  constructor(props) {

  super(props)
  this.state={name: '', mileage: '', sinceRepair: ''}
}


  sendNewBike=()=>{
    this.props.newBike(this.state.name, this.state.mileage, this.state.sinceRepair)
  }
  render() {
    return(
      <View>
        <TextInput
        style={{ height: 40}}
        placeholder="Bike Name"
        onChangeText={(name) => this.setState({name})}
      />
      <TextInput
      style={{height: 40}}
      placeholder="Total Mileage"
      onChangeText={(mileage) => this.setState({mileage})}
    />
    <TextInput
    style={{height: 40}}
    placeholder="Mileage Since Repair"
    onChangeText={(sinceRepair) => this.setState({sinceRepair})}
  />
    <Button block full dark
      onPress={this.sendNewBike}
      style={styles.startButtonStyle}
    >
      <Text style={{fontFamily: 'Muli-Light'}}>Gnar Kill</Text>
    </Button>
      </View>
    )
  }
}

export default Ternary
