import React, { useContext } from 'react'
import { View, TextInput, SafeAreaView, StyleSheet, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import headers from '../../helpers/messages.json';
import myStyles from '../../Pages/PageStyle';
import { Input, Button } from 'react-native-elements';
import helpers from '../../helpers/helperFunctions';
import { useNavigation } from '@react-navigation/native';
import FCFacebookLogin from './FCFacebookLogin';
import { AuthContext } from '../../Componenets/AuthContext';


const defaultPicture = 'https://proj.ruppin.ac.il/bgroup15/prod/FinalPics/ARVINO.png';

export default function FCREgister({ }) {
  const { addtoDB, authenticated } = useContext(AuthContext);

  const navigation = useNavigation();
  let name = '';
  let email = '';
  let password = ''
  let repPassword = '';

  const handleNameChange = (val) => {
    name = val
  };

  const handleEmailChange = (val) => {
    email = val
  };

  const handlePasswordChange = (val) => {
    password = val;
  }

  const handleConfirmPasswordChange = (val) => {
    repPassword = val;
  };

  const handleSubmitNewUser = async () => {
    if (name.length >= 3 &&
          email.length >= 3 &&
            email.includes('@') &&
              password.length >= 3 &&
                password === repPassword) {
      const result = await addtoDB(name, password, email, defaultPicture);
     const test = await navigateToQuestionere (email)
    }
    else {
      Alert.alert('Error register!')
    }
  }

  const navigateToQuestionere = async (email) => {
    navigation.navigate('Login', { screen: 'questionere',
     params:{
      email: email
    } });
  }
  const goToLoginPage = () => {
    navigation.navigate("login");
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    inner: {
      padding: 24,
      flex: 1,
      justifyContent: "space-around"
    },
    textInput: {
      height: 36,
      borderColor: "#000000",
      borderBottomWidth: 1,
      marginBottom: 20,
      textAlign: 'right'
    },
    btnContainer: {
      backgroundColor: "white",
      marginTop: 12
    }
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style={styles.inner}>
          <Text h4 style={myStyles.h4Text}>{headers.registeration}</Text>
          <FCFacebookLogin />
          <Divider />
          <TextInput
            placeholder={headers.insertName}
            rightIcon={{ type: 'font-awesome', name: 'user' }}
            style={styles.textInput}
            onChangeText={value => { handleNameChange(value) }} />
          <TextInput
            placeholder={headers.insertEmail}
            rightIcon={{ type: 'font-awesome', name: 'envelope' }}
            style={styles.textInput}
            onChangeText={value => { handleEmailChange(value) }} />
          <TextInput
            placeholder={headers.insertPassword}
            rightIcon={{ type: 'font-awesome', name: 'lock' }}
            style={styles.textInput}
            onChangeText={value => { handlePasswordChange(value) }} />
          <TextInput
            placeholder={headers.insertPasswordSecond}
            rightIcon={{ type: 'font-awesome', name: 'lock' }}
            style={styles.textInput}
            onChangeText={value => { handleConfirmPasswordChange(value) }} />
          <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <Button
              title={headers.createAccount}
              buttonStyle={myStyles.button}
              onPress={handleSubmitNewUser}
            />
            <Text h5>{headers.alreadyHave}</Text>
            <Button
              title={headers.login}
              buttonStyle={myStyles.button}
              onPress={goToLoginPage}
            />
          </View>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )

}
