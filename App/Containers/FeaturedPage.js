import React from 'react'
import { Alert, ActivityIndicator, Image, FlatList, Dimensions, Text, View, Platform} from 'react-native'
import { connect } from 'react-redux'
import FeaturedActions from '../Redux/FeaturedRedux'
import { CommonBasePage } from './CommonContainers'
import { Title, Container, Header, Card, CardItem, Thumbnail, Button, Icon, Left, Right, Body, ActionSheet, List, StyleProvider } from 'native-base';
import StarRating from 'react-native-star-rating';
import {
    CachedImage,
    ImageCacheProvider
} from 'react-native-cached-image';

// Styles
import styles from './Styles/FeaturedPageStyle'
import Fonts from '../Themes/Fonts'
import getTheme from '../../native-base-theme/components';

//import YouTubeVid from '../Components/YouTubeVid'

class FeaturedPage extends React.PureComponent {

  constructor (props) {
     super(props)
     this.width = Dimensions.get('window').width;
  }

  componentDidMount() {
    this.props.dispatch(FeaturedActions.featuredRequest());

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
          this.props.navigation.navigate("EditFeatured", {index, item})
        }
        else if(buttonIndex == 1) {
          Alert.alert(
            'Are you sure you want to delete this post?',
            '',
            [

              {text: 'Cancel', style: 'cancel'},
              {text: 'Delete', onPress: () => this.props.dispatch(FeaturedActions.featuredDelete(index, item.id))},
            ],
            { cancelable: false }
          )
        }

      }
    )
  }

  render () {
    const {fetching, error, payload, cacheURLs} = this.props.featured;

    let content = <ActivityIndicator style={{alignItems: 'center', justifyContent: 'center', padding: 8, height: 80}} size="large" />;

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
                      <Body style={{flexDirection: 'row'}}>
                          <Text style={[Fonts.style.normal, {paddingRight: 16}]}>{item.name}</Text>
                          <StarRating
                            disabled={true}
                            maxStars={5}
                            starSize={20}
                            rating={item.numStars}
                            fullStarColor="yellow"
                          />
                      </Body>
                      <Right>
                      {this.props.username != null &&
                        <Icon name='ios-more' onPress={() => this.optionsOnPress(index, item)} />
                      }
                      </Right>
                    </CardItem>
                    {item.picUrl != null &&
                    <CardItem cardBody>
                      <CachedImage source={{uri: item.picUrl}}
                      style={{height: this.width, width: this.width, flex: 1}}/>
                    </CardItem>
                  }
                  {item.youtubeID != null &&
                  <View style={{marginTop: 5}}>
                  </View>
                  }
                    <CardItem>
                        <Text style={Fonts.style.normal}>
                          {item.text}
                        </Text>
                    </CardItem>

                  </Card>
                  </StyleProvider>
                  }
                  keyExtractor={item => item.id.toString()}
                />
          }

    }

    return ( 
	  <CommonBasePage
	  pagetitle={"Featured Players"}
	  navigation={this.props.navigation}
	  rightcontent={this.props.username != null &&
		  <Button transparent onPress={() => this.props.navigation.navigate("AddFeatured")}>
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
    featured: state.featured,
    username: state.login.username,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedPage)
