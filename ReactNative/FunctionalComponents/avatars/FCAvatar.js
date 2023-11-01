import React, { useState, useContext } from 'react'
import { Avatar, Text, Badge } from 'react-native-elements';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import styleSheet from '../../Pages/PageStyle';
import { AuthContext } from '../../Componenets/AuthContext';
import FCBadge from './FCBadge';


const FCAvatar = () => {
   const { user, authenticated } = useContext(AuthContext);
   const navigation = useNavigation();


   const navigateToPage = () => {
      if (!authenticated) {
         navigation.navigate('Login', { screen: 'signup' });
      }
      else {
         console.log(user.isPremium);
         navigation.navigate('Login', { screen: 'profile' });
      }
   }

   return (
      <TouchableOpacity  onPress={navigateToPage}>
         <View style={{  alignItems: 'center', marginLeft: 50, marginTop: 45 }}>
            <FCBadge number={2} />

            <Avatar
               rounded={true}
               size="medium"
               containerStyle={[styleSheet.avatar, user.isPremium ? styleSheet.avatarGold : styleSheet.avatarReg]}
               source={{
                  uri:
                     user.picture,
               }}
               icon={{ name: 'user', type: 'font-awesome' }}
            />
            <Text style={[styleSheet.textInput]}>{user.name}</Text>
         </View>
      </TouchableOpacity>
   )
}
export default FCAvatar;