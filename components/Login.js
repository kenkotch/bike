import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Button, Text } from 'native-base';
import Header from './Header'

const Login = ({
  loginWithGoogle
}) => {
  return(
    <View style={ styles.background }>
      <Header />
      <View>
        <Button block full dark
          style={ styles.login }
          name="google"
          onPress={ loginWithGoogle }
        >
          <Text style={{ fontFamily: 'FontAwesome' }}>&#xf1a0;</Text>
          <Text style={{ fontFamily: 'Muli-Light' }}>Google Login</Text>
        </Button>
      </View>
    </View>
  )
}

export default Login
