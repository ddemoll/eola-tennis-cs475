import React, { Component } from 'react'
import { TextInput,
  CameraRoll,
  TouchableWithoutFeedback,
   View,
   Image,
   Platform,
   StyleSheet,
   ActivityIndicator,
 } from 'react-native';
import { BackHandler } from 'react-native'
import { Title, Container, Header, Content, Text, Button, Icon, Left, Right, Body, Textarea } from 'native-base';

import StoreActions from '../Redux/StoreRedux'
import Store from '../Components/Store'

import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AddAnnounceStyle'

class AddStore extends Component {

  componentDidMount () {

    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
  }

  createProduct = (data) => {

    this.props.dispatch(StoreActions.storeCreate(data))
  }


  render () {

    const {fetching, created, error} = this.props.store;

    let content = null;
    if(created !== null) {
      this.props.dispatch(StoreActions.storeCreateDone())
      this.props.navigation.goBack();
      return null
    } else {
      let initData = {
        text: "",
        price: "",
        selectedImage: null,

      }
      return <Store navigation={this.props.navigation} data={initData} done={this.createProduct} reduxStatus={this.props.store} editScreen={false} />
    }
  }

}

const mapStateToProps = (state) => {
  return {
    store: state.store
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStore)
