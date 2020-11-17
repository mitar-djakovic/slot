import {
  START_SPIN_REELS,
  STOP_SPIN_REELS,
  INCREMENT_BET_VALUE,
  DECREMENT_BET_VALUE,
  AUTO_BET,
  SET_MAX_BET
} from '../../constants';

const initialState = {
  spining: false,
  creedits: 10000,
  bet: 100,
  autoBet: false,
}

export default function slot(state = initialState, { type, payload }) {
  switch (type) {
    case START_SPIN_REELS:
      return {
        ...state,
        spining: true,
        creedits: state.creedits - state.bet
      }
    case STOP_SPIN_REELS:
      return {
        ...state,
        spining: false
      }
    case INCREMENT_BET_VALUE:
      return {
        ...state,
        bet: state.bet + 100
      }
    case DECREMENT_BET_VALUE:
      return {
        ...state,
        bet: state.bet - 100
      }
    case SET_MAX_BET:
      return {
        ...state,
        bet: state.creedits
      }
    case AUTO_BET:
      return {
        ...state,
        autoBet: true
      }
    default:
      return state
  }
}