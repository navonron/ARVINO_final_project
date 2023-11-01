import React, { useState, useEffect, useContext } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import styleSheet from '../../Pages/PageStyle'
import helpers from '../../helpers/helperFunctions';
import { AuthContext } from '../../Componenets/AuthContext';
import { useNavigation } from '@react-navigation/native';

function FCArticles(props) {
  const [articles, setArticles] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getArticles();
    return () => {
      setArticles([]);
    }
  }, []);


  function getArticles() {
    fetch(helpers.getApi() + '/Article/GetAllArticles',
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
          // console.log(result);
          setArticles(result);
        },
        (error) => {
          console.log("err post=", error);
        });
  }





  return (
    <ScrollView
      horizontal={true}
      pagingEnabled={true}
      style={[styleSheet.scrollView]}>
      <View
        style={{ flexDirection: 'row' }}
      >
        {articles.map(item => (
          <TouchableOpacity
            key={item.ID}
            onPress={
              () => {
                navigation.navigate('Login', {
                  screen: 'article',
                  params: {
                    header: item.header,
                    article: item.article,
                    id: item.ID,
                    pictures: item.pictures
                  }
                })
              }
            }
          >
            <View style={styleSheet.rowEvents} >
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-evenly', marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>{item.header}</Text>
              </View>
              <Image
                source={{ uri: item.pictures[0].picture }}
                style={styleSheet.event}


              />
              <Text
                style={{ marginBottom: 5, fontSize: 14, textAlign: 'right' }}
                numberOfLines={4}
                ellipsizeMode="tail"
              > {item.article} המשך</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>

  )
}
export default FCArticles;