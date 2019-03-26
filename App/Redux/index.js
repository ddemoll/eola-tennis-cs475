import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    //nav: require('./NavigationRedux').reducer,
    login: require('./LoginRedux').reducer,

    announcements: require('./AnnouncementsRedux').reducer,
    featured: require('./FeaturedRedux').reducer,
    events: require('./EventsRedux').reducer,
    contacts: require('./ContactsRedux').reducer,
    rankings: require('./RankingsRedux').reducer,
    store: require('./StoreRedux').reducer,
  })

  return configureStore(rootReducer, rootSaga)
}
