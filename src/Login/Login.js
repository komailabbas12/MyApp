import React from 'react';
import { View, Dimensions, SafeAreaView, StyleSheet, Image, TextInput, Text, TouchableOpacity, Keyboard, AsyncStorage } from "react-native";
import { Color, CustomAlert, Loader } from '../Common'
import { scale, moderateScale, verticalScale } from '../Common/Scaling'
import Api from '../Network/Api'



const { width, height } = Dimensions.get('window');

export default class Login extends React.Component {

    // User ID : tg2487@gmail.com
    // Password: 12345678

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pwd: '',
            ref_email: React.createRef(),
            ref_pwd: React.createRef(),
            isAlert: false,
            isAlertNavigation: false,
            alertText: '',
            isLoading: false,
            fcmTOKEN: ''
        }
        console.log("width " + width);
        console.log("height " + height);
    }

    showAlert(title, body) {
        Alert.alert(
            title, body,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always' }}>

                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <Loader loading={this.state.isLoading} />
                    <CustomAlert loading={this.state.isAlert} text={this.state.alertText} onPress={() => {
                        this.setState({
                            isAlert: false
                        })
                    }} />

                    <CustomAlert loading={this.state.isAlertNavigation} text={this.state.alertText} onPress={() => {
                        this.setState({
                            isAlertNavigation: false
                        })
                        this.props.navigation.navigate('Login')
                    }} />

                    <Image style={{ width: 150, height: 150, resizeMode: 'contain' }} source={require('../../assets/Images/FoodStretcher.png')}></Image>

                    <TextInput
                        ref={this.state.ref_email}
                        onSubmitEditing={() => this.state.ref_pwd.current.focus()}
                        style={[style.textInputStyle, { marginTop: verticalScale(130) }]}
                        placeholder="Email"
                        onChangeText={(text) => this.setState({ email: text })}
                        value={this.state.email}
                    />


                    <TextInput
                        ref={this.state.ref_pwd}
                        onSubmitEditing={() => Keyboard.dismiss()}
                        style={[style.textInputStyle, { marginTop: verticalScale(30) }]}
                        placeholder="Password"
                        secureTextEntry
                        maxLength={30}
                        onChangeText={(text) => this.setState({ pwd: text })}
                        value={this.state.pwd}
                    />
                    <TouchableOpacity disabled={false} onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                        <Text style={[style.textStyle, { width: scale(780), textAlign: 'right', marginTop: verticalScale(20), fontFamily: 'Roboto-Medium' }]}>{"Forgot Password?"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        if (this.state.email == '') {
                            this.setState({
                                isAlert: true,
                                alertText: 'Enter Email',
                            })
                            // alert("Enter First Name")
                            this.state.ref_email.current.focus()
                        }
                        else if (this.state.pwd == '') {
                            this.setState({
                                isAlert: true,
                                alertText: 'Enter Password'
                            })
                            // alert("Enter Last Name")
                            this.state.ref_pwd.current.focus()
                        }
                        else {
                            this.SignInApiCall()
                            // this.setState({
                            //     isLoading: true
                            // })
                            // this.setState({
                            //     isLoading: false
                            // })
                        }

                    }}>
                        <Text style={[style.buttonStyle, { marginTop: verticalScale(70) }]}>{"LOGIN"}</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', marginTop: verticalScale(40) }}>
                        <Text style={[style.textStyle, { marginTop: moderateScale(4, 0.3), marginRight: moderateScale(3, 0.3) }]}>{"Don't have an account?"}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                            <Text style={style.textStyleBig}>{"REGISTER"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: verticalScale(40) }}>
                        {/* <TouchableOpacity onPress={() => 
                                this.MoveToDahsboard()
                                }>
                                <Text style={style.textStyleBig}>{"Skip"}</Text>
                            </TouchableOpacity> */}
                    </View>

                </View>
            </SafeAreaView>
        )
    }
    MoveToDahsboard() {
        AsyncStorage.setItem('isUserLogin', '0')
        this.props.navigation.navigate('Main')
    }

    SignInApiCall() {

        this.setState({
            isLoading: true
        })

        const data = new FormData()
        data.append("email", this.state.email)
        data.append("password", this.state.pwd)

        // const data = new FormData()
        // data.append("email", "bhalaniuday18@gmail.com")
        // data.append("password", "12345"), 
        console.log("email::" + this.state.email + "PWD:" + this.state.pwd);
        new Promise((resolve, reject) => {
            Api.post("api_Login.php", data)
                .then((response) => {
                    console.log("responce" + JSON.stringify(response.body));
                    this.setState({
                        isLoading: false
                    })

                    if (response.body.success == "1") {
                        AsyncStorage.setItem('id', response.body.data.id)
                        AsyncStorage.setItem('username', response.body.data.username)
                        AsyncStorage.setItem('email', response.body.data.email)
                        AsyncStorage.setItem('mobile', response.body.data.mobile)

                        AsyncStorage.setItem('isUserLogin', '1')
                        this.props.navigation.navigate('Main')
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
    iconColor: {
        width: moderateScale(15, 0.3),
        height: moderateScale(15, 0.3),
        resizeMode: 'contain',
        tintColor: Color.AppColor,
    },
    textInputStyle: {
        width: scale(780, 0.3),
        height: moderateScale(60, 0.3),
        marginLeft: moderateScale(100, 0.3),
        marginRight: moderateScale(100, 0.3),
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
    textStyleBig: {
        fontSize: moderateScale(20, 0.3),
        color: Color.LoginBtnColor,
        fontFamily: 'Roboto-Bold'
    },
    buttonStyle: {
        width: scale(780, 0.3),
        marginLeft: moderateScale(100, 0.3),
        marginRight: moderateScale(100, 0.3),
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