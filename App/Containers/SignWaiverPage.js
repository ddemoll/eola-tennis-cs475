import React from 'react'
import { View, Alert, ActivityIndicator, Image, FlatList, Dimensions, StyleSheet, Linking, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import StoreActions from '../Redux/StoreRedux'
import { Title, Container, Header, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body, ActionSheet,
List, StyleProvider } from 'native-base';
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


  render () {

    let content = <ActivityIndicator style={{alignItems: 'center', justifyContent: 'center', padding: 8, height: 80}} size="large" />

    /*
	if (error !== null) {
      content = <Text style={{padding: 10, textAlign: 'center', color: 'red'}}>Error!</Text>
    }
	*/
	
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>Sign Waiver</Title>
          </Body> 
        </Header>
          <Text>Here goes Sign Waiver stuff!</Text>

      </Container>

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
