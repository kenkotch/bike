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
    height: '100%'
  },
  center: {
    alignItems: 'center'
  },
  subHeader: {
    textAlign: 'center',
    alignItems: 'center',
    fontFamily: 'Muli',
    fontSize: 35
  },
  maintData: {
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Muli',
    fontSize: 20,
    marginTop: 7
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
  },
  bikeName: {
    textAlign: 'center',
    fontFamily: 'Muli',
    fontSize: 35,
    marginTop: 12
  },
  startStopButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Muli',
    fontSize: 18,
    width: '55%',
    marginLeft: '25%',
    marginTop: 12
  },
  milesButton: {
    width: '50%',
    marginLeft: '25%',
    marginTop: 15,
    justifyContent: 'center',
    backgroundColor: 'black',
    marginBottom: 40
  },
  milesInput: {
    width: '80%',
    marginLeft: '10%'
  },
  row: {
    flexDirection: 'row',
    marginLeft: '8%'
  },
  rowRight: {
    flexDirection: 'row',
    marginLeft: '11%'
  },
  resetWord: {
    marginTop: 3,
    color: 'black'
  },
  rowText: {
    width: '60%',
    marginTop: 11
  },
  newInput: {
    marginLeft: 15,
    fontFamily: 'Muli',
    fontSize: 18,
    height: 40
  },
  hozRuleRed: {
    borderBottomColor: 'red'
  }

});
