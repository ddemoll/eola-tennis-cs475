import React from 'react'
import { Alert, ActivityIndicator, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
import ContactsActions from '../Redux/ContactsRedux'
import { Title, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body, ActionSheet,
List, ListItem } from 'native-base';
import {
    CachedImage,
    ImageCacheProvider
} from 'react-native-cached-image';

import Fonts from '../Themes/Fonts'

class ContactsPage extends React.PureComponent {



  componentDidMount() {
    //if(this.props.announcements.payload == null)
    this.props.dispatch(ContactsActions.contactsRequest());

  }

  handleClick = () => {

  }

  render () {
    const {fetching, error, payload, cacheURLs} = this.props.contacts;

    let content = <ActivityIndicator style={{alignItems: 'center', justifyContent: 'center', padding: 8, height: 80}} size="large" />;

    if (error !== null) {
      content = <Text style={{padding: 10, textAlign: 'center', color: 'red'}}>Error!</Text>
    }
    if(payload !== null) {

      const {navigate} = this.props.navigation;
      content = <FlatList
                  style={{backgroundColor: 'white'}}
                  data={payload}
                  renderItem={({ item, index }) =>
                    <ListItem style={{paddingVertical: 10}} avatar onPress={() => this.props.navigation.navigate("ContactDetail", {...item})}>
                      <Left>
                        <Thumbnail source={{ uri: item.picUrl }} />
                      </Left>
                      <Body>
                        <Text style={Fonts.style.normal}>{item.title}</Text>
                        <Text note>{item.subtitle}</Text>
                      </Body>
                      <Right>
                        <Icon name="arrow-forward" />
                      </Right>
                    </ListItem>

                  }
                  keyExtractor={item => item.id.toString()}
                />
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
            <Title>Contact Info</Title>
          </Body>
          <Right/>

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
    contacts: state.contacts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPage)
