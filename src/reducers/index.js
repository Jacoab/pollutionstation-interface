import actionTypes from "../constants/actionTypes";

const initState = {
  streamOn: false,
  sensorState: {
    gas: 0,
    temperature: 0,
    humidity: 0,
    pressure: 0
  }
};

function rootReducer(state=initState, action) {
  if(action.type === actionTypes.SET_SENSOR_STATE) {
    return Object.assign({}, state, {
      sensorData: action.payload
    });
  }

  return state;
}

export default rootReducer;