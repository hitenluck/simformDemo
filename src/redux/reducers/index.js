import { combineReducers } from 'redux';
import * as appLevelReducer from './appReducers/appReducers';
import * as chatReducers from './chatReducers/chatReducers';
const rootReducer = combineReducers(Object.assign({},
  appLevelReducer,
  chatReducers));
export default rootReducer;
