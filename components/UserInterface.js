import React, { Component } from 'react';
import { Image, Linking, StyleSheet, Platform, View, AppRegistry, TextInput, Text as Texter,  Switch } from 'react-native';
import { Container, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
import Header from './Header'
import Maintenance from './Maintenance'
import Login from './Login'
styles = require('../assets/stylesheet/Styles')
let fetchThis = 'https://roads.googleapis.com/v1/snapToRoads?path='
// onChangeText={(text) => this.setState({addMilesState: text})}
class UserInterface extends React.Component{
  render() {
    console.log(this.props)
    return(
      <View>
        {this.props.user
          ?
        <View style={ styles.background }>
          <Header />
          <Text>name { this.props.name }</Text>
          <Text>mileage { this.props.total_mileage }</Text>
          <Text>tires { this.props.tires }</Text>
          <Text>chain { this.props.chain }</Text>
          <Text>brakes { this.props.brake_pads }</Text>

          <Button block full dark
            onPress={this.props.timeInitiate}
            style={styles.startButtonStyle}
          >
            <Text style={{fontFamily: 'Muli-Light'}}>S T A R T</Text>
          </Button>
          <Button block full dark
            onPress={this.props.stoppingWaterfall}
            style={styles.stopButtonStyle}
          >
            <Text style={{fontFamily: 'Muli-Light'}}>S T O P</Text>
          </Button>

          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          />
          <Button block full dark
            onPress={this.props.stoppingWaterfallTwo}
          >
            <Text style={{fontFamily: 'Muli-Light'}}>ADD MILES</Text>
          </Button>
          <Maintenance
            updateBrakes={this.props.updateBrakes}
            brake_pads={this.props.brake_pads}
            updateChains={this.props.updateChains}
            chain={this.props.chain}
            updateTires={this.props.updateTires}
            tires={this.props.tires}
          />
      </View>
      :
      <View>
        <Login
          loginWithGoogle={ this.props.loginWithGoogle }
        />
      </View>
}
    </View>


    )
  }
}

export default UserInterface