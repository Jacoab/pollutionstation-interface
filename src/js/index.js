import store from '../store/index';
import {setSensorState} from "../actions/dataActions";

window.store = store;
window.setSensorState= setSensorState;