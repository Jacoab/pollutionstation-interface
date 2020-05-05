import actionTypes from '../constants/actionTypes';

export function setSensorState(sensorState) {
  return {
    type: actionTypes.SET_SENSOR_STATE,
    payload: sensorState
  }
}

export function setQuality(quality) {
  return {
    type: actionTypes.SET_QUALITY,
    payload: quality
  }
}