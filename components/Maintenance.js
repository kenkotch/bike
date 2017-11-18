import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
styles = require('../assets/stylesheet/Styles')

var Maintenance = ({
  bikes
}) => {
  return (
    <View style={ styles.center }>
      <Text style={ styles.subHeader }>Bike Name: { bikes[0].name }</Text>
      <Text style={ styles.subHeader }>Total Miles: { bikes[0].total_mileage }</Text>
      <Text style={ styles.maintData }>Miles left on brake pads: { bikes[1].brake_pads }</Text>
      <Text style={ styles.maintData }>Miles left on chain: { bikes[1].chain }</Text>
      <Text style={ styles.maintData }>Miles left on tires: { bikes[1].tires }</Text>
    </View>
  )
}

export default Maintenance
