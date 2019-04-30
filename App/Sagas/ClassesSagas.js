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
import ClassesActions from '../Redux/ClassesRedux'
//import { Storage } from 'aws-amplify';

// import { StoresSelectors } from '../Redux/StoresRedux'

const getETAClasses = (api) => {
  let cacheURLs = [];

  return api.getClasses().then(response => {
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
        const {id, title, date, description, price, picURI, paypalURL} = post;
        return {id, title, date, description, price, picURI, paypalURL};
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

// this is a refactored copy of the getStore function from StoreSagas
export function * getClasses (api, action) {
  const { data } = action 
  const response = yield call(getETAClasses, api)
  //console.log('resp',response)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(ClassesActions.classesSuccess(response.data, response.cacheURLs))
  } else {
    yield put(ClassesActions.classesFailure())
  }
}
