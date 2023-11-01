import React, { useEffect, useState } from 'react';
import {
  ScrollView,
} from 'react-native';
import { ListItem, Image, Icon } from 'react-native-elements';
import helpers from '../../helpers/helperFunctions';
import { useNavigation } from '@react-navigation/native';
import styleSheet from '../../Pages/PageStyle';

const FCWineryList = (props) => {
  const [wineries, setWineries] = useState([]);
  const navigation= useNavigation();

  useEffect(() => {
    getWineries();
  }, []);

  const getWineries = async () => {
    //api/Winery/area?areaID=2
    const test = await fetch(helpers.getApi() + '/winery/area?areaID=' + props.categoryId);
    console.log(helpers.getApi() + '/winery/area?areaID=' + props.categoryId);
    const temp = await test.json();
    setWineries(temp);
  };

  return (
    <ScrollView>
      <Icon
        onPress={props.toggleShow}
        reverse
        name='chevron-back-outline'
        type='ionicon'
        color='#691A1A'
      />
      {
        wineries.map((winery, i) => (
          <ListItem
            style={{ flex:1 }}
            key={winery.wineryId}
            bottomDivider
            onPress={
              ()=>{
                navigation.navigate('Login', {
                  screen: 'winery',
                  params: {
                    name: winery.wineryName,
                    image: winery.wineryImage,
                    id: winery.wineryId,
                    wineryEmail:winery.wineryEmail,
                    wineryAddress: winery.wineryAddress,
                    phone:winery.phone,
                    wineList: winery.wineList,
                    eventList: winery.eventList,
                    serviceList:winery.serviceList
                  }
                });
              }
            }>
            <ListItem.Content style={{flex:0.5}}>
              <ListItem.Title>{winery.wineryName}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content style={{flex:0.5}}>
            <Image
                source={{ uri: winery.wineryImage }}
                style={styleSheet.winery}
              />
            </ListItem.Content>
          </ListItem>
        ))
      }
    </ScrollView>
  );
};

export default FCWineryList;

