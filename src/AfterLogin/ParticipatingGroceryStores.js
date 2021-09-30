import React from 'react';
import { Image, Text, View, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { Color, NavTitle, NavButton, NavImage } from '../Common/index'
import { WebView } from "react-native-webview";
import { Loader } from '../Common'
import { scale, moderateScale, verticalScale } from '../Common/Scaling'
import { Card } from "react-native-elements";

import Api from '../Network/Api'



export default class ParticipatingGroceryStores extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: <NavTitle name="Participating Grocers" />,
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
            data: [],
            isLoading: false,
        }
        this._bootstrapAsync().done()
    }

    async _bootstrapAsync() {
        this.ListstoreApiCall()
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flex: 1, alignContent: 'center', width: '100%', }}>
                    <Loader loading={this.state.isLoading} />
                    <View style={{ height: '100%', width: '100%' }}>
                        <FlatList
                            height={180}
                            data={this.state.data}
                            renderItem={({ item: rowData }) => {
                                return (
<>
                                    <Card
                                        title={null}
                                        image={null}
                                        containerStyle={{
                                            padding: 10,
                                            justifyContent: "center", alignItems: "center",
                                            marginLeft: moderateScale(40, 0.3),
                                            marginRight: moderateScale(40, 0.3), borderRadius: 10, borderColor: Color.Red
                                        }}
                                    >
                                        <TouchableOpacity disabled={false} onPress={() => this.props.navigation.navigate('ParticipatingGroceryStoresDetails', { store_id: rowData.id })}>
                                            <View style={{ width: "100%", flexDirection: 'column', alignItems: "center", justifyContent: "center" }} >
                                                <Text style={{ color: Color.AppColor, fontSize: moderateScale(24, 0.3) }}>
                                                    {rowData.name}
                                                </Text>
                                                <Image style={{ height: moderateScale(100, 0.3), width: moderateScale(284, 0.3), resizeMode: 'contain' }} source={{ uri: rowData.image }} />
                                            </View>
                                        </TouchableOpacity>
                                    </Card>
                                    <Text style={{textAlign:"center" , marginTop:12}}>Touch name to see locations</Text>
                                    </>
                                );
                            }}
                            keyExtractor={(item, index) => index}
                        />
                    </View>

                </View>
            </SafeAreaView>
        )
    }

    ListstoreApiCall() {

        this.setState({
            isLoading: true
        })

        const data = new FormData()

        new Promise((resolve, reject) => {
            Api.post("api_Liststore.php", data)
                .then((response) => {
                    console.log("responce" + JSON.stringify(response.body));
                    this.setState({
                        isLoading: false
                    })

                    if (response.body.success == "1") {
                        this.setState({
                            data: response.body.data
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

