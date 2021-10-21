//This is an example code for Navigation Drawer with Custom Side bar//
import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Alert, AsyncStorage, SafeAreaView, ScrollView } from 'react-native';
import { Color } from '../src/Common/index'
import Header from '../src/CommonScreen/Header'
import Api from './Network/Api'

export default class Menu extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      loginOrLogOut: 'Logout',
      items: []
    }
    //Setting up the Main Top Large Image of the Custom Sidebar
    this.proileImage =
      'https://aboutreact.com/wp-content/uploads/2018/07/sample_img.png';
    //Array of the sidebar navigation option with icon and screen to navigate
    //This screens can be any screen defined in Drawer Navigator in App.js
    //You can find the Icons from here https://material.io/tools/icons/
    // this.items = [
    //   {
    //     navOptionThumb: require('../assets/Images/ic_home.png'),
    //     navOptionName: 'About us',
    //     screenToNavigate: 'NavScreen1',
    //   },
    //   {
    //     navOptionThumb: require('../assets/Images/ic_food_saving.png'),
    //     navOptionName: "This Month's Food Savings",
    //     screenToNavigate: 'NavScreen2',
    //   },
    //   {
    //     navOptionThumb: require('../assets/Images/ic_diet.png'),
    //     navOptionName: 'VEGETABLE and FRUIT of \nthe MONTH',
    //     screenToNavigate: 'NavScreen3',
    //   },
    //   {
    //     navOptionThumb: require('../assets/Images/ic_diet.png'),
    //     navOptionName: 'Patented Fresh FRUITS And \nVEGETABLE Program',
    //     screenToNavigate: 'NavScreen4',
    //   },
    //   {
    //     navOptionThumb: require('../assets/Images/ic_checklist.png'),
    //     navOptionName: 'Check Your EBT Balance',
    //     screenToNavigate: 'NavScreen5',
    //   },
    //   // {
    //   //   navOptionThumb: require('../assets/Images/ic_checklist.png'),
    //   //   navOptionName: "EBT Calculator - How Much I'm Spending?",
    //   //   screenToNavigate: 'NavScreen6',
    //   // },
    //   {
    //     navOptionThumb: require('../assets/Images/ic_barcode.png'),
    //     navOptionName: 'Barcode',
    //     screenToNavigate: 'NavScreen7',
    //   },
    //   {
    //     navOptionThumb: require('../assets/Images/ic_shop.png'),
    //     navOptionName: 'Participating Grocery Stores',
    //     screenToNavigate: 'NavScreen8',
    //   },
    //   {
    //     navOptionThumb: require('../assets/Images/ic_checklist.png'),
    //     navOptionName: 'Apply for OHIO SNAP EBT',
    //     screenToNavigate: 'NavScreen9',
    //   },
    //   {
    //     navOptionThumb: require('../assets/Images/ic_help.png'),
    //     navOptionName: 'Need Emergency Food?',
    //     screenToNavigate: 'NavScreen10',
    //   },
    //   {
    //     navOptionThumb: require('../assets/Images/ic_help.png'),
    //     navOptionName: 'Gas, Water and Electric Bill Help',
    //     screenToNavigate: 'NavScreen11',
    //   },
    //   {
    //     navOptionThumb: require('../assets/Images/ic_mic.png'),
    //     navOptionName: 'Recipes and Sponsorships',
    //     screenToNavigate: 'NavScreen13',
    //   },
    //   {
    //     navOptionThumb: require('../assets/Images/ic_mic.png'),
    //     navOptionName: 'What foods would you want to buy?',
    //     screenToNavigate: 'NavScreen14',
    //   },
    // ];
  }
  componentDidMount() {
    console.log("drawer")
    var myHeaders = new Headers();
    myHeaders.append("SECRET", "2ca153dabdc7aa720b7ef9c341e14a75");
    myHeaders.append("X_AUTH_KEY", "037e54a21e894632ebd518e2623ca414");
    myHeaders.append("X_AUTH_O_KEY", "89152c7451378f00228f6f74d466015d");
    myHeaders.append("Cookie", "PHPSESSID=504495f88c26095d9f6bd5aba9b8f94e");

    var formdata = new FormData();
    formdata.append("SECRET", "2ca153dabdc7aa720b7ef9c341e14a75");
    formdata.append("X_AUTH_KEY", "037e54a21e894632ebd518e2623ca414");
    formdata.append("X_AUTH_O_KEY", "89152c7451378f00228f6f74d466015d");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://www.foodstretcher-plus.com/application_new/apis/api_title_food_name.php", requestOptions)
      .then(response => response.json())
      .then((result) => {
        const it = [
          {
            navOptionThumb: require('../assets/Images/ic_home.png'),
            navOptionName: 'About us',
            screenToNavigate: 'NavScreen1',
          },
          {
            navOptionThumb: require('../assets/Images/ic_food_saving.png'),
            navOptionName: result.data.title,
            screenToNavigate: 'NavScreen2',
          },
          {
            navOptionThumb: require('../assets/Images/ic_diet.png'),
            navOptionName: 'VEGETABLE and FRUIT of \nthe MONTH',
            screenToNavigate: 'NavScreen3',
          },
          {
            navOptionThumb: require('../assets/Images/ic_diet.png'),
            navOptionName: 'Patented Fresh FRUITS And \nVEGETABLE Program',
            screenToNavigate: 'NavScreen4',
          },
          {
            navOptionThumb: require('../assets/Images/ic_checklist.png'),
            navOptionName: 'Check Your EBT Balance',
            screenToNavigate: 'NavScreen5',
          },
          // {
          //   navOptionThumb: require('../assets/Images/ic_checklist.png'),
          //   navOptionName: "EBT Calculator - How Much I'm Spending?",
          //   screenToNavigate: 'NavScreen6',
          // },
          {
            navOptionThumb: require('../assets/Images/ic_barcode.png'),
            navOptionName: 'Barcode',
            screenToNavigate: 'NavScreen7',
          },
          {
            navOptionThumb: require('../assets/Images/ic_shop.png'),
            navOptionName: 'Participating Grocery Stores',
            screenToNavigate: 'NavScreen8',
          },
          {
            navOptionThumb: require('../assets/Images/ic_checklist.png'),
            navOptionName: 'Apply for OHIO SNAP EBT',
            screenToNavigate: 'NavScreen9',
          },
          {
            navOptionThumb: require('../assets/Images/ic_help.png'),
            navOptionName: 'Need Emergency Food?',
            screenToNavigate: 'NavScreen10',
          },
          {
            navOptionThumb: require('../assets/Images/ic_help.png'),
            navOptionName: 'Gas, Water and Electric Bill Help',
            screenToNavigate: 'NavScreen11',
          },
          {
            navOptionThumb: require('../assets/Images/ic_mic.png'),
            navOptionName: 'Recipes and Sponsorships',
            screenToNavigate: 'NavScreen13',
          },
          {
            navOptionThumb: require('../assets/Images/ic_mic.png'),
            navOptionName: 'What foods would you want to buy?',
            screenToNavigate: 'NavScreen14',
          },
        ];
        this.setState({ items: it })
        console.log(result)


      })
      .catch(error => console.log('error', error));
  }

  render() {

    setTimeout(() => {
      _checkLoginAsync().done()
    }, 1000);

    SetLogin = async () => {
      this.state.isLogin = false
      this.state.loginOrLogOut = 'Login'
    }
    SetLogOut = async () => {
      this.state.isLogin = true
      this.state.loginOrLogOut = 'Logout'
    }
    _checkLoginAsync = async () => {
      const role = await AsyncStorage.getItem('isUserLogin');
      { role == "1" ? SetLogOut() : SetLogin() }
    }
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Color.AppColor }}>
        <Header />
        <ScrollView>
          <View style={styles.sideMenuContainer, backgroundColor = Color.AppColor}>
            {/*Setting up Navigation Options from option array using loop*/}
            <View style={{ width: '100%' }, backgroundColor = Color.AppColor}>
              {this.state.items.map((item, key) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: Color.AppColor,
                  }}
                  key={key}>
                  <View style={{ marginRight: 10, marginLeft: 20 }}>
                    <Image
                      source={item.navOptionThumb}
                      style={{ width: 25, height: 25, marginLeft: 5, tintColor: Color.White }}
                    />
                  </View>
                  <TouchableOpacity
                    style={{width:"75%"}}
                    onPress={() => {

                      console.log("item.navOptionName " + item.navOptionName);
                      console.log("this.state.loginOrLogOut " + this.state.loginOrLogOut);
                      if (item.navOptionName == 'What foods would you want to buy?' && this.state.loginOrLogOut == 'Login') {
                        Alert.alert(
                          '',
                          "Please Login First?",
                          [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {
                              text: 'Login', onPress: () => {
                                this.props.navigation.navigate('Login')
                              }
                            },
                          ],
                          { cancelable: false },
                        )
                      } else {
                        this.props.navigation.navigate(item.screenToNavigate, {
                          title: item.navOptionName
                        });
                        global.currentScreenIndex = key;
                      }
                    }}>
                    <Text style={{
                      fontSize: 15,
                      color: '#fff',
                      flex: 1,
                     
                    }}>
                      {item.navOptionName}
                    </Text>

                  </TouchableOpacity>
                </View>
              ))}


              {/* LogOut Code */}
              <TouchableOpacity onPress={() => {
                if (this.state.loginOrLogOut == 'Logout') {

                  Alert.alert(
                    '',
                    "Are you sure want to logout?",
                    [
                      {
                        text: 'No',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {
                        text: 'Yes', onPress: () => {
                          AsyncStorage.setItem('isUserLogin', "")
                          AsyncStorage.setItem('id', "")
                          AsyncStorage.setItem('username', "")
                          AsyncStorage.setItem('email', "")
                          AsyncStorage.setItem('mobile', "")
                          this.props.navigation.navigate('Login')
                        }
                      },
                    ],
                    { cancelable: false },
                  )
                } else {
                  this.props.navigation.navigate('Login')
                }
              }
              }>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10,
                  paddingBottom: 10,
                  backgroundColor: Color.AppColor,
                }}>
                  <View style={{ marginRight: 10, marginLeft: 20 }}>
                    <Image
                      source={require('../assets/Images/ic_logout.png')}
                      style={{ width: 25, height: 25, marginLeft: 5, tintColor: Color.White }}
                    />
                  </View>

                  <Text style={{
                    fontSize: 15,
                    color: Color.White,
                    width: '100%'
                  }}>{
                      this.state.loginOrLogOut
                    }
                  </Text>
                </View>
              </TouchableOpacity>

            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    );
  }

}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 150,
    height: 150,
    marginTop: 20,
    borderRadius: 150 / 2,
  },
});