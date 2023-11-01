import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, Dimensions, Image, FlatList } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import helpers from '../../helpers/helperFunctions';
import messages from '../../helpers/messages.json';
import styleSheet from '../../Pages/PageStyle'
import FCHeader from '../General/FCHeader';
import { useNavigation } from '@react-navigation/native';

export default function FCQuestionere() {
  const [shortWineList, setShortWineList] = useState([])
  const navigation = useNavigation();
  const randomWineList = [];

  useEffect(() => {
    const onFocus = navigation.addListener('focus', () => {
      getList();

    });
    const onBlur = navigation.addListener('blur', () => {
      console.log('leave page')
    });
    onFocus;
    onBlur;


  }, []);



  async function getList() {
    const response = await fetch(helpers.getApi() + 'RandomWines?numOfWines=3');
    console.log(helpers.getApi() + 'RandomWines?numOfWines=3');
    const data = await response.json();
    console.log("Data", data);
    setShortWineList(data);
    console.log("Short List ".shortWineList);
  }

  const goToHomePage = () => {
    navigation.push('waitPage');
  }


  const sayYes = (e) => {
    console.log(randomWineList.length)
  }

  const sayNo = () => {
  }


  return (
    <SafeAreaView style={styleSheet.container}>
      <FCHeader />
      <View>
        <Text h4 style={styleSheet.h4Text}>{messages.buildYourProfile}</Text>
      </View>
      <View>
        <Text></Text>
      </View>
      <View>
        <Icon
          reverse
          name='check'
          type='font-awesome'
          size={30}
          color='green'
          onPress={sayYes}
        />
        <Icon
          reverse
          name='times'
          type='font-awesome'
          size={30}
          color='red'
          onPress={sayNo}
        />
      </View>
      <Button
        title={messages.skip}
        buttonStyle={[styleSheet.button, {
          marginBottom: 30
        }]}
        onPress={goToHomePage}
      />
    </SafeAreaView>
  )
}
