import React from 'react';
import {View,Button} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import styleSheet from '../../Pages/PageStyle';

export default function FCRateButton(props) {

    const navigation=useNavigation();

    return (
            <Button
                title='דרג'
                buttonStyle={styleSheet.button}
                onPress={()=>{navigation.navigate('RateWine',{
                    wineId: props.wineId,
                    wineImg:props.wineImg,
                    wineName:props.wineName,
                    wineryname:props.wineryname,
                    wineryImg:props.wineryImg
                })}}
            />
    )
}
