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
import AnnouncementsActions from '../Redux/AnnouncementsRedux'
//import { Storage } from 'aws-amplify';

// import { AnnouncementsSelectors } from '../Redux/AnnouncementsRedux'

const getETAAnnouncements = (api) => {
  let cacheURLs = [];

  return api.getAnnouncements().then(response => {

      return Promise.all(response.map(async (post) => {
        // Make "key" work with paths like:
        // "private/us-east-1:7817b8c7-2a90-4735-90d4-9356d7f8f0c7/091357f0-f0bc-11e7-a6a2-937d1d45b80e.jpeg"
        // and
        // "44b223e0-9707-11e7-a7d2-cdc5b84df56b.jpeg"
        const [, , , key] = /(([^\/]+\/){2})?(.+)$/.exec(post.picURI);

        const picUrl = null//post.picURI && await Storage.get(key, { level: 'public' });
        if(picUrl != null)
          cacheURLs.push(picUrl);
        const {id, text, date, youtubeID} = post;
        return {id, text, date, picUrl, picKey: key, youtubeID};
      }));
  }).then(response => {
      return {
        ok: true,
        data: response,
        cacheURLs
      }
  }).catch(error => {
      console.log(error)
      let response = {ok: false}
      return response
  });

}


export function * getAnnouncements (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(AnnouncementsSelectors.getData)
  // make the call to the api

  const response = yield call(getETAAnnouncements, api)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(AnnouncementsActions.announcementsSuccess(response.data, response.cacheURLs))
  } else {
    yield put(AnnouncementsActions.announcementsFailure())
  }
}
/*
export function * createAnnouncement (api, action) {
  const { data} = action

  // get current data from Store
  // const currentData = yield select(AnnouncementsSelectors.getData)
  // make the call to the api
  const response = yield call(api.createAnnouncement, data)


  // success?
  if (response.ok) {

    //console.log('resp',response)
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    let data2 = {
      id: response.id,
      date: response.date,
      youtubeID: data.youtubeID,
      text: data.text,
      picUrl: response.picUrl
    }

    yield put(AnnouncementsActions.announcementsCreateSuccess(data2))
  } else {
    yield put(AnnouncementsActions.announcementsCreateFailure())
  }
}


export function * updateAnnouncement (api, action) {
  const { index, payload } = action
  // get current data from Store
  // const currentData = yield select(AnnouncementsSelectors.getData)
  // make the call to the api
  const response = yield call(api.updateAnnouncement, payload)
  let data2 = {
    id: payload.id,
    text: payload.text,
    youtubeID: payload.youtubeID,
    picUrl: response.picUrl
  }
  //console.log(response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(AnnouncementsActions.announcementsUpdateSuccess(index, data2))
  } else {
    yield put(AnnouncementsActions.announcementsUpdateFailure())
  }
}

export function * deleteAnnouncement (api, action) {
  const { index, id, picKey } = action
  //console.log('picKey', picKey)
  // get current data from Store
  // const currentData = yield select(AnnouncementsSelectors.getData)
  // make the call to the api


  const response = yield call(api.deleteAnnouncement, id, picKey)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(AnnouncementsActions.announcementsDeleteSuccess({index}))
  } else {
    yield put(AnnouncementsActions.announcementsDeleteFailure())
  }
}
*/
