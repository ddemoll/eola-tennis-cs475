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
import StoreActions from '../Redux/StoreRedux'
//import { Storage } from 'aws-amplify';

// import { StoresSelectors } from '../Redux/StoresRedux'

const getETAStore = (api) => {
  let cacheURLs = [];

  return api.getStore().then(response => {
    console.log(response)

      return Promise.all(response.map(async (post) => {
        // Make "key" work with paths like:
        // "private/us-east-1:7817b8c7-2a90-4735-90d4-9356d7f8f0c7/091357f0-f0bc-11e7-a6a2-937d1d45b80e.jpeg"
        // and
        // "44b223e0-9707-11e7-a7d2-cdc5b84df56b.jpeg"
        const [, , , key] = /(([^\/]+\/){2})?(.+)$/.exec(post.picURI);

        const picUrl = null//post.picURI && await Storage.get(key, { level: 'public' });
        if(picUrl != null)
          cacheURLs.push(picUrl);
        const {id, text, price, paypalURL} = post;
        return {id, text, picUrl, picKey: key, price, paypalURL};
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


export function * getStore (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(StoresSelectors.getData)
  // make the call to the api

  const response = yield call(getETAStore, api)
  //console.log('resp',response)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(StoreActions.storeSuccess(response.data, response.cacheURLs))
  } else {
    yield put(StoreActions.storeFailure())
  }
}
/*
export function * createStore (api, action) {
  const { data} = action

  // get current data from Store
  // const currentData = yield select(StoresSelectors.getData)
  // make the call to the api
  const response = yield call(api.createStore, data)


  // success?
  if (response.ok) {

    //console.log('resp',response)
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    let data2 = {
      id: response.id,
      paypalURL: response.paypalURL,
      price: data.price,
      text: data.text,
      picUrl: response.picUrl
    }

    yield put(StoreActions.storeCreateSuccess(data2))
  } else {
    yield put(StoreActions.storeCreateFailure())
  }
}


export function * updateStore (api, action) {
  const { index, payload } = action
  // get current data from Store
  // const currentData = yield select(StoresSelectors.getData)
  // make the call to the api
  const response = yield call(api.updateStore, payload)
  let data2 = {
    id: payload.id,
    paypalURL: payload.paypalURL,
    price: payload.price,
    text: payload.text,
    picUrl: response.picUrl
  }
  //console.log(response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(StoreActions.storeUpdateSuccess(index, data2))
  } else {
    yield put(StoreActions.storeUpdateFailure())
  }
}

export function * deleteStore (api, action) {
  const { index, id, picKey } = action
  //console.log('picKey', picKey)
  // get current data from Store
  // const currentData = yield select(StoresSelectors.getData)
  // make the call to the api


  const response = yield call(api.deleteStore, id, picKey)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(StoreActions.storeDeleteSuccess({index}))
  } else {
    yield put(StoreActions.storeDeleteFailure())
  }
}
*/
