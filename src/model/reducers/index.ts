import { combineReducers } from 'redux';
import treeReducer from './setSelectTree';

const reducers = combineReducers({
  treeReducer,
});

export default reducers;