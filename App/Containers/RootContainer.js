import React, { Component } from "react";
import { View, StatusBar, Platform, PushNotificationIOS } from "react-native";
//import ReduxNavigation from "../Navigation/ReduxNavigation";
import NavigationDrawer from "../Navigation/NavigationDrawer";
import { Root } from "native-base";
import { connect } from 'react-redux'
import AnnouncementsActions from '../Redux/AnnouncementsRedux'
import EventsActions from '../Redux/EventsRedux'
import FeaturedActions from '../Redux/FeaturedRedux'

//import Amplify from 'aws-amplify';
//import { PushNotification } from 'aws-amplify-react-native';
//import aws_exports from '../aws-exports';

// PushNotification need to work with Analytics
//Amplify.configure(aws_exports);
//PushNotification.configure(aws_exports);

import NavigatorService from '../Services/Navigator';

// Styles
import styles from "./Styles/RootContainerStyles";

class RootContainer extends Component {
	componentDidMount() {
		/* if redux persist is not active fire startup action
		if (!ReduxPersist.active) {
			this.props.startup();
		}
		*/
		/*
		// get the notification data
		PushNotification.onNotification((notification) => {
			// Note that the notification object structure is different from Android and IOS
			//console.log('in app notification', notification);

			//navigate to the correct screen
			if(notification.title == 'Eola Tennis Academy') {
				if(NavigatorService.getCurrentRoute().routeName == 'Announcements') {
					this.props.dispatch(AnnouncementsActions.announcementsRequest());
				} else {
					NavigatorService.navigate('Announcements')
				}
			} else if(notification.title == 'New Event') {
				if(NavigatorService.getCurrentRoute().routeName == 'Events') {
					this.props.dispatch(EventsActions.eventsRequest());
				} else {
					NavigatorService.navigate('Events')
				}
			} else {
				if(NavigatorService.getCurrentRoute().routeName == 'Featured') {
					this.props.dispatch(FeaturedActions.featuredRequest());
				} else {
					NavigatorService.navigate('Featured')
				}
			}

			// required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
			if(Platform.OS === 'ios') {
				notification.finish(PushNotificationIOS.FetchResult.NoData);
			}

		});

		// get the registration token
		PushNotification.onRegister((token) => {
			console.log('in app registration', token);
		});
		*/

	}



	render() {
		return (
			<View style={styles.applicationView}>
				<StatusBar barStyle="light-content" />
				<Root>
				<NavigationDrawer
					ref={navigatorRef => {
	          NavigatorService.setContainer(navigatorRef);
	        }}
				/>
				</Root>
			</View>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(RootContainer)
