import {
  START_SPIN_REELS,
  STOP_SPIN_REELS
} from '../../constants';

const initialState = {
  spining: false
}

export default function slot(state = initialState, { type, payload }) {
  switch (type) {
    case START_SPIN_REELS:
      return {
        ...state,
        spining: true
      }
    case STOP_SPIN_REELS:
      return {
        ...state
      }
    default:
      return state
  }
}