import { 
  START_SPIN_REELS,
  STOP_SPIN_REELS, 
  INCREMENT_BET_VALUE, 
  DECREMENT_BET_VALUE,
  SET_MAX_BET,
  AUTO_BET, 
  CALC_SPIN_REELS
} from '../constants';

export const startSpinReels = () => ({
  type: START_SPIN_REELS
});

export const calcSpinReels = (points) => ({
  type: CALC_SPIN_REELS,
  payload: {
    points
  }
});

export const stopSpinReels = () => ({
  type: STOP_SPIN_REELS,
});


export const incrementBetValue = () => ({
  type: INCREMENT_BET_VALUE
});

export const decrementBetValue = () => ({
  type: DECREMENT_BET_VALUE
});

export const autoBet = () => ({
  type: AUTO_BET
});

export const setMaxBet = () => ({
  type: SET_MAX_BET
});