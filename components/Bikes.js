import React from 'react'
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native'
import { Container, Button, Text } from 'native-base';
import Header from './Header'
import Start from './Start'
import Maintenance from './Maintenance'

const Bikes = (props) => {
  console.log(props)
  //props.blue()
  return (

   <View style={ styles.background }>
    <Header />
    <Start patch={ props.patch} />
    <Maintenance bikes={ props.bikes }/>
   </View>
 )

}

export default Bikes
