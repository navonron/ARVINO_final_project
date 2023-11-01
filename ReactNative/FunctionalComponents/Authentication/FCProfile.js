import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedbackBase
} from 'react-native';
import { Avatar, Icon, Badge, withBadge } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Componenets/AuthContext';
import helpers from '../../helpers/messages.json';

const FCProfile = (props) => {
  const navigation = useNavigation();
  const { user, authenticated, logout, sendPushNotification } = useContext(AuthContext);
  const [picture, setPicture] = useState(null);
  const BadgedIcon = withBadge(1)(Icon);

  useEffect(() => {
    if (props.route.params != null) {
      setPicture(props.route.params.uri);
    }
  }, [picture])

  const goToLibrary = () => {
    navigation.push('ChooseGallery', {
      page: 'profile'
    });

  }

  const updateUser = () => {

  }

  if (!authenticated) {
    return (
      <View></View>
    )
  }
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
        <Text style={{ position: 'absolute', marginTop: 80, alignSelf: 'center', fontSize: 22 }}>{user.name}</Text>
      </View>
      <View>
        {!picture &&
          <TouchableOpacity >
            <Avatar
              width={100}
              fontSize={20}
              containerStyle={[styles.avatar, user.isPremium ? styles.avatarColorGold : styles.avatarColorReg]}
              size='xlarge'
              rounded={true}
              source={{ uri: user.picture }}
              onPress={goToLibrary}
            />
            {/* <Badge
              value={<Text>1</Text>}
              status="error"
              containerStyle={{ position: 'absolute', top: -55, right: 110, width:50 }}
            /> */}
          </TouchableOpacity>}
        {picture &&
          <TouchableOpacity >
            <Avatar
              containerStyle={[styles.avatar, user.isPremium ? styles.avatarColorGold : styles.avatarColorReg]}
              size='xlarge'
              rounded={true}
              source={{ uri: picture }}
              onPress={goToLibrary}
            />
            {/* <Badge
              status="error"
              containerStyle={{ position: 'absolute', top: -5, right: -4 }}
            /> */}
          </TouchableOpacity>
        }

      </View>
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={{ fontSize: 16 }}>{user.email}</Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              logout();
              navigation.navigate('Login', {
                screen: 'waitPage',
                params: {
                  msg: helpers.goodBye
                }
              });
            }}
          >
            <Text style={styles.text}>{helpers.logout}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.text}> שמור פרטים</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.buttonContainer} onPress={sendPush}>
            <Text style={styles.text}> שלח התראה </Text>
          </TouchableOpacity> */}
        </View>
      </View>
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
export default FCProfile;