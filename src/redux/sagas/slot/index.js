import {
  put, takeEvery, fork, take,
} from 'redux-saga/effects';
import { CALC_SPIN_REELS, STOP_SPIN_REELS, UPDATE_CREEDITS } from '../../constants';

function* stopSpinReels() {
  const data = yield take(CALC_SPIN_REELS);

  yield put({ type: UPDATE_CREEDITS, payload: {  creedits: data }});

};

function* watchStopSpin() {
  yield takeEvery(STOP_SPIN_REELS, stopSpinReels)
}

export const slotSagas = [
  fork(watchStopSpin)
];