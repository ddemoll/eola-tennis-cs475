import React, { Component } from 'react'
import { TextInput } from 'react-native';
import { BackHandler } from 'react-native'
import { Title, Container, Header, Content, Text, Button, Icon, Left, Right, Body } from 'native-base';
import StoreActions from '../Redux/StoreRedux'

import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/AddAnnounceStyle'
import Store from '../Components/Store'

class EditStore extends Component {

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })

  }
  editStore = (data) => {
    const {index} = this.props.navigation.state.params
    //console.log('index', index)
    this.props.dispatch(StoreActions.storeUpdate(index, data));
  }

  render () {

    const {params} = this.props.navigation.state;
    const {fetching, updated, error} = this.props.store;
    if(updated !== null) {
      this.props.dispatch(StoreActions.storeUpdateDone())
      this.props.navigation.goBack();
      return null
    } else {

      const curData = {
        id: params.item.id,
        text: params.item.text,
        price: params.item.price,
        selectedImage: params.item.picUrl != null ? {uri: params.item.picUrl} : null,
        picKey: params.item.picKey
      }
      return <Store navigation={this.props.navigation} data={curData} done={this.editStore} reduxStatus={this.props.store} editScreen={true} />
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

export default connect(mapStateToProps, mapDispatchToProps)(EditStore)
