import { ProfileActionType } from '../../actionCreator/profile/types';

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
  myId: null,
};

export const profileReducer = (
  state: InitialStateType = initialState,
  action: ProfileActionType,
) => {
  switch (action.type) {
    case 'PROFILE/USER_DATE':
      return { ...state, ...action.data };

    case 'PROFILE/UPDATE_PROFILE_NAME':
      return { ...state, profile: { ...state.profile, name: action.name } };

    case 'PROFILE/UPDATE_PROFILE':
      return { ...state, profile: { ...action.data } };

    case 'PROFILE-SET_MY_ID':
      return { ...state, myId: action.myId };

    default: {
      return state;
    }
  }
};
