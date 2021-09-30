
import React from 'react';
import { Image, Text, View, SafeAreaView,Linking } from "react-native";
import { Color, NavTitle, NavButton, NavRightMenu } from '../Common/index'
import { WebView } from "react-native-webview";
import { Loader } from '../Common'

import Api from '../Network/Api'



export default class ThisMonthsFoodSavingDetails extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
        return {
            headerLeft: <NavButton img onPress={() => navigation.goBack()} txtColor={false} />,
            headerTitle: <NavTitle setMargin={true} name={this.state.title} txtColor={false} />,
            headerStyle: {
                backgroundColor: Color.AppColor,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            image: '',
            isLoading: false,
            id: '',
        }
        this._bootstrapAsync().done()
    }

    async _bootstrapAsync() {

        this.setState({
            id: await AsyncStorage.getItem('id'),
        })
        this.DetailstoreApiCall()
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1,  alignItems: 'center'  }}>
            <View style={{flex: 1, alignContent:'center', width:'100%',}}>
                <Loader loading={this.state.isLoading} />
                <Image style={{width: '100%' , height: 220}} 
                source={this.state.image == '' ? require('../../assets/Images/FoodStretcher.png') : this.state.image}></Image>

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
    
    DetailstoreApiCall() {

        this.setState({
            isLoading: true
        })

        const data = new FormData()
        data.append("id", this.state.id)
        
        new Promise((resolve, reject) => {
            Api.post("api_Detailstore.php", data)
                .then((response) => {
                    console.log("responce" + JSON.stringify(response.body));
                    this.setState({
                        isLoading: false
                    })

                    if (response.body.success == "1") {
                        this.setState({
                            description: "",
                            image: { uri: response.body.image },
                            title: response.body.title
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

