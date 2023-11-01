import React, { useContext } from 'react';
import * as Facebook from 'expo-facebook';
import { Button, Icon } from 'react-native-elements';
import headers from '../../helpers/messages.json';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Componenets/AuthContext';

function FCFacebookLogin() {
  const navigation = useNavigation();
  const { facebookLogin } = useContext(AuthContext);

  const getDetailsFromFB = async () => {
    const user = await fetchdata();
    let password='12345678';
    console.log("FB 1 : -----", user.name, password, user.email, user.picture.data.url);
    await facebookLogin(user.name, password, user.email, user.picture.data.url);
    navigation.navigate('Login', {
      screen: 'questionere', params: {
        email: user.email
      }
    });
  }

  async function fetchdata() {
    try {
      await Facebook.initializeAsync({
        options:
        {
          appId: '174194160927637',
          appName: 'Arvino'
        }
      });
      const { type, token }
        = await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile', 'email'],
        });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${token}`);
        const userInfo = await response.json();
        //add async and db
        return userInfo;
      } else {
        alert(`Facebook Login cancel`);
        type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }



  return (
    <Button
      disabled={false}
      title={headers.continueWithFb}
      onPress={getDetailsFromFB}
      style={{ width: 250, alignSelf: 'center' }}
      icon={
        <Ionicons
          name="logo-facebook"
          size={26}
          color="#3b5998"
        />
      }
    />
  );
}


export default FCFacebookLogin;
