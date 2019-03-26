import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  featuredRequest: ['data'],
  featuredSuccess: ['payload', 'cacheURLs'],
  featuredFailure: null,
  featuredCreate: ['data'],
  featuredCreateSuccess: ['payload'],
  featuredCreateDone: null,
  featuredCreateFailure: null,
  featuredUpdate: ['index', 'payload'],
  featuredUpdateSuccess: ['index', 'payload'],
  featuredUpdateDone: null,
  featuredUpdateFailure: null,
  featuredDelete: ['index', 'id', 'picKey'],
  featuredDeleteSuccess: ['index'],
  featuredDeleteFailure: null,
})

export const FeaturedTypes = Types
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

export const FeaturedSelectors = {
  getData: state => state.payload
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, action) =>
  state.merge({ fetching: true, payload: null })

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
  state.merge({fetching: true})

export function inc (x, y) {
  return x.slice(0, 0).concat(y).concat(x)
}
export const createSuccess = (state, action) => {
  const { payload } = action
  return state.merge({fetching: false, created: true}).update('payload', inc, payload)
}
export const createDone = (state, action) =>
  state.merge({created: null})

export const createFailure = state =>
  state.merge({ fetching: false, error: true})

//Update
export const update = (state, action) =>
  state.merge({fetching: true})

export function up (x, data) {
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
export const deleteItem = (state, action) => state

export function del (x, i) {
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
  [Types.FEATURED_REQUEST]: request,
  [Types.FEATURED_SUCCESS]: success,
  [Types.FEATURED_FAILURE]: failure,
  [Types.FEATURED_CREATE]: create,
  [Types.FEATURED_CREATE_SUCCESS]: createSuccess,
  [Types.FEATURED_CREATE_DONE]: createDone,
  [Types.FEATURED_CREATE_FAILURE]: createFailure,
  [Types.FEATURED_UPDATE]: update,
  [Types.FEATURED_UPDATE_SUCCESS]: updateSuccess,
  [Types.FEATURED_UPDATE_DONE]: updateDone,
  [Types.FEATURED_UPDATE_FAILURE]: updateFailure,
  [Types.FEATURED_DELETE]: deleteItem,
  [Types.FEATURED_DELETE_SUCCESS]: deleteSuccess,
  [Types.FEATURED_DELETE_FAILURE]: deleteFailure,
})
