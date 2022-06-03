import { Dispatch } from 'redux';

import { profileApi } from '../../dal/profile';
import { ProfileType } from '../../dal/types';

import { setAppErrorAC } from './app-reducer';

/// ////////////////////////////////////////// type ////////////////////////////////////////////
export type InitialStateType = {
  profile: ProfileType;
  myId: null | string;
};
type ActionType =
  | ReturnType<typeof userDateAC>
  | ReturnType<typeof updateProfileAC>
  | ReturnType<typeof updateProfileNameAC>
  | ReturnType<typeof setIdProfileAC>;

/// ////////////////////////////////////////// initial state ////////////////////////////////////////////
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

/// ////////////////////////////////////////// reducer ////////////////////////////////////////////
export const profileReducer = (
  state: InitialStateType = initialState,
  action: ActionType,
) => {
  switch (action.type) {
    case 'PROFILE/USER_DATE': {
      return { ...state, ...action.data };
    }
    case 'PROFILE/UPDATE_PROFILE_NAME': {
      return {
        ...state,
        profile: {
          ...state.profile,
          name: action.name,
        },
      };
    }
    case 'PROFILE/UPDATE_PROFILE': {
      return {
        ...state,
        profile: {
          ...action.data,
        },
      };
    }
    case 'PROFILE-SET_MY_ID': {
      return { ...state, myId: action.myId };
    }
    default: {
      return state;
    }
  }
};

/// ////////////////////////////////////////// action creator ////////////////////////////////////////////
const userDateAC = (data: ProfileType) =>
  ({
    type: 'PROFILE/USER_DATE',
    data,
  } as const);
const updateProfileAC = (data: ProfileType) =>
  ({
    type: 'PROFILE/UPDATE_PROFILE',
    data,
  } as const);
export const updateProfileNameAC = (name: string) =>
  ({
    type: 'PROFILE/UPDATE_PROFILE_NAME',
    name,
  } as const);
export const setIdProfileAC = (myId: string | null) =>
  ({
    type: 'PROFILE-SET_MY_ID',
    myId,
  } as const);

/// ////////////////////////////////////////// Thunk creator////////////////////////////////////////////
export const updateProfileTC = (name: string, avatar: any) => (dispatch: Dispatch) => {
  profileApi
    .updateProfile(name, avatar)
    .then(res => {
      dispatch(updateProfileAC(res.data.updatedUser));
      dispatch(updateProfileNameAC(name));
    })
    .catch(error => {
      dispatch(setAppErrorAC(error.response.data.error));
    });
};
