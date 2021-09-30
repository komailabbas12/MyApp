import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Platform, FlatList, Alert, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native'
import { Color, NavTitle, NavButton, Loader } from '../Common'
import { moderateScale } from '../Common/Scaling';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            roleID: '',
            selectAs: ''
        }

    }

    componentWillMount() {
        this._bootstrapAsync().done()
    }

    async _bootstrapAsync() {
        const name = await AsyncStorage.getItem('username');
        let selectAs = await AsyncStorage.getItem('LoginAs')
        this.setState({ selectAs, name })
    };

    render() {
        return (
            <View style={{ backgroundColor: Color.AppColor }}>
                <View style={style.viewStyle}>
                    <Image source={require('../../assets/Images/FoodStretcher.png')} style={style.imgStyle} />
                    <Text style={{ marginBottom: 10, color: "white", fontSize: moderateScale(25, 0.3) }} >
                        Food Stretcher Plus
                    </Text>
                </View>

                {/* {this.state.roleID != 1 ? <View>
                    <Text style={style.headerText}>{this.state.name}</Text>
                </View> : null} */}
                <View style={style.headerWrapper}></View>

            </View>
        )
    }
}

const style = StyleSheet.create({
    imgStyle:
    {
        width: 100,
        height: 100,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 100 / 2,
        backgroundColor: Color.white,
        justifyContent: 'center',
        shadowOffset: Platform.OS === 'android' ? { width: 0, height: 2 } : { width: 0, height: 1 },
        shadowOpacity: Platform.OS === 'android' ? 0.8 : 0.3,
        shadowRadius: Platform.OS === 'android' ? 2 : 1,
        elevation: Platform.OS === 'android' ? 3 : 1,
        shadowColor: Color.Gray
    },
    imageSmallStyle: {
        height: 45,
        width: 45,
        alignSelf: 'center',
        tintColor: Color.AppColor
    },
    viewStyle:
    {
        flexDirection: "column",
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: Color.AppColor
    },
    headerText:
    {
        color: 'white',
        fontSize: 20,
        // marginBottom: 10,
        textAlign: 'center'
    },
    headerWrapper: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 10,
        // marginTop: 10,
    }
})