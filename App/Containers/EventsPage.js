import React from 'react'
import { View, ActivityIndicator, Linking, FlatList, Alert } from 'react-native'
import { connect } from 'react-redux'
import EventsActions from '../Redux/EventsRedux'
import { Title, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body, ActionSheet,
List, ListItem } from 'native-base';

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/EventsPageStyle'
import Fonts from '../Themes/Fonts'

class EventsPage extends React.PureComponent {



  componentDidMount() {
    //if(this.props.announcements.payload == null)
    this.props.dispatch(EventsActions.eventsRequest());

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
          this.props.navigation.navigate("EditEvent", {index, item})
        }
        else if(buttonIndex == 1) {
          Alert.alert(
            'Are you sure you want to delete this event?',
            '',
            [

              {text: 'Cancel', style: 'cancel'},
              {text: 'Delete', onPress: () => this.props.dispatch(EventsActions.eventsDelete(index, item.id))},
            ],
            { cancelable: false }
          )
        }

      }
    )
  }

  render () {
    const {fetching, error, payload} = this.props.events;
    let content = <ActivityIndicator style={{alignItems: 'center', justifyContent: 'center', padding: 8, height: 80}} size="large" />;
    if (error !== null) {
      content = <Text style={{padding: 10, textAlign: 'center', color: 'red'}}>Error!</Text>
    }
    if(payload !== null) {

      content = <FlatList
                  data={payload}
                  renderItem={({ item, index }) =>
                  <List>
                    <ListItem>
                    <View style={styles.matchDateContainer}>
                      <Text style={styles.matchDateText}>{item.dateInMonth}</Text>
                      <Text style={styles.matchMonthText}>{item.month}</Text>
                    </View>

                      <Body>
                        <Text style={Fonts.style.normal}>{item.title}</Text>
                        <Text note>{item.subtitle}</Text>
                      </Body>
                      <Right>
                        {this.props.username != null &&
                          <Icon name='ios-more' onPress={() => this.optionsOnPress(index, item)} />
                        }
                        <Text style={{color: '#2F63FE'}} onPress={ ()=> Linking.openURL(item.link) }>View</Text>
                      </Right>
                    </ListItem>
                  </List>

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
            <Title>Events</Title>
          </Body>
          <Right>

          {this.props.username != null &&
            <Button transparent onPress={() => this.props.navigation.navigate("AddEvent")}>
              <Icon name='md-add' />

            </Button>
          }
          </Right>

        </Header>
          {content}

      </Container>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events,
    username: state.login.username,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage)
