import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

var Header = () => {
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Text style={ styles.muliLight }>      my</Text>
        <Text style={ styles.logo }>&#xf206;</Text>
        <Text style={ styles.muliLight }>bike     </Text>
      </View>
      <View style={ styles.hozRule } />
    </View>
  )
}

export default Header
