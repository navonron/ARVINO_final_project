import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import messages from '../../helpers/messages.json';
import styleSheet from '../../Pages/PageStyle';



export default function FCToggleButton(props) {

  if (props.isWine) {
    return (
      <View style={styleSheet.row}>
        <TouchableOpacity
          style={[styleSheet.toggleBox, styleSheet.toggleBoxInActive]}
          onPress={props.toggleButtons}  >
          <Text style={[styleSheet.textButton, styleSheet.inButtonActive]}>{messages.wineries}</Text>
        </TouchableOpacity >
        <TouchableOpacity style={[styleSheet.toggleBox, styleSheet.toggleBoxActive]}>
          <Text style={[styleSheet.textButton, styleSheet.inButtonInActive]}>{messages.wines}</Text>
        </TouchableOpacity >
      </View>
    );
  }
  else {
    return (
      <View style={styleSheet.row}>
        <TouchableOpacity
          style={[styleSheet.toggleBox, styleSheet.toggleBoxActive]}>
          <Text style={[styleSheet.textButton, styleSheet.inButtonInActive]}>{messages.wineries}</Text>
        </TouchableOpacity >
        <TouchableOpacity style={[styleSheet.toggleBox, styleSheet.toggleBoxInActive]}
         onPress={props.toggleButtons} >
          <Text style={[styleSheet.textButton, styleSheet.inButtonActive]}>{messages.wines}</Text>
        </TouchableOpacity >
      </View>
    );
  }
}
