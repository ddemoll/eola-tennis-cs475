import React from 'react'
import { Dimensions } from 'react-native'
import { connect } from 'react-redux'
import StoreActions from '../Redux/StoreRedux'
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

  render () {
/*
    let content = <ActivityIndicator style={{alignItems: 'center', justifyContent: 'center', padding: 8, height: 80}} size="large" />

    
	if (error !== null) {
      content = <Text style={{padding: 10, textAlign: 'center', color: 'red'}}>Error!</Text>
    }
	*/
	
    return (
      <CommonBasePage
	  pagetitle={"Contact Info"}
	  navigation={this.props.navigation} >  
	  
          <Text>Here goes Sign Waiver stuff!</Text>
		  
	</CommonBasePage>

    )

  }
}

/*
const mapStateToProps = (state) => {
  return {
	  
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}
*/

export default SignWaiverPage
//export default connect(mapStateToProps, mapDispatchToProps)(SignWaiverPage)
