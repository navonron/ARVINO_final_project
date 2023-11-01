import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import FCHeader from '../General/FCHeader'
import styleSheet from '../../Pages/PageStyle';
import FCToggleButton from './FCToggleButton';
import FCWineCategories from '../wines/FCWineCategories';
import FCSearch from '../General/FCSearch';
import messages from '../../helpers/messages.json';
import FCWineriesCategories from './FCWineriesCategories';



export default function FCWineriesAndWines() {
  const [isWine, setisWine] = useState(true)


  const toggleButtons = () => {
    setisWine(!isWine);
  }

  return (
    <View style={styleSheet.container}>
      <FCHeader />
      <FCToggleButton isWine={isWine} toggleButtons={toggleButtons} />
      {
        isWine ? <FCSearch placeholder={messages.searchInWines} type={messages.wines} loaded={false} /> :
          <FCSearch placeholder={messages.searchInWineries} type={messages.wineries} loaded={false} />
      } 
      {isWine ? <FCWineCategories /> : <FCWineriesCategories />}
    </View>
  )
}
