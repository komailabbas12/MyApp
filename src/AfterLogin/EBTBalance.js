import React from 'react';
import { Image, Text, View, SafeAreaView,Linking } from "react-native";
import { Color, NavTitle, NavButton,NavImage } from '../Common/index'
import { WebView } from "react-native-webview";
import { Loader } from '../Common'

import Api from '../Network/Api'



export default class EBTBalance extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <NavTitle name="Check Your EBT Balance" />,
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
        this.EbtBalanceApiCall()
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1,  alignItems: 'center'  }}>
            <View style={{flex: 1, alignContent:'center', width:'100%',}}>
                <Loader loading={this.state.isLoading} />
                {/* <WebView
                    source={{uri: 'https://github.com/facebook/react-native'}}
                    style={{marginTop: 20,flex:1}}
                /> */}
                {/* <WebView
                    source={{html: '<p><strong>Home Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n'}}
                    style={{marginTop: 20,flex:1, marginLeft:20, marginRight:20,}}
                /> */}
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
    
    EbtBalanceApiCall() {

        this.setState({
            isLoading: true
        })

        const data = new FormData()
        
        new Promise((resolve, reject) => {
            Api.post("api_ebt_balance.php", data)
                .then((response) => {
                    console.log("responce" + JSON.stringify(response.body));
                    this.setState({
                        isLoading: false
                    })

                    if (response.body.success == "1") {
                        this.setState({
                            description: response.body.data.description,
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

