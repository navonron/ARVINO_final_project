import React, { useEffect, useState } from 'react'
import { SafeAreaView, ImageBackground, StyleSheet, Image } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import styleSheet from '../../Pages/PageStyle'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FCChat } from './FCChat';


export default function FCGroupChat(props) {
    const name=props.route.params.name;
    const description=props.route.params.description;
    const id =props.route.params.id;

   
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styleSheet.container}>
            <ImageBackground
                source={{ uri: 'https:proj.ruppin.ac.il/bgroup15/prod/FinalPics/chat_background.jpg' }}
                style={styles.container}>
                <View style={styles.overlay}>
                    <Text style={[styles.textStyle, {
                        alignSelf: 'center'
                    }]} >{props.route.params.name}</Text>
                    <Image source={{ uri: props.route.params.picture }}
                        style={styles.avatarStyle} />
                    <Ionicons style={styles.leftArrow}
                        onPress={() => { navigation.navigate('Groups') }}
                        name="chevron-back-outline"
                        size={50}
                        color="white"></Ionicons>
                </View>
            </ImageBackground>
            <FCChat groupName={name} groupDesc={description} groupID={id} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    overlay: {
        backgroundColor: 'rgba(160,0,0,0.5)',
    },
    avatarStyle: {
        width: 70,
        height: 70,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 10
    },
    textStyle: {
        marginTop: 10,
        fontSize: 18,
        color: "#FFFFFF",
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    balanceContainer: {
        padding: 10,
    },
    leftArrow: {
        position: 'absolute',
        alignSelf: 'flex-start',
        marginTop: 30
    }
});
