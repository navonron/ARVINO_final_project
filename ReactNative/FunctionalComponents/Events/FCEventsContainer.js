import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-elements';
import FCSearch from '../General/FCSearch';
import headers from '../../helpers/messages.json';
import styleSheet from '../../Pages/PageStyle';
import FCHeader from '../General/FCHeader';
import FCEvents from './FCEvents';
import FCEvent from './FCEvent';
import helpers from '../../helpers/helperFunctions';
import { ActivityIndicator } from 'react-native';

export default function FCEventsContainer() {
  const [showSingle, setShowSingle] = useState(true);
  const [events, setEvents] = useState([]);
  const [loaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getAllEvents();
  }, []);

  const [event, setEvent] = useState({
    id: 0,
    name: '',
    description: '',
    date: '',
    picture: '',
    price: '',
    ticketsLeft: ''
  });

  const toggleShow = () => {
    setShowSingle(!showSingle);
  }

  const SetSingleEvent = (event) => {
    setEvent({
      id: event.eventId,
      name: event.eventName,
      date: event.eventDate,
      time: event.startTime,
      picture: event.eventImgPath,
      description: event.content,
      price: event.price,
      ticketsLeft: event.participantsAmount
    })

  }
  function getAllEvents() {
    fetch(helpers.getApi() + '/Event/GetAllEvents',
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8',
        })
      })
      .then(res => {
        return res.json();
      })
      .then(
        (result) => {
          setEvents(result);
          setIsLoaded(true);
        },
        (error) => {
          console.log("err post=", error);
        });
  }

  if (loaded) {
    return (
      <View style={styleSheet.container}>
        <FCHeader />
        <Text h4 style={styleSheet.h4Text}>{headers.upcomingEvents}</Text>
        <FCSearch placeholder={headers.searchEvents} type={headers.event} data={events} loaded={false} />
        {showSingle ?
          <FCEvents toggleShow={toggleShow} events={events} setSingleEvent={SetSingleEvent} />
          :
          <FCEvent toggleShow={toggleShow} event={event} />}
      </View>
    )
  }
  else {
    return (
      <ActivityIndicator size='large' color='#691A1A' />
    )
  }
}