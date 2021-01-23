import { REACTTREE, BASEJSTREE } from '../actionTypes';

const initValue = {
  react: ['base'],
  baseJs: ['base'],
}

const treeReducer = (state = initValue, action: any) => {
  switch (action.type) {
    case REACTTREE:
      return {
        ...state, react: action.payload,
      }
    case BASEJSTREE:
      return {
        ...state, baseJs: action.payload,
      }
    default:
      return state
  }
}

export default treeReducer;