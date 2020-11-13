import { START_SPIN_REELS, STOP_SPIN_REELS } from '../constants';

export const startSpinReels = () => {
  return ({
    type: START_SPIN_REELS
  })
};

export const stopSpinReels = () => {
  return ({
    type: STOP_SPIN_REELS
  })
};