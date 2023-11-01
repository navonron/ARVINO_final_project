import React, { useState } from 'react'
import { ScrollView, View } from 'react-native';
import { Icon, Avatar, Text, Button } from 'react-native-elements';
import helpers from '../../helpers/helperFunctions';
import styleSheet from '../../Pages/PageStyle';
import headers from '../../helpers/messages.json'
import { SafeAreaView } from 'react-native';
import FCEventRegister from './FCEventRegister';
import { useNavigation } from '@react-navigation/native';
import FCHeader from '../General/FCHeader';

export default function FCEvent(props) {
    const [shouldShow, setShouldShow] = useState(false);
    const navigation = useNavigation();
    const[numOfTickets, setNumOfTickets]= useState(props.route.params.ticketsLeft);
    const hideModal = () => {
        setShouldShow(false);
    }

    const updateNumOfTickets=(number)=>{
        setNumOfTickets(numOfTickets-number);
    }

    return (
        <SafeAreaView style={styleSheet.container}>
            <View>
                <FCHeader/>
                <Icon
                    onPress={()=>{navigation.goBack()}}
                    reverse
                    name='chevron-back-outline'
                    type='ionicon'
                    color='#691A1A'
                />
            </View>
            <ScrollView >
                <View style={{ alignItems: 'center' }}>
                    <Text h4 style={styleSheet.h4Text}>{props.route.params.name}</Text>
                    <Avatar
                        source={{ uri: props.route.params.picture }}
                        size='large'
                        rounded={true} />
                    <View style={{ flexDirection: 'row' }}>
                        <Text>  {helpers.ReturnDate(props.route.params.date)}  </Text>
                        <Text>  {props.route.params.time} </Text>
                        <Text>  {headers.when}:  </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text h4>  {headers.DetailsOnEvent} </Text>
                        <Text style={{ textAlign: 'right', width: 300, padding: 10, borderColor: 'black', borderStyle: 'solid', borderWidth: 2 }}>{props.route.params.description}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Button
                            title={headers.register}
                            buttonStyle={styleSheet.button}
                            onPress={() => { setShouldShow(true) }}
                        />
                        <Text style={{ alignSelf: 'center' }}>
                            {`${headers.leftWith}  ${numOfTickets} ${headers.tickets}`}</Text>
                    </View>
                </View>
            </ScrollView>
            {shouldShow ? (
                <FCEventRegister id={props.route.params.id} updateNumOfTickets={updateNumOfTickets} name={props.route.params.name} price={props.route.params.price} date={props.route.params.date} time={props.route.params.time} hideModal={hideModal} />
            ) : null}
        </SafeAreaView>
    )
}
