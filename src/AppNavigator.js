
import React, { Component } from 'react'
import { createAppContainer, createSwitchNavigator, Image, Icon, StyleSheet } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { SafeAreaView, TouchableOpacity, ScrollView, Text, View, I18nManager, Alert, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons'
import { NavTitle, NavButton, NavImage } from '../src/Common/index'

import { Color } from '../src/Common'

import Splash from '../src/Splash'
import Login from '../src/Login/Login'
import SignUp from '../src/Login/SignUp'
import ForgotPassword from '../src/Login/ForgotPassword'
import Home from '../src/AfterLogin/Home'
import SettingsScreen from '../src/AfterLogin/SettingsScreen'
import VegetableAndFruitOfTheMonth from '../src/AfterLogin/VegetableAndFruitOfTheMonth'
import ThisMonthsFoodSaving from '../src/AfterLogin/ThisMonthsFoodSaving'
import ThisMonthsFoodSavingDetails from '../src/AfterLogin/ThisMonthsFoodSavingDetails'
import PatentedFreshFRUITSAndVEGETABLEProgram from '../src/AfterLogin/PatentedFreshFRUITSAndVEGETABLEProgram'
import EBTBalance from '../src/AfterLogin/EBTBalance'
import Barcode from '../src/AfterLogin/Barcode'
import ParticipatingGroceryStores from '../src/AfterLogin/ParticipatingGroceryStores'
import ApplyOhioSnapEbt from '../src/AfterLogin/ApplyOhioSnapEbt'
import NeedEmergencyFood from '../src/AfterLogin/NeedEmergencyFood'
import GasWaterAndElectricBillHelp from '../src/AfterLogin/GasWaterAndElectricBillHelp'
import FreeFoodGiveAway from '../src/AfterLogin/FreeFoodGiveAway'
import RecepiesAndSponsorships from '../src/AfterLogin/RecepiesAndSponsorships'
import FoodYouWantToBuy from '../src/AfterLogin/FoodYouWantToBuy'
import ParticipatingGroceryStoresDetails from '../src/AfterLogin/ParticipatingGroceryStoresDetails'
// import EBTCalculator from '../src/AfterLogin/EBTCalculator'
import OTPScreen from '../src/Login/OTPScreen'
import NewPassword from '../src/Login/NewPassword'
import Menu from '../src/Menu'


import Header from '../src/CommonScreen/Header'
// import Header from '../assets'

//Navigation Drawer Structure for all screen
class NavigationDrawerStructure extends React.Component {
  //Top Navigation Header with Donute Button
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('../assets/Images/ic_drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const customDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <Header />
    <ScrollView>
      <DrawerItems
        {...props} />
      <TouchableOpacity onPress={() => Alert.alert(
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

              // AsyncStorage.setItem('isUserLogin', "")
              // AsyncStorage.setItem('id', "")
              // AsyncStorage.setItem('username', "")
              // AsyncStorage.setItem('email', "")
              // AsyncStorage.setItem('mobile', "")
              // try {
              //   AsyncStorage.removeItem("isUserLogin");
              //   AsyncStorage.removeItem('id');
              //   AsyncStorage.removeItem('username');
              //   AsyncStorage.removeItem('email');
              //   AsyncStorage.removeItem('mobile');

              // }
              // catch(exception) {
              // }
              // props.navigation.navigate('Login')
            }
          },
        ],
        { cancelable: false },
      )}>
        <View style={{ padding: 10 }}>
          <Text style={{ color: 'black', fontWeight: 'bold', marginLeft: 8 }}>Logout</Text>

        </View>
      </TouchableOpacity>
    </ScrollView>

  </SafeAreaView >
)

const HomeStack = createStackNavigator({
  First: {
    screen: Home,
  },
})

const VegetableAndFruitOfTheMonthStack = createStackNavigator({
  Second: {
    screen: VegetableAndFruitOfTheMonth,
  },
})

const MonthFoodSavingsStack = createStackNavigator({
  SettingsScreen: { screen: SettingsScreen },
})

// const VegetableAndFruitOfTheMonthStack = createStackNavigator({
//   VegetableAndFruitOfTheMonth: { screen: VegetableAndFruitOfTheMonth },
// })

