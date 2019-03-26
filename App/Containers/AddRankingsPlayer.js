import React, { Component } from 'react';
import { View, ActivityIndicator, Linking, FlatList, Alert, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import RankingsActions from '../Redux/RankingsRedux'

import { Container, Header, Left, Body, Right, Title, Item, Input, Icon, Button, Text, Radio, Content, ListItem } from 'native-base';
import { SearchBar, Overlay, Text as TextE } from 'react-native-elements'
import Fonts from '../Themes/Fonts'


class AddRankingsPlayer extends Component {

  constructor (props) {
     super(props)

     this.state = {
       selectedID: -1
     }
  }

  search = (text) => {
    this.props.dispatch(RankingsActions.searchPlayer(text))
  }
  select = () => {
    this.props.dispatch(RankingsActions.rankingsCreate(this.state.selectedID))
  }
  render() {

    const {fetching, searchError, searchResults, computingNewRankings, created, error} = this.props.rankings;
    let content = null;

    if(created !== null) {
      this.props.dispatch(RankingsActions.rankingsCreateDone())
      this.props.navigation.goBack();
      return null
    }

    else if(searchResults !== null && searchResults.length > 0) {

      content = <FlatList
                  style={{backgroundColor: 'white'}}
                  keyboardShouldPersistTaps="always"
                  data={searchResults}
                  renderItem={({item}) => {
                    let location = "";

                    if(item.city != "" && item.state != "")
                      location = `${item.city}, ${item.state} `
                    location += item.country

                    return <ListItem style={{paddingVertical: 10}} onPress={() => this.setState({ selectedID: item.id })} >
                      <Body>
                        <Text style={Fonts.style.normal}>{item.name}</Text>
                        {location != "" && <Text note>{location}</Text>}
                      </Body>

                      <Right>
                        <Radio selected={this.state.selectedID == item.id} />
                      </Right>
                    </ListItem>
                  }
                  }
                  keyExtractor={item => item.$id}
                />
              }
    return (
      computingNewRankings ?
        (<View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator style={{alignItems: 'center', justifyContent: 'center', padding: 8, height: 80}} size="large" />
        <Text>Computing New Rankings...</Text>
        </View>)
      : (
      <Container>
        <Header>
            <Left style={{ flex: 2 }}>
              <Button transparent onPress={() => {
                this.props.dispatch(RankingsActions.rankingsCreateDone())
                this.props.navigation.goBack()
              }}>
                <Icon name="arrow-back"  />
              </Button>
            </Left>
            <Body style={{ flex: 3 }}>
              <Title>Add Player</Title>
            </Body>
            <Right style={{ flex: 2 }}>
              <Button transparent

               onPress={this.select}>
                <Text>Add</Text>
              </Button>
            </Right>
          </Header>

          <SearchBar
            autoCorrect={false}
            autoFocus={true}
            showLoading={fetching}
            onChangeText={this.search}
            placeholder='Search player...' />


          <Content>
          {(searchError !== null || error !== null) &&
            <Text style={{padding: 10, textAlign: 'center', color: 'red'}}>Error! Try again.</Text>
          }
          {content}
        </Content>
      </Container>)
    );
  }
}


const mapStateToProps = (state) => {
  return {
    rankings: state.rankings,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRankingsPlayer)
