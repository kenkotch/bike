// import React from 'react';
// import {StyleSheet, Text, View, Button} from 'react-native';
//
// import StartButton from './StartButton'
// import StopButton from './StopButton'
//
// let fetchThis = 'https://roads.googleapis.com/v1/snapToRoads?path='
//
// export default class Magic extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       test: 'test',
//       locations: [],
//       holder: [],
//       waiter: [],
//       responser: [],
//       distanceAppender: [],
//       fetchThis: 'https://roads.googleapis.com/v1/snapToRoads?path='
//     };
//     this.getLocation = this.getLocation.bind(this);
//   }
//
//   showPosition = (position) => {
//     this.setState({
//       holder: [this.state.holder] + '|' + [position.coords.latitude, position.coords.longitude]
//     });
//   }
//
//   getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(this.showPosition);
//       // console.log("success!");
//     } else {
//       console.log('broken')
//     }
//   };
//
//   async componentDidMount() {
//   }
//
//   render() {
//
//     let fetching;
//
//     let parentRender = () => {
//       renderTime();
//       responser();
//     }
//
//     let renderTime = () => {
//       let inceptionArray = this.state.holder.slice(1, this.state.holder.length);
//       fetching = `${fetchThis}` + inceptionArray + `&interpolate=true&key=AIzaSyBQSSqtL6ZXfausABmganfrNw6M6vZlXb0`
//       this.setState({waiter: fetching})
//     }
//
//     let responser = () => {
//       return fetch(`${fetching}`).then((response) => response.json()).then((responseJson) => {
//         this.setState({responser: responseJson})
//         let lat1 = this.state.responser.snappedPoints[0].location.latitude
//         let lon1 = this.state.responser.snappedPoints[0].location.longitude
//         let lat2 = this.state.responser.snappedPoints[this.state.responser.snappedPoints.length - 1].location.latitude
//         let lon2 = this.state.responser.snappedPoints[this.state.responser.snappedPoints.length - 1].location.longitude
//         getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2)
//       }).catch((error) => {
//         console.error(error);
//       });
//     }
//
//     // Haversine Formula
//     let getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
//       var R = 6371; // Radius of the earth in km
//       var dLat = deg2rad(lat2 - lat1); // deg2rad below
//       var dLon = deg2rad(lon2 - lon1);
//       var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
//       var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//       var d = R * c; // Distance in km
//       var mileCount = ( d * 0.621371) // conversion to Miles
//
//       this.setState({distanceAppender: d})
//
//     }
//
//     let deg2rad = (deg) => deg * (Math.PI / 180)
//
//
//
//
//     // Set Time Below
//       // 5000 = 5 seconds
//       // 10000 = 10 seconds
//       // 60000 = 1 minute
//
//
//         setTimeout(this.getLocation, 5000)
//
//
//       // var dummy=()=>{
//       //   console.log('linkup')
//       // }
//     // console.log("STATE: DISTANCE APPENDER: -----> ", this.state.distanceAppender);
//
//     // console.log(this.state.fetching);
//     return (
//       <View>
//         <Text>{this.state.holder}</Text>
//         <StartButton
//           // linkup={dummy}
//         />
//         <Text></Text>
//         <Text></Text>
//         <StopButton
//           // onPress={parent}
//           // linkup={dummy}
//         />
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });
