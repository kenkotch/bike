import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Button, Text } from 'native-base';

var StartButton = () => {
  return (
    <View>
    <Button block
      onPress={console.log("TEST")}
      style = {{backgroundColor: 'green'}}
    >
      <Text>S T A R T</Text>
    </Button>
  </View>
  )
}

export default StartButton
