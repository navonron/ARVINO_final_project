import React from 'react'
import { View, Image } from 'react-native'
import {  Divider } from 'react-native-elements'
import styleSheet from '../../Pages/PageStyle';
import FCAvatar from '../avatars/FCAvatar';
import logo from '../../assets/logoArvino.png';

export default function FCHeader() {
    return (
        <View>
            <View style={styleSheet.row}>
                <View style={styleSheet.halfRow}>
                    <Image
                        source={logo}
                        style={styleSheet.logo}
                    />
                </View>
                <View style={styleSheet.halfRow}>
                    <FCAvatar />
                </View>
            </View>
            <View>
            <Divider inset={true} style={{margin:5}}/>
            </View>
        </View>
    )
}
