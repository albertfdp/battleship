import { combineReducers } from 'redux';

import boards from './boards';
import turn from './turn';

export default combineReducers({
  boards,
  turn
});
