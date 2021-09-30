import React from 'react';
import { Image, AsyncStorage, View } from "react-native";

export default class Splash extends React.Component {
    render() {

        // setTimeout(() => {
        //     { this.props.navigation.navigate('Login') }
        // }, 2000);

        setTimeout(() => {
            _bootstrapAsync().done()
        }, 2000);

        _bootstrapAsync = async () => {
            const role = await AsyncStorage.getItem('isUserLogin');
            { role == "1" ? this.props.navigation.navigate('Main') : this.props.navigation.navigate('Login') }
        }

        return (
            <View style={{width:'100%', height:'100%', alignContent:'center', alignItems:'center', justifyContent:'center'}}
            >
            <Image 
                source={require('../assets/Images/FoodStretcher.png')} 
                style={{width: 150 , height: 150 , resizeMode:'contain', margin:20, alignContent:'center'}}>
            </Image>

            </View>
        )
    }
}

