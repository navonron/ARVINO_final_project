import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, ScrollView } from 'react-native'
import { Avatar, Icon, Text, ListItem, Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import messages from '../../helpers/messages.json';

export default function FCAvatarView(props) {
    const navigation = useNavigation();
    const [groups, setGroups] = useState(props.route.params.groups);
    const [wineList, setWineList] = useState(props.route.params.wineList)
    useEffect(() => {
        console.log(groups.length);
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon
                    onPress={
                        () => {
                            navigation.navigate('Home');
                        }
                    }
                    reverse
                    name='chevron-back'
                    type='ionicon'
                    color='#691A1A'
                    containerStyle={{ marginTop: 75 }}
                />
                <Text style={{ position: 'absolute', marginTop: 80, alignSelf: 'center', fontSize: 22 }}>{props.route.params.name}</Text>
            </View>
            <View>
                <View >
                    <Avatar
                        containerStyle={[styles.avatar, props.route.params.isPremium ? styles.avatarColorGold : styles.avatarColorReg]}
                        size='xlarge'
                        rounded={true}
                        source={{ uri: props.route.params.picture }}
                    />
                </View>
            </View>
            <ScrollView style={{ marginTop: 100, }} >
                <View>
                    {groups.length > 0 && <Text h4 style={{
                        textAlign: 'right',
                        fontWeight: 'bold',
                        color: 'gray'
                    }}> הקהילות של {props.route.params.name} </Text>}
                    {
                        groups.map((item, i) => (
                            <ListItem
                                style={{ flexDirection: 'column', alignItems: 'flex-end' }}
                                key={i}
                                bottomDivider>
                                <ListItem.Content style={{ flex: 1 }} >
                                    <ListItem.Title style={{ textAlign: 'right' }}>{item.groupName}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Content style={{ flex: 0.5 }} >
                                    <Avatar
                                        source={{ uri: item.ImgPath }}
                                        size='medium'
                                        rounded={true} />
                                </ListItem.Content>
                            </ListItem>
                        ))
                    }
                </View>
                <View>
                {wineList!= null && <Text h4 style={{
                        textAlign: 'right',
                        fontWeight: 'bold',
                        color: 'gray'
                    }}> היינות של {props.route.params.name} </Text>}
                    {wineList != null && 
                        wineList.map((item, i) => (
                            <ListItem
                                style={{ flexDirection: 'column', alignItems: 'flex-end' }}
                                key={i}
                                bottomDivider>
                                <ListItem.Content style={{ flex: 1 }} >
                                    <ListItem.Title style={{ textAlign: 'right' }}>{item.wineName}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Content style={{ flex: 0.5 }} >
                                    <Avatar
                                        source={{ uri: item.wineImgPath }}
                                        size='medium'
                                        rounded={true} />
                                </ListItem.Content>
                            </ListItem>
                        ))
                    }
                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        backgroundColor: "#F0E6E8",
        height: 200,
    },
    text: {
        color: 'white'
    },
    avatar: {

        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: -75
    },
    avatarColorGold: {
        borderWidth: 4,
        borderColor: '#FFD700'
    },
    avatarColorReg: {
        borderWidth: 4,
        borderColor: 'white'
    },
    name: {
        fontSize: 22,
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        // flex: 1,
        alignItems: 'center',
        padding: 30,
        marginTop: 20
    },
    name: {
        fontSize: 28,
        color: "#691A1A",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#691A1A",
    },
});