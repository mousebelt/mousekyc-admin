import { combineReducers } from 'redux';

import {
  auth,
  submission
} from '../modules';

const rootReducer = combineReducers({
  auth,
  submission
});

export default rootReducer;
