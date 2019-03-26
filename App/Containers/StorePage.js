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

class StorePage extends React.PureComponent {

  constructor (props) {
     super(props)
     this.width = Dimensions.get('window').width;
  }

  componentDidMount() {

    this.props.dispatch(StoreActions.storeRequest());

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
          this.props.navigation.navigate("EditStore", {index, item})
        }
        else if(buttonIndex == 1) {
          Alert.alert(
            'Are you sure you want to delete this item?',
            '',
            [

              {text: 'Cancel', style: 'cancel'},
              {text: 'Delete', onPress: () => this.props.dispatch(StoreActions.storeDelete(index, item.id, item.picKey))},
            ],
            { cancelable: false }
          )
        }

      }
    )
  }

  render () {
    const {fetching, error, payload, cacheURLs} = this.props.store;

    let content = <ActivityIndicator style={{alignItems: 'center', justifyContent: 'center', padding: 8, height: 80}} size="large" />

    if (error !== null) {
      content = <Text style={{padding: 10, textAlign: 'center', color: 'red'}}>Error!</Text>
    }
    if(payload !== null) {
      if(payload.length == 0) {
        content = <Text style={{padding: 30, fontSize: 32, textAlign: 'center', color: 'gray'}}>Store Empty</Text>
      } else {


        content = <FlatList
            data={payload}
            renderItem={({ item, index }) =>
            <StyleProvider  style={getTheme()}>
              <Card style={{flex: 0}}>
                <CardItem listItemPadding={0}>
                  <Body>
                    <Text style={Fonts.style.normal}>
                      {item.text}
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
      }

    }
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>Store</Title>
          </Body>
          <Right>
          {this.props.username != null &&
            <Button transparent onPress={() => this.props.navigation.navigate("AddStore")}>
              <Icon name='md-add' />

            </Button>
          }
          </Right>
        </Header>
          <ImageCacheProvider urlsToPreload={cacheURLs}>
              {content}

          </ImageCacheProvider>

      </Container>

    )

  }
}

const mapStateToProps = (state) => {
  return {
    store: state.store,
    username: state.login.username,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StorePage)
