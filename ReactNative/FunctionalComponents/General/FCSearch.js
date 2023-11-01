import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Dimensions } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import helpers from '../../helpers/helperFunctions';
import messages from '../../helpers/messages.json';
import { useNavigation } from '@react-navigation/native';

const searchFor = [messages.wines, messages.wineries, messages.event, messages.groups];

function FCSearch(props) {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [type, setType] = useState("");
  const [isLoaded, setisLoaded] = useState(props.loaded);
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;


  useEffect(() => {
    // console.log("prop type:", props.type)
    setType(props.type);
    if (props.type === messages.wines) {
      getData('/Wine/GetAllWines');
    }
    else if (props.type === messages.wineries) {
      getData('/Winery');
    }
    else if (props.type === messages.event) {
      setFilteredDataSource("");
      console.log("EVENTS", props.data.length)
      setMasterDataSource(props.data);
      setisLoaded(true);
    }
    else if (props.type === messages.groups) {
      setFilteredDataSource("");
      console.log("GROUPS", props.data.length)
      setMasterDataSource(props.data);
      setisLoaded(true);
    }
    else if (props.type === messages.searchInArvino) {

    }
  }, []);

  const getData = (type) => {
    fetch(helpers.getApi() + type,
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
          setFilteredDataSource("");
          setMasterDataSource(result);
          // console.log("MDS: ", type + "-" + masterDataSource.length);
        })
      .then(
        () => {
          setisLoaded(true)
        }
        ,
        (error) => {
          console.log("err post=", error);
        });

  }

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        if (props.type === messages.wines) {
          const itemData = item.wineName ? item.wineName : '';
          const textData = text;
          return itemData.indexOf(textData) > -1;
        }
        else if (props.type === messages.wineries) {
          const itemData = item.wineryName ? item.wineryName : '';
          const textData = text;
          return itemData.indexOf(textData) > -1;
        }
        else if (props.type === messages.event) {
          const itemData = item.eventName ? item.eventName : '';
          const textData = text;
          return itemData.indexOf(textData) > -1;
        }
        else if (props.type === messages.groups) {
          const itemData = item.groupName ? item.groupName : '';
          const textData = text;
          return itemData.indexOf(textData) > -1;
        }
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource("");
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {

    if (props.type === messages.wines) {
      return (
        // Flat List Item -WINES
        <ListItem
          onPress={() => getItem(item)}
          bottomDivider
        >
          <ListItem.Content style={{ flex: 0.5, alignContent: 'flex-end' }}>
            <ListItem.Title style={{ textAlign: 'right', marginLeft: 20, fontWeight: 'bold' }}>{item.wineName}</ListItem.Title>
            <ListItem.Subtitle style={{ textAlign: 'right', marginLeft: 20 }}>יקב {item.wineryName}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Content style={{ flex: 0.5 }}>
            <Image
              source={{ uri: item.wineImgPath }}
              style={{ height: 50, width: 40, marginLeft: 40, alignItems: 'flex-end' }}
            />
          </ListItem.Content>
        </ListItem>
      );
    }
    else if (props.type === messages.wineries) {
      return (
        // Flat List Item WINERIES
        <ListItem
          onPress={() => getItem(item)}
          bottomDivider>
          <ListItem.Content style={{ flex: 0.5, alignContent: 'flex-end' }}>
            <ListItem.Title style={{ textAlign: 'right', fontWeight: 'bold' }}>{item.wineryName}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content style={{ flex: 0.5 }}>
            <Image
              source={{ uri: item.IconImgPath }}
              style={{ height: 50, width: 40, alignItems: 'center' }}
            />
          </ListItem.Content>
        </ListItem>
      );
    }
    else if (props.type === messages.event) {
      return (
        // Flat List Item EVENTS
        <ListItem
          onPress={() => getItem(item)}
          bottomDivider>
          <ListItem.Content style={{ flex: 0.5, alignContent: 'flex-end' }}>
            <ListItem.Title style={{ textAlign: 'right', fontWeight: 'bold' }}>{item.eventName}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content style={{ flex: 0.5 }}>
            <Image
              source={{ uri: item.eventImgPath }}
              style={{ height: 50, width: 40, alignItems: 'center' }}
            />
          </ListItem.Content>
        </ListItem>
      );
    }
    else if (props.type === messages.groups) {
      return (
        // Flat List Item GROUPS
        <ListItem
          onPress={() => getItem(item)}
          bottomDivider
        >
          <ListItem.Content style={{ flex: 0.5, alignContent: 'flex-end' }}>
            <ListItem.Title style={{ textAlign: 'right', fontWeight: 'bold' }}>{item.groupName}</ListItem.Title>
            <ListItem.Subtitle style={{ textAlign: 'right' }}>{item.groupDescription}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Content style={{ flex: 0.5 }}>
            <Image
              source={{ uri: item.ImgPath }}
              style={{ height: 50, width: 40, alignItems: 'center', marginLeft: 50 }}
            />
          </ListItem.Content>
        </ListItem>
      );
    }
  };

  const getItem = (item) => {
    // Function for click on an item
    if (props.type === messages.wines) {
      navigation.navigate('Login', {
        screen: 'wine',
        params: {
          name: item.wineName,
          image: item.wineImgPath,
          content: item.content,
          id: item.wineId,
          price: item.price,
          wineryImage: item.wineryImage,
          areaCategoryName: item.areaCategoryName,
          wineryName: item.wineryName
        }
      });
    }
    else if (props.type === messages.wineries) {
      navigation.navigate('Login', {
        screen: 'winery',
        params: {
          name: item.wineryName,
          image: item.IconImgPath,
          id: item.wineryId
        }
      });
    }
    else if (props.type === messages.event) {
      console.log(item);
      navigation.navigate('Login', {
        screen: 'Event',
        params: {
          id: item.eventId,
          name: item.eventName,
          date: item.eventDate,
          time: item.startTime,
          picture: item.eventImgPath,
          description: item.content,
          price: item.price,
          ticketsLeft: item.participantsAmount
        }
      });
    }
    else if (props.type === messages.groups) {
      navigation.navigate('Login', {
        screen: 'groupChat',
        params: {
          name: item.groupName,
          description: item.groupDescription,
          picture: item.ImgPath,
          id: item.groupId
        }
      });
    }
  };



  return (
    <View>
      <View>
        <Searchbar
          style={{width:windowWidth*0.9, alignSelf:'center', marginTop:10, marginBottom:10}}
          inputStyle={{textAlign:'right'}}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder={props.placeholder}
          value={search}
          cancelIcon={true}
        />
      </View>
      <View>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ItemView}
        />
      </View>
    </View>
  );

}

export default FCSearch;