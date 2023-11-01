import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import styleSheet from '../../Pages/PageStyle';
import { Text, Input, Button } from 'react-native-elements';
import headers from '../../helpers/messages.json';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Componenets/AuthContext';
import { Alert } from 'react-native';

const FCLogin = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user,  login, authenticated } = useContext(AuthContext);

  const goToHomePage = () => {
    if (email.length >= 3 && email.includes('@') && password.length >= 3) {
      login(email, password);
      navigation.navigate('Login', { screen: 'questionere', params:{
        email: email
      } });
    }
    else {
      Alert.alert('invalid login!')
    }
  }

  const handleEmailChange = (val) => {
    setEmail(val);
  };

  const handlePasswordChange = (val) => {
    setPassword(val);
  };


  return (
    <SafeAreaView style={[styleSheet.container]}>
      <View style={{ marginTop: 180 }}>
        <Text h4 style={styleSheet.h4Text}>כניסה</Text>
      </View>
      <View>
        <Input
          placeholder={headers.insertEmail}
          rightIcon={{ type: 'font-awesome', name: 'user' }}
          inputContainerStyle={StyleSheet.input}
          onChangeText={value => { handleEmailChange(value) }}
        />
        <Input
          placeholder={headers.insertPassword}
          rightIcon={{ type: 'font-awesome', name: 'lock' }}
          secureTextEntry={true}
          inputContainerStyle={StyleSheet.input}
          onChangeText={value => { handlePasswordChange(value) }}
        />
        <Button
          title={headers.login}
          buttonStyle={[styleSheet.button, {
            marginBottom: 30
          }]}
          onPress={goToHomePage}
        />
      </View>
    </SafeAreaView>
  );
};

export default FCLogin;

