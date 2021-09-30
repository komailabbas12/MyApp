/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, LogBox
} from 'react-native';

LogBox.ignoreAllLogs();

import AppNavigator from './src/AppNavigator'

export default class App extends Component {
  render() {
    return (
      <AppNavigator></AppNavigator>
    );
  }
}
