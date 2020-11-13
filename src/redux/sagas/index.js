import { all } from 'redux-saga/effects';
import { slotSagas } from './slot';

export default function* rootSagas() {
  yield all([
    ...slotSagas
  ]);
}