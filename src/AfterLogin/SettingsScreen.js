import React from "react";
import { View, Text,Image} from "react-native";
import { Color, NavTitle, NavButton,NavImage } from '../Common/index'


export default class SettingsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
      headerTitle: <NavTitle name="This Month's Food Savings" />,
      headerLeft: <NavButton style={{ marginLeft: 10 }} onPress={() => navigation.openDrawer()} />,
      headerRight: <NavImage style={{ marginLeft: 10 }} />,
      headerStyle: {
          backgroundColor: Color.AppColor,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0
      },
  })
  
  render() {
      return (
          <View style={{flex: 1,}}>
          <Image 
              source={require('../../assets/Images/FoodStretcher.png')} 
              style={{width: '100%' , height: '100%' , resizeMode:'center'}}>
          </Image>
          </View>
      )
  }
}
