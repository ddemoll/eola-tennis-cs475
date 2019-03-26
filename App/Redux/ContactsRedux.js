import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  contactsRequest: ['data'],
  contactsSuccess: ['payload', 'cacheURLs'],
  contactsFailure: null,
  /*
  contactsCreate: ['data'],
  contactsCreateSuccess: ['payload'],
  contactsCreateFailure: null,
  contactsUpdate: ['index', 'payload'],
  contactsUpdateSuccess: ['index', 'payload'],
  contactsUpdateFailure: null,
  contactsDelete: ['index', 'id'],
  contactsDeleteSuccess: ['index'],
  contactsDeleteFailure: null,
  */
})

export const ContactsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  cacheURLs: [],
  error: null
})

/* ------------- Selectors ------------- */

export const ContactsSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload, cacheURLs } = action
  return state.merge({ fetching: false, error: null, payload, cacheURLs })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/*
//Create
export const create = (state, action) =>
  state

function inc (x, y) {
  return x.slice(0, 0).concat(y).concat(x)
}
export const createSuccess = (state, action) => {
  const { payload } = action
  return state.update('payload', inc, payload)
}

export const createFailure = state =>
  state.merge({ fetching: false, error: true})

//Update
export const update = (state, action) => state

function up (x, data) {
  let {index, payload} = data
  return x.slice(0, index).concat(payload).concat(x.slice(index+1))
}
export const updateSuccess = (state, action) => {
  const { index, payload } = action
  return state.update('payload', up, {index, payload})
}

export const updateFailure = state =>
  state.merge({ fetching: false, error: true})

//Delete
export const deleteEvent = (state, action) => state

function del (x, i) {
  let {index} = i
  return x.slice(0, index).concat(x.slice(index+1))
}
export const deleteSuccess = (state, action) => {
  const { index } = action
  return state.update('payload', del, index)
}

export const deleteFailure = state =>
  state.merge({ fetching: false, error: true})
  */

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONTACTS_REQUEST]: request,
  [Types.CONTACTS_SUCCESS]: success,
  [Types.CONTACTS_FAILURE]: failure,
  /*
  [Types.CONTACTS_CREATE]: create,
  [Types.CONTACTS_CREATE_SUCCESS]: createSuccess,
  [Types.CONTACTS_CREATE_FAILURE]: createFailure,
  [Types.CONTACTS_UPDATE]: update,
  [Types.CONTACTS_UPDATE_SUCCESS]: updateSuccess,
  [Types.CONTACTS_UPDATE_FAILURE]: updateFailure,
  [Types.CONTACTS_DELETE]: deleteEvent,
  [Types.CONTACTS_DELETE_SUCCESS]: deleteSuccess,
  [Types.CONTACTS_DELETE_FAILURE]: deleteFailure,
  */
})
