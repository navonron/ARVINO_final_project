import React, { useEffect, useState, useContext } from 'react'
import { View, Text, Animated, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import helpers from '../../helpers/helperFunctions';
import { ScrollView } from 'react-native';
import FCGroupSplash from './FCGroupSplash';
import FCAvatar from '../avatars/FCAvatar';
import { AuthContext } from '../../Componenets/AuthContext';

export default function FCBubbles(props) {
  const [shouldShow, setShouldShow] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState('');
  const [id, setId] = useState();
  const {authenticated} = useContext(AuthContext);

  const sizes = [60, 80, 100, 120, 70, 80, 90, 50];

  useEffect(() => {
    // setShouldShow(false);
  }, []);

  const hideModal = () => {
    setShouldShow(false);
  }

  const cardGap = 16;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20, marginBottom: 50, marginLeft: 10, marginRight: 10 }}>
        {props.myGroups.map((subject, i) => {
          const circleWidth = helpers.ReturnRandomData(sizes);
          return (
            <TouchableOpacity
              onPress={() => {
                setShouldShow(true)
                setName(subject.groupName)
                setDescription(subject.groupDescription)
                setPicture(subject.ImgPath)
                setId(subject.groupId);
              }}
              key={i}
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 2,
                  height: 4,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }} >
              <View>
              </View>
              <Image
                source={{ uri: subject.ImgPath }}
                style={{
                  padding: 10,
                  margin: helpers.ReturnRandomNumber(cardGap),
                  // marginLeft: i % 2 !== 0 ? cardGap : 6,
                  width: circleWidth,
                  height: circleWidth,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: circleWidth/2,
                  borderColor: helpers.ReturnRandomData(helpers.ReturnColorPallete()),
                  borderWidth: 4
                }}
              ></Image>
              <View style={{
                marginTop:5,
                position: 'relative',
                alignSelf:'center',
                justifyContent: 'flex-start',
              }}>
                <Text style={{
                  width:100,
                  textAlign:'center'
                }}>{subject.groupName}</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {shouldShow ? (
          <FCGroupSplash id={id} name={name} description={description} picture={picture} hideModal={hideModal} authenticated={authenticated}/>
        ) : 
          null
        }
      </View>
    </ScrollView>
  )
}


const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387'
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  logo: {
    width: height_logo,
    height: height_logo
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold'
  },
  text: {
    color: 'grey',
    marginTop: 5
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row'
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold'
  }
});
