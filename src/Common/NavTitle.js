import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

class NavTitle extends React.Component {
  render(){
    let { name } = this.props;
    return (
      <View>
        <Text style = {styles.txtStyle}> {name} </Text>
      </View>
    )
  }
}

export default NavTitle

const styles = StyleSheet.create({
  icon:{
    width:100,
    height:30,
    resizeMode:'contain',
    tintColor:'purple'
  },
  txtStyle:
    {
        fontSize : 20,
        color: 'white'
    }
});
