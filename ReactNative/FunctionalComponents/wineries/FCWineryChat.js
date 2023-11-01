import React, { useState, useCallback, useEffect, useContext } from 'react'
import { Image } from 'react-native';
import { GiftedChat, Actions } from 'react-native-gifted-chat';
import helpers from '../../helpers/helperFunctions';
import { AuthContext } from '../../Componenets/AuthContext';
import { useNavigation } from '@react-navigation/native';
import FCImagePicker from '../ImagesProcess/FCImagePicker';

export default function FCWineryChat(props) {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [showImage, setShowImage] = useState(false);

    const { authenticated, user } = useContext(AuthContext);
    const [chatUser, setChatUser] = useState({
        _id: -1,
        name: '',
        avatar: ''
    });
    const navigation = useNavigation();


    useEffect(() => {
        getUser();
        loadMessages()
        const interval = setInterval(() => {
            loadMessages()
        }, 5000);
        return () => clearInterval(interval);
    }, []);


    const getUser = async () => {
        if (authenticated) {
            console.log('user',)
            setChatUser({
                _id: user.email,
                name: user.name,
                avatar: user.picture
            });
        }
        else {
            alert("need login");
            navigation.goBack();
        }
    }


    const loadMessages = async () => {
        console.log(helpers.getApi() + 'WineryChat?wineryId='+props.wineryId+ '&email='+ user.email)
        const result = await fetch(helpers.getApi() + 'WineryChat?wineryId='+props.wineryId+ '&email='+ user.email);
        const data = await result.json();
        setMessages(data);
    }

    const onSend = (newMessages = []) => {
        setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
        SaveMessage(newMessages);
    };

    const SaveMessage = async (newMessages) => {
        let newMsg =
        {
            "groupId": props.wineryId,
            "createdAt": new Date().toLocaleString(),
            "text": newMessages[0].text,
            "user": {
                "_id": chatUser._id,

            }
        };

        await fetch(helpers.getApi() + '/Messages',
            {
                method: 'POST',
                body: JSON.stringify(newMsg),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json; charset=UTF-8',
                })
            })
            .then(res => {
                return JSON.stringify(res);
            }, (error) => {
                alert(error);
            });


    }
    const renderActions = (props) => (
        <Actions
            {...props}
            containerStyle={{
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 4,
                marginRight: 4,
                marginBottom: 0,
            }}
            icon={() => (
                <Image
                    style={{ width: 26, height: 26 }}
                    source={{
                        uri: 'http://proj.ruppin.ac.il/bgroup15/prod/FinalPics/paperclip.png',
                    }}
                />
            )}
            options={{
                'Choose From Library': () => {
                    setShowImage(true);
                },
                Cancel: () => {
                    setShowImage(false);
                },
            }}
            optionTintColor="#222B45"
        />
    );

    if (!showImage) {
        return (
            <GiftedChat
                messages={messages}
                text={text}
                onInputTextChanged={setText}
                onSend={onSend}
                user={chatUser}
                alignTop
                alwaysShowSend={true}
                scrollToBottom={true}
                showUserAvatar={true}
                bottomOffset={26}
                onPressAvatar={console.log}
                renderActions={renderActions}
                isCustomViewBottom={true}
                messagesContainerStyle={{ backgroundColor: 'white' }}
                parsePatterns={(linkStyle) => [
                    {
                        pattern: /#(\w+)/,
                        style: linkStyle,
                        onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
                    },
                ]}
            />
        )
    }
    else {
        return (
            <FCImagePicker load={true} />
        )
    }
}
