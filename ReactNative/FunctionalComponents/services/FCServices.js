import React, { useState, useEffect, } from 'react';
import { View, Image, Text, ActivityIndicator, ScrollView } from 'react-native';
import styleSheet from '../../Pages/PageStyle'
import helpers from '../../helpers/helperFunctions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-paper';
import FCWineryAvatar from '../wineries/FCWineryAvatar';
import FCLikes from '../General/FCLikes';

function FCServices(props) {
   const [services, setServices] = useState([]);
   const [isLoaded, setisLoaded] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    getServices();
  }, []);

  function getServices() {
    fetch(helpers.getApi() + 'Service/GetAllServices',
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
          setServices(result);
        })
      .then(
        () => { setisLoaded(true) }
        ,
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
        {props.services.map(item => (
          <View key={item.serviceId} >
            <View style={styleSheet.rowEvents} >
              <FCWineryAvatar wineryName={item.wineryName} wineryImage={item.wineryImg} />
              <View style={{ flexDirection: 'column', height: 100, alignItems: 'center', marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>{item.serviceName}</Text>
                <Text numberOfLines={4} style={{ textAlign: 'right' }}>{item.content}</Text>
              </View>
              <Image
                source={{ uri: helpers.ReturnRandomData(item.images).ImgPath }}
                style={{ height: 250 }} />

            </View>
            {item.likes != null &&
              <View>
                <FCLikes likes={item.likes} entityId={item.serviceId} entityType={4} />
              </View>
            }
          </View>


        ))}
      </View>
    </ScrollView>
  )
}
export default FCServices;