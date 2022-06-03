import { AuthActionType } from '../../actionCreator/auth/types';

import { InitialStateType } from './types';

export const initialState: InitialStateType = {
  profile: {
    avatar: '',
    created: null,
    deviceTokens: null,
    email: null,
    isAdmin: null,
    name: '',
    publicCardPacksCount: null,
    rememberMe: null,
    token: null,
    tokenDeathTime: null,
    updated: null,
    verified: null,
    __v: null,
    _id: null,
  },
  forgotValue: false,
  newPasswordValue: false,
};

export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthActionType,
): InitialStateType => {
  switch (action.type) {
    case 'PROFILE/UPDATE_PROFILE':
      return { ...state, profile: action.data };

    case 'FORGOT_VALUE':
      return { ...state, forgotValue: action.value };

    case 'NEW_PASSWORD_VALUE':
      return { ...state, newPasswordValue: action.value };

    default: {
      return state;
    }
  }
};
