import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
  
  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function FCsplashButton(props) {

  const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => {
            props.hideModal();
            props.navigateToGroup();
          }}>
            <LinearGradient
              colors={['#691A1A', '#630f0f']}
              style={styles.signIn}>
              <MaterialIcons
                name="navigate-before"
                color="#fff"
                size={20}
              />
              <Text style={styles.textSign}>{props.text}</Text>
            </LinearGradient>
          </TouchableOpacity>
    )
}


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