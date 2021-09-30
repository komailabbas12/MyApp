import React from 'react';
import { Image, Text, View, SafeAreaView,Linking } from "react-native";
import { Color, NavTitle, NavButton,NavImage } from '../Common/index'
import { WebView } from "react-native-webview";
import { Loader } from '../Common'

import Api from '../Network/Api'



export default class EBTCalculator extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <NavTitle name="EBT Calculator - How Much I'm Spending?" />,
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
            image: '',
            isLoading: false,
        }
        this._bootstrapAsync().done()
    }

    async _bootstrapAsync() {
        this.HomeApiCall()
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1,  alignItems: 'center'  }}>
            <View style={{flex: 1, alignContent:'center', width:'100%',}}>
                <Loader loading={this.state.isLoading} />
                
                <WebView
                     source={{ uri: "https://www.online-calculator.com/full-screen-calculator/" }}
                    style={{marginTop: 20,flex:1, marginLeft:20, marginRight:20,}}
                    onShouldStartLoadWithRequest={(event) => {
                        if (this.isFirstTime == false) {
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
    
    HomeApiCall() {

        this.setState({
            isLoading: true
        })

        const data = new FormData()

        new Promise((resolve, reject) => {
            Api.post("api_Home_page.php", data)
                .then((response) => {
                    console.log("responce" + JSON.stringify(response.body));
                    this.setState({
                        isLoading: false
                    })

                    if (response.body.success == "1") {
                        this.setState({
                            description: response.body.data.description,
                            image: { uri: response.body.data.image }
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

