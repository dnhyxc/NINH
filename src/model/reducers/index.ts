import { combineReducers } from 'redux';
import treeReducer from './setSelectTree';
import closeTreeReducer from './closeTree';

const reducers = combineReducers({
  treeReducer,
  closeTreeReducer,
});

export default reducers;