const ThisMonthsFoodSavingStack = createStackNavigator({
  ThisMonthsFoodSaving: { screen: ThisMonthsFoodSaving },
  ThisMonthsFoodSavingDetails: { screen: ThisMonthsFoodSavingDetails },
})

const PatentedFreshFRUITSAndVEGETABLEProgramStack = createStackNavigator({
  PatentedFreshFRUITSAndVEGETABLEProgram: { screen: PatentedFreshFRUITSAndVEGETABLEProgram },
})

const EBTBalanceStack = createStackNavigator({
  EBTBalance: { screen: EBTBalance },
})

// const EBTCalculatorStack = createStackNavigator({
//   EBTCalculator: { screen: EBTCalculator },
// })

const BarcodeStack = createStackNavigator({
  Barcode: { screen: Barcode },
})

const ParticipatingGroceryStoresStack = createStackNavigator({
  ParticipatingGroceryStores: { screen: ParticipatingGroceryStores },
  ParticipatingGroceryStoresDetails: { screen: ParticipatingGroceryStoresDetails },
})

const ApplyOhioSnapEbtStack = createStackNavigator({
  ApplyOhioSnapEbt: { screen: ApplyOhioSnapEbt },
})

const NeedEmergencyFoodStack = createStackNavigator({
  NeedEmergencyFood: { screen: NeedEmergencyFood },
})

const GasWaterAndElectricBillHelpStack = createStackNavigator({
  GasWaterAndElectricBillHelp: { screen: GasWaterAndElectricBillHelp },
})

const FreeFoodGiveAwayStack = createStackNavigator({
  FreeFoodGiveAway: { screen: FreeFoodGiveAway },
})

const RecepiesAndSponsorshipsStack = createStackNavigator({
  RecepiesAndSponsorships: { screen: RecepiesAndSponsorships },
})

const FoodYouWantToBuyStack = createStackNavigator({
  FoodYouWantToBuy: { screen: FoodYouWantToBuy },
})

//Drawer Navigator Which will provide the structure of our App
const AfterLoginStack = createDrawerNavigator(
  {
    //Drawer Optons and indexing

    NavScreen1: { screen: HomeStack },
    NavScreen2: { screen: ThisMonthsFoodSavingStack },
    NavScreen3: { screen: VegetableAndFruitOfTheMonthStack },
    NavScreen4: { screen: PatentedFreshFRUITSAndVEGETABLEProgramStack },
    NavScreen5: { screen: EBTBalanceStack },
    // NavScreen6: { screen: EBTCalculatorStack },
    NavScreen7: { screen: BarcodeStack },
    NavScreen8: { screen: ParticipatingGroceryStoresStack },
    NavScreen9: { screen: ApplyOhioSnapEbtStack },
    NavScreen10: { screen: NeedEmergencyFoodStack },
    NavScreen11: { screen: GasWaterAndElectricBillHelpStack },
    NavScreen12: { screen: FreeFoodGiveAwayStack },
    NavScreen13: { screen: RecepiesAndSponsorshipsStack },
    NavScreen14: { screen: FoodYouWantToBuyStack }
  },
  {
    //For the Custom sidebar menu we have to provide our CustomSidebarMenu
    contentComponent: Menu,
    //Sidebar width
    drawerWidth: Dimensions.get('window').width - 100,
  }
);










const LoginStack = createStackNavigator({
  Login: {
    screen: Login, navigationOptions: {
      header: null,
    },
  },
  SignUp: {
    screen: SignUp, navigationOptions: {
      header: null,
    },
  },
  ForgotPassword: {
    screen: ForgotPassword, navigationOptions: {
      header: null,
    },
  },
  OTPScreen: {
    screen: OTPScreen, navigationOptions: {
      header: null,
    },
  },
  NewPassword: {
    screen: NewPassword, navigationOptions: {
      header: null,
    },
  },

})

const SplashStack = createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: {
      header: null,
    },
  }
})


export default AppNavigator = createAppContainer(createSwitchNavigator({
  SplashScreen: SplashStack,
  Login: LoginStack,
  Main: AfterLoginStack,
}, {
  initialRouteName: "SplashScreen"
}))