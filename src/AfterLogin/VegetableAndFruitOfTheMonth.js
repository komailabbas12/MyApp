import React from 'react';
import { Image, Text, View, SafeAreaView,Linking } from "react-native";
import { Color, NavTitle, NavButton, NavImage } from '../Common/index'
import { WebView } from "react-native-webview";
import { Loader } from '../Common'
import { scale, moderateScale, verticalScale } from '../Common/Scaling'

import Api from '../Network/Api'



export default class VegetableAndFruitOfTheMonth extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <NavTitle name="VEGETABLE and FRUIT of the MONTH" />,
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
            description: '',
            title: '',
        }
        this._bootstrapAsync().done()
    }

    async _bootstrapAsync() {
        this.VandfOfTheMonthApiCall()
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1,  alignItems: 'center'  }}>
            <View style={{flex: 1, alignContent:'center', width:'100%',}}>
                <Loader loading={this.state.isLoading} />
            
                <Text style={{marginTop:30, fontSize: moderateScale(28, 0.3), marginLeft:20, marginRight:20 }}>{this.state.title}</Text>
                <WebView
                    source={{html: this.state.description}}
                    style={{marginTop: 20,flex:1, marginLeft:20, marginRight:20,}}
                    onShouldStartLoadWithRequest={(event) => {
                        var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
                        if (regexp.test(event.url)) {
                            Linking.openURL(event.url);
                            return false;
                        }else{
                            return true
                        }
                      }}
                />
            </View>
            </SafeAreaView>
        )
    }
    VandfOfTheMonthApiCall() {

        this.setState({
            isLoading: true
        })

        const data = new FormData()
        

        new Promise((resolve, reject) => {
            Api.post("api_Vandfofthemonth_page.php", data)
                .then((response) => {
                    console.log("responce" + JSON.stringify(response.body));
                    this.setState({
                        isLoading: false
                    })

                    if (response.body.success == "1") {
                        this.setState({
                            description: response.body.data.description,
                            title: response.body.data.title,
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

