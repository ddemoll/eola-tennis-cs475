import React from 'react'
import { AsyncStorage } from 'react-native'

import { put } from 'redux-saga/effects'
import SignWaiverActions from '../Redux/SignWaiverRedux'

// attempts to login
export function * signWaiverRequest (api, action) {
  const { name } = action; 
  // try to sign with the given name. 
  console.log(action);
  console.log("SIGN WAIVER REQUEST SAGA HAS BEEN CALLED");
  
  const response = yield api.RequestWaiverSign({name : name + " to POST"}); 
  console.log(response);
  
  yield put(SignWaiverActions.signWaiverSuccess({ name }));
}

