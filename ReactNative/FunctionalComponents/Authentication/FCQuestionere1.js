import React, { useEffect, useState, useContext } from "react";
import { StyleSheet,  View, Image } from "react-native";
import { Text, Button } from 'react-native-elements'
import SwipeCards from "react-native-swipe-cards-deck";
import helpers from '../../helpers/helperFunctions';
import messages from '../../helpers/messages.json';
import myStyles from '../../Pages/PageStyle';
import { useNavigation } from '@react-navigation/native';
import { PrefContext } from "../../Componenets/PrefrenceContext";

function Card({ data }) {
  return (
    <View style={[styles.card, { backgroundColor: data.backgroundColor }]}>
      <Text h4 style={{textAlign:'center'}}>{messages.swipeLeftRight}</Text>
      <Image
        source={{ uri: data.wineImgPath }}
        style={myStyles.wine} />
      <Text>{data.wineName}</Text>
      <Text>{data.wineryName}</Text>
    </View>
  );
}

function StatusCard({ toShow }) {
  const [show, setshow] = useState(false)

  useEffect(() => {
   setshow(toShow);
  }, [show])

  const navigation = useNavigation();

  const countinueToMainPage = () => {
    navigation.navigate('Login', {
      screen: 'waitPage',
      params: {
        msg: messages.buildingAWorld
      }
    });
  }

  if (show) {
    return (
      <View style={StyleSheet.container}>
        <Text style={styles.cardsText}>{messages.thankYou}</Text>
        <Button
          title={messages.countinue}
          buttonStyle={myStyles.button}
          onPress={countinueToMainPage}
        />
      </View>
    );
  }
  else
    return (
      <View style={StyleSheet.container}>
        <Text style={styles.cardsText}>{messages.prepareQuestions}</Text>
         <Button
          title={messages.skip}
          buttonStyle={myStyles.button}
          onPress={countinueToMainPage}
        />
      </View>
    )
}

export default function FCQuestionere1(props) {
  const {AddToDB} = useContext(PrefContext);
  const [cards, setCards] = useState();

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 3000);

    return function cleanup() {
      // console.log('CLEANUP');
      setCards([]);
    }
  }, []);

  async function fetchData() {
    await fetch(helpers.getApi() + '/RandomWines?numOfWines=3',
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
          setCards(result);
        },
        (error) => {
          console.log("err post=", error);
        });
  }

  function handleYup(card) {
    console.log(`Yup for ${card.wineId}`);
    AddToDB(props.route.params.email,1,  card.wineId,);
    return true; // return false if you wish to cancel the action
  }
  function handleNope(card) {
    console.log(`Nope for ${card.wineName}`);
    return true;
  }


  return (
    <View style={styles.container}>
      {cards ? (
        <SwipeCards
          cards={cards}
          renderCard={(cardData) => <Card data={cardData} />}
          keyExtractor={(cardData) => String(cardData.wineId)}
          renderNoMoreCards={() => <StatusCard  toShow={true}/>}
          handleYup={handleYup}
          handleNope={handleNope}
          yupText={messages.know}
          nopeText={messages.dontKnow}
          showYup
          showNope
        />
      ) : (
        <StatusCard text={messages.prepareQuestions} style={{textAlign:'center'}} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding:20
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
   
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#691A1A',
    padding:20
  },
  cardsText: {
    fontSize: 26,
    textAlign:'center'
  },
});