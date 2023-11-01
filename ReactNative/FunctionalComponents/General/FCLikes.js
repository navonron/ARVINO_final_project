import React, { useEffect, useState, useContext } from 'react'
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import { AuthContext } from '../../Componenets/AuthContext';
import helpers from '../../helpers/helperFunctions';
import uuid from 'react-native-uuid';

export default function FCLikes(props) {
  const iconNotPressed = 'wine-outline';
  const iconPressed = 'wine';

  const [iconName, setIconName] = useState(iconNotPressed);
  const [entityLikes, setEntityLike] = useState(props.likes);
  const [likesToView, setLikesToView] = useState([]);
  const { user, authenticated } = useContext(AuthContext)

  useEffect(() => {
    setLikesToView(entityLikes.slice(0, 6));
    let obj = entityLikes.find(i => i.userName == user.name);
    if (obj !== undefined) {
      setIconName(iconPressed);
    }
  }, [entityLikes])


  const likeAllowed = async () => {
    if (authenticated)
      await postLike();
    else
      alert("need login");
  }
  const postLike = async () => {
    let newLike =
    {
      "userEmail": user.email,
      "entityType": props.entityType,
      "entityId": props.entityId,

    };
    await fetch(helpers.getApi() + '/Likes/PostLikeToEntity',
      {
        method: 'POST',
        body: JSON.stringify(newLike),
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
          setIconName(iconPressed);
          let newLike = {
            id: result,
            userImage: user.picture,
            username: user.Name
          }
          setEntityLike(entityLikes => [...entityLikes, newLike]);
        })
      .then(
        () => { }
        ,
        (error) => {
          console.log("err post=", error);
        });

  }


  let position = -15;
  return (
    <View key={uuid.v4()} style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'flex-start', marginLeft: 20, marginBottom: 20 }} >
      <Ionicons
        name={iconName}
        size={25}
        color="#691A1A"
        onPress={() => {
          if (iconName == iconNotPressed) {
            likeAllowed();
          }
          else {
            //removeLike
          }
        }} />
      <Text style={{ marginTop: 7, fontWeight: 'bold', color: '#691A1A' }}>
        {entityLikes.length > 0 ? '+' + entityLikes.length : null}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {
          likesToView.map((like) => {
            position += 20;
            return (
              <View key={uuid.v4()}>
                <Avatar
                  rounded={true}
                  size='small'
                  source={{
                    uri: like.userImage
                  }}
                  containerStyle={{ position: 'absolute', left: position, borderColor: '#F0E6E8', borderWidth: 1 }}
                />
              </View>
            )
          })
        }
      </View>
    </View>
  )

}
