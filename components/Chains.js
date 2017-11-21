import React, { Component } from 'react';
import { Image, Linking, StyleSheet, Platform, View } from 'react-native';

import { Container, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';


class Chains extends React.Component{
  render() {

    return (
      <View>
        <Text>
          Chain service in {this.props.chain} miles
        </Text>
        <Button block full dark onPress={this.props.updateChains}>
          <Text>update chain</Text>
        </Button>
      </View>
    )
  }
}

export default Chains
