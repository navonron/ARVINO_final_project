import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FCREgister from '../FunctionalComponents/Authentication/FCREgister';
import FCProfile from '../FunctionalComponents/Authentication/FCProfile';
import FCLogin from '../FunctionalComponents/Authentication/FCLogin';
import FCQuestionere from '../FunctionalComponents/Authentication/FCQuestionere';
import FCGroupChat from '../FunctionalComponents/Groups/FCGroupChat';
import FCWine from '../FunctionalComponents/wines/FCWine';
import FCWinery from '../FunctionalComponents/wineries/FCWinery';
import CCActivityIndicator from '../Componenets/CCActivityIndicator';
import FCQuestionere1 from '../FunctionalComponents/Authentication/FCQuestionere1';
import FCEvent from '../FunctionalComponents/Events/FCEvent';
import FCRate from '../FunctionalComponents/wines/FCRate';
import FCWineRate from '../FunctionalComponents/wines/FCRate';
import FCImagePicker from '../FunctionalComponents/ImagesProcess/FCImagePicker';
import FCNewGroup from '../FunctionalComponents/Groups/FCNewGroup';
import FCMap from '../FunctionalComponents/General/FCMap';
import FCAvatarView from '../FunctionalComponents/avatars/FCAvatarView';
import FCArticle from '../FunctionalComponents/General/FCArticle';
import FCWineryChatContainer from '../FunctionalComponents/wineries/FCWineryChatContainer';

const Stack = createStackNavigator();

const Pages = () => (
    <Stack.Navigator  initialRouteName="signup" headerMode='none' >
        <Stack.Screen name="login"  component={FCLogin}/>
        <Stack.Screen name="signup" component={FCREgister}/>
        <Stack.Screen name="profile" component={FCProfile}/>
        <Stack.Screen name="questionere" component={FCQuestionere1}/>
        <Stack.Screen name="groupChat" component={FCGroupChat}/>
        <Stack.Screen name="wine" component={FCWine}/>
        <Stack.Screen name="winery" component={FCWinery}/>
        <Stack.Screen name="waitPage" component={CCActivityIndicator}/>
        <Stack.Screen name="Event" component={FCEvent}/>
        <Stack.Screen name="RateWine" component={FCWineRate}/>
        <Stack.Screen name="NewGroup" component={FCNewGroup}/>
        <Stack.Screen name="ChooseGallery" component={FCImagePicker}/>
        <Stack.Screen name="wineryMaps" component={FCMap}/>
        <Stack.Screen name="avatarView" component={FCAvatarView}/>
        <Stack.Screen name="article" component={FCArticle}/>
        <Stack.Screen name="wineryChat" component={FCWineryChatContainer}/>

    </Stack.Navigator>
);

export default Pages;