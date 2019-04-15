import React from 'react'
import { Dimensions, Button } from 'react-native'
import { connect } from 'react-redux'
import { SignWaiverActions } from '../Redux/SignWaiverRedux'
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

class SignWaiverPage extends React.PureComponent {

  constructor (props) {
     super(props)
     this.width = Dimensions.get('window').width; 
  }

  // redux actions for sending and receiving a waiver. 
   requestSign = () => {
	   console.log("request sign");
	   this.props.dispatch(SignWaiverActions.requestSign("test name"));
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
	  pagetitle={"Sign Waiver"}
	  navigation={this.props.navigation} >  
	  
          <Text>Here goes Sign Waiver stuff!</Text>
		  <Button onPress={this.requestSign} 
				title="this is the title" />
	</CommonBasePage>

    ); 
  }
}


const mapStateToProps = (state) => {
  return {
	sendStatus : state.sendStatus 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}


//export default SignWaiverPage
export default connect(mapStateToProps, mapDispatchToProps)(SignWaiverPage)
