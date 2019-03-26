
import { call, put } from 'redux-saga/effects'
import RankingsActions from '../Redux/RankingsRedux'

function transformResp(rankingsData) {

  console.log(rankingsData)
  //let playerInfo = {}
  let singles = []
  let doubles = []

  rankingsData.forEach(function (value, i) {
    let {playerID, firstName, lastName, gender, singlesUtr, singlesRk, singlesMove, ratingStatusSingles, ratingProgressSingles, doublesUtr, doublesRk, doublesMove, ratingStatusDoubles, ratingProgressDoubles} = value

    //singles is presorted by DB
    singles.push({playerID, name: `${firstName} ${lastName}`, gender, utr: singlesUtr, rank: singlesRk, move: singlesMove, ratingStatus: ratingStatusSingles, ratingProgress: ratingProgressSingles})
    doubles.push({playerID, name: `${firstName} ${lastName}`, gender, utr: doublesUtr, rank: doublesRk, move: doublesMove, ratingStatus: ratingStatusDoubles, ratingProgress: ratingProgressDoubles})
  });
  doubles.sort((a,b) => b.utr - a.utr);

  return {

    singles,
    doubles
  }
}

export function * getRankings (api, action) {

  const response = yield call(api.getRankings)
  console.log('rank', response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.

    let separatedRankings = transformResp(response.data)


    yield put(RankingsActions.rankingsSuccess(separatedRankings))
  } else {
    yield put(RankingsActions.rankingsFailure())
  }
}


export function * createRanking (api, action) {
  const { utrID } = action
  console.log('utrID', utrID)
  const response = yield call(api.createRanking, utrID)
  console.log('resp', response)


  // success?
  if (response.ok) {
    let separatedRankings = transformResp(response.data)

    yield put(RankingsActions.rankingsCreateSuccess(separatedRankings))
  } else {
    yield put(RankingsActions.rankingsCreateFailure())
  }
}

export function * deleteRanking (api, action) {
  const { id } = action

  const response = yield call(api.deleteRanking, id)

  // success?
  if (response.ok) {
    let separatedRankings = transformResp(response.data)
    yield put(RankingsActions.rankingsDeleteSuccess(separatedRankings))
  } else {
    yield put(RankingsActions.rankingsDeleteFailure())
  }
}

export function * searchPlayer (api, action) {

  const response = yield call(api.searchPlayer, action.searchString)
  // success?
  if (response.ok) {
    yield put(RankingsActions.searchPlayerSuccess(response.data))
  } else {
    yield put(RankingsActions.searchPlayerFailure())
  }
}
