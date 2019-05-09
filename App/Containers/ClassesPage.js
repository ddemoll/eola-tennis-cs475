import React from 'react'
import { Image, FlatList, Dimensions, StyleSheet, ActivityIndicator, Linking, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import ClassesActions from '../Redux/ClassesRedux'
import { CommonBasePage } from './CommonContainers'
import { Button, Icon, Text, Card, CardItem, StyleProvider, Left, Right, Body, } from 'native-base';
import {
    CachedImage,
    ImageCacheProvider
} from 'react-native-cached-image';

// Styles
import styles from './Styles/StorePageStyle'
import Fonts from '../Themes/Fonts'
import getTheme from '../../native-base-theme/components';
import { Images } from "../Themes";
import Moment from 'react-moment';

class ClassesPage extends React.PureComponent {

  constructor (props) {
     super(props)
     this.width = Dimensions.get('window').width;
  }

  componentDidMount() {

    this.props.dispatch(ClassesActions.classesRequest());

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
          this.props.navigation.navigate("EditClass", {index, item})
        }
        else if(buttonIndex == 1) {
          Alert.alert(
            'Are you sure you want to delete this item?',
            '',
            [

              {text: 'Cancel', style: 'cancel'},
              {text: 'Delete', onPress: () => this.props.dispatch(ClassesActions.classesDelete(index, item.id, item.picKey))},
            ],
            { cancelable: false }
          )
        }

      }
    )
  }

  render () {
	const {fetching, error, payload, cacheURLs} = this.props.classes;
	
    let content = <ActivityIndicator style={{alignItems: 'center', justifyContent: 'center', padding: 8, height: 80}} size="large" />

	if (error !== null) {
      content = <Text style={{padding: 10, textAlign: 'center', color: 'red'}}>Error!</Text>
    }
	
	/*  https://docs.nativebase.io/Components.html#card-headfoot-headref
 	<CardItem header>
	  <Text>{item.title}</Text>
	</CardItem>
	*/
	/*<CardItem footer>
	//	<Moment toNow>{item.date}</Moment>
	</CardItem>*/
	
	if (payload !== null) {
		if (payload.length > 0) {
			content = <FlatList
            data={payload}
            renderItem={({ item, index }) =>
            <StyleProvider  style={getTheme()}>
              <Card style={{flex: 0}}>
                <CardItem listItemPadding={0}>
				  <Body>
                    <Text style={Fonts.style.normal}>
                      {item.description + "\n" +
					  "Price: " + item.price + "\n" +
					  item.date}
                    </Text>
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
                  style={{height: this.width, flex: 1, alignSelf: 'stretch'}}/>
                </CardItem>
                }

                <CardItem>
                  <TouchableOpacity onPress={ ()=> Linking.openURL(item.paypalURL) }>
                    <Image source={Images.buy_now} style={styles.buyNow} />
                  </TouchableOpacity>
                  <Text style={styles.priceTxt}>${item.price}</Text>
                </CardItem>

              </Card>
              </StyleProvider>
            }
            keyExtractor={item => item.id.toString()}
          />
			
		} else {
			content = <Text>No classes</Text>
		}
	}
	
    return (
      <CommonBasePage
	  pagetitle={"Classes"}
	  navigation={this.props.navigation} 
	  rightcontent={this.props.username != null &&
		  <Button transparent onPress={() => this.props.navigation.navigate("AddClass")}>
              <Icon name='md-add' />
		  </Button>}
		>  
	  
		{content}
		  
	</CommonBasePage>

    )

  }
}

const mapStateToProps = (state) => {
  return {
    classes : state.classes,  //???
    username : state.login.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

//export default ClassesPage
export default connect(mapStateToProps, mapDispatchToProps)(ClassesPage)
