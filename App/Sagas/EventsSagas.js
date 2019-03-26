
import { call, put } from 'redux-saga/effects'
import EventsActions from '../Redux/EventsRedux'
import {parseDateIntoComponents} from '../Transforms/Utility'

export function * getEvents (api, action) {

  const response = yield call(api.getEvents)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    //Parse date transform

    for(let item of response.data) {
      Object.assign(item, {...parseDateIntoComponents(item.date)})

    }

    yield put(EventsActions.eventsSuccess(response.data))
  } else {
    yield put(EventsActions.eventsFailure())
  }
}

export function * createEvent (api, action) {
  const { data} = action
  const response = yield call(api.createEvent, data)


  // success?
  if (response.ok) {

    //console.log('resp',response)
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    let data2 = {
      id: response.id,
      ...data,
      ...parseDateIntoComponents(data.date)
    }
    data2.date = new Date(data2.date).toISOString();

    yield put(EventsActions.eventsCreateSuccess(data2))
  } else {
    yield put(EventsActions.eventsCreateFailure())
  }
}

export function * updateEvent (api, action) {
  const { index, payload } = action

  const response = yield call(api.updateEvent, payload)
  let data2 = {
    ...payload,
    ...parseDateIntoComponents(payload.date)
  }
  data2.date = new Date(data2.date).toISOString();
  //console.log(data2)
  //console.log(response)
  // success?
  if (response.ok) {
    yield put(EventsActions.eventsUpdateSuccess(index, data2))
  } else {
    yield put(EventsActions.eventsUpdateFailure())
  }
}

export function * deleteEvent (api, action) {
  const { index, id } = action

  const response = yield call(api.deleteEvent, id)

  // success?
  if (response.ok) {
    yield put(EventsActions.eventsDeleteSuccess({index}))
  } else {
    yield put(EventsActions.eventsDeleteFailure())
  }
}
