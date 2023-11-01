import React, { createContext } from 'react'
import helpers from '../helpers/helperFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AsynStorageContext = createContext();

const AsynStorageContextProvider = (props) => {

    const addToAsync = async (key, data) => {

        try {
            AsyncStorage.setItem(key, data);
        }
        catch {
            console.log("failed to save async")
        }
    }

    const getFromAsync = async (key) => {
        try {
            const res = AsyncStorage.getItem(key);
            if (res != null) {
                return res;
            }
        }
        catch {
            console.log("failed to get from async")
        }

    }

    const removeFromAsync = async (key) => {
        try {
            const res = AsyncStorage.getItem(key);
            if (res != null) {
               AsyncStorage.removeItem(key);
            }
        }
        catch {
            console.log("failed to get from async")
        }

    }

    return (
        <AsynStorageContext.Provider value={{ addToAsync, getFromAsync , removeFromAsync}} >
            {props.children}
        </AsynStorageContext.Provider>
    )
}

export default AsynStorageContextProvider;