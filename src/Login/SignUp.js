import React from 'react';
import {SafeAreaView,Image, View, TextInput, CheckBox, StyleSheet, Text, TouchableOpacity, Keyboard} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Color, CustomAlert, Loader } from '../Common'
import { scale, moderateScale, verticalScale } from '../Common/Scaling'
import Api from '../Network/Api'

export default class SignUp extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            lableText: "State",
            uname: '',
            email: '',
            pwd: '',
            mobile: '',
            dialogVisible: false,
            ref_uname: React.createRef(),
            ref_email: React.createRef(),
            ref_pwd: React.createRef(),
            ref_mobile: React.createRef(),
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
                                    ref={this.state.ref_uname}
                                    onSubmitEditing={() => this.state.ref_email.current.focus()}
                                    style={[style.textInputStyle, { marginTop: verticalScale(20) }]}
                                    placeholder="User Name"
                                    onChangeText={(text) => this.setState({ uname: text })}
                                    value={this.state.uname}
                                />
                                
                            <TextInput
                                ref={this.state.ref_email}
                                onSubmitEditing={() => this.state.ref_pwd.current.focus()}
                                style={[style.textInputStyle, { marginTop: verticalScale(20) }]}
                                placeholder="Email"
                                keyboardType='email-address'
                                onChangeText={(text) => this.setState({ email: text })}
                                value={this.state.email}
                            />
                            <TextInput
                                    ref={this.state.ref_pwd}
                                    onSubmitEditing={() => this.state.ref_mobile.current.focus()}
                                    style={[style.textInputStyle, { marginTop: verticalScale(20) }]}
                                    placeholder="Password"
                                    secureTextEntry
                                    maxLength={30}
                                    onChangeText={(text) => this.setState({ pwd: text })}
                                    value={this.state.pwd}
                                />

                            <TextInput
                                ref={this.state.ref_mobile}
                                onSubmitEditing={() => Keyboard.dismiss() }
                                style={[style.textInputStyle, { marginTop: verticalScale(20) }]}
                                placeholder="Mobile"
                                onChangeText={(text) => this.setState({ mobile: text })}
                                value={this.state.mobile}
                            />

                            <View style={{ width: scale(780), flexDirection: 'row', marginTop: verticalScale(24) }}>
                                <CheckBox
                                    style={{ alignSelf: 'center', marginRight: 8 }}
                                    onClick={() => {
                                        // this.setState({
                                        //     checked: !this.state.checked
                                        // })

                                        // if (!this.state.checked) {
                                        //     navigation.navigate('TermCondition')
                                        // }
                                    }}
                                    checkBoxColor={Color.AppColor}
                                    checkedCheckBoxColor={Color.AppColor}
                                // isChecked={this.state.checked}

                                />
                                <Text style={{
                                    alignSelf: 'center', fontSize: moderateScale(19, 0.3), color: Color.TextColor, fontFamily: 'Roboto-Regular'
                                }}>I agree to the Terms of Service by registration</Text>
                            </View>

                            <TouchableOpacity onPress={() => {
                                if (this.state.uname == '') {
                                    this.setState({
                                        isAlert: true,
                                        alertText: 'Enter User Name',
                                    })
                                    // alert("Enter First Name")
                                    this.state.ref_uname.current.focus()
                                }
                                else if (this.state.email == '') {
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
                                else if (this.state.pwd == '') {
                                    this.setState({
                                        isAlert: true,
                                        alertText: 'Enter Password'
                                    })
                                    // alert("Enter Last Name")
                                    this.state.ref_mobile.current.focus()
                                }
                                else if (this.state.mobile == 0) {
                                    this.setState({
                                        isAlert: true,
                                        alertText: 'Please Enter Mobile Number'
                                    })
                                }
                                else {
                                    this.SignUpApiCall()
                                }
                            }}>
                                <Text style={[style.buttonStyle, { marginTop: verticalScale(40) }]}>{"REGISTER"}</Text>

                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', marginTop: verticalScale(30), marginBottom: verticalScale(40) }}>
                                <Text style={[style.textStyle, { marginTop: moderateScale(4, 0.3), marginRight: moderateScale(3, 0.3), fontFamily: 'Roboto-Regular' }]}>{"Already have an account?"}</Text>
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

    SignUpApiCall() {

        this.setState({
            isLoading: true
        })

        const data = new FormData()
        data.append("SECRET", "2ca153dabdc7aa720b7ef9c341e14a75")
        data.append("X_AUTH_KEY", "037e54a21e894632ebd518e2623ca414")
        data.append("X_AUTH_O_KEY", "89152c7451378f00228f6f74d466015d")
        data.append("username", this.state.uname)
        data.append("email", this.state.email)
        data.append("password", this.state.pwd)
        data.append("mobile", this.state.mobile)

        // const data = new FormData()
        // data.append("email", "bhalaniuday18@gmail.com")
        // data.append("password", "12345"), 
        // data.append("SECRET", "2ca153dabdc7aa720b7ef9c341e14a75")
        // data.append("X_AUTH_KEY", "037e54a21e894632ebd518e2623ca414")
        // data.append("X_AUTH_O_KEY", "89152c7451378f00228f6f74d466015d")

        new Promise((resolve, reject) => {
            Api.post("api_Register.php", data)
                .then((response) => {
                    console.log("responce" + JSON.stringify(response.body));
                    this.setState({
                        isLoading: false
                    })

                    if (response.body.success == "1") {
                        this.props.navigation.goBack()
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
    imageStyle: {
        width: verticalScale(400, 0.3),
        height: verticalScale(150),
        resizeMode: 'contain',
        alignSelf: 'center'
    },
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
        fontSize: moderateScale(22, 0.3),
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
    autocompleteContainer: {
        width: scale(780, 0.3),
        zIndex: 1,

    },
    descriptionContainer: {
        // `backgroundColor` needs to be set otherwise the
        // autocomplete input will disappear on text input.
        width: scale(780, 0.3),
        backgroundColor: '#F5FCFF',
        marginTop: 8
    },
    infoText: {
        textAlign: 'center'
    },
})