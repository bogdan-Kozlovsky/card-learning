import { authMeAC, forgotValueAC, newPasswordValueAC } from './actionCreator';

export type AuthActionType =
  | ReturnType<typeof authMeAC>
  | ReturnType<typeof forgotValueAC>
  | ReturnType<typeof newPasswordValueAC>;
