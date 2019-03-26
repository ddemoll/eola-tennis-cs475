import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
   View,
   StyleSheet,
   ActivityIndicator
 } from 'react-native';

import { Title, Container, Header, Content, Text, Button, Icon, Left, Right, Body, Form, Label, Input, Item, Textarea } from 'native-base';
import DatePicker from 'react-native-datepicker'

class EventForm extends Component {
  constructor (props) {
     super(props)

     this.state = {
       ...props.data,
     }
  }


  isPostDisabled = () => {
    const { date, title, subtitle, link } = this.state;
    return (date == null || title.length == 0 || subtitle.length == 0 || link.length == 0 )
  }

  sendData = () => {
    this.props.done(this.state)
  }

  render () {

    const { date, title, subtitle, link } = this.state;
    const {fetching, error} = this.props.reduxStatus;

  return (
    <Container>
      <Header>
        <Left style={{ flex: 2 }}>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name="ios-close" />
          </Button>
        </Left>
        <Body style={{ flex: 3 }}>
          <Title>{this.props.editScreen ? 'Edit Event' : 'Create Event'}</Title>
        </Body>
        <Right style={{ flex: 2 }}>
          <Button transparent
           disabled={this.isPostDisabled()}
           onPress={this.sendData} >
            <Text>{this.props.editScreen ? 'Save' : 'Post'}</Text>
          </Button>
        </Right>
      </Header>
      <Content>
       <View>
        {error !== null && <Text>Error!</Text>}
        {fetching && <ActivityIndicator style={{alignItems: 'center', justifyContent: 'center', padding: 8, height: 80}} size="large" />}
              <Form>
                <Item >
                  <Label>Title</Label>
                  <Input
                    value={title}
                    keyboardType="default"
                    onChangeText={(title) => this.setState({ title })}
                    maxLength={45}
                  />
                </Item>
                <Item >
                  <Label>Subtitle</Label>
                  <Input
                    value={subtitle}
                    keyboardType="default"
                    onChangeText={(subtitle) => this.setState({ subtitle })}
                    maxLength={100}
                  />
                </Item>
                <Item >
                  <Label>Website Link</Label>
                  <Input
                    value={link}
                    keyboardType="default"
                    onChangeText={(link) => this.setState({ link })}
                    maxLength={100}
                  />
                </Item>
                <Item >
                <DatePicker
                  style={{width: 200}}
                  date={date}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"

                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {this.setState({date: date})}}
                />
                </Item>

              </Form>

          </View>
      </Content>
    </Container>
  )
  }
}



export default EventForm
