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
import FeaturedActions from '../Redux/FeaturedRedux'
//import { Storage } from 'aws-amplify';
//import {createPost} from '../Lib/util'
// import { FeaturedSelectors } from '../Redux/FeaturedRedux'

const getETAFeatured = (api) => {
  let cacheURLs = [];
  return api.getFeatured().then(response => {
      return Promise.all(response.map(async (post) => {
        // Make "key" work with paths like:
        // "private/us-east-1:7817b8c7-2a90-4735-90d4-9356d7f8f0c7/091357f0-f0bc-11e7-a6a2-937d1d45b80e.jpeg"
        // and
        // "44b223e0-9707-11e7-a7d2-cdc5b84df56b.jpeg"
        const [, , , key] = /(([^\/]+\/){2})?(.+)$/.exec(post.picURI);

        const picUrl = null//post.picURI && await Storage.get(key, { level: 'public' });
        if(picUrl != null)
          cacheURLs.push(picUrl);
        const {id, name, text, numStars, youtubeID} = post;
        return {id, name, text, numStars, picUrl, picKey: key, youtubeID};
      }));
  }).then(response => {
      return {
        ok: true,
        data: response,
        cacheURLs
      }
  }).catch(error => {
      let response = {ok: false}
      return response
  });

}


export function * getFeatured (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(FeaturedSelectors.getData)
  // make the call to the api
  const response = yield call(getETAFeatured, api)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(FeaturedActions.featuredSuccess(response.data, response.cacheURLs))
  } else {
    yield put(FeaturedActions.featuredFailure())
  }
}
/*
export function * createFeatured (api, action) {
  const { data} = action
  // get current data from Store
  // const currentData = yield select(FeaturedSelectors.getData)
  // make the call to the api
  const response = yield call(api.createFeatured, data)
  let data2 = {
    id: response.id,
    name: data.name,
    text: data.text,
    picUrl: response.picUrl,
    numStars: data.numStars,
    youtubeID: data.youtubeID
  }

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(FeaturedActions.featuredCreateSuccess(data2))
  } else {
    yield put(FeaturedActions.featuredCreateFailure())
  }
}

export function * updateFeatured (api, action) {
  const { index, payload } = action
  // get current data from Store
  // const currentData = yield select(FeaturedSelectors.getData)
  // make the call to the api
  const response = yield call(api.updateFeatured, payload, api)
  let data2 = {
    id: payload.id,
    name: payload.name,
    text: payload.text,
    picUrl: response.picUrl,
    numStars: payload.numStars,
    youtubeID: payload.youtubeID
  }
  //console.log(response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(FeaturedActions.featuredUpdateSuccess(index, data2))
  } else {
    yield put(FeaturedActions.featuredUpdateFailure())
  }
}

export function * deleteFeatured (api, action) {
  const { index, id, picKey } = action
  // get current data from Store
  // const currentData = yield select(FeaturedSelectors.getData)
  // make the call to the api
  const response = yield call(api.deleteFeatured, id, picKey)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(FeaturedActions.featuredDeleteSuccess({index}))
  } else {
    yield put(FeaturedActions.featuredDeleteFailure())
  }
}
*/
