import React, { useContext, useState, useEffect } from 'react'
import { Rating } from 'react-native-ratings';
import { View, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Icon, Button } from 'react-native-elements';
import styleSheet from '../../Pages/PageStyle';
import { AuthContext } from '../../Componenets/AuthContext';
import FCHeader from '../General/FCHeader';
import headers from '../../helpers/messages.json';
import { useNavigation } from '@react-navigation/native';
import helpers from '../../helpers/helperFunctions';
import { Alert } from 'react-native';
import { PrefContext } from '../../Componenets/PrefrenceContext';


export default function FCWineRate(props) {

  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { AddToDB } = useContext(PrefContext);
  const [rate, setRate] = useState(3);
  const [comment, setComment] = useState('');
  const [isAllowed, setIsAllowed] = useState(false);

  const numOfDaysAllowedToPost=2;

  useEffect(() => {
    checkifUserAllowedToSubmit(user.email, props.route.params.wineId, numOfDaysAllowedToPost);
  }, [])

  const rateWine = () => {
    try {
      if (isAllowed) {
        addCommenttoDB(user.email, comment, props.route.params.wineId);
        let freeText= props.route.params.wineId+','+ rate;
        // console.log(freeText);
        AddToDB(user.email, 2, freeText);
      }
      else {
        Alert.alert("User is not allowed to submit to same wine less than a week!")
      }
    }
    catch {
      Alert.alert("CATCH error")
    }
  }

  const checkifUserAllowedToSubmit = async (email, wineId, days) => {
    const res = await fetch(helpers.getApi() + 'Rate/UserAllowed?wineId=' + wineId + '&email=' + email + '&days=' + days);
    console.log(helpers.getApi() + 'Rate/UserAllowed?wineId=' + wineId + '&email=' + email + '&days=' + days);
    const data = await res.json();
    if (data == true) { setIsAllowed(true) }
  }

  const addCommenttoDB = async (email, text, wineId) => {
    let newComment =
    {
      "email": email,
      "text": text,
      "rate": rate,
      "wineId": wineId
    };

    await fetch(helpers.getApi() + '/Rate/PostComment',
      {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8',
        })
      })
      .then(res => {
        alert("comment published!");
        navigation.goBack();

        return JSON.stringify(res);
      }, (error) => {
        console.log(error);
      })
      .catch((err)=>{
        console.log(err);
      }

      )
  }

  const handleComment = (val) => {
    setComment(val);
  };
  const handleRate = (val) => {
    setRate(val);
  };

  return (
    <View style={styleSheet.container}>
      <FCHeader />
      <View style={{ flexDirection: 'row' }}>
        <Icon
          style={{ flex: 1, height: 50 }}
          onPress={
            () => {
              navigation.goBack()
            }
          }
          reverse
          name='chevron-back-outline'
          type='ionicon'
          color='#691A1A'
        />
        <Text h4 style={[styleSheet.h4Text, { flex: 1 }]}>{headers.writeComment}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text h4 style={[styleSheet.h4Text]}>{props.route.params.wineName}</Text>
          <Text h5 style={{ textAlign: 'right' }}>{props.route.params.wineryname}</Text>
        </View>
        <View style={{ flex: 1, marginLeft: 50 }}>
          <Image
            source={{ uri: props.route.params.wineImg }}
            style={[styleSheet.wine, { height: 150 }]} />
        </View>
      </View>
      <View>
        <Rating
          showRating={false}
          onFinishRating={(rat) => handleRate(rat)}
          style={{ paddingVertical: 10 }}
          imageSize={40}
        />
      </View>
      {isAllowed &&
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ padding: 10, flex: 1, justifyContent: "space-around" }}>
              <TextInput
                placeholder={headers.writeComment}
                style={{ height: 100, borderColor: "#000000", borderWidth: 1, textAlign: 'right' }}
                onChangeText={handleComment}
              />
              <View style={{ backgroundColor: "white", marginTop: 12 }}>
                <Button
                  title={headers.rate}
                  buttonStyle={styleSheet.button}
                  onPress={rateWine}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>}
      {!isAllowed && <Text h4 style={styleSheet.h4Text}>{headers.rateAlert}</Text>}
    </View>
  )
}


export const FCRate = (props) => {
  const [rate, setRate] = useState(3);

  const returnRate = (rat) => {

  }

  return (
    <Rating
      showRating
      onFinishRating={(rat) => { setRate(rat) }}
      style={{ paddingVertical: 10 }}
      imageSize={30}
    />
  )
}