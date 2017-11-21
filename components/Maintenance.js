import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native'
import Header from './Header'
import Tires from './Tires'
import Brakes from './Brakes'
import Chains from './Chains'
styles = require('../assets/stylesheet/Styles')

class Maintenance extends Component {
  render() {
    return(
    <View style={ styles.background }>
      <View>
        <Brakes updateBrakes={ this.props.updateBrakes } brake_pads={ this.props.brake_pads }/>
        <Chains updateChains={ this.props.updateChains } chain={ this.props.chain }/>
        <Tires updateTires={ this.props.updateTires } tires={ this.props.tires }/>
      </View>
    </View>
    )
  }
}

export default Maintenance
