import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native'

const iconDrawer = require('../../assets/Images/ic_drawer.png')
const iosBack = require('../../assets/Images/ios_back.png')
const androidBack = require('../../assets/Images/android_back.png')


class NavButton extends React.Component {
  render(){
    let {onPress ,img} = this.props
    return (
      <TouchableOpacity onPress={onPress} >
       {img ? <Image source={Platform.OS === 'android' ? androidBack : iosBack } style={style.icon}/> :
      <Image source={iconDrawer} style={style.icon}/> }
        
      </TouchableOpacity>
    )
  }
}

export default NavButton

const style =  StyleSheet.create({
  icon:{
    width:25,
    height:25,
    resizeMode:'contain',
    tintColor:'white',
    marginLeft: 10
  }
})
