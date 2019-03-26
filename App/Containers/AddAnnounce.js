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

import AnnouncementsActions from '../Redux/AnnouncementsRedux'
import Announcement from '../Components/Announcement'

import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AddAnnounceStyle'

class AddAnnounce extends Component {

  componentDidMount () {

    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
  }

  createAnnounce = (data) => {
    
    this.props.dispatch(AnnouncementsActions.announcementsCreate(data))
  }


  render () {

    const {fetching, created, error} = this.props.announcements;

    let content = null;
    if(created !== null) {
      this.props.dispatch(AnnouncementsActions.announcementsCreateDone())
      this.props.navigation.goBack();
      return null
    } else {
      let initData = {
        text: "",
        youtubeURL: null,
        selectedImage: null,

      }
      return <Announcement navigation={this.props.navigation} data={initData} done={this.createAnnounce} reduxStatus={this.props.announcements} editScreen={false} />
    }
  }

}

const mapStateToProps = (state) => {
  return {
    announcements: state.announcements
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAnnounce)
