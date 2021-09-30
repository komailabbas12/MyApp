import React from 'react';
import { Image, Text, View, SafeAreaView,Header,Linking } from "react-native";
import { Color, NavTitle, NavButton,NavImage } from '../Common/index'
import { WebView } from "react-native-webview";
import { Loader } from '../Common'
import Ionicons from 'react-native-vector-icons'

//custom components imports 
import CustomHeader from '../Common/CustomHeader'

import Api from '../Network/Api'



export default class Home extends React.Component {
    
    static navigationOptions = ({ navigation }) => ({
        headerTitle: <NavTitle name="Home" />,
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
            {/* <View style={{width:'100%', height:64, backgroundColor:Color.AppColor}}>
                <NavButton style={{ marginLeft: 10 }} onPress={() => this.props.navigation.openDrawer()} />
            </View>     */}
            <View style={{flex: 1, alignContent:'center', width:'100%',}}>
                <Loader loading={this.state.isLoading} />
                <Image style={{width: '100%' , height: 150 , resizeMode:'contain', marginTop:30}} 
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
                            // this.isFirstTime = false
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
            Api.post("api_About_page.php", data)
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

