import React from 'react'
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text,
    FlatList,
    DeviceEventEmitter
} from 'react-native'

import Dialog from '../Common/CustomDialog'
import Color from './Color';

class NavLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            selectName: 'Ahmedabad'
        }

    }

    render() {
        let { onPress, img } = this.props
        return (
            <TouchableOpacity onPress={() => this.setState({ dialogVisible: true })} >
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={maps} style={style.icon} />
                        <Text style={style.txtStyle}>{this.state.selectName}</Text>
                    </View>

                    <Dialog
                        visible={this.state.dialogVisible}
                        onTouchOutside={() => this.setState({
                            dialogVisible: false,
                        })}>
                        <View style={{ height:'100%', backgroundColor: Color.AppDarkColor }}>
                            <Text style={style.txtListStyle}>Header</Text>
                        </View>


                    </Dialog>
                </View>


            </TouchableOpacity>
        )
    }
}

export default NavLocation

const style = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: 'white',
        marginLeft: 10
    },
    txtStyle:
    {
        fontSize: 16,
        color: 'white',
        marginLeft: 4,
        marginRight: 12
    },
    txtListStyle:
    {
        fontSize: 16,
        color: 'white',
        marginLeft: 4,
        marginRight: 12,
        padding: 8
    },
    underLinePicker:
    {
        height: 0.5,
        backgroundColor: Color.white,
    },
})
