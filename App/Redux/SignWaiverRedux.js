import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signWaiverRequest: ['name'],
  signWaiverSuccess: ['signName'],
  signWaiverFailure: ['error'] 
})

export const SignWaiverTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  sendStatus: false, // not sent
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// sign request initiated
export const signWaiverRequest = (state, { name }) => state.merge({ fetching: true, name })

export const signWaiverSuccess = (state, { sendStatus }) => 
  state.merge({ fetching: false, error: null, sendStatus })

export const signWaiverFailure = (state, { error }) =>
  state.merge({ fetching: false, error })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_WAIVER_REQUEST]: signWaiverRequest,
  [Types.SIGN_WAIVER_SUCCESS]: signWaiverSuccess,
  [Types.SIGN_WAIVER_FAILURE]: signWaiverFailure 
})

