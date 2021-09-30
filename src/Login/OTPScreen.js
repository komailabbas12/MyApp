import React from 'react';
import {SafeAreaView,Image, View, TextInput, CheckBox, StyleSheet, Text, TouchableOpacity, Keyboard} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Color, CustomAlert, Loader } from '../Common'
import { scale, moderateScale, verticalScale } from '../Common/Scaling'
import Api from '../Network/Api'

export default class OTPScreen extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            email: '',
            otp: '',
            isLoading: false,
            isAlert: false,
            isAlertNavigation:false,
            alertText: '',
            alertPress: '',
            ref_otp: React.createRef(),
        }
        // this._bootstrapAsync().done();
    }

    render() {

    const { navigation } = this.props;  
    const emialNew = navigation.getParam('emial', '');  
    const otpNew = navigation.getParam('otp', 'otp');  
    this.state.email = emialNew
        return (
            <SafeAreaView style={{ flex: 1,  alignItems: 'center'  }}>
                <Image style={{width: 150 , height: 150 , resizeMode:'center', marginTop:30}} source={require('../../assets/Images/FoodStretcher.png')}></Image>
                <KeyboardAwareScrollView enableOnAndroid={true}>

                <View style={{ flex: 1, alignItems: 'center',}}>
                        <Loader loading={this.state.isLoading} />
                        <CustomAlert loading={this.state.isAlert} text={this.state.alertText} onPress={() => {
                            this.setState({
                                isAlert: false
                            })
                        }} isTwo={false} />


                        <View style={{ alignItems: 'center'}}>

                            <TextInput
                                ref={this.state.ref_otp}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                style={[style.textInputStyle, { marginTop: verticalScale(20) }]}
                                placeholder="OTP"
                                onChangeText={(text) => this.setState({ otp: text })}
                                value={this.state.otp}
                            />

                            <TouchableOpacity onPress={() => {

                                console.log("otpNew" + otpNew);
                                if (this.state.otp == '') {
                                    this.setState({
                                        isAlert: true,
                                        alertText: 'Enter OTP'
                                    })
                                    this.state.ref_otp.current.focus()
                                }
                                else {
                                    this.CheckOtpApiCall()
                                }
                            }}>
                            <Text style={[style.buttonStyle, { marginTop: verticalScale(40) }]}>{"Submit"}</Text>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', marginTop: verticalScale(30), marginBottom: verticalScale(40) }}>
                                
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                    <Text style={style.textStyleBig}>{"LOG IN"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                </View>
                    
                </KeyboardAwareScrollView>
            </SafeAreaView>
        )
    }

    CheckOtpApiCall() {

        this.setState({
            isLoading: true
        })

        const data = new FormData()
        
        data.append("otp", this.state.otp)
        data.append("email", this.state.email)
        console.log("data" + this.state.email);

        new Promise((resolve, reject) => {
            Api.post("check_otp.php", data)
                .then((response) => {
                    console.log("responce" + JSON.stringify(response.body));
                    this.setState({
                        isLoading: false
                    })

                    if (response.body.success == "1") {
                        this.props.navigation.navigate('NewPassword',{  
                            user_id: response.body.data.user_id,  
                        })
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
        width: scale(780, 0.3),
        height: moderateScale(60, 0.3),
        marginLeft: scale(100),
        marginRight: scale(100),
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
    textStyle: {
        fontSize: moderateScale(22, 0.3),
        color: Color.AppColor,
    },
    buttonStyle: {
        width: scale(780, 0.3),
        borderRadius: 8,
        padding: moderateScale(16, 0.3),
        fontSize: moderateScale(20, 0.3),
        color: 'white',
        textAlign: 'center',
        alignContent: 'center',
        backgroundColor: Color.LoginBtnColor,
        fontFamily: 'Roboto-Bold'
    },
    textStyleBig: {
        fontSize: moderateScale(20, 0.3),
        color: Color.LoginBtnColor,
        fontFamily: 'Roboto-Bold'
    },
})