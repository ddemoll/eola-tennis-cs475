import React from 'react'
import { AsyncStorage } from 'react-native'

import { put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function * login ({ username, password }) {
  if (password !== 'USOpen18') {
    // dispatch failure
    yield put(LoginActions.loginFailure('WRONG'))
  } else {

    AsyncStorage.setItem('isLoggedIn', 'true').then(() => {

      }).done();


    yield put(LoginActions.loginSuccess('admin'))
  }
}

export function * logout () {

  AsyncStorage.setItem('isLoggedIn', 'false').then(() => {

    }).done();


}
