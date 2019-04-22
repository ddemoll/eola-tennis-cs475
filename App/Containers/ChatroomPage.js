import React from 'react'
import { Dimensions, Button, TextInput } from 'react-native'
import { connect } from 'react-redux'
// import { SignWaiverActions } from '../Redux/SignWaiverRedux'
import { CommonBasePage } from './CommonContainers'
import { Text } from 'native-base';
import {
    CachedImage,
    ImageCacheProvider
} from 'react-native-cached-image';

// Styles
import styles from './Styles/StorePageStyle'
import Fonts from '../Themes/Fonts'
import getTheme from '../../native-base-theme/components';
import { Images } from "../Themes";

class ChatroomPage extends React.PureComponent {

  constructor (props) {
     super(props)
     this.width = Dimensions.get('window').width;  
	 this.state = { inputtext : "" }
  }

  // redux actions for sending and receiving a waiver. 
   sendChat = () => {
	   console.log("send chat message");
	   
	   // update the firebase database 
   }
  
  render () {
/*
    let content = <ActivityIndicator style={{alignItems: 'center', justifyContent: 'center', padding: 8, height: 80}} size="large" />

    
	if (error !== null) {
      content = <Text style={{padding: 10, textAlign: 'center', color: 'red'}}>Error!</Text>
    }
	*/
	
    return (
      <CommonBasePage
	  pagetitle={"Chatroom"}
	  navigation={this.props.navigation} > 
          <Text> 
			Chatroom message
		  </Text> 
		  <TextInput
			style={{height: 40, borderColor: 'gray', borderWidth: 1}}
			onChangeText={(inputtext) => this.setState({inputtext})}
			value={this.state.inputtext}
		  />
	</CommonBasePage>

    ); 
  }
}


export default ChatroomPage
