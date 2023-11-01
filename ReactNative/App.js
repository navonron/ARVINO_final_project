import React, { useEffect, useState, useRef, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialTabPage from './Pages/MaterialTabPage';
import Pages from './Pages/navigationPages';
import AuthContextProvider from './Componenets/AuthContext';
import PrefContextProvider from './Componenets/PrefrenceContext';
import AsynStorageContextProvider from './Componenets/AsyncStorageContext';
const Stack = createStackNavigator();



function App() {
  
  return (
    <NavigationContainer >
      <AuthContextProvider >
        <PrefContextProvider>
          <AsynStorageContextProvider>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName="MaterialTabPage">
              <Stack.Screen name="MaterialTabPage" component={MaterialTabPage} />
              <Stack.Screen name="Login" component={Pages} />
            </Stack.Navigator>
          </AsynStorageContextProvider>
        </PrefContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
}


export default App;