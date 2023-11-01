import React, { useContext, useEffect, useState } from 'react'
import { View, Image, ScrollView, Linking } from 'react-native';
import { Text, Icon, Avatar } from 'react-native-elements'
import styleSheet from '../../Pages/PageStyle';
import FCHeader from '../General/FCHeader';
import { useNavigation } from '@react-navigation/native';
import { PrefContext } from '../../Componenets/PrefrenceContext';
import { AuthContext } from '../../Componenets/AuthContext';
import FCWines from '../wines/FCWines';
import FCEventsScrollView from '../Events/FCEventsScrollView';
import FCServices from '../../FunctionalComponents/services/FCServices';
import messages from '../../helpers/messages.json';
import FCFloatButton from '../General/FCFloatButton';

export default function FCWinery({ navigation, route }) {
    // const navigation = useNavigation();
    const { authenticated, user } = useContext(AuthContext);
    const { AddToDB } = useContext(PrefContext);
    const [wines, setWines] = useState(route.params.wineList);
    const [events, setEvents] = useState(route.params.eventList);
    const [services, setservices] = useState(route.params.serviceList);

    useEffect(() => {

        if (authenticated) {
            AddToDB(user.email, 4, route.params.id);
        }
        else {
            console.log("Not auth")
        }
    }, [])

    const OpenChat = () => {
        navigation.navigate('Login', {
            screen: 'wineryChat',
            params: {
                name: route.params.name,
                description: route.params.wineryEmail,
                picture: route.params.image,
                id: route.params.id
            }
        });
    }

    return (
        <ScrollView style={styleSheet.container}>
            <View>
                <FCHeader />
                <Icon
                    onPress={
                        () => {
                            navigation.goBack()
                        }
                    }
                    reverse
                    name='chevron-back-outline'
                    type='ionicon'
                    color='#691A1A'
                />
                <View style={{ flex: 1, flexDirection: 'column-reverse', alignItems: 'center', justifyContent: 'space-evenly' }} >
                    <Text h2 style={[styleSheet.h4Text, { textAlign: 'center' }]}>  יקב {route.params.name}</Text>
                    <Avatar
                        containerStyle={{ borderColor: 'black', borderStyle: 'solid', borderWidth: 2 }}
                        size='large'
                        rounded={true}
                        source={{ uri: route.params.image }}
                    />
                </View>
                <View style={{ flex: 1, flexDirection: 'column-reverse', alignItems: 'center', justifyContent: 'space-evenly', margin: 10 }}>
                    <Text >{messages.phone} : {route.params.phone}</Text>
                    <Text style={{ textAlign: 'center', margin: 10 }}>{messages.address} : {route.params.wineryAddress}</Text>
                    <Text >{messages.email} : {route.params.wineryEmail}</Text>

                </View>
            </View>
            {/* <FCFloatButton iconName={'chat'}
                action={OpenChat}
                style={{
                    position: 'absolute',
                    opacity:0.7,
                    margin: 5,
                    right: -170,
                    bottom: 220,
                    backgroundColor: '#0078FF'
                }} /> */}
            <View>
                {events.length > 0 ?
                    <View>
                        <Text h4 style={styleSheet.h4Text}>{messages.upcomingEvents}</Text>
                        <FCEventsScrollView events={events} />
                    </View>
                    : <View></View>}
            </View>
            <View >
                {wines.length > 0 ?
                    <View>
                        <Text h4 style={styleSheet.h4Text}>{messages.wineryWines}</Text>
                        <FCWines wines={wines} />
                    </View>
                    : <View></View>}
            </View>
            <View >
                {services != null && services.length > 0 ?
                    <View>
                        <Text h4 style={styleSheet.h4Text}>{messages.wineryServices}</Text>
                        <FCServices services={services} />
                    </View>
                    : <View></View>}
            </View>
        </ScrollView>
    )
}
