import React from 'react'
import { View } from 'react-native'

import { Title, Container, Header, Content, Text, Button, Icon, Left, Right, Body, Thumbnail } from 'native-base';
//import Hyperlink from 'react-native-hyperlink'
import styles from './Styles/ContactDetailStyle'
import Fonts from '../Themes/Fonts'

class ContactDetail extends React.PureComponent {



  componentDidMount() {


  }

  render () {

      const {title, subtitle, desc, picUrl} = this.props.navigation.state.params;

      return (
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body style={{ flex: 3 }}>
              <Title>{title}</Title>
            </Body>
            <Right/>

          </Header>
          <Content>
          <View style={styles.matchContainer}>
            <View style={styles.matchDateContainer}>
              <Thumbnail source={{ uri: picUrl }} />
            </View>

            <View style={styles.scoreContainer}>
              <Text style={{fontSize: Fonts.size.h3}}>{subtitle}</Text>
            </View>
          </View>

          <View style={styles.detailContainer}>

              <Text selectable={true} style={Fonts.style.normal}>
                {desc}
              </Text>


          </View>

        </Content>
        </Container>

      )


    return null;
  }
}

export default ContactDetail
