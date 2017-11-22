import React, { Component } from 'react'
import { Image, Linking, StyleSheet, Platform, View } from 'react-native'
import { Container, Button, Text, Badge } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import SafariView from 'react-native-safari-view'


class Chains extends React.Component{
  render() {
    return (
      <View>
        <View style={ styles.row }>
          <Text style={ styles.rowText }>
            Chain: service in { this.props.chain } miles
          </Text>
          <Button
            transparent
            onPress={ this.props.updateChains }
          >
            <View style={ styles.rowRight }>
              <Badge>
                <Text style={{ fontFamily: 'FontAwesome' }}>&#xf021;</Text>
              </Badge>
              <Text style={ styles.resetWord }>Reset</Text>
            </View>
          </Button>
        </View>
        { this.props.chain < 151 &&
          <View style={ styles.hozRule } />
        }
      </View>
    )
  }
}

export default Chains
