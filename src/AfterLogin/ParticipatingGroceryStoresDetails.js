import React from 'react';
import { Image, Text, View, SafeAreaView,AsyncStorage,FlatList,TouchableOpacity, ScrollView  } from "react-native";
import { Color, NavTitle, NavButton, NavRightMenu } from '../Common/index'
import { Loader } from '../Common'
import { scale, moderateScale, verticalScale } from '../Common/Scaling'
import { Card } from "react-native-elements";

import Api from '../Network/Api'



export default class ParticipatingGroceryStoresDetails extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state
        return {
            headerLeft: <NavButton img onPress={() => navigation.goBack()} txtColor={false} />,
            headerTitle: <NavTitle setMargin={true} name="Stores Details" txtColor={false} />,
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
            description: '',
            image: '',
            isLoading: false,
            store_id: '',
            image: '',
            data:[]
        }
        this._bootstrapAsync().done()
    }

    async _bootstrapAsync() {

        const { navigation } = this.props;  
        const store_id = navigation.getParam('store_id', ''); 
        this.state.store_id = store_id
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
                <Image style={{width: '100%' , height: 220, resizeMode: 'contain'}} 
                source={this.state.image == '' ? require('../../assets/Images/FoodStretcher.png') : this.state.image}></Image>
                <ScrollView style={{flex: 1, alignContent:'center', width:'100%',}}>
                  <View style={{height:'100%', width:'100%'}}>
                  <FlatList
                      data={this.state.data}
                      renderItem={({ item: rowData }) => {
                      return (

                       <Card
                          title={null}
                          image={null}
                          containerStyle={{ padding: 10, 
                          marginLeft: moderateScale(40, 0.3),
                          marginRight: moderateScale(40, 0.3), borderRadius:10, borderColor:Color.Red}}
                          >
                            <TouchableOpacity disabled={true} onPress={() => this.props.navigation.navigate('ParticipatingGroceryStoresDetails')}>
                            <View>
                              <Text style={{ marginLeft:20, marginRight:20,marginBottom: 5, color:Color.AppColor, fontSize: moderateScale(16, 0.3) }}>
                                 {rowData.address}
                              </Text>
                              <Text style={{ marginLeft:20, marginRight:20,marginBottom: 5, color:Color.AppColor, fontSize: moderateScale(16, 0.3) }}>
                                 {rowData.mobile}
                              </Text>
                              <Text style={{ marginLeft:20, marginRight:20,marginBottom: 10, color:Color.AppColor, fontSize: moderateScale(16, 0.3) }}>
                                 {rowData.open}
                              </Text>
                            </View>
                            </TouchableOpacity>
                            
                          </Card>
                          
                         );
                      }}
                      keyExtractor={(item, index) => index}
                  />
                  </View>
                </ScrollView>
            </View>
            </SafeAreaView>
        )
    }
    
    DetailstoreApiCall() {

        this.setState({
            isLoading: true
        })

        const data = new FormData()
        data.append("id", this.state.store_id )
        
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
                            data: response.body.data,
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

