import React, { useState } from 'react'
import { View, Text, ScrollView, Dimensions, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import messages from '../../helpers/messages.json';
import FCFloatButton from '../General/FCFloatButton';
import FCWineryList from './FCWineryList';
import { useNavigation } from '@react-navigation/native';

export default function FCWineriesCategories() {
  const [showComponment, setshowComponment] = useState(false);
  const [categorySelected, setCategorySelected] = useState();
  const navigation = useNavigation();

  const _toggleShow = () => {
    setshowComponment(!showComponment);
  };

  const subjects = [
    { id: 1, name: messages.galil, img: require('../../assets/galil.jpg') },
    { id: 2, name: messages.golan, img: require('../../assets/Golan1.jpg') },
    { id: 3, name: messages.carmel, img: require('../../assets/carmel.jpg') },
    { id: 4, name: messages.shomron, img: require('../../assets/shomron1.jpg') },
    { id: 5, name: messages.negev, img: require('../../assets/negev.jpg') },
    { id: 6, name: messages.yehuda, img: require('../../assets/yehuda1.jpg') },
  ];

  const cardGap = 16;
  const cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2;

  const navigateToMaps = () => {
    navigation.navigate('Login', { screen: 'wineryMaps' });
  }

  if (!showComponment) {
    return (
      <ScrollView>

        <View
          style={styles.container}>
          {subjects.map((subject, i) => {
            return (
              <View
                key={i}
                style={{
                  marginTop: cardGap,
                  marginLeft: i % 2 !== 0 ? cardGap : 0,
                  width: cardWidth,
                  height: 180,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 16
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setCategorySelected(subject.id);
                    _toggleShow();
                  }} >
                  <ImageBackground
                    source={subject.img}
                    style={{ opacity: 0.6, width: cardWidth, height: 180, borderRadius: 16 }}>

                    <View style={styles.View}>
                      <Text style={styles.text}>{subject.name}</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <FCFloatButton iconName={'map'} action={navigateToMaps} style={{ position: 'absolute', margin: 16, right: -160, bottom: 150, backgroundColor: 'green', width: 70, height: 70, borderRadius:40, justifyContent:'center', alignItems:'center' }} />
      </ScrollView>
    )

  }
  else {
    return (
      <FCWineryList toggleShow={_toggleShow} categoryId={categorySelected} />
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  View: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: 'bold', fontSize: 30, color: '#691A1A'
  }
});