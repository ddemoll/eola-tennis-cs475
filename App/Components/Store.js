import React, { Component } from 'react'
import { TextInput,
  CameraRoll,
  TouchableWithoutFeedback,
   View,
   Image,
   Platform,
   StyleSheet,
   ActivityIndicator
 } from 'react-native';

import { Title, Container, Header, Content, Text, Button, Icon, Left, Right, Body, Form, Label, Input, Item, Textarea } from 'native-base';

import ImageSelector from './ImageSelector'
//import styles from '../Containers/Styles/AddAnnounceStyle'

class Store extends Component {
  constructor (props) {
     super(props)

     this.state = {
       ...props.data,
       newSelectedImage: null,
       isPriceValid: true
     }
  }

  validatePrice = (price) => {
     let re = /^\d+(?:\.\d{0,2})$/;
     this.setState({
       ...this.state,
       isPriceValid: re.test(price),
       price
     });
  }

  onSumbit = () => {
    if(this.state.isPriceValid) {
      this.sendData();
    } else {
      this.setState({errorMsg: 'Invalid price. Try again.'});
    }
  }

  sendData = () => {
    let data = {...this.state}

    delete data.newSelectedImage
    delete data.selectedImage
    delete data.errorMsg
    delete data.isPriceValid

    let image = this.state.selectedImage;
    //check if new image needs to be uploaded
    if(this.props.editScreen) {
      if(this.state.newSelectedImage != null) {
        image = this.state.newSelectedImage
      } else {
        image = null
        data.picUrl = this.state.selectedImage && this.state.selectedImage.uri || null
      }
    }
    this.props.done({...data, image})
  }

  updateImage = (imageObj) => {
    this.setState(imageObj);
  }


  render () {
    const { selectedImage, newSelectedImage } = this.state;
    const {fetching, error} = this.props.reduxStatus;

  return (
    <Container>
      <Header>
          <Left style={{ flex: 2 }}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back"  />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>{this.props.editScreen ? 'Edit Product' : 'Create Product'}</Title>
          </Body>
          <Right style={{ flex: 2 }}>
            <Button transparent
             disabled={this.state.text.length == 0}
             onPress={this.onSumbit}>
              <Text>{this.props.editScreen ? 'Save' : 'Post'}</Text>
            </Button>
          </Right>
        </Header>
      <Content>
       <View>
        {error !== null && <Text>Error!</Text>}
        {fetching && <ActivityIndicator style={{alignItems: 'center', justifyContent: 'center', padding: 8, height: 80}} size="large" />}



        <TextInput
          style={{height: 100, borderStyle: 'solid', borderRadius: 10, borderWidth: 2, borderColor: "#CCCCCC", padding: 5, margin: 5}}
          focus={true}
            multiline = {true}
            numberOfLines = {6}
            value={this.state.text}
            onChangeText={(text) => this.setState({text})}
            editable = {true}
            maxLength = {200}
          />

          <Item error={!this.state.isPriceValid}>
            <Label>Price</Label>
            <Input
              style={{color: this.props.editScreen ? 'gray' : 'black'}}
              value={this.state.price}
              disabled={this.props.editScreen}
              keyboardType="numeric"
              onChangeText={(price) => this.validatePrice(price)}
              maxLength={255}
            />
          </Item>

        {Platform.OS == 'ios' && <ImageSelector selectedImage={selectedImage}
                                            newSelectedImage={newSelectedImage}
                                            editScreen={this.props.editScreen}
                                            done={this.updateImage} />}
          </View>
      </Content>
    </Container>
  )
  }
}

export default Store
