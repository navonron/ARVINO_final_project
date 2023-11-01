import React, { useState, useEffect,useContext } from 'react';
import { View, Image, ActivityIndicator, ScrollView } from 'react-native';
import { Text } from 'react-native-elements'
import styleSheet from '../../Pages/PageStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import FCLikes from '../General/FCLikes'
import FCWineryAvatar from '../wineries/FCWineryAvatar';
import { AuthContext } from '../../Componenets/AuthContext';


function FCRecomendedWines(props) {
    const [recommendedWines, setRecommendedWines] = useState([]);
    const [avatars, setAvatars] = useState(props.avatars);
    const [uniqueWines, setUniqueWines] = useState([]);
    const navigation = useNavigation();
    const {  authenticated } = useContext(AuthContext);
    const [state, setstate] = useState(false)

    useEffect(() => {
        (async () => {
            console.log("AVATARS",avatars.length);
            const u = await getRecommendedWines();
            setUniqueWines(u);
            setstate(true);

        })()
    }, [state])

    const getRecommendedWines = async () => {
        setRecommendedWines([]);
        if (avatars != null) {
            avatars.map((avatar) => {
                if (avatar.wineList != null) {
                    avatar.wineList.map(wine => {
                        setRecommendedWines(recommendedWines => [...recommendedWines, wine])
                    })
                }
            });
            const uniqueW = await removeDuplicates(recommendedWines, "wineId");
            return uniqueW;
        }
    }

    function removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject = {};

        for (var i in originalArray) {
            lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    }


    return (
        <ScrollView
            horizontal={true}
            pagingEnabled={true}
            style={styleSheet.scrollView}>
            <View style={{ flexDirection: 'row' }}>
                { uniqueWines != undefined && uniqueWines.map(item => (
                    <View key={item.wineId} >
                        <View style={styleSheet.rowEvents}>
                            <FCWineryAvatar wineryName={item.wineryName} wineryImage={item.wineryImage} />
                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-evenly', marginTop: 10 }}>
                                <TouchableOpacity
                                    onPress={
                                        () => {
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
                                                    wineryName: item.wineryName,
                                                    rate: item.rate
                                                }
                                            });
                                        }
                                    }>
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                                            <View >
                                                <Image
                                                    source={{ uri: item.wineImgPath }}
                                                    style={styleSheet.wine} />

                                            </View>
                                            <View>
                                                <Text style={{
                                                    height: 60,
                                                    width: 60,
                                                    borderRadius: 30,
                                                    borderWidth: 4,
                                                    borderColor: '#691A1A',
                                                    color: '#691A1A',
                                                    borderStyle: 'solid',
                                                    fontSize: 20,
                                                    textAlign: 'center',
                                                    textAlignVertical: 'center',
                                                    padding: 14
                                                }}>
                                                    {Number(item.rate).toFixed(1)} </Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                            <Text h4>{item.wineName}</Text>
                                            <Text>{item.content}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            {item.likes != null ?
                                <FCLikes likes={item.likes} entityId={item.wineId} entityType={2} /> :
                                <View></View>}
                        </View>
                    </View>

                ))}
            </View>
        </ScrollView>

    )

}
export default FCRecomendedWines;