import { SignInActionType } from '../../actionCreator/signIn/types';

import { InitialStateType } from './types';

const initialState: InitialStateType = {
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
  isLogin: false,
};

export const sign_inReducer = (
  state: InitialStateType = initialState,
  action: SignInActionType,
): InitialStateType => {
  switch (action.type) {
    case 'LOGIN/SIGN_IN':
      return { ...state, profile: action.data };

    case 'LOGIN/IS-LOGIN':
      return { ...state, isLogin: action.payload.value };

    default: {
      return state;
    }
  }
};
