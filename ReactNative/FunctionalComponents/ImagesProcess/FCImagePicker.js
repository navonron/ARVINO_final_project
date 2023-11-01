import React from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

export default class CCGaleryUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      photoUri: 't',
      uplodedPicUri: { uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' },
      finalPicUri: { uri: '' },
      myProps: props.route.params
    }

    this.uplodedPicPath = 'https://proj.ruppin.ac.il/bgroup15/prod/uploadFiles/';
  }

  componentDidMount() {
    this.btnOpenGalery();
  }

  btnOpenGalery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ photoUri: result.uri },
        () => this.btnUpload());

    }
  };

  btnUpload = () => {
    let img = this.state.photoUri;
    let imgName = 'imgFromGallery.jpg';
    this.imageUpload(img, imgName);
  };

  header = {
    'Accept': 'application/json',
    'content-type': 'multipart/form-data',
  }

  imageUpload = async (imgUri, picName) => {
    let urlAPI = "https://proj.ruppin.ac.il/bgroup15/prod/uploadpicture/";
    let dataI = new FormData();
    console.log('start');
    dataI.append('picture', {
      uri: imgUri,
      name: picName,
      type: 'image/jpg'
    });
    const config = {
      method: 'POST',
      body: dataI,
      headers: {
        'Accept': "application/json",
        'Content-Type': 'multipart/form-data',
      }

    };

    await fetch(urlAPI, config)
      .then((res) => {
        console.log('res.status=', res.status);
        if (res.status == 201) {
          return res.json();
        }
        else {
          console.log('error uploding ...');
          return "err";
        }
      })
      .then((responseData) => {
        console.log(responseData);
        if (responseData != "err") {
          let picNameWOExt = picName.substring(0, picName.indexOf("."));
          let imageNameWithGUID = responseData.substring(responseData.indexOf(picNameWOExt), responseData.indexOf(".jpg") + 4);
          this.setState({
            uplodedPicUri: { uri: this.uplodedPicPath + imageNameWithGUID },
            finalPicUri: { uri: responseData }
          });
        }
        else {
          console.log('error uploding ...', this.state.finalPicUri);
          alert('error uploding ...');
        }
      })
      .catch(err => {
        alert('err upload= ' + err);
      });

    // console.log("final", this.state.finalPicUri);
    //  console.log("props", this.state.myProps);
    this.props.navigation.push(this.state.myProps.page,
      {
        uri: this.state.finalPicUri.uri
      }
    );

  }

  render() {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {this.state.photoUri &&
          <Image source={{ uri: this.state.photoUri }} style={{ width: 300, height: 500 }} />
        }
      </View>
    );
  }
}
