import { 
  START_SPIN_REELS, 
  STOP_SPIN_REELS, 
  INCREMENT_BET_VALUE, 
  DECREMENT_BET_VALUE,
  SET_MAX_BET,
  AUTO_BET 
} from '../constants';

export const startSpinReels = () => {
  return ({
    type: START_SPIN_REELS
  });
};

export const stopSpinReels = () => {
  return ({
    type: STOP_SPIN_REELS
  });
};

export const incrementBetValue = () => {
  return ({
    type: INCREMENT_BET_VALUE
  })
};

export const decrementBetValue = () => {
  return ({
    type: DECREMENT_BET_VALUE
  });
};

export const autoBet = () => {
  return ({
    type: AUTO_BET
  });
};

export const setMaxBet = () => {
  return ({
    type: SET_MAX_BET
  });
};