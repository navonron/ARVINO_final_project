import React, { useState, useContext, useEffect } from 'react'
import { Avatar, Text } from 'react-native-elements';
import { View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../Componenets/AuthContext';
import helpers from '../../helpers/helperFunctions';
import styleSheet from '../../Pages/PageStyle';
import uuid from 'react-native-uuid';
import FCWines from '../wines/FCWines';
import headers from '../../helpers/messages.json';
import FCRecomendedWines from '../wines/FCRecomendedWines';
import { useNavigation } from '@react-navigation/native';


export default function FCAvatarScrollView(props) {
  const [avatars, setAvatars] = useState([]);
  const [isDataFecthed, setDataFetched] = useState(false);

  const [error, setError] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAvatars = async () => {
      const res = getAvatars(props.email);
      setAvatars(res);
    }
    if (props.email.length > 1) {
      fetchAvatars(props.email);
    }

  }, []);


  async function getAvatars(myEmail) {
    await fetch(helpers.getApi() + '/User/getProximity?email='+ myEmail,
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
      .catch((err) => {
        setError(true);
        console.log("err post=", err);
      })
      .then(
        (result) => {
          setAvatars(result);

        },
        (error) => {
          setError(true);
          console.log("err post=", error);
        })
      .finally(() => {
        setDataFetched(true);
      })
  }

  return (
    <View>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        style={styleSheet.scrollView}>
        {isDataFecthed  ? avatars.map(item => (
          <TouchableOpacity
            key={uuid.v4()}
            style={{ alignItems: 'center', padding: 10 }}
            onPress={() => {
              navigation.navigate('Login', {
                screen: 'avatarView',
                params: {
                  name: item.Name,
                  picture: item.picture,
                  isPremium: item.isPremium,
                  groups:item.groups,
                  wineList:item.wineList
                }

              })
            }}
          >
            <Avatar
              rounded={true}
              size="large"
              containerStyle={{
                borderWidth: 4,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 6,
                borderColor: helpers.ReturnRandomData(helpers.ReturnColorPallete())
              }}
              source={{
                uri:
                  item.picture,
              }}
              icon={{ name: 'user', type: 'font-awesome' }}
            />
            <Text style={[styleSheet.textInput]}>{item.Name}</Text>
          </TouchableOpacity>

        )) : <View><ActivityIndicator size='small' /></View>}
      </ScrollView>
      {isDataFecthed && <View>
        <Text h4 style={styleSheet.h4Text}>{headers.recommendedWines}</Text>
        <FCRecomendedWines avatars={avatars} />
      </View>}
    </View>
  )

}