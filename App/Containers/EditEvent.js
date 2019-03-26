import React, { Component } from 'react'
import { TextInput,
  CameraRoll,
  TouchableWithoutFeedback,
   View,
   Image,
   Platform,
   StyleSheet,
   ActivityIndicator
 } from 'react-native';
import { BackHandler } from 'react-native'
import { Title, Container, Header, Content, Text, Button, Icon, Left, Right, Body, Form, Label, Input, Item, Textarea } from 'native-base';

import EventActions from '../Redux/EventsRedux'
import EventForm from '../Components/EventForm'
import {parseDateIntoComponents} from '../Transforms/Utility'


import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AddAnnounceStyle'


class EditEvent extends Component {

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
  }

  updateEvent = (data) => {
    const {index} = this.props.navigation.state.params
    this.props.dispatch(EventActions.eventsUpdate(index, data))
  }

  render () {

    const {params} = this.props.navigation.state;
    const {fetching, updated, error} = this.props.events;
    //const date = new Date(params.item.date)
    //const dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()+1}`
    let dateString = params.item.date;
    dateString = dateString.substring(0, dateString.indexOf('T'));

    let content = null;
    if(updated !== null) {
      this.props.dispatch(EventActions.eventsUpdateDone())
      this.props.navigation.goBack();
      return null
    } else {
      let curData = {
        id: params.item.id,
        date: dateString,
        title: params.item.title,
        subtitle: params.item.subtitle,
        link: params.item.link,

      }
      return <EventForm navigation={this.props.navigation} data={curData} done={this.updateEvent} reduxStatus={this.props.events} editScreen={true} />
    }

  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent)
