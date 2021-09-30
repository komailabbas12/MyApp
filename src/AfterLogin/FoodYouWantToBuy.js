import React from 'react';
import { Image, Text, View, SafeAreaView,StyleSheet,TextInput, Keyboard, TouchableOpacity,AsyncStorage } from "react-native";
import { Color, NavTitle, NavButton,NavImage } from '../Common/index'
import { scale, moderateScale, verticalScale } from '../Common/Scaling'
import { Loader,CustomAlert } from '../Common'


import Api from '../Network/Api'



export default class FoodYouWantToBuy extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <NavTitle name="What foods would you want to buy?" />,
        headerLeft: <NavButton style={{ marginLeft: 10 }} onPress={() => navigation.openDrawer()} />,
        headerRight: <NavImage style={{ marginLeft: 10 }} />,
        headerStyle: {
            backgroundColor: Color.AppColor,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0
        },
    })
    

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            isAlert:false,
            description: '',
            image: '',
            isLoading: false,
        }
        this._bootstrapAsync().done()
    }

    async _bootstrapAsync() {
        this.setState({
            id: await AsyncStorage.getItem('id'),
        })
        // this.HomeApiCall()
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1,  alignItems: 'center'  }}>
            <View style={{flex: 1, alignContent:'center', width:'100%',}}>
                <Loader loading={this.state.isLoading} />
                <CustomAlert loading={this.state.isAlert} text={this.state.alertText} onPress={() => {
                        this.setState({
                            isAlert: false
                        })
                    }} />
                <Image style={{width: '100%' , height: 150 , resizeMode:'contain', marginTop:30}} 
                source={this.state.image == '' ? require('../../assets/Images/FoodStretcher.png') : this.state.image}></Image>

                <TextInput
                    ref={this.state.description}
                    onSubmitEditing={() => Keyboard.dismiss() }
                    style={[style.textInputStyle, { marginTop: verticalScale(10), height:100 }]}
                
                    maxLength={300}
                    onChangeText={(text) => this.setState({ description: text })}
                    value={this.state.description}
                />
                <TouchableOpacity onPress={() => {
                    if (this.state.description == '') {
                        this.setState({
                            isAlert: true,
                            alertText: 'Enter Description',
                        })
                    }
                    else {
                        this.FoodYouWantToBuyApiCall()
                    }

                }}>
                    <Text style={[style.buttonStyle, { marginTop: verticalScale(70) }]}>{"Submit"}</Text>
                </TouchableOpacity>
            </View>
            </SafeAreaView>
        )
    }
    
    FoodYouWantToBuyApiCall() {

        this.setState({
            isLoading: true
        })

        const data = new FormData()

        data.append("user_id", this.state.id)
        data.append("description", this.state.description)

        new Promise((resolve, reject) => {
            Api.post("api_food_you_want_to_buy.php", data)
                .then((response) => {
                    console.log("responce" + JSON.stringify(response.body));
                    this.setState({
                        isLoading: false
                    })

                    if (response.body.success == "1") {
                        this.setState({
                            isAlert: true,
                            alertText: response.body.message,
                        })
                        this.state.description = ""
                    }
                    else {
                        this.setState({
                            isAlert: true,
                            alertText: response.body.message,
                        })
                    }

                })
                .catch(reject)

        })

    }
}


const style = StyleSheet.create({
    textInputStyle: {
        height: moderateScale(60, 0.3),
        marginLeft: moderateScale(40, 0.3),
        marginRight: moderateScale(40, 0.3),
        paddingLeft: moderateScale(18, 0.3),
        paddingRight: moderateScale(18, 0.3),
        borderRadius: 8,
        borderWidth: 1,
        fontSize: moderateScale(20, 0.3),
        color: 'black',
        borderColor: Color.TextColor,
        backgroundColor: 'white',
        fontFamily: 'Roboto-Regular'
    },
    buttonStyle: {
        marginLeft: moderateScale(40, 0.3),
        marginRight: moderateScale(40, 0.3),
        borderRadius: 8,
        padding: moderateScale(16, 0.3),
        fontSize: moderateScale(22, 0.3),
        color: 'white',
        textAlign: 'center',
        alignContent: 'center',
        backgroundColor: Color.LoginBtnColor,
        fontFamily: 'Roboto-Bold'
    },
})