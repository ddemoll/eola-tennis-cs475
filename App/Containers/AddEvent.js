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


import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AddAnnounceStyle'


class AddEvent extends Component {

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
  }

  createEvent = (data) => {

    this.props.dispatch(EventActions.eventsCreate(data))
  }

  render () {

    const {fetching, created, error} = this.props.events;

    let content = null;
    if(created !== null) {
      this.props.dispatch(EventActions.eventsCreateDone())
      this.props.navigation.goBack();
      return null
    } else {
      let initData = {
        date: null,
        title: "",
        subtitle: "",
        link: "",

      }
      return <EventForm navigation={this.props.navigation} data={initData} done={this.createEvent} reduxStatus={this.props.events} editScreen={false} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent)
