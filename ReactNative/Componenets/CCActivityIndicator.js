import React, { Component } from 'react'
import { ActivityIndicator, View, Image } from 'react-native'
import { Text } from 'react-native-elements'
import MaterialTabPage from '../Pages/MaterialTabPage';
import styleSheet from '../Pages/PageStyle';
import logo from '../assets/logoArvino.png'


export default class CCActivityIndicator extends Component {
  state = {
    timePassed: false
  }

  componentDidMount() {
    this._unsubscribeFocus = this.props.navigation.addListener('focus', (payload) => {
      let that = this;
      setTimeout(function () { that.setState({ timePassed: true }) }, 4000);
    });
    this._unsubscribeBlur = this.props.navigation.addListener('blur', (payload) => {
      this.setState({ timePassed: false })

    });
  }

  componentWillUnmount() {
    this._unsubscribeFocus();
    this._unsubscribeBlur();
  }

  goToHomePage = () => {
    this.props.navigation.push('Home')
  }

  render() {
    if (!this.state.timePassed) {
      return (
        <View style={[styleSheet.container, {
          flexDirection: "column", alignItems:'center'
        }]}>
          <View style={{ flex: 4, justifyContent:'flex-end' }}>
            <Text h4 style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'gray'
            }}>{this.props.route.params.msg}</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Image
              source={logo}
              style={{
                width: 150,
                height: 80,
                margin: 20
              }} />
          </View>
          <View style={{ flex: 4 }}>
            <ActivityIndicator
              size='large'
              color="#691A1A"
              style={{
              }} />
          </View>
        </View>)
    }
    else {
      return <MaterialTabPage />
    }

  }

}
