import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Button, Text } from 'native-base';


var StopButton = () => {
  let counter = 0
  counter++
  return (
    <View>
    <Button block
      style = {{backgroundColor: 'red'}}
    >
      <Text>S T O P</Text>
    </Button>
  </View>
  )
}

export default StopButton
