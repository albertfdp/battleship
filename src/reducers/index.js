import { combineReducers } from 'redux';

import board from './board';
import cells from './cells';

export default combineReducers({
  board,
  cells
});
