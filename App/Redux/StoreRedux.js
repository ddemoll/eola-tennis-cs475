import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  storeRequest: ['data'],
  storeSuccess: ['payload', 'cacheURLs'],
  storeFailure: null,
  storeCreate: ['data'],
  storeCreateSuccess: ['payload'],
  storeCreateDone: null,
  storeCreateFailure: null,
  storeUpdate: ['index', 'payload'],
  storeUpdateSuccess: ['index', 'payload'],
  storeUpdateDone: null,
  storeUpdateFailure: null,
  storeDelete: ['index', 'id', 'picKey'],
  storeDeleteSuccess: ['index'],
  storeDeleteFailure: null,
})

export const StoreTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  payload: null,
  cacheURLs: [],
  error: null,
  created: null,
  updated: null
})

/* ------------- Selectors ------------- */

export const StoreSelectors = {
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

//Create
export const create = (state, action) =>
  state.merge({ fetching: true })

function inc (x, y) {
  return x.slice(0, 0).concat(y).concat(x)
}
export const createSuccess = (state, action) => {
  const { payload } = action
  return state.merge({fetching: false, created: true}).update('payload', inc, payload)
}
export const createDone = (state, action) =>
  state.merge({ created: null })

export const createFailure = state =>
  state.merge({ fetching: false, error: true})

//Update
export const update = (state, action) =>
  state.merge({fetching: true})

function up (x, data) {
  let {index, payload} = data
  return x.slice(0, index).concat(payload).concat(x.slice(index+1))
}
export const updateSuccess = (state, action) => {
  const { index, payload } = action
  return state.merge({fetching: false, updated: true}).update('payload', up, {index, payload})
}
export const updateDone = (state, action) =>
  state.merge({updated: null})

export const updateFailure = state =>
  state.merge({ fetching: false, error: true})

//Delete
export const deleteStore = (state, action) => state

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

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STORE_REQUEST]: request,
  [Types.STORE_SUCCESS]: success,
  [Types.STORE_FAILURE]: failure,
  [Types.STORE_CREATE]: create,
  [Types.STORE_CREATE_SUCCESS]: createSuccess,
  [Types.STORE_CREATE_DONE]: createDone,
  [Types.STORE_CREATE_FAILURE]: createFailure,
  [Types.STORE_UPDATE]: update,
  [Types.STORE_UPDATE_SUCCESS]: updateSuccess,
  [Types.STORE_UPDATE_DONE]: updateDone,
  [Types.STORE_UPDATE_FAILURE]: updateFailure,
  [Types.STORE_DELETE]: deleteStore,
  [Types.STORE_DELETE_SUCCESS]: deleteSuccess,
  [Types.STORE_DELETE_FAILURE]: deleteFailure,
})
