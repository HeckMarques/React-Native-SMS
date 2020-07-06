import React from 'react'
import { View, Image } from 'react-native'


const Logo = (props) => {
  const { margin, width, height } = props

  var stilo = {margin: parseInt(margin, 10), width: parseInt(width, 10), height: parseInt(height, 10)}
  console.log(stilo)
  return (
    <View>
      <Image
        style={stilo}
        source={require('../../../assets/sms.jpg')} />

    </View>
  );
}



export default Logo
