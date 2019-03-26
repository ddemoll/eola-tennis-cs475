import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  rankingsRequest: ['data'],
  rankingsSuccess: ['payload'],
  rankingsFailure: null,
  rankingsCreate: ['utrID'],
  rankingsCreateSuccess: ['payload'],
  rankingsCreateDone: null,
  rankingsCreateFailure: null,
  rankingsDelete: ['id'],
  rankingsDeleteSuccess: ['payload'],
  rankingsDeleteFailure: null,
  searchPlayer: ['searchString'],
  searchPlayerSuccess: ['searchResults'],
  searchPlayerFailure: null
})

export const RankingsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  payload: null,
  error: null,
  created: null,
  searchResults: null,
  searchError: null,
  computingNewRankings: null
})

/* ------------- Selectors ------------- */

export const RankingsSelectors = {
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

export const create = (state, action) =>
  state.merge({ computingNewRankings: true })

export const createSuccess = (state, action) => {
  const { payload } = action
  return state.merge({computingNewRankings: false, error: null, created: true, payload})
}
export const createDone = (state, action) =>
  state.merge({created: null, searchResults: null})

export const updateFailure = state =>
  state.merge({ fetching: false, error: true, computingNewRankings: null})

export const searchRequest = (state, { data }) =>
  state.merge({ fetching: true, data, searchResults: null })

// successful api lookup
export const searchSuccess = (state, action) => {
  const { searchResults } = action
  return state.merge({ fetching: false, searchError: null, searchResults })
}

// Something went wrong somewhere.
export const searchFailure = state =>
  state.merge({ fetching: false, searchError: true, searchResults: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RANKINGS_REQUEST]: request,
  [Types.RANKINGS_SUCCESS]: success,
  [Types.RANKINGS_FAILURE]: failure,
  [Types.RANKINGS_CREATE]: create,
  [Types.RANKINGS_CREATE_SUCCESS]: createSuccess,
  [Types.RANKINGS_CREATE_DONE]: createDone,
  [Types.RANKINGS_CREATE_FAILURE]: updateFailure,

  [Types.RANKINGS_DELETE]: request,
  [Types.RANKINGS_DELETE_SUCCESS]: success,
  [Types.RANKINGS_DELETE_FAILURE]: updateFailure,

  [Types.SEARCH_PLAYER]: searchRequest,
  [Types.SEARCH_PLAYER_SUCCESS]: searchSuccess,
  [Types.SEARCH_PLAYER_FAILURE]: searchFailure,

})
