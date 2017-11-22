import React, { Component } from 'react'
import { Image, Linking, StyleSheet, Platform, View, AppRegistry, TextInput, Text as Texter,  Switch } from 'react-native'
import { Container, Button, Text } from 'native-base'
import { Jiro } from 'react-native-textinput-effects'
import Icon from 'react-native-vector-icons/FontAwesome'
import SafariView from 'react-native-safari-view'

import Header from './Header'
import Maintenance from './Maintenance'
import Login from './Login'
styles = require('../assets/stylesheet/Styles')
let fetchThis = 'https://roads.googleapis.com/v1/snapToRoads?path='
// onChangeText={(text) => this.setState({addMilesState: text})}
class UserInterface extends Component{
  constructor(props){
    super(props)
    this.state={addMilesState: ''}
  }

  componentDidMount() {
    console.log(this.props)
  }

  cascade = () => {
    this.props.updateMiles(this.state.addMilesState)
  }

  render() {
    return(
      <View>
        { this.props.user
          ? // Show user info if already logged in
            <View style={ styles.background }>
              <Header />
              <Text style={ styles.bikeName }>{ this.props.name }</Text>
              <Text style={ styles.maintData }>Total Distance: { this.props.total_mileage } Miles</Text>

                {/* show/hide START button */}
                { !this.props.truthStop &&
                    <Button
                      success
                      onPress={ this.props.timeInitiate }
                      style={ styles.startStopButtonStyle }
                    >
                      <Text>S T A R T</Text>
                    </Button>
                }

                {/* show/hide STOP button */}
                { this.props.truthStop &&
                    <Button
                      danger
                      onPress={ this.props.stoppingWaterfall }
                      style={ styles.startStopButtonStyle }
                    >
                      <Text>S T O P</Text>
                    </Button>
                }

                {/* Add Miles Manually */}
                { this.props.flicker&&
                  <Jiro
                    keyboardType={ 'numeric' }
                    label={ 'Add Miles Here' }
                    borderColor={ 'gray' }
                    ref={ input => { this.textInput = input } }
                    onChangeText={ text => this.setState({ addMilesState: text }) }
                    style={ styles.milesInput }
                  />
                }

                <Button
                  style={ styles.milesButton }
                  dark
                  onPress={ this.cascade }
                  ref={ input => { this.textInput = input } }
                >
                  <Text>ADD</Text>
                </Button>

          <Maintenance
            updateBrakes={ this.props.updateBrakes }
            brake_pads={ this.props.brake_pads }
            updateChains={ this.props.updateChains }
            chain={ this.props.chain }
            updateTires={ this.props.updateTires }
            tires={ this.props.tires }
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
