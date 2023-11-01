import React, { useState, useEffect, } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import styleSheet from '../../Pages/PageStyle'
import helpers from '../../helpers/helperFunctions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import FCLikes from '../General/FCLikes';
import FCWineryAvatar from './FCWineryAvatar';

function FCWineries() {
  const [wineries, setWineries] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getWineries();
  }, []);


  function getWineries() {
    fetch(helpers.getApi() + '/Winery',
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
          setWineries(result);
        },
        (error) => {
          console.log("err post=", error);
        });

  }

  return (
    <ScrollView
      horizontal={true}
      pagingEnabled={true}
      style={styleSheet.scrollView}>
      <View style={{ flexDirection: 'row' }}>
        {wineries.map(item => (
          <View key={item.wineryId} >
            <View style={styleSheet.rowEvents}>
              <FCWineryAvatar wineryName={item.wineryName} wineryImage={item.wineryImage} />
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-evenly', marginTop: 10 }}>
                <TouchableOpacity
                  onPress={
                    () => {
                      navigation.navigate('Login', {
                        screen: 'winery',
                        params: {
                          name: item.wineryName,
                          image: item.wineryImage,
                          id: item.wineryId,
                          wineryEmail:item.wineryEmail,
                          phone: item.phone,
                          wineryAddress: item.wineryAddress,
                          wineList: item.wineList,
                          eventList: item.eventList,
                          serviceList:item.serviceList
                        }
                      })
                    }
                  }>
                  <Image
                    source={{ uri: item.wineryImage }}
                    style={styleSheet.winery}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <FCLikes likes={item.likes} entityId={item.wineryId} entityType={3} />
            </View>
          </View>

        ))}
      </View>
    </ScrollView>
  )
}
export default FCWineries;