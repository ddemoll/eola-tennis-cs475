import React, { Component } from 'react'
import { TextInput } from 'react-native';
import { BackHandler } from 'react-native'
import { Title, Container, Header, Content, Text, Button, Icon, Left, Right, Body } from 'native-base';
import AnnouncementsActions from '../Redux/AnnouncementsRedux'

import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AddAnnounceStyle'
import Announcement from '../Components/Announcement'

class EditAnnounce extends Component {

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })

  }
  editAnnounce = (data) => {
    const {index} = this.props.navigation.state.params
    //console.log('index', index)
    this.props.dispatch(AnnouncementsActions.announcementsUpdate(index, data));
  }

  render () {

    const {params} = this.props.navigation.state;
    const {fetching, updated, error} = this.props.announcements;
    if(updated !== null) {
      this.props.dispatch(AnnouncementsActions.announcementsUpdateDone())
      this.props.navigation.goBack();
      return null
    } else {
      const ytID = params.item.youtubeID;
      const curData = {
        id: params.item.id,
        text: params.item.text,
        youtubeURL: ytID == null ? "" : `https://youtu.be/${ytID}`,
        selectedImage: params.item.picUrl != null ? {uri: params.item.picUrl} : null,
        picKey: params.item.picKey
      }
      return <Announcement navigation={this.props.navigation} data={curData} done={this.editAnnounce} reduxStatus={this.props.announcements} editScreen={true} />
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

export default connect(mapStateToProps, mapDispatchToProps)(EditAnnounce)
