import { SETSELECTTREE } from '../actionTypes';

const initValue = {
  selected: ['base'],
}

const treeReducer = (state = initValue, action: any) => {
  switch (action.type) {
    case SETSELECTTREE:
      return state.selected = action.paylod;

    default:
      return ['base']
  }
}

export default treeReducer;