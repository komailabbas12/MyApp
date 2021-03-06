import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { Header, Body, Title, Content, Left, Icon, Right } from 'react-native'

export default class CustomHeader extends React.Component {
    render() {
        return (
            <Header>
                <Left><Icon name="ios-menu" onPress={() => this.props.drawerOpen()} /></Left>
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}
// export default CustomHeader;