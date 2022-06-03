import { AppActionType } from '../../actionCreator/app/types';

import { InitialStateType } from './types';

const initialState: InitialStateType = {
  initialized: false,
  status: 'loading',
  error: null,
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionType,
): InitialStateType => {
  switch (action.type) {
    case 'APP/INITIALIZED':
      return { ...state, initialized: action.value };

    case 'APP/GET-STATUS':
      return { ...state, status: action.status };

    case 'APP/SET-ERROR':
      return { ...state, error: action.error };

    default: {
      return state;
    }
  }
};
