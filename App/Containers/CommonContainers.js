import React from 'react'
import { Title, Container, Header, Button, Icon, Left, Right, Body } from 'native-base';

class CommonBasePage extends React.Component {
	
  render () {
	/* rightnavigation is JSX for whatever will be in the <Right> tag if it exists */
    const {children, pagetitle, rightcontent} = this.props;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>{pagetitle}</Title>
          </Body>
		  {rightcontent != null && // right content is optional 
			  <Right>
				{rightcontent}
			  </Right>
		  }
        </Header>
          
		  {children}
      </Container>

    )

  }
}

export { CommonBasePage }