import React from 'react'
import { Dimensions, Button, TextInput } from 'react-native'
import { connect } from 'react-redux'
import SignWaiverActions from '../Redux/SignWaiverRedux'
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

// TODO: make this something with SES in AWS? 
//import { PushNotification } from 'aws-amplify-react-native';


class SignWaiverPage extends React.PureComponent {

  constructor (props) {
     super(props)
     this.width = Dimensions.get('window').width; 
     // signnanme is the state of the text box. signNameRequest is what was actually sent out/requested 
   this.state = { signname : "", signNameRequest : "" }
  }

  submitSignRequest = () => {
    this.props.requestSign(this.state.signname);
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
          <Text> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut feugiat ipsum. Nam placerat et enim sit amet lobortis. Aliquam sollicitudin lobortis nunc. Quisque auctor semper erat, in mollis nisi maximus sit amet. Maecenas gravida erat nec gravida euismod. Morbi in consectetur mauris, id bibendum diam. Pellentesque sollicitudin tortor ac tellus laoreet hendrerit.
		  </Text> 
		  <TextInput
			style={{height: 40, borderColor: 'gray', borderWidth: 1}}
			onChangeText={(signname) => this.setState({signname})}
			value={this.state.signname}
		  />
		  <Button onPress={this.submitSignRequest} 
				title="Submit" />
	</CommonBasePage>

    ); 
  }
}


const mapStateToProps = (state) => {
  return {
  sendStatus : state.sendStatus,
  signName : state.signNameRequest
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    requestSign: (name) => dispatch(SignWaiverActions.signWaiverRequest(name)),
  };
}


//export default SignWaiverPage
export default connect(mapStateToProps, mapDispatchToProps)(SignWaiverPage)
