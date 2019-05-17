import React from 'react'
import { AsyncStorage } from 'react-native'

import { put } from 'redux-saga/effects'
import SignWaiverActions from '../Redux/SignWaiverRedux'

// attempts to login
export function * signWaiverRequest (api, action) {
  const { name, email, cellphone, selectedForm } = action; 
  
  const response = yield api.RequestWaiverSign({name, email, cellphone, selectedForm}); 
  console.log("RESPONSE"); 
  console.log(response);
  console.log(response.data);
  console.log(response.data.data);
  if (response.data !== undefined && response.data.data !== undefined && response.data.data.success) {
    yield put(SignWaiverActions.signWaiverSuccess({ name }));
  } else {
    yield put(SignWaiverActions.signWaiverFailure({ error : response.data.data.error }));
  } 

}

