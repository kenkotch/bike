import React, {Component} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import { Button } from 'native-base'


class Start extends React.Component{
  constructor(props) {
  super(props);
  this.state = { text: '' };
}

 inducer=(event)=>{
    this.props.patch('blue dreams')
  }

 render(){
    console.log(this.state.text)
    return(
      <View>
        <TextInput
          value={this.state.text}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
        />
        <Button
          onPress={console.log('start')}
          title="Learn More"
          color="#841584 "
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    )
  }
}


export default Start
