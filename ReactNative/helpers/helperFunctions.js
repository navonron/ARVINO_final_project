import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage'

const helpers = {
  getApi: function () {
    return 'https://proj.ruppin.ac.il/bgroup15/prod/api/'
  },
  ReturnDate: function (date) {
    return Moment(date).format('DD/MM/yyyy');
  },
  ReturnHour: function (date) {
    return Moment(date).format('HH:mm');
  },

  ReturnRandomData: function (data) {
    let num = Math.floor(Math.random() * Math.floor(data.length));
    return data[num];
  },
  ReturnRandomNumber: function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  },

  ReturnColorPallete: function () {
    const colors = ["#9B0000", "#6D0000", "#580000", "#430000",
      "#E96245", "#F4AC90", "#F1E6CD", "#ED8A68"];
    return colors;
  },

  fetchdata: async function (apiName) {
    await fetch(helpers.getApi() + '/' + apiName,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8',
        })
      })
      .then(res => {
        return res.json();
      })
      .then(
        (result) => {
          return result;
        },
        (error) => {
          console.log("err post=", error);
        });
  }

}

export default helpers;




