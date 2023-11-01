import React, { useEffect, useContext, useState } from 'react'
import { View, Image, ActivityIndicator } from 'react-native'
import { Text, Divider } from 'react-native-elements'
import FCWineries from '../wineries/FCWineries'
import FCWines from '../wines/FCWines'
import styleSheet from '../../Pages/PageStyle'
import FCEventsScrollView from '../Events/FCEventsScrollView';
import FCHeader from './FCHeader'
import { ScrollView } from 'react-native-gesture-handler'
import headers from '../../helpers/messages.json';
import FCSearch from './FCSearch'
import helpers from '../../helpers/helperFunctions';
import FCServices from '../services/FCServices'
import FCAvatarScrollView from '../avatars/FCAvatarScrollView'
import { AuthContext } from '../../Componenets/AuthContext';
import FCFloatButton from './FCFloatButton'
import FCArticles from './FCArticles'
import { AsynStorageContext } from '../../Componenets/AsyncStorageContext';

export default function FCHomePage() {
  const { user, authenticated } = useContext(AuthContext);
  const [wines, setWines] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);
  const [services, setServices] = useState([]);

  useEffect(() => {
    getWines();
    getServices();
  }, []);

  async function getWines() {
    await fetch(helpers.getApi() + '/Wine/GetAllWines',
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
          setWines(result);
        })
      .then(
        () => { setisLoaded(true) }
        ,
        (error) => {
          console.log("err post=", error);
        });

  }

  async function getServices() {
    await fetch(helpers.getApi() + 'Service/GetAllServices',
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
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FCHeader />
      <FCSearch placeholder={headers.searchInArvino} type={headers.wines} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text h4 style={styleSheet.h4Text}>{headers.upcomingEvents}</Text>
        <FCEventsScrollView />
        {authenticated &&
          <View>
            <Text h4 style={styleSheet.h4Text}> {headers.samePeople}</Text>
            <FCAvatarScrollView email={user.email} authenticated={authenticated} />
          </View>
        }
        <Text h4 style={styleSheet.h4Text}>{headers.wines}</Text>
        {isLoaded ? <FCWines wines={wines} /> : <ActivityIndicator size='small' />}
        <Text h4 style={styleSheet.h4Text}>{headers.wineries}</Text>
        <FCWineries  />
        <Text h4 style={styleSheet.h4Text}>כתבות</Text>
        <FCArticles />
        <Text h4 style={styleSheet.h4Text}>{headers.services}</Text>
        {isLoaded ? <FCServices services={services} /> : <ActivityIndicator size='small' />}

      </ScrollView>
    </View>
  )

}

