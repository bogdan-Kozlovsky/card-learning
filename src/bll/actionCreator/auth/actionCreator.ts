import { ProfileType } from '../../../dal/types';

export const authMeAC = (data: ProfileType) =>
  ({ type: 'PROFILE/UPDATE_PROFILE', data } as const);

export const forgotValueAC = (value: boolean) =>
  ({ type: 'FORGOT_VALUE', value } as const);

export const newPasswordValueAC = (value: boolean) =>
  ({ type: 'NEW_PASSWORD_VALUE', value } as const);
