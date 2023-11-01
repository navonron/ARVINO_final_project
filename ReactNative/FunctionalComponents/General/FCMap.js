import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

export default function FCMap() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const { width, height } = Dimensions.get('window');

    const img = 'http://proj.ruppin.ac.il/bgroup15/prod/FinalPics/icon.png';

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        map: {
            width: Dimensions.get('window').width * 1,
            height: Dimensions.get('window').height * 0.9,
            alignSelf:'center',
            justifyContent:'center'
        },
    });
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    return (
        <View >
        {location && <MapView
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.35,
            longitudeDelta: 0.34
  
          }}
          style={styles.map}>
          <Marker
            coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
            image={{uri: img}}
          />
        </MapView>}
          
      </View>
    )
}