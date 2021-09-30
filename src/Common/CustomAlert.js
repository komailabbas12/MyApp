import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    Platform,
    ActivityIndicator,
    TouchableOpacity,
    Text
} from 'react-native';
import { scale, moderateScale, verticalScale } from '../Common/Scaling'


import Color from '../Common/Color'

const CustomAlert = props => {
    const {
        loading, text, onPress, onPressYes, isTwo,
        ...attributes
    } = props;

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => { console.log('close modal') }}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <Text style={{ fontSize: moderateScale(20, 0.3), color: 'black', fontFamily: 'Roboto-Medium', textAlign: 'center', padding: verticalScale(20), }}>{text}</Text>
                    {/* <Text style={{ fontSize: moderateScale(20, 0.3), color: 'black', fontFamily: 'Roboto-Regular', marginTop: verticalScale(30),textAlign: 'center' }}>{"Registration Successfully"}</Text> */}
                    <View style={{ height: verticalScale(1), backgroundColor: Color.DateColor, width: '100%', marginTop: verticalScale(30) }} />
                    {isTwo ?

                        < View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
                                <Text style={{ fontSize: moderateScale(20, 0.3), color: Color.BtnColor, fontFamily: 'Roboto-Medium', padding: verticalScale(20), textAlign: 'center', bottom: 0 }}>{"NO"}</Text>
                            </TouchableOpacity>
                            <View style={{ width: verticalScale(1), backgroundColor: Color.DateColor }} />
                            <TouchableOpacity style={{ flex: 1 }} onPress={onPressYes}>
                                <Text style={{ fontSize: moderateScale(20, 0.3), color: Color.BtnColor, fontFamily: 'Roboto-Medium', padding: verticalScale(20), textAlign: 'center', bottom: 0 }}>{"YES"}</Text>
                            </TouchableOpacity>
                        </View> :

                        <TouchableOpacity onPress={onPress}>
                            <Text style={{ fontSize: moderateScale(20, 0.3), color: Color.BtnColor, fontFamily: 'Roboto-Medium', padding: verticalScale(20), textAlign: 'center', bottom: 0 }}>{"OK"}</Text>
                        </TouchableOpacity>
                    }

                </View>
            </View>
        </Modal >
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        width: scale(800),
        borderRadius: 10,
    }
});

export default CustomAlert;