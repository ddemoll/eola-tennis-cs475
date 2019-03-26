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
import StarRating from 'react-native-star-rating';

import FeaturedActions from '../Redux/FeaturedRedux'
import Featured from '../Components/Featured'


import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AddAnnounceStyle'


class AddFeatured extends Component {

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
  }

  createFeatured = (data) => {

    this.props.dispatch(FeaturedActions.featuredCreate(data))
  }

  render () {

    const {fetching, created, error} = this.props.featured;

    let content = null;
    if(created !== null) {
      this.props.dispatch(FeaturedActions.featuredCreateDone())
      this.props.navigation.goBack();
      return null
    } else {
      let initData = {
        name: "",
        text: "",
        numStars: 0,
        youtubeURL: "",
        selectedImage: null,

      }
      return <Featured navigation={this.props.navigation} data={initData} done={this.createFeatured} reduxStatus={this.props.featured} editScreen={false} />
    }

  }
}

const mapStateToProps = (state) => {
  return {
    featured: state.featured
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFeatured)
