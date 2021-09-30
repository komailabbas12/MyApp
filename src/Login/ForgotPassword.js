import React from 'react';
import {SafeAreaView,Image, View, TextInput, CheckBox, StyleSheet, Text, TouchableOpacity, Keyboard} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Color, CustomAlert, Loader } from '../Common'
import { scale, moderateScale, verticalScale } from '../Common/Scaling'
import Api from '../Network/Api'

export default class ForgotPassword extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            lableText: "State",
            email: '',
            dialogVisible: false,
            ref_email: React.createRef(),
            query: '',
            isLoading: false,
            isAlert: false,
            isAlertNavigation:false,
            alertText: '',
            alertPress: ''
        }
        // this._bootstrapAsync().done();
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1,  alignItems: 'center'  }}>
                <Image style={{width: 150 , height: 150 , resizeMode:'contain', marginTop:30}} source={require('../../assets/Images/FoodStretcher.png')}></Image>
                <KeyboardAwareScrollView enableOnAndroid={true}>

                <View style={{ flex: 1, alignItems: 'center',}}>
                        <Loader loading={this.state.isLoading} />
                        <CustomAlert loading={this.state.isAlert} text={this.state.alertText} onPress={() => {
                            this.setState({
                                isAlert: false
                            })
                        }} isTwo={false} />

                        <CustomAlert loading={this.state.isAlertNavigation} text={this.state.alertText} onPress={() => {
                            this.setState({
                                isAlertNavigation: false
                            })
                            this.props.navigation.navigate('Login')
                        }} />

                        <View style={{ alignItems: 'center'}}>

                            <TextInput
                                ref={this.state.ref_email}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                style={[style.textInputStyle, { marginTop: verticalScale(20) }]}
                                placeholder="Email"
                                keyboardType='email-address'
                                onChangeText={(text) => this.setState({ email: text })}
                                value={this.state.email}
                            />

                            <TouchableOpacity onPress={() => {
                                if (this.state.email == '') {
                                    this.setState({
                                        isAlert: true,
                                        alertText: 'Enter Email'
                                    })
                                    this.state.ref_email.current.focus()
                                }
                                else if (!this.validateEmail(this.state.email)) {
                                    this.setState({
                                        isAlert: true,
                                        alertText: 'Enter Valid Email Id'
                                    })
                                    this.state.ref_email.current.focus()
                                }
                                else {
                                    this.ForgotPasswordApiCall()
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

    ForgotPasswordApiCall() {

        this.setState({
            isLoading: true
        })

        const data = new FormData()
        
        data.append("email", this.state.email)

        new Promise((resolve, reject) => {
            Api.post("forgotpassword.php", data)
                .then((response) => {
                    console.log("responce" + JSON.stringify(response.body));
                    this.setState({
                        isLoading: false
                    })

                    if (response.body.success == "1") {
                        this.props.navigation.navigate('OTPScreen',{  
                            emial: this.state.email,  
                            otp: response.body.data.otp,  
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