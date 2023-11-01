import React, { useState, useEffect, useContext } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import styleSheet from '../../Pages/PageStyle'
import helpers from '../../helpers/helperFunctions';
import { AuthContext } from '../../Componenets/AuthContext';
import FCLikes from '../General/FCLikes';
import FCShare from '../General/FCShare';
import FCWineryAvatar from '../wineries/FCWineryAvatar';
import messages from '../../helpers/messages.json';

function FCEventsScrollView(props) {
  const [events, setEvents] = useState([]);
  const { authenticated, user } = useContext(AuthContext);
  const [showLikes, setSHowLikes] = useState(true);
  
  useEffect(() => {
    if (props.events != undefined) {
      setEvents(props.events);
      setSHowLikes(false);
    }
    else {
      getEvents();
    }
    return () => {
      setEvents([]);
    }
  }, []);

  const goToEvent = () => {

  }

  function getEvents() {
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
          // console.log(result);
          setEvents(result);
        },
        (error) => {
          console.log("err post=", error);
        });
  }





  return (
    <ScrollView
      horizontal={true}
      pagingEnabled={true}
      style={[styleSheet.scrollView]}>
      <View style={{ flexDirection: 'row' }}>
        {events.map(item => (
          <View key={item.eventId} >
            <View style={styleSheet.rowEvents} >
            {showLikes &&  <FCWineryAvatar wineryName={item.wineryName} wineryImage={item.wineryImage} name={item.eventName} message={messages.arvinoInvites} />}
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-evenly', marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>{item.eventName}</Text>
                <Text style={{ fontWeight: 'bold' }}>{helpers.ReturnDate(item.eventDate)}</Text>
              </View>
              <Image
                source={{ uri: item.eventImgPath }}
                style={styleSheet.event} />

            </View>
            {showLikes &&
              <View>
                <FCLikes likes={item.likes} entityId={item.eventId} entityType={1} />
              </View>}
          </View>

        ))}
      </View>
    </ScrollView>

  )
}
export default FCEventsScrollView;