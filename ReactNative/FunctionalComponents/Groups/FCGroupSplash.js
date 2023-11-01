import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,

} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
import messages from '../../helpers/messages.json';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import FCsplashButton from './FCsplashButton';

const FCGroupSplash = (props) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const navigateToGroup=()=>{
    navigation.navigate('Login', {
      screen: 'groupChat',
      params: {
        name: props.name,
        description: props.description,
        picture: props.picture,
        id: props.id
      }
    });
  }

  const navigateToRegister=()=>{
    navigation.navigate('Login', {
      screen: 'signup'
     
    });
  }


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animatable.View
        style={[styles.footer, {
          backgroundColor: colors.background
        }]}
        animation="fadeInUpBig"
      >
        <View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{position:'absolute', top: -20, left:-60}}>
            <Icon
            name='close'
            type='ionicon'
            color='#691A1A'
            onPress={props.hideModal}
          />
            </View>
          </View>
          <Text style={[styles.title, {
            color: colors.text
          }]}>{props.name}</Text>
          <Text style={styles.text}>{props.description}</Text>
          {props.authenticated ?
          <View style={styles.button}>
            <FCsplashButton id={props.id} name={props.name} description = {props.description} hideModal={props.hideModal} picture={props.picture} text={messages.login}  navigateToGroup={navigateToGroup}/> 
          </View>
          :
          <View style={styles.button}>
          <FCsplashButton id={props.id} name={props.name} description = {props.description} hideModal={props.hideModal} picture={props.picture} text={messages.register}  navigateToGroup={navigateToRegister}/> 
        </View>
          }
        </View>
      </Animatable.View>
    </View>
  );
};

export default FCGroupSplash;

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: width * 0.9,
  },

  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 30,
    paddingLeft: 70
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold'
  },
  text: {
    color: 'grey',
    marginTop: 5,
    textAlign: 'center'

  },
  button: {
    alignItems: 'flex-start',
    marginTop: 30
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row'
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold'
  }
});

