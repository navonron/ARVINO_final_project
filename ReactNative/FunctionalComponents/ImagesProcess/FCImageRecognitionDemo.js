import React from 'react'
import { StyleSheet, View, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { Text } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function FCImageRecognitionDemo(props) {

  const navigation = useNavigation();

    return (
        <View>
            <View>
                <Text style={{ textAlign: 'center', marginTop: 100, fontSize: 36, fontWeight: 'bold' }}>
                    {props.demoWine.wineName}
                </Text >
                <Text style={{ textAlign: 'center', fontSize: 28, fontWeight: 'bold' }}> יקב {props.demoWine.wineryName}</Text>
                <Text style={{ textAlign: 'center', fontSize: 28, fontWeight: 'bold' }}> עם דיוק של 85.6%</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Ionicons
                        onPress={() => { navigation.navigate('Home') }}
                        name="close-circle-sharp"
                        size={70}
                        color="red"></Ionicons>
                    <Ionicons
                        onPress={
                            () => {
                                navigation.navigate('Login', {
                                    screen: 'wine',
                                    params: {
                                        name: props.demoWine.wineName,
                                        image: props.demoWine.wineImgPath,
                                        content: props.demoWine.content,
                                        id: props.demoWine.wineId,
                                        price: props.demoWine.price,
                                        wineryImage: props.demoWine.wineryImage,
                                        areaCategoryName: props.demoWine.areaCategoryName,
                                        wineryName: props.demoWine.wineryName,
                                        rate: props.demoWine.rate
                                    }
                                });
                            }
                        }
                        name="md-checkmark-circle-sharp"
                        size={70}
                        color="green"></Ionicons>
                </View>
            </View>
            <ImageBackground
                source={{ uri: props.demoWine.wineImgPath }}
                style={{ width: 150, height: 300, alignSelf: 'center' }}
                resizeMode="cover"
            >
            </ImageBackground >
        </View>
    )
}
