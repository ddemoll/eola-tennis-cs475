import React, { Component } from 'react'
import { TextInput, View } from 'react-native';
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

class EditFeatured extends Component {

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })

  }

  editFeatured = (data) => {
    const {index} = this.props.navigation.state.params
    //console.log('index', index)
    this.props.dispatch(FeaturedActions.featuredUpdate(index, data));
  }

  render () {

    const {params} = this.props.navigation.state;
    const {fetching, updated, error} = this.props.featured;
    if(updated !== null) {
      this.props.dispatch(FeaturedActions.featuredUpdateDone())
      this.props.navigation.goBack();
      return null
    } else {
      const ytID = params.item.youtubeID;
      const curData = {
        id: params.item.id,
        name: params.item.name,
        text: params.item.text,
        numStars: params.item.numStars,
        youtubeURL: ytID == null ? "" : `https://youtu.be/${ytID}`,
        selectedImage: params.item.picUrl != null ? {uri: params.item.picUrl} : null,
        picKey: params.item.picKey
      }
      return <Featured navigation={this.props.navigation} data={curData} done={this.editFeatured} reduxStatus={this.props.featured} editScreen={true} />
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

export default connect(mapStateToProps, mapDispatchToProps)(EditFeatured)
