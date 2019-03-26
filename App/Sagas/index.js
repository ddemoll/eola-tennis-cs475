import { takeLatest, all } from 'redux-saga/effects'
import DevAPI from '../Services/DevApi'
//import ProdAPI from '../Services/ProdApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { LoginTypes } from '../Redux/LoginRedux'
import { AnnouncementsTypes } from '../Redux/AnnouncementsRedux'
import { FeaturedTypes } from '../Redux/FeaturedRedux'
import { EventsTypes } from '../Redux/EventsRedux'
import { ContactsTypes } from '../Redux/ContactsRedux'
import { RankingsTypes } from '../Redux/RankingsRedux'
import { StoreTypes } from '../Redux/StoreRedux'

/* ------------- Sagas ------------- */

import { login, logout } from './LoginSagas'
import { getAnnouncements, /*createAnnouncement, deleteAnnouncement, updateAnnouncement*/ } from './AnnouncementsSagas'
import { getFeatured, /*createFeatured, deleteFeatured, updateFeatured*/ } from './FeaturedSagas'
import { getEvents, createEvent, deleteEvent, updateEvent } from './EventsSagas'
import { getContacts } from './ContactsSagas'
import { getRankings, /*createRanking, deleteRanking, searchPlayer*/ } from './RankingsSagas'
import { getStore, /*createStore, deleteStore, updateStore*/ } from './StoreSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DevAPI.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(LoginTypes.LOGIN_REQUEST, login),
    takeLatest(LoginTypes.LOGOUT, logout),

    // some sagas receive extra parameters in addition to an action
    takeLatest(AnnouncementsTypes.ANNOUNCEMENTS_REQUEST, getAnnouncements, api),
    /*
    takeLatest(AnnouncementsTypes.ANNOUNCEMENTS_CREATE, createAnnouncement, api),
    takeLatest(AnnouncementsTypes.ANNOUNCEMENTS_DELETE, deleteAnnouncement, api),
    takeLatest(AnnouncementsTypes.ANNOUNCEMENTS_UPDATE, updateAnnouncement, api),
    */

    takeLatest(FeaturedTypes.FEATURED_REQUEST, getFeatured, api),
    /*
    takeLatest(FeaturedTypes.FEATURED_CREATE, createFeatured, api),
    takeLatest(FeaturedTypes.FEATURED_DELETE, deleteFeatured, api),
    takeLatest(FeaturedTypes.FEATURED_UPDATE, updateFeatured, api),
    */

    takeLatest(EventsTypes.EVENTS_REQUEST, getEvents, api),
    takeLatest(EventsTypes.EVENTS_CREATE, createEvent, api),
    takeLatest(EventsTypes.EVENTS_DELETE, deleteEvent, api),
    takeLatest(EventsTypes.EVENTS_UPDATE, updateEvent, api),

    takeLatest(ContactsTypes.CONTACTS_REQUEST, getContacts, api),

    takeLatest(RankingsTypes.RANKINGS_REQUEST, getRankings, api),
    /*
    takeLatest(RankingsTypes.RANKINGS_CREATE, createRanking, api),
    takeLatest(RankingsTypes.RANKINGS_DELETE, deleteRanking, api),
    takeLatest(RankingsTypes.SEARCH_PLAYER, searchPlayer, api),
    */

    takeLatest(StoreTypes.STORE_REQUEST, getStore, api),
    /*
    takeLatest(StoreTypes.STORE_CREATE, createStore, api),
    takeLatest(StoreTypes.STORE_DELETE, deleteStore, api),
    takeLatest(StoreTypes.STORE_UPDATE, updateStore, api),
    */
  ])
}
