import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { Text } from 'react-native-elements'
import { Camera } from 'expo-camera';
import { AuthContext } from '../../Componenets/AuthContext';
import Circle from '../General/FCTest';
import helpers from '../../helpers/helperFunctions';
import FCImageRecognitionDemo from './FCImageRecognitionDemo';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoUri, setsphotoUri] = useState({ uri: 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png' })
  const { authenticated } = useContext(AuthContext);
  const bWidth = Dimensions.get('window').width;
  const bHeight = Dimensions.get('window').height;
  const [demoWine, setDemoWine] = useState(null);
  const [show, setShow] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  const btnSnap = async () => {
    await sleep(5000);
    fetchWineDemo();
  };
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  const fetchWineDemo = async () => {
    await fetch(helpers.getApi() + 'getWine?wineId=13',
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
          setDemoWine(result);
        },
        (error) => {
          console.log("err post=", error);
        });
  }

  //The api is working locally but I could not make it work from Ruppin IIS Server , 
  //Probably cause the project is compiled with X64 and not AnyCPU, and need some twikking inside IIS
  //which is not an option.
  const RecognizePicture = async (picUrl, prefix) => {
    let Label =
    {
      picUrl: picUrl,
      prefix: prefix
    };

    await fetch(helpers.getApi() + '/ImageRecognize',
      {
        method: 'POST',
        body: JSON.stringify(Label),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8',
        })
      })
      .then(res => {
        console.log(res);
        return JSON.stringify(res);
      }, (error) => {
        alert(error);
      })
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (!authenticated) {
    return <Circle /> /// Just kidding . should have a pop up message
  }
  return (
    <View style={[styles.container, {
      flexDirection: 'column'
    }]}>

      <Camera style={styles.camera} type={type}>
        {(demoWine ) ? 
         <FCImageRecognitionDemo demoWine={demoWine}/>
          :
          <></>
        }
        
      </Camera>
      <TouchableOpacity style={{
        flex: 1,
        position: 'relative',
        backgroundColor: 'transparent',
      }} onPress={btnSnap}>
        <View style={{
          width: 75,
          height: 75,
          backgroundColor: 'red',
          borderRadius: 50,
          borderColor: 'black',
          borderStyle: 'solid',
          borderWidth: '3',
          alignSelf: 'center',
          marginTop: 25
        }}></View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding:20
  },
  camera: {
    flex: 5,

    // alignSelf:'center'
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  }
});
