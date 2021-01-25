import { combineReducers } from 'redux';
import treeReducer from './setSelectTree';
import closeTreeReducer from './closeTree';
import loginReducer from './login';

const reducers = combineReducers({
  treeReducer,
  closeTreeReducer,
  loginReducer,
});

export default reducers;