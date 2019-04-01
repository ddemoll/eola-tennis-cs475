import React, { Component } from "react";
import { ScrollView, Image, BackHandler, AsyncStorage } from "react-native";
import { List, ListItem, Text, View, Content } from "native-base";
import { connect } from "react-redux";
import { DrawerActions } from 'react-navigation';
import LoginActions from "../Redux/LoginRedux";
import styles from "./Styles/DrawerContentStyles";
import { Images } from "../Themes";

class DrawerContent extends Component {

	constructor (props) {
     super(props)

		 this.isLoggedIn = false;
		 AsyncStorage.getItem("isLoggedIn").then((value) => {
				this.isLoggedIn = (value == 'true')
				if(value == 'true') this.props.login();
			}).done();
  }


	handleLogin = () => {
		if(this.props.username != null) {
			this.props.logout();
			this.isLoggedIn = false;
			this.props.navigation.dispatch(DrawerActions.closeDrawer());
		} else {
			this.props.navigation.navigate('Login')
		}
	}

	render() {

		const navigation = this.props.navigation;
		const items = this.props.items;
		return (
			<View style={styles.container}>
				<Image source={Images.logo} style={styles.logo} />
				<Content>
					<List>
						<ListItem onPress={() => {
							this.props.navigation.navigate('Announcements')
							this.props.navigation.dispatch(DrawerActions.closeDrawer());
						}}>
							<Text>Announcements</Text>
						</ListItem>
						<ListItem onPress={() => {
							this.props.navigation.navigate('Featured')
							this.props.navigation.dispatch(DrawerActions.closeDrawer());
						}}>
							<Text>Featured Players</Text>
						</ListItem>
						<ListItem onPress={() => {
							this.props.navigation.navigate('Events')
							this.props.navigation.dispatch(DrawerActions.closeDrawer());
						}}>
							<Text>Events</Text>
						</ListItem>
						<ListItem onPress={() => {
							this.props.navigation.navigate('Rankings')
							this.props.navigation.dispatch(DrawerActions.closeDrawer());
						}}>
							<Text>UTR Rankings</Text>
						</ListItem>
						<ListItem onPress={() => {
							this.props.navigation.navigate('Contacts')
							this.props.navigation.dispatch(DrawerActions.closeDrawer());
						}}>
							<Text>Contact Info</Text>
						</ListItem>
						<ListItem onPress={() => {
							this.props.navigation.navigate('Store')
							this.props.navigation.dispatch(DrawerActions.closeDrawer());
						}}>
							<Text>Store</Text>
						</ListItem>
						<ListItem onPress={() => {
							this.props.navigation.navigate('Waiver')
							this.props.navigation.dispatch(DrawerActions.closeDrawer());
						}}>
							<Text>Sign Waiver</Text>
						</ListItem>

						<ListItem onPress={this.handleLogin}>
							<Text>{this.props.username != null ? 'Logout' : 'Admin Login'}</Text>
						</ListItem>
					</List>
				</Content>
			</View>
		);
	}
}
const mapStateToProps = state => {
	return {
		username: state.login.username,

	};
};

const mapDispatchToProps = dispatch => {
	return {
		login: () => dispatch(LoginActions.loginRequest('USOpen18')),
		logout: () => dispatch(LoginActions.logout()),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
