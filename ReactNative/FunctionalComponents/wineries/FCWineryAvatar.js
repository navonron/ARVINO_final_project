import React from 'react'
import { View, Text, Share } from 'react-native'
import { Avatar, Divider } from 'react-native-elements'
import styleSheet from '../../Pages/PageStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import messages from '../../helpers/messages.json';

export default function FCWineryAvatar(props) {

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:

                  props.message +'\n'+ props.name +'\n ביקב ' +props.wineryName,
                   url: 'exp://exp.host/@vmagen/arvinoDemo'
                    
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Avatar
                    rounded={true}
                    size="small"
                    containerStyle={[styleSheet.avatar, styleSheet.avatarReg,{marginRight:40}]}
                    source={{
                        uri:
                            props.wineryImage
                    }}
                />
                <Text style={{fontWeight:'bold', marginRight:30}} >
                    יקב {props.wineryName}</Text>

                <MaterialCommunityIcons
                    name="dots-horizontal"
                    color='black'
                    size={28}
                    onPress={onShare}
                />
            </View>
            <View>
                <Divider inset={false} style={{marginTop:10}} />
            </View>
        </View>
    )
}
