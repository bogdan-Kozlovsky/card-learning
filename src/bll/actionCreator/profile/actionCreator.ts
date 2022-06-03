import { ProfileType } from '../../../dal/types';

export const userDateAC = (data: ProfileType) =>
  ({ type: 'PROFILE/USER_DATE', data } as const);

export const updateProfileAC = (data: ProfileType) =>
  ({ type: 'PROFILE/UPDATE_PROFILE', data } as const);

export const updateProfileNameAC = (name: string) =>
  ({ type: 'PROFILE/UPDATE_PROFILE_NAME', name } as const);

export const setIdProfileAC = (myId: string | null) =>
  ({ type: 'PROFILE-SET_MY_ID', myId } as const);
