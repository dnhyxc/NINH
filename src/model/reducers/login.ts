import { LOGIN } from '../actionTypes';

const initValue = {
  userName: '',
  passWord: '',
}

const loginReducer = (state = initValue, action: any) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state, ...action,
      }

    default:
      return state;
  }
}

export default loginReducer;
