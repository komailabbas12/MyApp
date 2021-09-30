import React from 'react';
import { Image, Text, View, SafeAreaView, FlatList, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Color, NavTitle, NavButton, NavImage } from '../Common/index'
import { WebView } from "react-native-webview";
import { Loader } from '../Common'
import { scale, moderateScale, verticalScale } from '../Common/Scaling'
import { Card } from "react-native-elements";


const { height } = Dimensions.get('window');

import Api from '../Network/Api'


export default class ThisMonthsFoodSaving extends React.Component {

  static navigationOptions = ({ navigation }) => (
    {

      headerTitle: <NavTitle name={navigation.dangerouslyGetParent().getParam('title')} />,
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
      isLoading: false,
      dataThisMonth: [],
      dataThisMonthWithWIC: []
    }
    this._bootstrapAsync().done()
  }

  async _bootstrapAsync() {
    this.VandfOfTheMonthApiCall()
  };
  state = {
    screenHeight: 0,
  };
  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };
  render() {
    console.log(this.props.navigation.dangerouslyGetParent().getParam('user'))
    const scrollEnabled = this.state.screenHeight > height;
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: "#fff" }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollview}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}
        >

          <View style={{ flex: 1, alignContent: 'center', width: '100%', }}>
            <Loader loading={this.state.isLoading} />

            {/* <Text
              style={{
                marginTop: 0,
                textAlign: 'center',
                fontSize: moderateScale(18, 0.1),
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
                color: Color.Red,
              }}>{'Brands are for demonstration only'}</Text> */}

            {/* <Text
              style={{
                marginTop: 0,
                textAlign: 'center',
                fontSize: moderateScale(18, 0.1),
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 10,
                color: Color.Red,
              }}>{'Food Stretcher Plus program begins summer 2021.'}</Text> */}
            <Text style={{ color: "#ED1C24", marginTop: 0, textAlign: 'center', fontSize: moderateScale(18, 0.3), paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, backgroundColor: '#fff', }}>{'Be sure to visit the PATENTED FRESH FRUITS and VEGETABLE PROGRAM for more savings'}</Text>
            <View style={{ height: 290, width: '100%' }}>
              <FlatList
                horizontal
                height={270}
                data={this.state.dataThisMonth}
                renderItem={({ item: rowData }) => {
                  return (

                    <Card
                      title={null}
                      image={null}
                      containerStyle={{ padding: 10, width: 200, height: 270, borderRadius: 10, borderColor: Color.Red, overflow: "hidden" }}
                    >
                      {console.log("############################", rowData.name.length)}
                      <TouchableOpacity disabled={true} onPress={() => this.props.navigation.navigate('ThisMonthsFoodSavingDetails')}>


                        <Image style={{ width: 180, height: rowData.name.length > 22 ? '75%' : '80%' }} source={{ uri: rowData.image }} />
                        <Text style={{ marginBottom: 4, textAlign: 'center', color: Color.AppColor, fontSize: moderateScale(16, 0.3) }}>
                          {rowData.name}
                        </Text>
                        <Text style={{ textAlign: 'center', fontSize: moderateScale(18, 0.3), fontWeight: 'bold' }}>
                          {rowData.description}
                        </Text>

                      </TouchableOpacity>
                    </Card>
                  );
                }}
                keyExtractor={(item, index) => index}
              />
            </View>
            <Text
              style={{
                marginTop: 0,
                textAlign: 'center',
                fontSize: moderateScale(23, 0.1),
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
                paddingBottom: 10,
                color: Color.Red,
                // textDecorationLine: 'underline'
              }}>{'Receive discounts on the Fresh Vegetable and Fruit of the Month. When You Buy These WIC Brands '}</Text>
            <View style={{ height: 290, width: '100%' }}>
              <FlatList
                horizontal
                height={270}
                data={this.state.dataThisMonthWithWIC}
                renderItem={({ item: rowData }) => {
                  return (

                    <Card
                      title={null}
                      image={null}
                      containerStyle={{ padding: 10, width: 200, height: 270, borderRadius: 10, borderColor: Color.Red }}
                    >
                      <TouchableOpacity disabled={true} onPress={() => this.props.navigation.navigate('ThisMonthsFoodSavingDetails')}>
                        <View>

                          <Image style={{ width: 180, height: 200 }} source={{ uri: rowData.image }} />
                          <Text style={{ marginBottom: 10, textAlign: 'center', color: Color.AppColor, fontSize: moderateScale(16, 0.3) }}>
                            {rowData.name}
                          </Text>
                          <Text style={{ marginBottom: 10, textAlign: 'center', fontSize: moderateScale(16, 0.3) }}>
                            {rowData.description}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </Card>
                  );
                }}
                keyExtractor={(item, index) => index}
              />
            </View>

          </View>

        </ScrollView>
      </SafeAreaView>
    )
  }

  VandfOfTheMonthApiCall() {

    this.setState({
      isLoading: true
    })

    const data = new FormData()

    new Promise((resolve, reject) => {
      Api.post("api_Listfood_savings_s.php", data)
        .then((response) => {
          console.log("responce" + JSON.stringify(response.body));
          this.setState({
            isLoading: false
          })

          if (response.body.success == "1") {
            this.setState({
              dataThisMonth: response.body.data,
            })
          }
          else {
            this.setState({
              isAlert: true,
              alertText: response.body.message,
            })
          }
          this.ThisMonthWithWIChApiCall()
        })
        .catch(reject)

    })

  }
  ThisMonthWithWIChApiCall() {

    this.setState({
      isLoading: true
    })

    const data = new FormData()

    new Promise((resolve, reject) => {
      Api.post("api_Listfood_savings_w.php", data)
        .then((response) => {
          console.log("responce" + JSON.stringify(response.body));
          this.setState({
            isLoading: false
          })

          if (response.body.success == "1") {
            this.setState({
              dataThisMonthWithWIC: response.body.data,
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#85D4E7",
  },
  scrollview: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 10,
  },
});
