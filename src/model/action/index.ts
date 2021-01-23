import { BASEJSTREE, REACTTREE } from '../actionTypes';

interface ParamsTypes {
  data: string[],
  library: string;
}


export const setSelectTree = (params: ParamsTypes) => {
  if (params.library === 'react') {
    return { type: REACTTREE, payload: params.data };
  } else if (params.library === 'baseJs') {
    return { type: BASEJSTREE, payload: params.data };
  }
};