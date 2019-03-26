import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  eventsRequest: ['data'],
  eventsSuccess: ['payload'],
  eventsFailure: null,
  eventsCreate: ['data'],
  eventsCreateSuccess: ['payload'],
  eventsCreateDone: null,
  eventsCreateFailure: null,
  eventsUpdate: ['index', 'payload'],
  eventsUpdateSuccess: ['index', 'payload'],
  eventsUpdateDone: null,
  eventsUpdateFailure: null,
  eventsDelete: ['index', 'id'],
  eventsDeleteSuccess: ['index'],
  eventsDeleteFailure: null,

})

export const EventsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  payload: null,
  error: null,
  created: null,
  updated: null
})

/* ------------- Selectors ------------- */

export const EventsSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

//Create
export const create = (state, action) =>
  state.merge({fetching: true})

export function inc (x, y) {
  return [].concat(x).concat(y).sort((a, b) => {
    return new Date(a.date) - new Date(b.date)
  })
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
  return [].concat(x).slice(0, index).concat(payload).concat(x.slice(index+1)).sort((a, b) => {
    return new Date(a.date) - new Date(b.date)
  })
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
  [Types.EVENTS_REQUEST]: request,
  [Types.EVENTS_SUCCESS]: success,
  [Types.EVENTS_FAILURE]: failure,
  [Types.EVENTS_CREATE]: create,
  [Types.EVENTS_CREATE_SUCCESS]: createSuccess,
  [Types.EVENTS_CREATE_DONE]: createDone,
  [Types.EVENTS_CREATE_FAILURE]: createFailure,
  [Types.EVENTS_UPDATE]: update,
  [Types.EVENTS_UPDATE_SUCCESS]: updateSuccess,
  [Types.EVENTS_UPDATE_DONE]: updateDone,
  [Types.EVENTS_UPDATE_FAILURE]: updateFailure,
  [Types.EVENTS_DELETE]: deleteItem,
  [Types.EVENTS_DELETE_SUCCESS]: deleteSuccess,
  [Types.EVENTS_DELETE_FAILURE]: deleteFailure,

})
