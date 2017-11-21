import React, { Component } from 'react';
import { Image, Linking, StyleSheet, Platform, View } from 'react-native';
import { Router, Scene, navBar } from 'react-native-router-flux';
import { Container, Button, Text, Badge } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';


class Chains extends React.Component{
  render() {

    return (
      <View style={ styles.row }>
        <Text style={{ marginTop: 11 }}>
          Chain: service in {this.props.chain} miles
        </Text>
        <Button
          transparent
          onPress={this.props.updateChains}
        >
          <View style={ styles.rowRight }>
            <Badge>
              <Text style={{ fontFamily: 'FontAwesome'}}>&#xf021;</Text>
            </Badge>
            <Text style={ styles.resetWord }>Reset</Text>
          </View>
        </Button>
      </View>
    )
  }
}

export default Chains
