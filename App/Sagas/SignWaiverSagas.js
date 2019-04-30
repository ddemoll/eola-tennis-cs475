import React from 'react'
import { AsyncStorage } from 'react-native'

import { put } from 'redux-saga/effects'
import SignWaiverActions from '../Redux/SignWaiverRedux'

// attempts to login
export function * requestSign ({ name }) {
  // try to sign with the given name. 
  console.log(name);
  comsole.warn('qadassdafds');
}

