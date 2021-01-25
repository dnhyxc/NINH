import { BASEJSTREE, REACTTREE, CLOSEBASEJSTREE, CLOSEREACTTREE, LOGIN } from '../actionTypes';

interface ParamsTypes {
  data: string[],
  library: string;
}

interface CloseTreeParams {
  library: string;
  data: boolean;
}

export const setSelectTree = (params: ParamsTypes) => {
  if (params.library === 'react') {
    return { type: REACTTREE, payload: params.data };
  } else if (params.library === 'baseJs') {
    return { type: BASEJSTREE, payload: params.data };
  }
};

export const closeTree = (params: CloseTreeParams) => {
  if (params.library === 'react') {
    return { type: CLOSEREACTTREE, payload: params.data };
  }
  if (params.library === 'baseJs') {
    return { type: CLOSEBASEJSTREE, payload: params.data };
  }
}

export const login = (params: any) => ({ type: LOGIN, payload: params });