import actionTypes from "../constants/actionTypes";
import time from "../constants/time";

const initState = {
  quality: 'Awaiting data',
  streamOn: false,
  deviceURL: undefined,
  interval: time.TEN_SECONDS
};

function rootReducer(state=initState, action) {
  if(action.type === actionTypes.SET_QUALITY) {
    return Object.assign({}, state, {quality: action.payload})
  }
  else if(action.type === actionTypes.SET_INTERVAL) {
    return Object.assign({}, state, {interval: action.payload})
  }

  return state;
}

export default rootReducer;