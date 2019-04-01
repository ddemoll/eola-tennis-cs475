import React, { Component } from 'react'
import { TextInput } from 'react-native';
import { BackHandler } from 'react-native'
import { Title, Container, Header, Content, Text, Button, Icon, Left, Right, Body } from 'native-base';
import ClassesActions from '../Redux/ClassesRedux'

import { connect } from 'react-redux' 



class EditClass extends Component {

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })

  }
  editClass = (data) => {
    const {index} = this.props.navigation.state.params
    //console.log('index', index)
    this.props.dispatch(ClassesActions.classesUpdate(index, data));
  }

  render () {
	return (<Text>This is the edit the current class page that still needs to be created</Text>); 
  }

}

const mapStateToProps = (state) => {
  return {
    onClass: state.store // because class is a reserved word
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

//export default EditClass 
export default connect(mapStateToProps, mapDispatchToProps)(EditClass)
