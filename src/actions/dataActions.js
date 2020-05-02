import actionTypes from '../constants/actionTypes';

export function setSensorState(sensorState) {
  return {
    type: actionTypes.SET_SENSOR_STATE,
    payload: sensorState
  }
}