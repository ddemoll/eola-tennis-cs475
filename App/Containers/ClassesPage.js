import React from 'react'
import { Dimensions } from 'react-native'
import { connect } from 'react-redux'
import StoreActions from '../Redux/StoreRedux'
import { CommonBasePage } from './CommonContainers'
import { Button, Icon, Text } from 'native-base';
import {
    CachedImage,
    ImageCacheProvider
} from 'react-native-cached-image';

// Styles
import styles from './Styles/StorePageStyle'
import Fonts from '../Themes/Fonts'
import getTheme from '../../native-base-theme/components';
import { Images } from "../Themes";

class ClassesPage extends React.PureComponent {

  constructor (props) {
     super(props)
     this.width = Dimensions.get('window').width;
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
	  pagetitle={"Classes"}
	  navigation={this.props.navigation} 
	  rightcontent={/*this.props.username != null && */  	// TODO: See why this is not working for me  
		  <Button transparent onPress={() => this.props.navigation.navigate("AddClass")}>
              <Icon name='md-add' />
		  </Button>}
		>  
	  
          <Text>Stuff for classes will go here.</Text>
		  
	</CommonBasePage>

    )

  }
}

const mapStateToProps = (state) => {
  return {
	  todostate : state 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

//export default ClassesPage
export default connect(mapStateToProps, mapDispatchToProps)(ClassesPage)
