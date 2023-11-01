import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView, ActivityIndicator, View, FlatList, StyleSheet, StatusBar } from 'react-native';
import { Text, Button } from 'react-native-elements';
import FCHeader from '../General/FCHeader';
import FCSearch from '../General/FCSearch';
import styleSheet from '../../Pages/PageStyle';
import messages from '../../helpers/messages.json';
import FCBubbles from './FCBubbles';
import helpers from '../../helpers/helperFunctions';
import { AuthContext } from '../../Componenets/AuthContext';
import { useNavigation } from '@react-navigation/native';


function FCGroups(props) {
  const [groups, setGroups] = useState([]);
  const [loaded, setloaded] = useState(false);
  const { authenticated, user } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    setloaded(false);
    getGroups();
  }, [])

  function getGroups() {
    fetch(helpers.getApi() + 'group',
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
          setGroups(result);
          setloaded(true);
        },
        (error) => {
          console.log("err post=", error);
        });
  }

  const handleSubmitNewGroup = async () => {
    navigation.navigate('Login', {
      screen: 'NewGroup',
      // params: addToGroupsArray
    })
  }

  const addToGroupsArray=(val)=>{
    setGroups(groups => [...groups, val]);

  }

  if (loaded) {
    return (
      <View style={styleSheet.container}>
        <FCHeader />
        <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start' }}>
          <Text h4 style={[styleSheet.h4Text, { marginTop: 10 }]}>{authenticated ? messages.myGroups : messages.groups}</Text>
          {authenticated && <Button
            title={messages.createNewGroup}
            buttonStyle={[styleSheet.button, { marginRight: 70 }]}
            onPress={handleSubmitNewGroup}
          />}
        </View>
        <FCSearch placeholder={messages.searchInGroups} type={messages.groups} data={groups} loaded={loaded} />
        <FCBubbles myGroups={groups} />
      </View>
    );
  }
  else {
    return (
      <ActivityIndicator size='large' />
    )
  }
}

export default FCGroups;