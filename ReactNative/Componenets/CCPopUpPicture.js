import React, { forwardRef, useImperativeHandle, createRef } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native';
import ActionSheet from "react-native-actions-sheet";
import { useNavigation } from '@react-navigation/native';
import messages from '../helpers/messages.json';

const actionSheetRef = createRef();

const CCPopUpPicture = forwardRef((props, ref) => {
    const navigation= useNavigation();
    useImperativeHandle(ref, () => ({

        returnPopUp() {
            actionSheetRef.current?.setModalVisible();
        }
    }));

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff'
        },
        text: {
            fontSize: 24,
            padding: 10,
            color: '#333',
            textAlign: 'center',
            marginTop: 20,
            borderWidth: 1,
            borderColor: 'black',
            borderStyle: 'solid',
            borderRadius: 10,
            width: 300,
            alignSelf: 'center'
        }
    });

    const goToLibrary=()=>{
        !actionSheetRef.current?.setModalVisible();
        navigation.push('ChooseGallery', {
            page:'NewGroup'
          })
    }

    return (
        <ActionSheet ref={actionSheetRef} style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', padding: 20, }}>
            <View>
                <Button
                    onPress={goToLibrary}
                    title={messages.chooseFromGallery}
                   />
                    <Button
                    onPress={goToLibrary}
                    title={messages.chooseFromCamera}
                   />
            </View>

            <View style={{ marginBottom: 40 }}>
                <Text style={styles.text}>Cancel</Text>
            </View>
        </ActionSheet>
    )

    
});

export default CCPopUpPicture;