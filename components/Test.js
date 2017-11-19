import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
styles = require('../assets/stylesheet/Styles')

const Test = () => {
  return (
    <View>
      <Text style={ styles.muliLight }>This is a test. And it works!</Text>
    </View>
  )
}

export default Test
