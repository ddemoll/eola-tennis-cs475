import React from 'react'
import { View, Alert, ActivityIndicator, Image, FlatList, Dimensions, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import AnnouncementsActions from '../Redux/AnnouncementsRedux'
import { CommonBasePage } from './CommonContainers'
import { Title, Container, Header, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body, ActionSheet,
List, StyleProvider } from 'native-base';
import {
    CachedImage,
    ImageCacheProvider
} from 'react-native-cached-image';

// Styles
import styles from './Styles/AnnouncementsPageStyle'
import Fonts from '../Themes/Fonts'
import Hyperlink from 'react-native-hyperlink'
import TimeAgo from 'react-native-timeago';
import getTheme from '../../native-base-theme/components';

//import YouTubeVid from '../Components/YouTubeVid'

class AnnouncementsPage extends React.PureComponent {

  constructor (props) {
     super(props)
     this.width = Dimensions.get('window').width;
  }

  componentDidMount() {

    this.props.dispatch(AnnouncementsActions.announcementsRequest());

  }

  optionsOnPress = (index, item) => {
    ActionSheet.show(
      {
        options: ["Edit", "Delete", "Cancel"],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 1,

      },
      buttonIndex => {
        if(buttonIndex == 0) {
          this.props.navigation.navigate("EditAnnounce", {index, item})
        }
        else if(buttonIndex == 1) {
          Alert.alert(
            'Are you sure you want to delete this post?',
            '',
            [

              {text: 'Cancel', style: 'cancel'},
              {text: 'Delete', onPress: () => this.props.dispatch(AnnouncementsActions.announcementsDelete(index, item.id, item.picKey))},
            ],
            { cancelable: false }
          )
        }

      }
    )
  }

  render () {
    const {fetching, error, payload, cacheURLs} = this.props.announcements;

    let content = <ActivityIndicator style={{alignItems: 'center', justifyContent: 'center', padding: 8, height: 80}} size="large" />

    if (error !== null) {
      content = <Text style={{padding: 10, textAlign: 'center', color: 'red'}}>Error!</Text>
    }
    if(payload !== null) {
      if(payload.length == 0) {
        content = <Text>No data</Text>
      } else {


        content = <FlatList
            data={payload}
            renderItem={({ item, index }) =>
            <StyleProvider  style={getTheme()}>
              <Card style={{flex: 0}}>
                <CardItem listItemPadding={0}>
                  <Body>
                    <TimeAgo styes={{color: '#e3e3e3'}} time={item.date} />

                  </Body>
                  <Right>
                  {this.props.username != null &&
                      <Icon name='ios-more' onPress={() => this.optionsOnPress(index, item)} />
                    }
                  </Right>
                </CardItem>
                <CardItem>

                  <Hyperlink linkStyle={ { color: '#2980b9' } } linkDefault={ true }>
                    <Text style={Fonts.style.normal}>
                      {item.text}
                    </Text>
                  </Hyperlink>


                </CardItem>
                {item.picUrl != null &&
                <CardItem cardBody>
                  <CachedImage source={{uri: item.picUrl}}
                  style={{height: this.width, flex: 1, alignSelf: 'stretch'}}/>
                </CardItem>
                }
                {item.youtubeID != null &&
                <View style={{marginTop: 5}}>

                </View>
                }

              </Card>
              </StyleProvider>
            }
            keyExtractor={item => item.id.toString()}
          />
      }

    }
    return (
	<CommonBasePage
	  pagetitle={"Announcements"}
	  navigation={this.props.navigation}
	  rightcontent={this.props.username != null &&
		  <Button transparent onPress={() => this.props.navigation.navigate("AddAnnounce")}>
              <Icon name='md-add' />
		  </Button>}
		> 
		  
		  <ImageCacheProvider urlsToPreload={cacheURLs}>
              {content}

          </ImageCacheProvider>
		  
	</CommonBasePage>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    announcements: state.announcements,
    username: state.login.username,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsPage)
