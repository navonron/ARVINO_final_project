import React, { createContext } from 'react'
import helpers from '../helpers/helperFunctions';

export const PrefContext = createContext();

const PrefContextProvider= (props) =>{

  const AddToDB = async (email, prefrenceID, freeText) => {
    //console.log("WINEID", data.wineId);
    let newPrefrence =
    {
      "email": email,
      "PrefrenceID": prefrenceID,
      "FreeText": freeText,

    };

    await fetch(helpers.getApi() + '/UserPrefrence',
      {
        method: 'POST',
        body: JSON.stringify(newPrefrence),
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8',
        })
      })
      .then(res => {
        return JSON.stringify(res);
      }, (error) => {
        alert(error);
      })

  }

  return (
    <PrefContext.Provider value={{ AddToDB }} >
      {props.children}
    </PrefContext.Provider>
  )
}

export default PrefContextProvider;