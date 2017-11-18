import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Button, Text } from 'native-base';
import Header from './Header'

const Login = () => {
  return(
    <View style={styles.background}>
      <Header />
      <View>
        <Button block full dark
          onPress={() => Actions.Bikes()}
          style={styles.login}
        >
          <Text style={{fontFamily: 'FontAwesome'}}>&#xf1a0;</Text>
          <Text style={{fontFamily: 'Muli-Light'}}>Google Login</Text>
        </Button>
      </View>
    </View>
  )
}

export default Login
