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
import StarRating from 'react-native-star-rating';
import { extractYouTubeID } from '../Transforms/Utility'

import ImageSelector from './ImageSelector'
//import styles from '../Containers/Styles/AddAnnounceStyle'

class Featured extends Component {
  constructor (props) {
     super(props)

     this.state = {
       ...props.data,
       newSelectedImage: null
     }
  }


  isPostDisabled = () => {
    const {name, text, numStars, selectedImage} = this.state
    return (name.length == 0 || text.length == 0 || selectedImage == null)
  }

  sendData = () => {
    let data = {...this.state}
    data.youtubeID = this.state.youtubeURL != null ? extractYouTubeID(this.state.youtubeURL) : null

    delete data.newSelectedImage
    delete data.selectedImage
    delete data.youtubeURL

    let image = this.state.selectedImage;
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
            <Icon name="ios-close" />
          </Button>
        </Left>
        <Body style={{ flex: 3 }}>
          <Title>{this.props.editScreen ? 'Edit Player' : 'Create Player'}</Title>
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
                  <Label>Name</Label>
                  <Input
                    value={this.state.name}
                    keyboardType="default"
                    onChangeText={(name) => this.setState({ name })}
                  />
                </Item>


                  <Textarea rowSpan={5} bordered
                    maxLength = {200}
                    keyboardType="default"
                    placeholder="Enter description"
                    value={this.state.text}
                    onChangeText={(text) => this.setState({ text })}
                  />



                  <View style={{padding: 10,}}>
                    <Text style={{paddingBottom: 10}}>Tennis Recuiting Stars</Text>
                    <StarRating

                      disabled={false}
                      maxStars={5}
                      rating={this.state.numStars}
                      fullStarColor="yellow"
                      selectedStar={(rating) => this.setState({numStars: rating})}
                    />
                  </View>

                  <Item>
                    <Label>YouTube Link</Label>
                    <Input
                      value={this.state.youtubeURL}
                      keyboardType="default"
                      onChangeText={(youtubeURL) => this.setState({ youtubeURL })}
                      maxLength={45}
                    />
                  </Item>

              </Form>
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



export default Featured
