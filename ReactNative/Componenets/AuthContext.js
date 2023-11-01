import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import helpers from '../helpers/helperFunctions';
import { Alert } from 'react-native';
import messages from '../helpers/messages.json';


const userIcon = 'https://proj.ruppin.ac.il/bgroup15/prod/FinalPics/user.jpg'

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({
    picture: userIcon,
    name: '',
    password: '',
    email: '',
    isPremium: false,
    auth:false
  });
  const [state, setstate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res =await  retrieveData();
      console.log(res);
    }
    fetchData();
  }, [])

  const loadAvatars=()=>{
    setstate(!state);
  }

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('login');
      if (value !== null) {
        const data = await JSON.parse(value);

        setAuthenticated(true);
        setUser((user)=>({
          name: data.Name,
          picture: data.picture,
          email: data.email,
          isPremium: data.isPremium,
          auth:data.auth
        }))
      }
    } catch (error) {
      console.log('Not login')
    }
  };





  const login = async (myEmail, myPassword) => {
    const res = await fetch(helpers.getApi() + '/AppUser/email?email=' + myEmail);
    const data = await res.json();
    if (data !== null) {
      if (data.password === myPassword) {
        AsyncStorage.setItem('login', JSON.stringify(user));
        setAuthenticated(true);
        setUser((user)=>({
          name: data.Name,
          picture: data.picture,
          email: myEmail,
          isPremium: data.isPremium,
          auth:true
        }));
      }
      else {
        Alert.alert(messages.wrongPassword);
      }
    }
    else {
      Alert.alert(messages.userNotexists);
    }
  }

 

  const logout = () => {
    AsyncStorage.removeItem('login');
    setAuthenticated(false);
    setUser((user)=>({
      picture: userIcon,
      name: '',
      email: '',
      isPremium: false,
      password: '',
      auth:false
    }));
  }

  const addtoDB = async (name, password, email, picture) => {
    let newUser =
    {
      "Name": name,
      "password": password,
      "email": email,
      "isOlder": true,
      "picture": picture,
      "typeId": 3
    };

    await fetch(helpers.getApi() + '/User/PostUser',
      {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8',
        })
      })
      .then(res => {
        setAuthenticated(true);
        setUser((user)=>({
          name: name,
          picture: picture,
          email: email,
          isPremium: false,
          auth:true
        }));

        AsyncStorage.setItem('login', JSON.stringify(newUser));
        return JSON.stringify(res);
      }, (error) => {
        alert(error);
      })
  }

  const facebookLogin = async (name, password, email, picture) => {

    try {
      const res = await fetch(helpers.getApi() + '/AppUser/email?email=' + email);
      const data = await res.json();
      if (data.email !== null) {
        AsyncStorage.setItem('login', JSON.stringify(data));
        setUser((user)=>({
          name: name,
          picture: picture,
          email: email,
          isPremium: data.isPremium,
          auth:true
        }));
        setAuthenticated(true);
        console.log(user);

      }
      else {
        addtoDB(name, password, email, picture);
      }
    }
    catch {
      alert("Error in FB login!")
    }
  }

  return (
    <AuthContext.Provider value={{ authenticated, retrieveData, loadAvatars,  user, login, logout, addtoDB, facebookLogin }} >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;