import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Dimensions, TouchableOpacity, ImageBackground, StyleSheet, Button } from 'react-native';
import messages from '../../helpers/messages.json';
import FCFloatButton from '../General/FCFloatButton';
import FCWineList from './FCWineList';


export default function FCWineCategories() {
  const [showComponment, setshowComponment] = useState(false);
  const [categorySelected, setCategorySelected] = useState();

  const _toggleShow = () => {
    setshowComponment(!showComponment);
  };

  const subjects = [
    { id: 1, name: messages.redWines, img: require('../../assets/RED.jpg') },
    { id: 3, name: messages.whiteWines, img: require('../../assets/white.jpg') },
    { id: 2, name: messages.roseWines, img: require('../../assets/ROSE.jpg') },
    { id: 4, name: messages.SparklingWines, img: require('../../assets/sparkling.jpg') },
  ];

  const cardGap = 16;
  const cardWidth = (Dimensions.get('window').width - cardGap * 3) / 2;

  if (!showComponment) {
    return (
      <View>
        <ScrollView>
          <View style={styles.container}>
            {subjects.map((subject, i) => {
              return (
                <View
                  key={subject.id}
                  style={{
                    marginTop: cardGap,
                    marginLeft: i % 2 !== 0 ? cardGap : 0,
                    width: cardWidth,
                    height: 180,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: cardGap
                  }}
                >
                  <TouchableOpacity onPress={() => {
                    setCategorySelected(subject.id);
                    console.log(categorySelected);
                    _toggleShow()
                  }} >
                    <ImageBackground source={subject.img} style={{ opacity: 0.8, width: cardWidth, height: 180, borderRadius: 16 }}>
                      <View style={styles.View}>
                        <Text style={styles.text}>{subject.name}</Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    )
  }
  else {
    return (
      <FCWineList toggleShow={_toggleShow} categoryId={categorySelected} />
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