import React from 'react'
import { View, Text, Dimensions } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function FCFloatButton(props) {
    const HEIGHT = Dimensions.get("screen").height;
    const WIDTH = Dimensions.get("screen").width;
    const navigation = useNavigation();

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <View >
                <FAB
                    style={props.style}
                    icon={props.iconName}
                    onPress={props.action}
                    color='#fff'    
                    
                />
            </View>
        </View>
    )
}
