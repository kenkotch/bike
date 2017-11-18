'use strict';
var React = require('react-native');
var { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    backgroundColor: 'transparent',
    fontFamily: 'FontAwesome',
    fontSize: 60,
    marginTop: 20,
    marginBottom: 1,
    alignItems: 'center',
    flex: 1
  },
  login: {
    marginTop: 100,
    alignItems: 'center',
    flexDirection: 'row'
  },
  muliLight: {
    fontFamily: 'Muli-Light',
    fontSize: 45,
    marginTop: 20,
    marginBottom: 1,
  },
  background: {
    backgroundColor: '#e2ca29',
    width: '100%',
    height: '100%',
  },
  center: {
    alignItems: 'center'
  },
  subHeader: {
    alignItems: 'center',
    fontFamily: 'Muli',
    fontSize: 35
  },
  maintData: {
    alignItems: 'center',
    fontFamily: 'Muli',
    fontSize: 20
  },
  hozRule: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 5
  },
  button: {
    alignItems: 'center',
    fontFamily: 'Muli-Light',
    fontSize: 35
  }

});
