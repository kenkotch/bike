import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
styles = require('../assets/stylesheet/Styles')

const Test2 = () => {
  return (
    <View style={ styles.background }>
      <Text style={ styles.muliLight }>This is test TWO. And it works!</Text>
    </View>
  )
}

export default Test2
