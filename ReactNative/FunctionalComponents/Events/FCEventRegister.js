import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  TextInput,
  KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { Input, Icon, Text, Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
import messages from '../../helpers/messages.json';
import mySTyles from '../../Pages/PageStyle';
import helpers from '../../helpers/helperFunctions';
import bitLogo from '../../assets/BIT_logo.jpg'
import { useNavigation } from '@react-navigation/native';

const FCEventRegister = (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [name, onChangeName] = React.useState(null);
  const [phone, onChangePhone] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);
  const [numberOfPeople, setChangeNumberOfPeople] = React.useState(null);
  const [totalPrice, setTotalPrice] = React.useState(0);

  const handleSubmit = () => {
    props.hideModal();
   
    console.log(numberOfPeople);
    props.updateNumOfTickets(numberOfPeople);
    alert("נרשמת לארוע , נשלח  אלייך מייל עם הפרטים");
  }

  const handlePriceChange = (val) => {
    setChangeNumberOfPeople(val);
    setTotalPrice(val * props.price);
  }

  return (
    <View style={[styles.container, { marginTop: 80 }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animatable.View
            style={[styles.footer, {
              backgroundColor: colors.card,
              borderStyle: 'solid',
              borderWidth: 1,
            }]}
            animation="fadeInUpBig"
          >
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 0.5 }}><Icon
                reverse
                name='close'
                type='ionicon'
                color='#691A1A'
                onPress={props.hideModal}
              />
              </View>
              <View style={{ alignContent: 'center', flex: 0.75 }}>
                <Text style={{ textAlign: 'right', fontWeight: 'bold', margin: 5 }}>
                  {` ${messages.register}  ל${props.name} `}
                </Text>
                <Text style={{ textAlign: 'right', fontWeight: 'bold', margin: 5 }}>
                  בתאריך {` ${helpers.ReturnDate(props.date)}`}
                </Text>
                <Text style={{ textAlign: 'right', fontWeight: 'bold', margin: 5 }}>
                  בשעה {` ${props.time}`}
                </Text>
                <Text style={{ textAlign: 'right', fontWeight: 'bold', margin: 5 }}>
                  מחיר כרטיס {` ${props.price}`}
                </Text>
              </View>
            </View>


            <View>
              <TextInput
                placeholder={messages.insertFullName}
                style={styles.input}
                onChangeText={onChangeName}
                value={name}
              />
              <TextInput
                placeholder={messages.insertPhone}
                style={styles.input}
                onChangeText={onChangePhone}
                value={phone}
                keyboardType="numeric"

              />
              <TextInput
                placeholder={messages.insertEmail}
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
              />
              <TextInput
                placeholder={messages.insertNumPeople}
                style={styles.input}
                onChangeText={(val) => {
                  handlePriceChange(val);

                }}
                value={numberOfPeople}
                keyboardType="numeric"
              />

              <Text h4 style={mySTyles.h4Text}>סה"כ:   {totalPrice}</Text>
              <TouchableOpacity
                onPress={handleSubmit}>
                <Image
                  source={bitLogo}
                  style={{ width: 70, height: 70, alignSelf: 'center' }}

                />
              </TouchableOpacity>
            </View>

          </Animatable.View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default FCEventRegister;

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: width * 0.95,
    alignContent: 'center',
    padding: 10,
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 30

  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold'
  },
  text: {
    color: 'grey',
    marginTop: 5
  },
  button: {
    alignItems: 'flex-start',
    marginTop: 30
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    margin: 20,
    borderWidth: 1,
    padding: 10,
    color: 'gray',
    textAlign: 'right'
  }
});

