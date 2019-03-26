/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import ContactsActions from '../Redux/ContactsRedux'
//import { Storage } from 'aws-amplify';
// import { AnnouncementsSelectors } from '../Redux/AnnouncementsRedux'

const getETAContacts = (api) => {
  let cacheURLs = [];
  return api.getContacts().then(response => {

      return Promise.all(response.map(async (contact) => {
        // Make "key" work with paths like:
        // "private/us-east-1:7817b8c7-2a90-4735-90d4-9356d7f8f0c7/091357f0-f0bc-11e7-a6a2-937d1d45b80e.jpeg"
        // and
        // "44b223e0-9707-11e7-a7d2-cdc5b84df56b.jpeg"
        const [, , , key] = /(([^\/]+\/){2})?(.+)$/.exec(contact.picURI);

        const picUrl = null//contact.picURI && await Storage.get(key, { level: 'public' });
        if(picUrl != null)
          cacheURLs.push(picUrl);
        const {id, title, subtitle, desc} = contact;
        return {id, title, subtitle, desc, picUrl};
      }));
  }).then(response => {
      return {
        ok: true,
        data: response,
        cacheURLs
      }
  }).catch(error => {
    //console.log(error)
      let response = {ok: false}
      return response
  });

}



export function * getContacts (api, action) {
  // get current data from Store
  // const currentData = yield select(AnnouncementsSelectors.getData)
  // make the call to the api
  const response = yield call(getETAContacts, api)
  //console.log('resp',response)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(ContactsActions.contactsSuccess(response.data, response.cacheURLs))
  } else {
    yield put(ContactsActions.contactsFailure())
  }
}
/*
const createETAContacts = (data) => {

  return API.post('ETA', '/eta/contacts', {body: {text: data.text, picKey: data.picKey}}).then(response => {
      response.ok = true
      return response
  }).catch(error => {
      let response = {ok: false}
      return response
  });

}
export function * createContact (api, action) {
  const { data} = action
  // get current data from Store
  // const currentData = yield select(AnnouncementsSelectors.getData)
  // make the call to the api
  const response = yield call(createETAContact, data)
  console.log(response)
  let data2 = {
    id: response.id,
    date: response.date,
    text: data.text,
    picURI: data.picKey
  }

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(ContactsActions.contactsCreateSuccess(data2))
  } else {
    yield put(ContactsActions.contactsCreateFailure())
  }
}

const updateETAContact = (text, id) => {

  return API.put('ETA', '/eta/contacts', {body: {text, id}}).then(response => {
      response.ok = true
      return response
  }).catch(error => {
      let response = {ok: false}
      return response
  });

}
export function * updateContact (api, action) {
  const { index, payload } = action
  // get current data from Store
  // const currentData = yield select(AnnouncementsSelectors.getData)
  // make the call to the api
  const response = yield call(updateETAContact, payload.text, payload.id)
  console.log(response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(ContactsActions.contactsUpdateSuccess(index, payload))
  } else {
    yield put(ContactsActions.contactsUpdateFailure())
  }
}

const delETAContact = (id) => {

  return API.del('ETA', `/eta/contacts/${id}`).then(response => {
      response.ok = true
      return response
  }).catch(error => {
      let response = {ok: false}
      return response
  });

}
export function * deleteContact (api, action) {
  const { index, id } = action
  // get current data from Store
  // const currentData = yield select(AnnouncementsSelectors.getData)
  // make the call to the api
  const response = yield call(delETAContact, id)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(ContactsActions.contactsDeleteSuccess({index}))
  } else {
    yield put(ContactsActions.contactsDeleteFailure())
  }
}
*/
