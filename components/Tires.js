import React, { Component } from 'react'
import { Image, Linking, StyleSheet, Platform, View } from 'react-native'
import { Container, Button, Text, Badge } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import SafariView from 'react-native-safari-view'

class Tires extends Component {
  render() {
    return(
      <View>
        <View style={ styles.row }>
          <Text style={ styles.rowText }>
            Tires: service in { this.props.tires } miles
          </Text>
          <Button
            transparent
            onPress={ this.props.updateTires }
          >
            <View style={ styles.rowRight }>
              <Badge>
                <Text style={{ fontFamily: 'FontAwesome' }}>&#xf021;</Text>
              </Badge>
              <Text style={ styles.resetWord }>Reset</Text>
            </View>
          </Button>
        </View>
        { this.props.tires < 101 &&
          <View style={ styles.hozRule } />
        }
      </View>
    )
  }
}

export default Tires
