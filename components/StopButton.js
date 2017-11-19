import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Button, Text } from 'native-base';

var StopButton = () => {
  return (
    <View>
    <Button block
      onPress={console.log("TEST")}
      style = {{backgroundColor: 'green'}}
    >
      <Text>S T O P</Text>
    </Button>
  </View>
  )
}

export default StopButton
