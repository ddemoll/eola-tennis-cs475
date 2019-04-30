import React from "react";
import { createDrawerNavigator, createStackNavigator, createAppContainer } from "react-navigation";

import DrawerContent from "../Containers/DrawerContent";
import AnnouncementsPage from '../Containers/AnnouncementsPage'
import AddAnnounce from '../Containers/AddAnnounce'
import EditAnnounce from '../Containers/EditAnnounce'
import Login from "../Containers/LoginScreen";

import FeaturedPage from '../Containers/FeaturedPage'
import AddFeatured from '../Containers/AddFeatured'
import EditFeatured from '../Containers/EditFeatured'

import EventsPage from '../Containers/EventsPage'
import AddEvent from '../Containers/AddEvent'
import EditEvent from '../Containers/EditEvent'

import ContactsPage from '../Containers/ContactsPage'
import ContactDetail from '../Components/ContactDetail'

import RankingsPage from '../Containers/RankingsPage'
import AddRankingsPlayer from '../Containers/AddRankingsPlayer'

import StorePage from '../Containers/StorePage'
import AddStore from '../Containers/AddStore'
import EditStore from '../Containers/EditStore'

import ClassesPage from '../Containers/ClassesPage'
import EditClass from '../Containers/EditClass'
import AddClass from '../Containers/AddClass'

import SignWaiverPage from '../Containers/SignWaiverPage'

import ChatroomPage from '../Containers/ChatroomPage'

import styles from "./Styles/NavigationStyles";


const AnnouncementsNav = createStackNavigator(
	{
		AnnouncementsPage: { screen: AnnouncementsPage },
    AddAnnounce: { screen: AddAnnounce },
		EditAnnounce: { screen: EditAnnounce },



	},
	{
		initialRouteName: "AnnouncementsPage",
		headerMode: "none",
	}
);

const FeaturedNav = createStackNavigator(
	{
		FeaturedPage: { screen: FeaturedPage },
		AddFeatured: { screen: AddFeatured },
		EditFeatured: { screen: EditFeatured },
	},
	{
		initialRouteName: "FeaturedPage",
		headerMode: "none",
	}
);

const EventsNav = createStackNavigator(
	{
		EventsPage: { screen: EventsPage },
		AddEvent: { screen: AddEvent },
		EditEvent: { screen: EditEvent },
	},
	{
		initialRouteName: "EventsPage",
		headerMode: "none",
	}
);

const ContactsNav = createStackNavigator(
	{
		ContactsPage: { screen: ContactsPage },
		ContactDetail: { screen: ContactDetail },
	},
	{
		initialRouteName: "ContactsPage",
		headerMode: "none",
	}
);

const RankingsNav = createStackNavigator(
	{
		RankingsPage: { screen: RankingsPage },
		AddRankingsPlayer: { screen: AddRankingsPlayer },

	},
	{
		initialRouteName: "RankingsPage",
		headerMode: "none",
	}
);

const StoreNav = createStackNavigator(
	{
		StorePage: { screen: StorePage },
		AddStore: { screen: AddStore },
		EditStore: { screen: EditStore },
	},
	{
		initialRouteName: "StorePage",
		headerMode: "none",
	}
);

const ClassesNav = createStackNavigator(
	{
		ClassesPage: { screen: ClassesPage },
		EditClass: { screen: EditClass },
		AddClass: { screen: AddClass }
	},
	{
		initialRouteName: "ClassesPage",
		headerMode: "none",
	}
);


const ChatroomNav = createStackNavigator(
	{
		ChatroomPage: { screen: ChatroomPage }
	},
	{
		initialRouteName: "ChatroomPage",
		headerMode: "none",
	}
);

const SignWaiverNav = createStackNavigator(
	{
		SignWaiverPage: { screen: SignWaiverPage }
	},
	{
		initialRouteName: "SignWaiverPage",
		headerMode: "none",
	}
);

const NavigationDrawer = createDrawerNavigator({

		Announcements: { screen: AnnouncementsNav },
		Featured: { screen: FeaturedNav },
		Events: { screen: EventsNav },
		Rankings: { screen: RankingsNav },
		Contacts: { screen: ContactsNav },
		Store: { screen: StoreNav },
		Classes: { screen: ClassesNav },
		Chatroom: { screen: ChatroomNav },
		Waiver: { screen: SignWaiverNav },

		Login: { screen: Login },
	},
	{

		contentComponent: props => <DrawerContent {...props} />,
	}
);



export default createAppContainer(NavigationDrawer);
