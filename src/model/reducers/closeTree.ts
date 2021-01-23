import { CLOSEBASEJSTREE, CLOSEREACTTREE } from '../actionTypes';

const initValue = {
  react: false,
  baseJs: false
}

const CloseTreeReducer = (state = initValue, action: { type: string, payload: boolean }) => {
  switch (action.type) {
    case CLOSEREACTTREE:
      return {
        ...state, react: action.payload,
      }
    case CLOSEBASEJSTREE:
      return {
        ...state, baseJs: action.payload,
      }

    default:
      return state;
  }
}

export default CloseTreeReducer;