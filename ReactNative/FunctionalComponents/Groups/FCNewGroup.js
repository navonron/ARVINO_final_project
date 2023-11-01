import React, { useState, useRef, useEffect, useContext } from 'react'
import { View, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { Button, Text, Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import styleSheet from '../../Pages/PageStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CCPopUpPicture from '../../Componenets/CCPopUpPicture';
import FCHeader from '../General/FCHeader';
import helpers from '../../helpers/helperFunctions';
import { AuthContext } from '../../Componenets/AuthContext';

export default function FCNewGroup(props) {
    const childRef = useRef();
    const navigation = useNavigation();
    const [picture, setPicture] = useState(null);
    const [values, setValues] = useState({
        name: '',
        description: ''
      
    });
    const { user } = useContext(AuthContext);


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: '#fff'
        },
    });

    useEffect(() => {
        console.log('picture', picture);
        if (props.route.params != null) {
            setPicture(props.route.params.uri);

        }
    }, [picture])

    const goToLibrary = () => {
        navigation.push('ChooseGallery', {
            page: 'NewGroup'
        })
    }


    const handleNameChange=(val)=>{
        setValues({ ...values, ['name']: val });

    }

    
    const handleDescChange=(val)=>{
        setValues({ ...values, ['description']: val });

    }

    const addGroup = async () => {
        let newGroup =
        {
            "groupName": values.name,
            "groupDescription": values.description,
            "ImgPath": picture,
            "creatorEmail": user.email
        };
        console.log("New group", newGroup);

        await fetch(helpers.getApi() + '/Group/PostGroup',
            {
                method: 'POST',
                body: JSON.stringify(newGroup),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json; charset=UTF-8',
                })
            })
            .then(res => {
                props.route.params.addToGroupsArray(newGroup);
                alert("Group added!");

                return JSON.stringify(res);
            }, (error) => {
                console.log(error);
            })
            .catch((err) => {
                console.log(err);
            }

            ).finally(()=>{
                navigation.navigate('Groups');
            })
    }


    return (
        <View style={[styles.container, { flexDirection: "column" }]}>
            <View style={{ flex: 1 }} >
                <FCHeader />
            </View>
            <View style={{ flex: 0.5 }} >
                <Text h4 style={styleSheet.h4Text}>צור קבוצה</Text>
            </View>
            <View style={{
                flex: 2,
                flexDirection: 'row',
                alignItems: 'center'
            }} >
                {!picture && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    margin: 15,
                    borderStyle: 'solid',
                    borderColor: 'black',
                    borderWidth: 1
                }}>
                    <CCPopUpPicture ref={childRef} />
                    <MaterialCommunityIcons
                        name="camera-outline"
                        color='#691A1A'
                        size={50}
                        //   onPress={() => childRef.current.returnPopUp()} 
                        onPress={goToLibrary}
                    />
                </View>}
                {
                    picture && <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                        <TouchableHighlight>
                            <Image
                                source={{ uri: picture }}
                                onPress={goToLibrary}
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 50,
                                    margin: 15,

                                }}
                            />
                        </TouchableHighlight>
                    </View>
                }
                <View style={{
                    flex: 2,
                    justifyContent: 'flex-start'
                }}>
                    <TextInput
                        placeholder='שם קהילה'
                        style={{
                            height: 40,
                            margin: 12,
                            borderWidth: 1,
                            textAlign: 'right',
                            padding: 10,
                            fontSize: 20
                        }}
                        onChangeText={(val)=>handleNameChange(val)}

                    />
                    <TextInput
                        placeholder='תאור קצר של הקהילה'
                        style={{
                            height: 80,
                            margin: 12,
                            borderWidth: 1,
                            textAlign: 'right',
                            padding: 10

                        }}
                        multiline={true}
                        onChangeText={(val)=>handleDescChange(val)}

                    />
                </View>
            </View>
            <View style={{ flex: 3, backgroundColor: "white" }} >
                <Button title='הוסף' buttonStyle={styleSheet.button} onPress={addGroup} />
            </View>
        </View>
    )
}
