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
		const navigationitems = [
			{ navtext : "Announcements", navlocation : "Announcements" },
			{ navtext : "Featured Players", navlocation : "Featured" },
			{ navtext : "Events", navlocation : "Events" },
			{ navtext : "UTR Rankings", navlocation : "Rankings" },
			{ navtext : "Contact Info", navlocation : "Contacts" },
			{ navtext : "Store", navlocation : "Store" },
			{ navtext : "Sign Waiver", navlocation : "Waiver" } 
		];
		return (
			<View style={styles.container}>
				<Image source={Images.logo} style={styles.logo} />
				<Content>
					<List>
						{navigationitems.map((navitem) => {
							const {navlocation, navtext} = navitem;
							return (
								<ListItem onPress={() => {
									this.props.navigation.navigate(navlocation)
									this.props.navigation.dispatch(DrawerActions.closeDrawer());
								}} key={navlocation}>
									<Text>{navtext}</Text>
								</ListItem>
							); 
						})}
						
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
