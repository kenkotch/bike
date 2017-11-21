import React, { Component } from 'react'
import { Image, Linking, StyleSheet, Platform, View, AppRegistry, TextInput, Text as Texter,  Switch } from 'react-native'
import { Container, Button, Text } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import SafariView from 'react-native-safari-view'

import Header from './Header'
styles = require('../assets/stylesheet/Styles')

class Ternary extends React.Component {
  constructor(props) {
  super(props)
  this.state= {
    name: '',
    mileage: '',
    sinceRepair: ''
  }
}

  sendNewBike = () => {
    this.props.newBike(this.state.name, this.state.mileage, this.state.sinceRepair)
  }

  render() {
    return(
      <View>
        <Header/>
        <View style={{ marginTop: 25 }}>
          <TextInput
            style={ styles.newInput }
            placeholder="Bike Name"
            onChangeText={(name) => this.setState({ name })}
          />
          <TextInput
            style={ styles.newInput }
            placeholder="Total Mileage"
            onChangeText={(mileage) => this.setState({ mileage })}
          />
          <TextInput
            style={ styles.newInput }
            placeholder="Mileage Since Repair"
            onChangeText={ (sinceRepair) => this.setState({ sinceRepair }) }
          />
        </View>

        <Button block full dark
          onPress={ this.sendNewBike }
          style={{ marginTop: 35 }}
        >
          <Text style={{ fontFamily: 'Muli-Light' }}>Add New Bike</Text>
        </Button>
      </View>
    )
  }
}

export default Ternary
