import { ProfileType } from '../../../dal/types';

export type InitialStateType = {
  profile: ProfileType;
  forgotValue: boolean;
  newPasswordValue: boolean;
};
