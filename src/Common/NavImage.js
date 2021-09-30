
import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native'

const imglogo = require('../../assets/Images/FoodStretcher.png')


class NavImage extends React.Component {
  render(){
    let {onPress ,img} = this.props
    return (
        <Image source={imglogo} style={style.icon}/> 
    )
  }
}

export default NavImage

const style =  StyleSheet.create({
  icon:{
    width:40,
    height:40,
    resizeMode:'contain',
    marginRight:10
  }
})
