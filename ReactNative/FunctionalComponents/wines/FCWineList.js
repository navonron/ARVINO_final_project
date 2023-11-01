import React, { useEffect, useState } from 'react';
import {
  ScrollView,
} from 'react-native';
import { ListItem, Image, Icon } from 'react-native-elements';
import helpers from '../../helpers/helperFunctions';
import styleSheet from '../../Pages/PageStyle';
import { useNavigation } from '@react-navigation/native';

const FCWineList = (props) => {
  const [wines, setWines] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getWines();
  }, []);

  const getWines = async () => {
    const test = await fetch(helpers.getApi() + '/wine?categoryId=' + props.categoryId);
    const temp = await test.json();
    setWines(temp);
  };

  return (
    <ScrollView style={styleSheet.container}>
      <Icon
        onPress={props.toggleShow}
        reverse
        name='chevron-back-outline'
        type='ionicon'
        color='#691A1A'
      />
      {
        wines.map((wine, i) => (
          <ListItem
            key={wine.wineId}
            bottomDivider
            style={{flex:1}}
            onPress={
              () => {
                navigation.navigate('Login', {
                  screen: 'wine',
                  params: {
                    name: wine.wineName,
                    image: wine.wineImgPath,
                    content: wine.content,
                    id: wine.wineId,
                    price: wine.price,
                    wineryImage: wine.wineryImage,
                    areaCategoryName: wine.areaCategoryName,
                    wineryName: wine.wineryName,
                    rate: wine.rate
                  }
                });
              }
            }>
            <ListItem.Content style={{ flex: 0.5, alignContent:'flex-end'}}>
              <ListItem.Title style={{textAlign:'right'}}>{wine.wineName}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content style={{ flex: 0.5 }}>
              <Image
                source={{ uri: wine.wineImgPath }}
                style={styleSheet.winery}
              />
            </ListItem.Content>
          </ListItem>
        ))
      }
    </ScrollView>
  );
};

export default FCWineList;
