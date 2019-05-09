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

import ClassesActions from '../Redux/ClassesRedux'
import ClassForm from '../Components/ClassForm' // TODO: Class component 

import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AddAnnounceStyle'

class AddClass extends Component {

  componentDidMount () {

    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
  }

  createClass = (data) => {

    this.props.dispatch(ClassesActions.classesCreate(data))
  }


  render () {

    const {fetching, created, error} = this.props.classes;

    let content = null;
    if(created !== null) {
      this.props.dispatch(ClassesActions.classesCreateDone())
      this.props.navigation.goBack();
      return null
    } else {
      let initData = {
        title: "",
        description: "",
        price: "",
        date: null,
        picURI: "",
        paypalURL: ""

      }
      return <ClassForm navigation={this.props.navigation} 
        data={initData} 
        done={this.createClass} 
        reduxStatus={this.props.classes} 
        editScreen={false} />
    }
  }

}

const mapStateToProps = (state) => {
  return {
    classes: state.classes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClass)
